# CLAVE — Backend Developer Handoff

Welcome to the **Clave** backend engineering handoff package. This package specifies the complete backend architecture, database schema, API contracts, security models, and AI pipelines required to power the Clave AI-powered career workspace.

> **CRITICAL RULE**: Do not redesign or modify the existing React/Vite frontend UI. The frontend is the consumer of this backend. The backend must adhere strictly to the contracts and workflows documented here.

---

## 1. Product Model & Philosophy

Clave helps students, freshers, recent graduates, and early-career professionals:
- Build and maintain a single **Career Profile**
- Create ATS-friendly resumes
- Generate resumes using AI
- Tailor resumes to specific job descriptions
- Analyze ATS alignment
- Discover and save relevant jobs
- Track resume versions

### Core Product Loop
```text
Career Profile
      ↓
Job Opportunity
      ↓
Job Description
      ↓
Tailored Resume
      ↓
ATS Analysis
      ↓
Apply
```

### Golden Principles
1. **Career Profile = Source of Truth**: The Career Profile contains the user's canonical professional history (education, experience, projects, skills, certifications, achievements, links). Resumes are generated presentations of this data.
2. **Never Overwrite Original Resumes**: Tailoring an existing resume creates a **new resume** with `source_type = 'tailored'` and `source_resume_id = <original_id>`. The original resume remains untouched.
3. **Anti-Fabrication Guarantee**: AI must never invent employers, degrees, dates, skills, metrics, or achievements. It may only rewrite, emphasize, and structure verified user data to match target roles.
4. **Server-Side Enforcement**: All subscription tiers, quotas, rate limits, and access controls are strictly validated on the backend. Never trust client-side state.
5. **Ownership Isolation**: Every user-owned resource (`profile`, `resume`, `saved_job`, `file`, `subscription`) must enforce strict user-id ownership checks.

---

## 2. Technology Stack

- **Framework**: FastAPI (Python 3.11+)
- **Database**: PostgreSQL 15+ / Supabase
- **ORM / Query**: SQLAlchemy 2.0 (async) + Alembic for migrations
- **Validation**: Pydantic v2
- **Authentication**: JWT / Supabase Auth with Bearer token header (`Authorization: Bearer <token>`)
- **Storage**: S3-compatible object storage (Supabase Storage / AWS S3)
- **AI Integration**: OpenAI (GPT-4o / GPT-4o-mini) / Anthropic (Claude 3.5 Sonnet) via provider-agnostic `AIService`
- **File Processing**: `pdfplumber` / `pypdf` for PDF text extraction, `python-docx` for DOCX

---

## 3. Documentation Index

The handoff documentation is divided into 12 comprehensive modules:

| # | Document | Description |
|---|---|---|
| ⭐ | **[API Documentation](./API_DOCUMENTATION.md)** | **Complete Frontend ➔ Backend REST contract (Requests, Responses, Errors, Loading States)** |
| 01 | [Database Schema](./01-DATABASE-SCHEMA.md) | Full PostgreSQL/Supabase DDL, tables, constraints, foreign keys, indexes, and RLS policies |
| 02 | [API Endpoints](./02-API-ENDPOINTS.md) | Complete REST API specification (Auth, Profile, Resumes, Jobs, ATS, Subscriptions, Files) |
| 03 | [Pydantic Schemas](./03-PYDANTIC-SCHEMAS.md) | Production Pydantic v2 schemas mirroring the frontend TypeScript interfaces |
| 04 | [Authentication & Security](./04-AUTHENTICATION-SECURITY.md) | Supabase/JWT auth flow, user context dependency, ownership guards, rate limits, CORS |
| 05 | [AI Service Architecture](./05-AI-SERVICE-ARCHITECTURE.md) | `AIService` interface, system prompts, anti-fabrication guards, structured JSON output schemas |
| 06 | [File Upload Pipeline](./06-FILE-UPLOAD-PIPELINE.md) | PDF/DOCX validation, 10MB limits, storage, text extraction, and resume parsing pipeline |
| 07 | [Subscription & Usage](./07-SUBSCRIPTION-USAGE.md) | Plan models (Free, Single ₹49, Monthly ₹199), server-side quota tracking, access guards |
| 08 | [Project Structure](./08-PROJECT-STRUCTURE.md) | Standard FastAPI production codebase structure, modular service layers, dependency injection |
| 09 | [Environment Variables](./09-ENV-VARIABLES.md) | Environment configuration reference and complete `.env.example` |
| 10 | [Test Plan](./10-TEST-PLAN.md) | Pytest test suite, ownership isolation tests, boundary tests, mock AI fixtures |
| 11 | [Seed & Mock Data](./11-SEED-MOCK-DATA.md) | Seed data scripts for resume templates, sample jobs, and development fixtures |
| 12 | [Deployment Guide](./12-DEPLOYMENT-GUIDE.md) | Dockerfile, docker-compose, Alembic migrations, Supabase deployment, and health checks |

---

## 4. Standard API Conventions

### Response Envelope
All successful JSON responses return standard envelopes:
```json
{
  "data": { ... },
  "message": "Resource created successfully"
}
```

### Error Envelope
All error responses conform to:
```json
{
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Resume with id 'res_123' does not exist or you do not have permission to access it."
  }
}
```

### HTTP Status Code Standards
- `200 OK`: Successful read or update operation.
- `201 Created`: Successful resource creation.
- `204 No Content`: Successful deletion.
- `400 Bad Request`: Invalid payload or business logic constraint violation.
- `401 Unauthorized`: Missing or invalid bearer token.
- `403 Forbidden`: Authenticated user does not own the requested resource.
- `404 Not Found`: Resource does not exist.
- `409 Conflict`: Duplicate entry or concurrent modification conflict.
- `422 Unprocessable Entity`: Request body failed Pydantic validation.
- `429 Too Many Requests`: Rate limit or subscription plan quota exceeded.
- `500 Internal Server Error`: Unhandled server or provider exception (sanitized in production).
