# 02 — API Endpoints Reference

This document details all REST API endpoints required by the Clave frontend. All protected endpoints require a Bearer token in the `Authorization` header:
```http
Authorization: Bearer <access_token>
```

---

## 1. Authentication & Session

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register new user with email & password | No |
| `POST` | `/api/auth/login` | Authenticate with credentials and return tokens | No |
| `POST` | `/api/auth/refresh` | Refresh access token using refresh token | No |
| `POST` | `/api/auth/forgot-password`| Send password reset instructions | No |
| `POST` | `/api/auth/reset-password` | Set new password with token | No |
| `POST` | `/api/auth/logout` | Revoke session and refresh token | Yes |

---

## 2. User & Account Management

### `GET /api/me`
Returns account information for the authenticated user.
- **Response `200`**:
```json
{
  "data": {
    "id": "c1f7a012-789a-4bc3-a412-98e3b1c201e5",
    "email": "alex.chen@university.edu",
    "name": "Alex Chen",
    "avatar": "https://clave.app/avatars/alex.jpg",
    "isActive": true,
    "createdAt": "2026-01-15T08:30:00Z",
    "updatedAt": "2026-03-01T10:15:00Z"
  }
}
```

### `PUT /api/me`
Updates account settings (name, avatar). Does **not** modify career data.
- **Request Body**:
```json
{
  "name": "Alex Chen",
  "avatar": "https://clave.app/avatars/new-avatar.jpg"
}
```

### `DELETE /api/me`
Permanently deletes account and cascades to all user-owned data.

---

## 3. Career Profile (Source of Truth)

### `GET /api/profile`
Fetches the full, canonical career profile for the authenticated user.
- **Response `200`**:
```json
{
  "data": {
    "name": "Alex Chen",
    "email": "alex.chen@university.edu",
    "phone": "+1 (555) 234-5678",
    "location": "San Francisco, CA",
    "summary": "Full-stack developer with 2+ years building React/Node applications and a passion for AI tools.",
    "targetRoles": ["Software Engineer", "Full Stack Developer"],
    "experienceLevel": "early",
    "experience": [
      {
        "id": "exp_1",
        "role": "Frontend Developer Intern",
        "company": "TechStart Inc",
        "location": "San Francisco, CA",
        "period": "Jun 2025 - Present",
        "summary": "Built dashboard widgets using React, TypeScript, and Tailwind."
      }
    ],
    "education": [
      {
        "id": "edu_1",
        "institution": "University of California, Berkeley",
        "degree": "B.S. in Computer Science",
        "period": "2022 - 2026",
        "details": "GPA: 3.8 / 4.0. Relevant coursework: Data Structures, AI, Database Systems."
      }
    ],
    "projects": [
      {
        "id": "proj_1",
        "name": "CareerCopilot",
        "description": "AI resume analysis tool utilizing OpenAI embeddings.",
        "technologies": ["React", "FastAPI", "PostgreSQL", "OpenAI"],
        "link": "https://github.com/alexchen/career-copilot"
      }
    ],
    "skills": ["TypeScript", "React", "Python", "FastAPI", "PostgreSQL", "Git", "Tailwind CSS"],
    "certifications": [
      {
        "id": "cert_1",
        "name": "AWS Certified Cloud Practitioner",
        "issuer": "Amazon Web Services",
        "year": "2025"
      }
    ],
    "achievements": [
      "Winner, CalHacks 2025 (Best AI Integration)",
      "Dean's Honor List (Fall 2023, Spring 2024)"
    ],
    "links": [
      { "id": "lnk_1", "label": "GitHub", "url": "https://github.com/alexchen" },
      { "id": "lnk_2", "label": "LinkedIn", "url": "https://linkedin.com/in/alexchen" }
    ],
    "workModes": ["remote", "hybrid"],
    "preferredLocations": "San Francisco, CA; New York, NY",
    "industries": ["Technology", "Artificial Intelligence", "SaaS"]
  }
}
```

