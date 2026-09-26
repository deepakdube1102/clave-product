# 07 — Subscriptions & Usage Quota Enforcement

This document specifies the plan models, quota calculation logic, and server-side subscription guards for Clave.

---

## 1. Clave Subscription Plans

| Plan | Price | Resume Creation Allowance | Features |
|---|---|---|---|
| **Free** | ₹0 | 1 resume lifetime allowance | Full access to Career Profile, ATS analysis, and job browsing |
| **Single Resume** | ₹49 / resume | +1 resume credit per purchase | 1 tailored/AI resume creation credit with full export capabilities |
| **Monthly Unlimited** | ₹99 / month | Unlimited resumes | Unlimited resume generation, tailoring, ATS analysis, and job matching |

---

## 2. Server-Side Enforcement Rules

> **CRITICAL RULE**: Do not rely on client-side state for plan enforcement. The frontend is merely a consumer. All quota validations must execute atomically on the server before initiating any AI generation or database creation.

### Quota Calculation Logic
When a user attempts to create, duplicate, or tailor a resume:
1. Fetch the user's `subscriptions` record.
2. If `status == 'active'` and `plan == 'monthly'` (and `expires_at > NOW()`):
   - **Allowed** (Unlimited tier).
3. If `single_resumes_balance > 0`:
   - **Allowed** (Deduct 1 credit upon successful resume creation).
4. If `plan == 'free'`:
   - Query count of existing active resumes owned by the user.
   - If count >= 1:
     - **Deny** with `402 Payment Required` / `429 Quota Exceeded`.
     - Return upgrade modal payload.
   - If count == 0:
     - **Allowed** (First free resume allowance).

---

## 3. FastAPI Quota Enforcement Guard

```python
from fastapi import HTTPException, status, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.models.user import User
from app.models.subscription import Subscription
from app.models.resume import Resume
from app.core.database import get_db

async def enforce_resume_creation_quota(
    current_user: User,
    db: AsyncSession = Depends(get_db)
):
    # Fetch subscription
    sub = await db.scalar(select(Subscription).where(Subscription.user_id == current_user.id))
    
    # 1. Monthly active plan = Unlimited
    if sub and sub.plan == 'monthly' and sub.status == 'active':
        return True

    # 2. Check single resume purchase balance
    if sub and sub.single_resumes_balance > 0:
        return True

    # 3. Check Free tier allowance
    resume_count = await db.scalar(
        select(func.count(Resume.id)).where(Resume.user_id == current_user.id)
    )

    if resume_count >= 1:
        raise HTTPException(
            status_code=status.HTTP_402_PAYMENT_REQUIRED,
            detail={
                "error": {
                    "code": "PLAN_LIMIT_REACHED",
                    "message": "You have reached your free tier allowance of 1 resume. Please upgrade or purchase a single resume credit to create more.",
                    "plans": {
                        "single": {"price": 49, "currency": "INR"},
                        "monthly": {"price": 99, "currency": "INR"}
                    }
                }
            }
        )
    return True
```

---

## 4. Usage Tracking & Analytics

Every critical action increments metrics in `usage_records` for the current billing period (`YYYY-MM`):

```python
from datetime import datetime
from sqlalchemy.dialects.postgresql import insert

async def track_usage_event(user_id: UUID, event_type: str, db: AsyncSession):
    period = datetime.utcnow().strftime("%Y-%m")
    column_mapping = {
        "resume_created": "resumes_created",
        "resume_tailored": "resumes_tailored",
        "ai_generation": "ai_generations",
        "ats_analysis": "ats_analyses"
    }
    col = column_mapping.get(event_type)
    if not col:
        return

    # Upsert with atomic increment
    stmt = insert(UsageRecord).values(
        user_id=user_id,
        billing_period=period,
        **{col: 1}
    ).on_conflict_do_update(
        index_elements=['user_id', 'billing_period'],
        set_={col: getattr(UsageRecord, col) + 1}
    )
    await db.execute(stmt)
    await db.commit()
```
