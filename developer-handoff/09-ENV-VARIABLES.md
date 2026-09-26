# 09 — Environment Variables Reference

This document details all configuration parameters required to run the Clave backend.

---

## 1. Environment Variables Table

| Variable | Required | Default | Description |
|---|---|---|---|
| `ENVIRONMENT` | Yes | `development` | `development`, `staging`, `production` |
| `DEBUG` | No | `False` | Enables detailed stack traces in responses (dev only) |
| `DATABASE_URL` | Yes | - | PostgreSQL async connection string (`postgresql+asyncpg://...`) |
| `SUPABASE_URL` | Optional | - | Supabase project URL (if using Supabase) |
| `SUPABASE_SERVICE_ROLE_KEY` | Optional | - | Supabase service role key (bypasses RLS for admin operations) |
| `JWT_SECRET_KEY` | Yes | - | Secret key used to sign and verify JWT tokens |
| `JWT_ALGORITHM` | No | `HS256` | JWT algorithm (`HS256` or `RS256`) |
| `ACCESS_TOKEN_EXPIRE_MINUTES`| No | `60` | Duration for access token validity |
| `REFRESH_TOKEN_EXPIRE_DAYS` | No | `30` | Duration for refresh token validity |
| `OPENAI_API_KEY` | Yes | - | OpenAI API key for resume parsing and generation |
| `OPENAI_MODEL` | No | `gpt-4o-2024-08-06`| Default model for structured generation |
| `ANTHROPIC_API_KEY` | Optional | - | Anthropic API key (if Claude is configured as provider) |
| `STORAGE_PROVIDER` | No | `s3` | `s3`, `supabase`, or `local` |
| `S3_BUCKET_NAME` | Optional | `clave-resumes` | S3 bucket for storing uploaded resumes and exports |
| `AWS_ACCESS_KEY_ID` | Optional | - | AWS access key for S3 |
| `AWS_SECRET_ACCESS_KEY` | Optional | - | AWS secret key for S3 |
| `AWS_REGION` | Optional | `us-east-1` | AWS S3 region |
| `RAZORPAY_KEY_ID` | Optional | - | Razorpay API key for Indian rupee payments (₹49, ₹199) |
| `RAZORPAY_KEY_SECRET` | Optional | - | Razorpay secret key |
| `CORS_ORIGINS` | No | `["http://localhost:5173"]` | JSON list of allowed origin URLs |

---

## 2. `.env.example` Template

Create a file named `.env` in the backend root directory with the following structure:

```env
# =============================================================================
# CLAVE BACKEND CONFIGURATION
# =============================================================================

# App Environment
ENVIRONMENT=development
DEBUG=True
PORT=8000
HOST=0.0.0.0

# Database (PostgreSQL with asyncpg driver)
DATABASE_URL=postgresql+asyncpg://postgres:postgres@localhost:5432/clave_db

# Supabase (Optional, required only if using Supabase Auth/Storage)
# SUPABASE_URL=https://your-project.supabase.co
# SUPABASE_SERVICE_ROLE_KEY=eyJh...
# SUPABASE_JWT_SECRET=your-supabase-jwt-secret

# JWT Authentication
JWT_SECRET_KEY=generate-a-secure-random-64-character-secret-key-here
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
REFRESH_TOKEN_EXPIRE_DAYS=30

# AI Provider Credentials
OPENAI_API_KEY=sk-proj-your-openai-api-key-here
OPENAI_MODEL=gpt-4o-2024-08-06
# ANTHROPIC_API_KEY=sk-ant-your-anthropic-key-here

# Storage Configuration
STORAGE_PROVIDER=local # Use 's3' or 'supabase' in production
LOCAL_STORAGE_DIR=./storage_uploads
S3_BUCKET_NAME=clave-resumes
AWS_ACCESS_KEY_ID=your-aws-access-key-id
AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key
AWS_REGION=ap-south-1

# Payments (Razorpay for ₹49 Single / ₹199 Monthly plans)
RAZORPAY_KEY_ID=rzp_test_your_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret

# Security & CORS
CORS_ORIGINS=["http://localhost:5173", "http://127.0.0.1:5173"]
```
