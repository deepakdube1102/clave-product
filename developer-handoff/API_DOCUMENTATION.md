# Clave API Documentation

> **Contract Type**: Frontend → Backend API Specification  
> **Target Audience**: Backend Engineers implementing the Clave FastAPI + PostgreSQL backend  
> **Source of Truth**: This document represents the exact interface expected by the existing Clave React frontend.

---

## 1. Purpose & Scope

The Clave frontend communicates with the backend exclusively via RESTful APIs.

### Backend Responsibilities:
- Authentication & session validation
- User account data persistence
- **Career Profile** storage & retrieval (the central **Source of Truth**)
- Resume CRUD, versioning, and document storage
- AI processing (Job analysis, resume generation, resume tailoring)
- ATS compatibility analysis & scoring
- Job catalog, search, recommendations, and bookmarks
- Secure file uploads (PDF / DOCX) and text extraction
- Subscription tier management and server-side quota enforcement
- Authorization, input validation, and sanitization

### Frontend Responsibilities:
- Rendering the user interface and handling interactive user states
- Navigation, routing, and view transitions
- Client-side form validation (for instant UX feedback)
- Managing loading, processing, and error states
- Presenting structured API responses to the user

> **Rule**: The backend is the ultimate source of truth for authorization, business validation, subscription limits, and persistent data. The frontend never enforces security or billing limits on its own.

---

## 2. API Base URL

- **Development**: `http://localhost:8000/api`
- **Staging / Production**: `TODO — Production API URL`

All endpoint paths documented below are prefixed with `/api`.

---

## 3. Request Conventions

1. **Protocol & Content Types**:
   - All standard requests use `Content-Type: application/json`.
   - File uploads use `Content-Type: multipart/form-data`.
2. **Authentication Header**:
   - Protected endpoints require an HTTP Bearer token in the `Authorization` header:
     ```http
     Authorization: Bearer <access_token>
     ```
3. **Naming Convention (camelCase)**:
   - The frontend consumes and produces JSON with `camelCase` keys.
   - Pydantic models on the backend must use alias generators or serializers to output `camelCase` (e.g., `targetRole`, `sourceResumeId`, `atsScore`).
4. **Dates & Timestamps**:
   - All dates and timestamps are formatted as ISO 8601 UTC strings: `YYYY-MM-DDTHH:mm:ssZ` (e.g., `2026-03-20T14:22:00Z`).
5. **Identifiers**:
   - Entity IDs are returned as strings (UUIDv4 format or string IDs, e.g., `"c1f7a012-789a-4bc3-a412-98e3b1c201e5"` or `"res_101"`).

---

## 4. Response Conventions

### Success Response Format
All successful responses return a consistent envelope containing a `data` payload and an optional `message`:

```json
{
  "data": {
    "id": "res_101",
    "name": "Software Engineer - General"
  },
  "message": "Resume updated successfully"
}
```

For list responses:
```json
{
  "data": [
    { "id": "res_101", "name": "Software Engineer" }
  ]
}
```

### Error Response Format
All error responses return an HTTP error status code (4xx / 5xx) with a structured error envelope:

```json
{
  "error": {
    "code": "RESOURCE_NOT_FOUND",
    "message": "Resume with id 'res_123' does not exist or you do not have permission to access it.",
    "details": null
  }
}
```

### Standard HTTP Status Codes
| Code | Meaning | When Returned |
|---|---|---|
| `200 OK` | Success | Successful read or update operations |
| `201 Created` | Created | Successful resource creation (resumes, uploads, registrations) |
| `204 No Content` | No Content | Successful deletion |
| `400 Bad Request` | Client Error | Malformed payload, invalid file size (>10MB), or invalid file type |
| `401 Unauthorized` | Auth Error | Missing, expired, or invalid Bearer token |
| `403 Forbidden` | Access Denied | Authenticated user does not own the requested resource |
| `404 Not Found` | Not Found | Requested entity does not exist |
| `409 Conflict` | Conflict | Duplicate resource (e.g., email already registered) |
| `422 Unprocessable`| Validation | Request failed Pydantic schema validation |
| `429 / 402` | Quota Exceeded | User reached plan limit (e.g. Free user creating 2nd resume) |
| `500 Server Error` | Server Error | Unhandled backend exception (sanitized in production) |

---

## 5. Authentication & Account APIs

### 5.1 Register
- **Endpoint**: `POST /api/auth/register`
- **Auth Required**: No
- **Request Body**:
  ```json
  {
    "name": "Alex Chen",
    "email": "alex.chen@university.edu",
    "password": "Password123!"
  }
  ```
