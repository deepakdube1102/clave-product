# 08 — Suggested FastAPI Project Structure

This document outlines the recommended production layout for the Clave FastAPI backend.

---

## 1. Directory Tree

```text
clave-backend/
├── app/
│   ├── __init__.py
│   ├── main.py                     # FastAPI application factory & lifespan
│   │
│   ├── core/                       # Core configuration & infrastructure
│   │   ├── __init__.py
│   │   ├── config.py               # pydantic-settings configuration
│   │   ├── database.py             # Async SQLAlchemy engine & session factory
│   │   ├── security.py             # Password hashing, JWT encode/decode
│   │   ├── exceptions.py           # Custom exception classes & handlers
│   │   └── logging.py              # Structured logging configuration
│   │
│   ├── models/                     # SQLAlchemy relational ORM models
│   │   ├── __init__.py
│   │   ├── user.py
│   │   ├── profile.py              # CareerProfile, Education, Experience, etc.
│   │   ├── resume.py               # Resume, ResumeVersion, ResumeTemplate
│   │   ├── job.py                  # Job, SavedJob
│   │   ├── analysis.py             # JobAnalysis, AtsAnalysis
│   │   ├── file.py                 # UploadedFile
│   │   └── subscription.py         # Subscription, UsageRecord
│   │
│   ├── schemas/                    # Pydantic v2 validation & response models
│   │   ├── __init__.py
│   │   ├── base.py                 # ApiResponse, ApiErrorResponse
│   │   ├── auth.py
│   │   ├── user.py
│   │   ├── profile.py
│   │   ├── resume.py
│   │   ├── job.py
│   │   ├── ai.py
│   │   ├── file.py
│   │   └── subscription.py
│   │
│   ├── api/                        # HTTP route controllers (FastAPI routers)
│   │   ├── __init__.py
│   │   ├── deps.py                 # Common dependencies (get_db, get_current_user)
│   │   └── v1/
│   │       ├── __init__.py
│   │       ├── router.py           # Aggregates all v1 sub-routers
│   │       ├── auth.py
│   │       ├── me.py
│   │       ├── profile.py
│   │       ├── resumes.py
│   │       ├── jobs.py
│   │       ├── files.py
│   │       └── subscriptions.py
│   │
│   ├── services/                   # Core business logic layer
│   │   ├── __init__.py
│   │   ├── profile_service.py
│   │   ├── resume_service.py
│   │   ├── ats_service.py
│   │   ├── job_service.py
│   │   ├── file_service.py
│   │   └── subscription_service.py
│   │
│   └── integrations/               # External 3rd-party clients
│       ├── __init__.py
│       ├── ai/                     # AIService implementation (OpenAI / Anthropic)
│       │   ├── base.py
│       │   ├── openai_provider.py
│       │   └── prompts.py
│       ├── storage/                # S3 / Supabase object storage client
│       │   ├── base.py
│       │   └── s3_client.py
│       └── payments/               # Payment gateways (Razorpay / Stripe)
│           ├── base.py
│           └── razorpay_client.py
│
├── alembic/                        # Database migration scripts
│   ├── versions/
│   └── env.py
├── tests/                          # Automated Pytest suite
│   ├── conftest.py
│   ├── test_auth.py
│   ├── test_profile.py
│   ├── test_resumes.py
│   ├── test_ownership.py
│   └── test_subscriptions.py
├── scripts/
│   ├── seed_data.py                # Database seeding script
│   └── run_dev.sh
├── Dockerfile
├── docker-compose.yml
├── requirements.txt
├── alembic.ini
└── pyproject.toml
```

---

## 2. FastAPI Application Factory (`app/main.py`)

```python
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import engine
from app.api.v1.router import api_v1_router
from app.core.exceptions import ClaveException

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Verify DB connection
    async with engine.begin() as conn:
        pass
    yield
    # Shutdown: Dispose DB connection pool
    await engine.dispose()

def create_app() -> FastAPI:
    app = FastAPI(
        title="Clave Career Workspace API",
        version="1.0.0",
        docs_url="/docs",
        redoc_url="/redoc",
        openapi_url="/openapi.json",
        lifespan=lifespan
    )

    # CORS configuration
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Global custom exception handler for standardized error response envelope
    @app.exception_handler(ClaveException)
    async def clave_exception_handler(request: Request, exc: ClaveException):
        return JSONResponse(
            status_code=exc.status_code,
            content={"error": {"code": exc.code, "message": exc.message, "details": exc.details}}
        )

    # Mount v1 router
    app.include_router(api_v1_router, prefix="/api")

    return app

app = create_app()
```
