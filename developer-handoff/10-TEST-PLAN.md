# 10 — Test Plan & Quality Assurance

This document defines the automated testing strategy, test fixtures, and security verification suites for the Clave backend.

---

## 1. Test Strategy Overview

All tests are implemented using `pytest`, `pytest-asyncio`, and `httpx.AsyncClient` against an isolated PostgreSQL test database (or containerized test instance).

### Test Coverage Targets
- **Unit Tests**: >= 85% coverage across all services.
- **Security & Authorization**: 100% coverage on resource ownership checks.
- **Plan Enforcement**: 100% coverage on subscription boundary conditions.

---

## 2. Critical Test Suites

### 1. Ownership Isolation Suite (`test_ownership.py`)
Verifies that User A cannot read, modify, or delete User B's resources:
- User A attempts `GET /api/resumes/{user_b_resume_id}` ➔ Expect `403 Forbidden` or `404 Not Found`.
- User A attempts `PUT /api/resumes/{user_b_resume_id}` ➔ Expect `403 Forbidden`.
- User A attempts `DELETE /api/resumes/{user_b_resume_id}` ➔ Expect `403 Forbidden`.
- User A attempts `GET /api/profile` with User B's token ➔ Expect only User A's data returned.

```python
import pytest
from httpx import AsyncClient

@pytest.mark.asyncio
async def test_user_cannot_access_other_users_resume(
    client: AsyncClient,
    user_a_token: str,
    user_b_resume: dict
):
    headers = {"Authorization": f"Bearer {user_a_token}"}
    response = await client.get(f"/api/resumes/{user_b_resume['id']}", headers=headers)
    assert response.status_code in (403, 404)
```

### 2. Original Resume Preservation Suite (`test_resumes.py`)
Verifies the core product rule: **Tailoring must never overwrite the original resume.**
- Create an original resume (ID: `101`, name: "Base Software Engineer").
- Call `POST /api/resumes/101/tailor` with target role "Frontend Engineer at Stripe".
- Verify response returns a **new** resume ID (e.g., `102`).
- Verify `102.source_type == "tailored"` and `102.source_resume_id == "101"`.
- Query original resume `GET /api/resumes/101` and verify its content has **not changed**.

```python
@pytest.mark.asyncio
async def test_tailoring_creates_new_resume_and_preserves_original(
    client: AsyncClient,
    user_token: str,
    original_resume: dict
):
    headers = {"Authorization": f"Bearer {user_token}"}
    original_id = original_resume["id"]
    original_content = original_resume["content"]

    tailor_payload = {
        "jobTitle": "Frontend Engineer",
        "company": "Stripe",
        "jobDescription": "Looking for deep React and TypeScript experience..."
    }

    res = await client.post(f"/api/resumes/{original_id}/tailor", json=tailor_payload, headers=headers)
    assert res.status_code == 201
    tailored_resume = res.json()["data"]

    # Verify new ID and source reference
    assert tailored_resume["id"] != original_id
    assert tailored_resume["sourceResumeId"] == original_id
    assert tailored_resume["sourceType"] == "tailored"

    # Verify original resume remains completely untouched
    orig_res = await client.get(f"/api/resumes/{original_id}", headers=headers)
    assert orig_res.json()["data"]["content"] == original_content
```

### 3. Plan Enforcement Suite (`test_subscriptions.py`)
- **Free Plan**:
  - User creates 1st resume ➔ Expect `201 Created`.
  - User attempts 2nd resume creation ➔ Expect `402 Payment Required` with `PLAN_LIMIT_REACHED`.
- **Single Credit Plan**:
  - User has `single_resumes_balance = 1`.
  - User creates resume ➔ Expect `201 Created`.
  - Balance is decremented to `0`.
  - Next attempt ➔ Expect `402 Payment Required`.
- **Monthly Plan**:
  - User has active monthly subscription.
  - User creates 10 resumes in sequence ➔ All return `201 Created`.

### 4. File Upload Security Suite (`test_files.py`)
- Upload file > 10 MB ➔ Expect `400 Bad Request` with `FILE_TOO_LARGE`.
- Upload `.exe` renamed to `.pdf` (faked extension) ➔ Magic byte check rejects with `400 Bad Request` (`UNSUPPORTED_FILE_TYPE`).
- Upload valid PDF under 10 MB ➔ Expect `201 Created` with `fileId`.

---

## 3. Running Test Suites

```bash
# Run all tests with coverage report
pytest --cov=app --cov-report=term-missing tests/

# Run security and ownership isolation tests specifically
pytest tests/test_ownership.py -v

# Run subscription quota enforcement tests
pytest tests/test_subscriptions.py -v
```