- **Success (`201 Created`)**:
  ```json
  {
    "data": {
      "accessToken": "eyJhbGciOi...",
      "refreshToken": "eyJhbGciOi...",
      "tokenType": "bearer",
      "user": {
        "id": "usr_101",
        "email": "alex.chen@university.edu",
        "name": "Alex Chen",
        "avatar": null,
        "isActive": true,
        "createdAt": "2026-03-20T14:22:00Z"
      }
    },
    "message": "Account created successfully"
  }
  ```

### 5.2 Login
- **Endpoint**: `POST /api/auth/login`
- **Auth Required**: No
- **Request Body**:
  ```json
  {
    "email": "alex.chen@university.edu",
    "password": "Password123!"
  }
  ```
- **Success (`200 OK`)**: Same payload as `POST /api/auth/register`.
- **Failure (`401 Unauthorized`)**:
  ```json
  {
    "error": {
      "code": "INVALID_CREDENTIALS",
      "message": "Incorrect email or password."
    }
  }
  ```

### 5.3 Refresh Token
- **Endpoint**: `POST /api/auth/refresh`
- **Auth Required**: No
- **Request Body**:
  ```json
  {
    "refreshToken": "eyJhbGciOi..."
  }
  ```
- **Success (`200 OK`)**:
  ```json
  {
    "data": {
      "accessToken": "eyJhbGciOi...",
      "refreshToken": "eyJhbGciOi...",
      "tokenType": "bearer"
    }
  }
  ```

### 5.4 Get Current Account (`/api/me`)
- **Endpoint**: `GET /api/me`
- **Auth Required**: Yes
- **Success (`200 OK`)**:
  ```json
  {
    "data": {
      "id": "usr_101",
      "email": "alex.chen@university.edu",
      "name": "Alex Chen",
      "avatar": "https://clave.app/avatars/alex.jpg",
      "isActive": true,
      "createdAt": "2026-01-15T08:30:00Z",
      "updatedAt": "2026-03-01T10:15:00Z"
    }
  }
  ```

### 5.5 Update Current Account
- **Endpoint**: `PUT /api/me`
- **Auth Required**: Yes
- **Request Body**:
  ```json
  {
    "name": "Alex Chen",
    "avatar": "https://clave.app/avatars/new.jpg"
  }
  ```

---

## 6. Career Profile APIs (Source of Truth)

The Career Profile contains the user's canonical professional history. Resumes are presentations derived from this data.

### 6.1 Get Full Profile
- **Endpoint**: `GET /api/profile`
- **Auth Required**: Yes (returns profile for the authenticated user)
- **Success (`200 OK`)**:
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

### 6.2 Update Profile Overview
- **Endpoint**: `PUT /api/profile`
- **Auth Required**: Yes
- **Request Body**:
  ```json
  {
    "summary": "Updated executive summary text...",
    "targetRoles": ["Senior Full Stack Engineer"],
    "experienceLevel": "early",
    "workModes": ["remote", "hybrid"],
    "preferredLocations": "San Francisco, CA",
    "industries": ["AI", "Developer Tools"]
  }
  ```

### 6.3 Profile Section CRUD Endpoints
All section items enforce user ownership and support individual item CRUD:
- **Education**: `GET`, `POST`, `PUT /api/profile/education/{id}`, `DELETE /api/profile/education/{id}`
- **Experience**: `GET`, `POST`, `PUT /api/profile/experience/{id}`, `DELETE /api/profile/experience/{id}`
- **Projects**: `GET`, `POST`, `PUT /api/profile/projects/{id}`, `DELETE /api/profile/projects/{id}`
- **Skills**: `GET`, `POST`, `PUT /api/profile/skills/{id}`, `DELETE /api/profile/skills/{id}`
- **Certifications**: `GET`, `POST`, `PUT /api/profile/certifications/{id}`, `DELETE /api/profile/certifications/{id}`
- **Links**: `GET`, `POST`, `PUT /api/profile/links/{id}`, `DELETE /api/profile/links/{id}`

---

## 7. Resume System & AI Tailoring APIs

### 7.1 List Resumes
- **Endpoint**: `GET /api/resumes`
- **Auth Required**: Yes
- **Success (`200 OK`)**:
  ```json
  {
    "data": [
      {
        "id": "res_101",
        "name": "Software Engineer - General",
        "targetRole": "Full Stack Engineer",
        "template": "modern",
        "sourceType": "manual",
        "sourceResumeId": null,
        "atsScore": 88,
        "updatedAt": "2026-03-20T14:22:00Z"
      },
      {
        "id": "res_102",
        "name": "Frontend Engineer (Stripe)",
        "targetRole": "Frontend Engineer",
        "template": "modern",
        "sourceType": "tailored",
        "sourceResumeId": "res_101",
        "atsScore": 92,
        "updatedAt": "2026-03-21T09:15:00Z"
      }
    ]
  }
  ```

