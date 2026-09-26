# 12 — Deployment & Infrastructure Guide

This document provides deployment configurations, Docker assets, Alembic migration workflows, and production best practices for the Clave backend.

---

## 1. Production Multi-Stage Dockerfile

```dockerfile
# Multi-stage build for minimal container footprint and security
FROM python:3.11-slim AS builder

WORKDIR /app

# Install build dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

# Final runtime image
FROM python:3.11-slim AS runner

WORKDIR /app

# Install runtime PostgreSQL client library
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq5 \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Copy installed Python packages from builder
COPY --from=builder /root/.local /root/.local
ENV PATH=/root/.local/bin:$PATH

# Copy application code
COPY . .

# Create non-root user for security
RUN useradd -m -u 1001 claveuser && chown -R claveuser:claveuser /app
USER claveuser

EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1

# Production server execution via Uvicorn with multiple workers
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4", "--proxy-headers", "--forwarded-allow-ips", "*"]
```

---

## 2. Docker Compose (`docker-compose.yml`)

For local development with PostgreSQL:

```yaml
version: '3.8'

services:
  db:
    image: postgres:15-alpine
    container_name: clave_postgres
    restart: always
    environment:
      POSTGRES_DB: clave_db
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgrespassword
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres -d clave_db"]
      interval: 5s
      timeout: 5s
      retries: 5

  backend:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: clave_backend
    restart: always
    depends_on:
      db:
        condition: service_healthy
    environment:
      - ENVIRONMENT=development
      - DEBUG=True
      - DATABASE_URL=postgresql+asyncpg://postgres:postgrespassword@db:5432/clave_db
      - JWT_SECRET_KEY=dev-secret-key-32-chars-minimum-needed
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - CORS_ORIGINS=["http://localhost:5173"]
    ports:
      - "8000:8000"
    volumes:
      - .:/app

volumes:
  postgres_data:
```

---

## 3. Database Migrations with Alembic

### 1. Initialize Async Alembic
```bash
alembic init -t async alembic
```

### 2. Configure `alembic/env.py`
Ensure `target_metadata` points to your SQLAlchemy Base:
```python
from app.models import Base
target_metadata = Base.metadata

# Read database URL from app settings
from app.core.config import settings
config.set_main_option("sqlalchemy.url", settings.DATABASE_URL)
```

### 3. Generate and Apply Migrations
```bash
# Generate migration script from models
alembic revision --autogenerate -m "init_clave_schema"

# Apply migrations to database
alembic upgrade head

# Rollback one migration if needed
alembic downgrade -1
```

---

## 4. Supabase Deployment Instructions

If hosting on Supabase:
1. **Database URL**:
   - In Supabase Dashboard ➔ Project Settings ➔ Database:
   - Use the **Transaction Pooler** connection string (port 6543) for serverless deployments or the **Session Pooler** (port 5432) for long-running FastAPI instances.
   - Format: `postgresql+asyncpg://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres`
2. **Storage Setup**:
   - Create a private bucket named `resumes`.
   - Set CORS on the bucket to permit `GET`, `PUT`, and `POST` from `https://clave.app` and `http://localhost:5173`.
3. **Database RLS Policies**:
   - Run the RLS policy script from [01-DATABASE-SCHEMA.md](./01-DATABASE-SCHEMA.md) in the Supabase SQL Editor.

---

## 5. Health Check Endpoints

Implement in `app/main.py` or `app/api/v1/health.py`:

```python
from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import text
from app.core.database import get_db

health_router = APIRouter(tags=["Health"])

@health_router.get("/health", status_code=status.HTTP_200_OK)
async def health_check():
    """Liveness probe for orchestrators (Kubernetes / ECS / Cloud Run)."""
    return {"status": "ok"}

@health_router.get("/health/ready", status_code=status.HTTP_200_OK)
async def readiness_check(db: AsyncSession = Depends(get_db)):
    """Readiness probe verifying database connectivity."""
    try:
        await db.execute(text("SELECT 1"))
        return {"status": "ready", "database": "connected"}
    except Exception as e:
        return JSONResponse(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            content={"status": "unhealthy", "database": str(e)}
        )
```