### `PUT /api/profile`
Updates profile overview fields (target roles, summary, work modes, etc.).

### Section-Level CRUD Endpoints

#### Education
- `GET /api/profile/education`
- `POST /api/profile/education`
- `PUT /api/profile/education/{id}`
- `DELETE /api/profile/education/{id}`

#### Experience
- `GET /api/profile/experience`
- `POST /api/profile/experience`
- `PUT /api/profile/experience/{id}`
- `DELETE /api/profile/experience/{id}`

#### Projects
- `GET /api/profile/projects`
- `POST /api/profile/projects`
- `PUT /api/profile/projects/{id}`
- `DELETE /api/profile/projects/{id}`

#### Skills
- `GET /api/profile/skills`
- `POST /api/profile/skills`
- `PUT /api/profile/skills/{id}`
- `DELETE /api/profile/skills/{id}`

#### Certifications
- `GET /api/profile/certifications`
- `POST /api/profile/certifications`
- `PUT /api/profile/certifications/{id}`
- `DELETE /api/profile/certifications/{id}`

#### Links
- `GET /api/profile/links`
- `POST /api/profile/links`
- `PUT /api/profile/links/{id}`
- `DELETE /api/profile/links/{id}`

---

## 4. Resume System & Generation

### `GET /api/resumes`
Lists all resumes owned by the authenticated user.
- **Response `200`**:
```json
{
  "data": [
    {
      "id": "res_101",
      "name": "Software Engineer - General",
      "targetRole": "Full Stack Engineer",
      "template": "modern",
      "sourceType": "ai_generated",
      "sourceResumeId": null,
      "atsScore": 88,
      "updatedAt": "2026-03-20T14:22:00Z"
    }
  ]
}
```

### `POST /api/resumes`
Creates a new blank, manual, or imported resume document.

### `GET /api/resumes/{id}`
Fetches the full structured resume document.

### `PUT /api/resumes/{id}`
Saves changes to an existing resume document (content, template, section order).
- Enforces user ownership.
- Automatically saves a snapshot in `resume_versions` if content changed significantly.

### `DELETE /api/resumes/{id}`
Deletes a resume.

### `POST /api/resumes/{id}/duplicate`
Clones an existing resume document into a new one.

---

## 5. AI Resume Pipelines

### `POST /api/resumes/analyze-job`
Analyzes a job description against the user's Career Profile.
- **Request Body**:
```json
{
  "targetRole": "Full Stack Engineer",
  "jobDescription": "We are seeking a Full Stack Engineer experienced with React, TypeScript, and FastAPI to join our team...",
  "careerProfile": { ... }
}
```
- **Response `200`**:
```json
{
  "data": {
    "role": "Full Stack Engineer",
    "company": "NextGen AI",
    "location": "San Francisco, CA (Hybrid)",
    "workType": "hybrid",
    "experience": "1-3 years",
    "alignmentScore": 84,
    "keyRequirements": [
      "2+ years with modern React & TypeScript",
      "Experience designing RESTful APIs in Python/FastAPI",
      "Familiarity with PostgreSQL database schema design"
    ],
    "matchedSkills": ["React", "TypeScript", "Python", "FastAPI", "PostgreSQL"],
    "gaps": ["Docker / Container orchestration experience not explicitly stated"],
    "insights": [
      "Highlight your 'CareerCopilot' project prominently as it demonstrates matching full-stack competency."
    ]
  }
}
```

### `POST /api/resumes/generate`
Generates a complete, tailored resume document using verified user profile data.
- **Request Body**:
```json
{
  "targetRole": "Full Stack Engineer",
  "template": "modern",
  "jobDescription": "Full job description text...",
  "jobAnalysis": { ... }
}
```
- **Response `201`**: Returns newly created `ResumeDocument`.