### 7.2 Get Single Resume
- **Endpoint**: `GET /api/resumes/{id}`
- **Auth Required**: Yes (Enforces `resume.userId == currentUser.id`)
- **Success (`200 OK`)**:
  ```json
  {
    "data": {
      "id": "res_101",
      "name": "Software Engineer - General",
      "targetRole": "Full Stack Engineer",
      "template": "modern",
      "sectionOrder": ["experience", "education", "projects", "skills", "certifications"],
      "content": {
        "contact": {
          "name": "Alex Chen",
          "email": "alex.chen@university.edu",
          "phone": "+1 (555) 234-5678",
          "location": "San Francisco, CA",
          "linkedin": "https://linkedin.com/in/alexchen",
          "github": "https://github.com/alexchen",
          "portfolio": "https://alexchen.dev"
        },
        "summary": "Full stack engineer experienced in React, TypeScript, and FastAPI.",
        "experience": [
          {
            "id": "exp_1",
            "title": "Software Engineer Intern",
            "company": "TechStart Inc",
            "location": "San Francisco, CA",
            "start": "Jun 2025",
            "end": "Aug 2025",
            "description": "Full-stack development for internal analytics.",
            "bullets": [
              "Built responsive React analytics dashboard reducing page load time by 40%.",
              "Implemented FastAPI microservice integrated with PostgreSQL."
            ]
          }
        ],
        "education": [
          {
            "id": "edu_1",
            "degree": "B.S. in Computer Science",
            "institution": "UC Berkeley",
            "location": "Berkeley, CA",
            "dates": "2022 - 2026",
            "details": "GPA: 3.8 / 4.0. Coursework: Algorithms, AI, Distributed Systems."
          }
        ],
        "projects": [
          {
            "id": "proj_1",
            "name": "CareerCopilot",
            "description": "AI-powered career assistant.",
            "tech": ["React", "FastAPI", "OpenAI"],
            "link": "https://github.com/alexchen/career-copilot",
            "bullets": [
              "Engineered real-time resume keyword matching engine using vector embeddings."
            ]
          }
        ],
        "skills": {
          "technical": ["React", "TypeScript", "Python", "FastAPI", "PostgreSQL"],
          "tools": ["Git", "Docker", "VS Code", "Postman"],
          "other": ["Agile Development", "System Design"]
        },
        "certifications": [
          {
            "id": "cert_1",
            "name": "AWS Certified Cloud Practitioner",
            "issuer": "Amazon Web Services",
            "date": "2025",
            "link": ""
          }
        ]
      },
      "updatedAt": "2026-03-20T14:22:00Z"
    }
  }
  ```

### 7.3 Update Resume
- **Endpoint**: `PUT /api/resumes/{id}`
- **Auth Required**: Yes
- **Request Body**: Same `ResumeDocument` structure as above.

### 7.4 Duplicate Resume
- **Endpoint**: `POST /api/resumes/{id}/duplicate`
- **Auth Required**: Yes
- **Success (`201 Created`)**: Returns newly cloned resume document.

---

## 8. AI Analysis & Generation APIs

### 8.1 Analyze Job Description
- **Endpoint**: `POST /api/resumes/analyze-job`
- **Auth Required**: Yes
- **Purpose**: Compares job description against user's verified Career Profile to identify alignment and gaps **before** generating a resume.
- **Request Body**:
  ```json
  {
    "targetRole": "Full Stack Engineer",
    "jobDescription": "We are looking for a Full Stack Engineer with 1-3 years of experience in React, TypeScript, and Python...",
    "careerProfile": { ... }
  }
  ```
