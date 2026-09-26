# 04 — Authentication & Security Architecture

This document specifies the security, authentication, and authorization layer for Clave.

---

## 1. Authentication Flow

Clave supports two deployment modes:
1. **Supabase Auth Mode**: FastAPI validates JWT tokens issued by Supabase using the Supabase JWT secret or JWKS.
2. **Native JWT Mode**: FastAPI issues and verifies its own asymmetric (RS256) or symmetric (HS256) tokens with short-lived access tokens (15–60 mins) and long-lived refresh tokens (30 days).

Both modes expose the identical dependency interface `get_current_user` in FastAPI routes.

```text
Client (React)                       FastAPI Backend                     Database / Supabase
      │                                    │                                      │
      │ 1. POST /api/auth/login            │                                      │
      ├───────────────────────────────────►│                                      │
      │                                    │ 2. Verify password / credentials     │
      │                                    ├─────────────────────────────────────►│
      │                                    │◄─────────────────────────────────────┤
      │ 3. Return Access + Refresh Tokens  │                                      │
      │◄───────────────────────────────────┤                                      │
      │                                    │                                      │
      │ 4. Request with Bearer Token       │                                      │
      ├───────────────────────────────────►│                                      │
      │                                    │ 5. Validate JWT Signature & Expiry   │
      │                                    │ 6. Extract user_id                   │
      │                                    │ 7. Query User entity & Attach to req │
      │                                    ├─────────────────────────────────────►│
      │                                    │◄─────────────────────────────────────┤
      │                                    │ 8. Enforce Resource Ownership        │
      │ 9. Return Protected Data           │                                      │
      │◄───────────────────────────────────┤                                      │
```

---

## 2. FastAPI Authentication Dependencies

### `get_current_user` Implementation
```python
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.config import settings
from app.core.database import get_db
from app.models.user import User

security = HTTPBearer()

async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: AsyncSession = Depends(get_db)
) -> User:
    token = credentials.credentials
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail={"error": {"code": "INVALID_TOKEN", "message": "Could not validate credentials"}},
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(
            token,
            settings.JWT_SECRET_KEY,
            algorithms=[settings.JWT_ALGORITHM],
            audience=settings.JWT_AUDIENCE if hasattr(settings, 'JWT_AUDIENCE') else None
        )
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = await db.get(User, user_id)
    if user is None or not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={"error": {"code": "USER_NOT_FOUND", "message": "User inactive or does not exist"}}
        )
    return user
```

---

## 3. Strict Resource Ownership Enforcement

A critical security requirement is that **User A can never read, modify, or delete resources belonging to User B**.

### Ownership Guard Example: Resumes
```python
from uuid import UUID

async def get_user_resume_or_404(
    resume_id: UUID,
    current_user: User,
    db: AsyncSession
) -> Resume:
    stmt = select(Resume).where(Resume.id == resume_id)
    result = await db.execute(stmt)
    resume = result.scalar_one_or_none()

    if not resume:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"error": {"code": "RESUME_NOT_FOUND", "message": "Resume does not exist"}}
        )

    # Ownership verification
    if resume.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail={"error": {"code": "FORBIDDEN", "message": "You do not have permission to access this resume"}}
        )

    return resume
```

---

## 4. Rate Limiting Strategy

To prevent denial of service and API abuse (particularly on LLM endpoints), apply rate limiting with `slowapi`:

```python
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)

# In router:
@router.post("/resumes/analyze-job")
@limiter.limit("15/minute")
async def analyze_job(request: Request, ...):
    ...
```

### Rate Limit Thresholds:
- **General APIs**: 120 requests / minute
- **Auth Endpoints** (`/login`, `/register`): 10 requests / minute (prevents brute force)
- **AI Endpoints** (`/analyze-job`, `/generate`, `/tailor`, `/analyze`): 15 requests / minute

---

## 5. CORS Configuration

Configure CORS explicitly to allow only approved frontend origins:
```python
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:5173", # Vite dev server
    "https://clave.app",
    "https://*.clave.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)
```

---

## 6. Sensitive Data Sanitization

- **Passphrases**: Hash with Argon2id (`passlib[argon2]`) or bcrypt with work factor >= 12.
- **Log Masking**: Implement logging filters that scrub `password`, `token`, `access_token`, `authorization`, and full user addresses from log streams.
- **Never return password hashes** in any API response model.