### `POST /api/resumes/{id}/tailor`
Tailors an existing resume to a specific job description.
- **Critical Rule**: The original resume (`{id}`) remains untouched.
- A new resume is created with `source_type = 'tailored'` and `source_resume_id = '{id}'`.
- **Request Body**:
```json
{
  "jobTitle": "Senior Frontend Engineer",
  "company": "Stripe",
  "jobDescription": "Job description text..."
}
```
- **Response `201`**: Returns the **new** tailored `ResumeDocument`.

---

## 6. ATS Analysis

### `POST /api/resumes/{id}/analyze`
Performs deterministic keyword and structural ATS evaluation combined with AI insights.
- **Request Body**:
```json
{
  "jobDescription": "Optional job description to benchmark against..."
}
```
- **Response `200`**:
```json
{
  "data": {
    "score": 85,
    "summary": "Strong alignment with core engineering keywords. Action verbs are clear and quantifiable metrics are present.",
    "factors": {
      "keyword_match": 88,
      "skills_match": 92,
      "experience_match": 80,
      "formatting": 95,
      "section_completeness": 90
    },
    "missingKeywords": ["Docker", "CI/CD", "Unit Testing"],
    "suggestions": [
      "Add quantifiable outcomes to your TechStart internship bullets.",
      "Include testing libraries (e.g., Pytest, Vitest) in your skills section."
    ]
  }
}
```

---

## 7. Jobs & Saved Jobs

### `GET /api/jobs`
Query jobs with filtering and pagination.
- **Query Parameters**:
  - `q`: Search keyword
  - `role`: Role filter
  - `location`: Location string
  - `workType`: `remote` | `hybrid` | `onsite`
  - `level`: `internship` | `entry` | `junior` | `mid`
  - `page`: Page index (default: 1)
  - `limit`: Page size (default: 20)

### `GET /api/jobs/recommended`
Returns jobs ranked by compatibility with the user's Career Profile.
- Returns `matchPercent` (0-100%) and breakdown for each job.

### `GET /api/jobs/{id}`
Fetches full details for a single job listing.

### `POST /api/jobs/{id}/save`
Saves a job to the user's saved list. Idempotent.

### `DELETE /api/jobs/{id}/save`
Removes a job from the user's saved list.

### `GET /api/jobs/saved`
Retrieves all saved jobs for the authenticated user.

### `POST /api/jobs/{id}/tailor`
One-click shortcut: initiates the resume tailoring workflow using the stored job listing's description.
- Automatically passes `{ title, company, description }` into the tailoring pipeline without requiring the user to re-paste the job description.

---

## 8. File Upload & Parsing

### `POST /api/files/upload`
Uploads a PDF or DOCX file (multipart/form-data).
- **Validation**:
  - Max size: 10 MB (`400 Bad Request` if exceeded)
  - Allowed extensions: `.pdf`, `.docx`
  - MIME type validation via magic bytes (not just filename extension)
- **Response `201`**:
```json
{
  "data": {
    "fileId": "file_8923a10e",
    "fileName": "alex_chen_resume.pdf",
    "fileSize": 142850,
    "fileType": "pdf",
    "status": "ready"
  }
}
```

### `POST /api/files/{id}/parse-resume`
Extracts text from the uploaded file and uses AI to extract structured resume and profile data.
- **Response `200`**:
```json
{
  "data": {
    "fileId": "file_8923a10e",
    "targetRole": "Full Stack Engineer",
    "name": "Alex Chen",
    "document": { ... },
    "atsScore": 82
  }
}
```

---

## 9. Subscriptions & Plan Enforcement

### `GET /api/subscriptions/current`
Returns current plan details and remaining allowances.
- **Response `200`**:
```json
{
  "data": {
    "plan": "free",
    "status": "active",
    "resumesCreated": 1,
    "resumesAllowance": 1,
    "singleResumesBalance": 0,
    "isUnlimited": false,
    "canCreateResume": false
  }
}
```

### `POST /api/subscriptions/checkout`
Initializes a payment session for:
- Single Resume: `₹49`
- Monthly Unlimited: `₹99 / month`