- **Success (`200 OK`)**:
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
        "Experience building scalable Python / FastAPI services",
        "Relational database design in PostgreSQL"
      ],
      "matchedSkills": ["React", "TypeScript", "Python", "FastAPI", "PostgreSQL"],
      "gaps": ["Docker / Container orchestration experience not explicitly stated"],
      "insights": [
        "Highlight your 'CareerCopilot' project prominently as it matches full-stack requirements."
      ]
    }
  }
  ```

### 8.2 Generate Resume with AI
- **Endpoint**: `POST /api/resumes/generate`
- **Auth Required**: Yes (Enforces plan quota)
- **Request Body**:
  ```json
  {
    "targetRole": "Full Stack Engineer",
    "template": "modern",
    "jobDescription": "Full job description text...",
    "jobAnalysis": { ... }
  }
  ```
- **Success (`201 Created`)**: Returns newly created `ResumeDocument`.
- **Anti-Fabrication Guarantee**: AI generates structured data using **only** verified profile items. It never invents companies, dates, or credentials.

### 8.3 Tailor Existing Resume (Non-Destructive)
- **Endpoint**: `POST /api/resumes/{id}/tailor`
- **Auth Required**: Yes (Enforces plan quota)
- **Critical Guarantee**: The original resume (`{id}`) is **never** overwritten. A new resume is created referencing `{id}`.
- **Request Body**:
  ```json
  {
    "jobTitle": "Senior Frontend Engineer",
    "company": "Stripe",
    "jobDescription": "Looking for deep React and TypeScript experience..."
  }
  ```
- **Success (`201 Created`)**:
  ```json
  {
    "data": {
      "id": "res_142",
      "name": "Senior Frontend Engineer (Stripe)",
      "targetRole": "Senior Frontend Engineer",
      "template": "modern",
      "sourceType": "tailored",
      "sourceResumeId": "res_101",
      "content": { ... },
      "updatedAt": "2026-03-22T10:00:00Z"
    },
    "message": "Resume tailored successfully"
  }
  ```

### 8.4 ATS Score & Diagnostics
- **Endpoint**: `POST /api/resumes/{id}/analyze`
- **Auth Required**: Yes
- **Request Body**:
  ```json
  {
    "jobDescription": "Optional target job description text..."
  }
  ```
- **Success (`200 OK`)**:
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

## 9. Jobs & Saved Jobs APIs

### 9.1 Browse Jobs
- **Endpoint**: `GET /api/jobs`
- **Auth Required**: No (or optional)
- **Query Parameters**:
  - `q`: Search keyword (e.g. `frontend`)
  - `workType`: `remote` | `hybrid` | `onsite`
  - `level`: `internship` | `entry` | `junior` | `mid`
  - `page`: Page index (default: 1)
  - `limit`: Items per page (default: 20)
- **Success (`200 OK`)**:
  ```json
  {
    "data": [
      {
        "id": "job_1",
        "title": "Junior Full Stack Engineer",
        "company": "Synthetix AI",
        "location": "San Francisco, CA",
        "experience": "0-2 years",
        "matchPercent": 88,
        "skills": ["React", "TypeScript", "Python", "FastAPI"],
        "city": "San Francisco",
        "workType": "hybrid",
        "level": "entry",
        "roleType": "Full-time",
        "postedDaysAgo": 2,
        "salary": "$95,000 - $125,000"
      }
    ]
  }
  ```

### 9.2 Get Job Details
- **Endpoint**: `GET /api/jobs/{id}`
- **Auth Required**: No
- **Success (`200 OK`)**:
  ```json
  {
    "data": {
      "id": "job_1",
      "title": "Junior Full Stack Engineer",
      "company": "Synthetix AI",
      "location": "San Francisco, CA",
      "experience": "0-2 years",
      "matchPercent": 88,
      "skills": ["React", "TypeScript", "Python", "FastAPI"],
      "city": "San Francisco",
      "workType": "hybrid",
      "level": "entry",
      "roleType": "Full-time",
      "postedDaysAgo": 2,
      "salary": "$95,000 - $125,000",
      "jobType": "Full-time",
      "about": "Synthetix AI builds generative workflows for engineers...",
      "responsibilities": [
        "Build responsive user interfaces using React and TypeScript.",
        "Implement backend REST endpoints using FastAPI."
      ],
      "requirements": [
        "Strong foundation in TypeScript, React, and modern JavaScript.",
        "Familiarity with Python or Node.js."
      ],
      "niceToHave": ["Experience with Docker and PostgreSQL."],
      "stretchSkill": "Kubernetes"
    }
  }
  ```

### 9.3 Bookmark / Save Job
- **Endpoint**: `POST /api/jobs/{id}/save`
- **Auth Required**: Yes
- **Success (`200 OK`)**: Idempotent bookmarking.

### 9.4 Unsave Job
- **Endpoint**: `DELETE /api/jobs/{id}/save`
- **Auth Required**: Yes
- **Success (`204 No Content`)**

### 9.5 Get Saved Jobs
- **Endpoint**: `GET /api/jobs/saved`
- **Auth Required**: Yes
- **Success (`200 OK`)**: List of saved jobs.

### 9.6 One-Click Job Tailor Shortcut
- **Endpoint**: `POST /api/jobs/{id}/tailor`
- **Auth Required**: Yes
- **Purpose**: Initiates the resume tailoring workflow using the saved job listing's stored title, company, and description. The frontend does not need to prompt the user to re-paste the job description.

---

## 10. File Upload & Resume Parsing APIs

### 10.1 Upload File
- **Endpoint**: `POST /api/files/upload`
- **Auth Required**: Yes
- **Request**: `multipart/form-data` with field `file`.
- **Validation**:
  - Max size: **10 MB** (10,485,760 bytes).
  - Supported extensions: `.pdf`, `.docx`.
  - Rejects if magic bytes do not match valid PDF or DOCX headers.
- **Success (`201 Created`)**:
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
- **Failure (`400 Bad Request`)**:
  ```json
  {
    "error": {
      "code": "FILE_TOO_LARGE",
      "message": "File exceeds the 10 MB limit."
    }
  }
  ```

### 10.2 Parse Uploaded Resume
- **Endpoint**: `POST /api/files/{id}/parse-resume`
- **Auth Required**: Yes
- **Purpose**: Extracts raw text and uses AI to parse candidate resume & profile data.
- **Rule**: Does **not** automatically overwrite user profile. Data is returned for user review.
- **Success (`200 OK`)**:
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

## 11. Subscriptions & Plan Enforcement

### 11.1 Get Current Subscription Status
- **Endpoint**: `GET /api/subscriptions/current`
- **Auth Required**: Yes
- **Success (`200 OK`)**:
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

### 11.2 Plan Limit Reached Response
When a Free user attempts to create a 2nd resume, or a user with 0 balance attempts tailoring without an active subscription, the backend responds with `402 Payment Required`:

```json
{
  "error": {
    "code": "PLAN_LIMIT_REACHED",
    "message": "You have reached your free tier allowance of 1 resume. Please upgrade or purchase a single resume credit to create more.",
    "plans": {
      "single": {
        "name": "Single Resume",
        "price": 49,
        "currency": "INR",
        "description": "₹49 per resume"
      },
      "monthly": {
        "name": "Monthly Unlimited",
        "price": 99,
        "currency": "INR",
        "description": "₹99 per month"
      }
    }
  }
}
```

---

## 12. Standard Error Code Dictionary

| Error Code | HTTP Status | Frontend Action / UI Behavior |
|---|---|---|
| `UNAUTHENTICATED` | 401 | Redirect to `/login` |
| `INVALID_CREDENTIALS` | 401 | Display inline error on login form |
| `TOKEN_EXPIRED` | 401 | Attempt token refresh via `/api/auth/refresh` |
| `FORBIDDEN` | 403 | Show access denied alert (attempted access to another user's item) |
| `RESOURCE_NOT_FOUND` | 404 | Show 404 or redirect to list view |
| `EMAIL_ALREADY_EXISTS` | 409 | Display "Email already registered" error on signup |
| `VALIDATION_ERROR` | 422 | Highlight invalid form fields |
| `PLAN_LIMIT_REACHED` | 402 | Trigger Clave Pricing / Upgrade Modal (`UpgradeModal.tsx`) |
| `FILE_TOO_LARGE` | 400 | Show toast: "File exceeds 10MB limit" |
| `UNSUPPORTED_FILE_TYPE` | 400 | Show toast: "Please upload a PDF or DOCX file" |
| `AI_GENERATION_FAILED` | 500 | Show retry banner: "AI service temporarily unavailable, please retry" |
| `RATE_LIMIT_EXCEEDED` | 429 | Show toast: "Too many requests. Please wait a moment." |

---

## 13. Long-Running AI Request Behavior

AI endpoints (`/analyze-job`, `/generate`, `/tailor`, `/analyze`, `/parse-resume`) typically take between **3 to 12 seconds**:
1. **Synchronous Mode (Default)**:
   - Frontend sets timeout to **30 seconds**.
   - Backend streams or completes parsing and returns `200 OK` or `201 Created` with the full payload.
2. **Asynchronous Processing (Optional Background Queue)**:
   - If the backend chooses background worker processing (e.g. Celery / ARQ / Redis queue), the endpoint returns `202 Accepted`:
     ```json
     {
       "data": {
         "jobId": "job_ai_9918",
         "status": "processing"
       }
     }
     ```
   - Frontend polls `GET /api/jobs/ai/{jobId}` until status is `completed` or `failed`.
