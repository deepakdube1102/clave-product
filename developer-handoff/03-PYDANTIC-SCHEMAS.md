# 03 — Pydantic Schemas (FastAPI & Validation)

This document provides production-ready Pydantic v2 schemas that match the exact data shapes expected by the Clave React frontend.

> **Key Rule**: The frontend uses `camelCase`. Use Pydantic's `populate_by_name = True` and camelCase aliasing so that FastAPI consumes and produces camelCase JSON seamlessly while Python internal code remains idiomatic `snake_case`.

---

## 1. Base Envelope & Configuration

```python
from pydantic import BaseModel, ConfigDict, Field
from typing import Generic, TypeVar, Optional, List
from datetime import datetime

T = TypeVar("T")

def to_camel(string: str) -> str:
    components = string.split('_')
    return components[0] + ''.join(x.title() for x in components[1:])

class ClaveBaseModel(BaseModel):
    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
        from_attributes=True,
    )

class ApiResponse(ClaveBaseModel, Generic[T]):
    data: T
    message: Optional[str] = "Success"

class ApiErrorDetail(ClaveBaseModel):
    code: str
    message: str
    details: Optional[dict] = None

class ApiErrorResponse(ClaveBaseModel):
    error: ApiErrorDetail
```

---

## 2. User & Authentication Schemas

```python
class UserResponse(ClaveBaseModel):
    id: str
    email: str
    name: str
    avatar: Optional[str] = None
    is_active: bool = True
    created_at: datetime
    updated_at: datetime

class UserUpdateRequest(ClaveBaseModel):
    name: Optional[str] = None
    avatar: Optional[str] = None

class RegisterRequest(ClaveBaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: str = Field(..., max_length=255)
    password: str = Field(..., min_length=8)

class LoginRequest(ClaveBaseModel):
    email: str
    password: str

class AuthTokenResponse(ClaveBaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    user: UserResponse
```

---

## 3. Career Profile Schemas (Source of Truth)

```python
from typing import Literal

ExperienceLevel = Literal['student', 'fresher', 'early', 'experienced']
WorkMode = Literal['remote', 'hybrid', 'onsite']

class ExperienceEntry(ClaveBaseModel):
    id: str
    role: str
    company: str
    location: str
    period: str
    summary: str

class EducationEntry(ClaveBaseModel):
    id: str
    institution: str
    degree: str
    period: str
    details: str

class ProjectEntry(ClaveBaseModel):
    id: str
    name: str
    description: str
    technologies: List[str] = []
    link: Optional[str] = None

class CertificationEntry(ClaveBaseModel):
    id: str
    name: str
    issuer: str
    year: str

class LinkEntry(ClaveBaseModel):
    id: str
    label: str
    url: str

class ProfileData(ClaveBaseModel):
    name: str
    email: str
    phone: str
    location: str
    summary: str
    target_roles: List[str] = []
    experience_level: Optional[ExperienceLevel] = None
    experience: List[ExperienceEntry] = []
    education: List[EducationEntry] = []
    projects: List[ProjectEntry] = []
    skills: List[str] = []
    certifications: List[CertificationEntry] = []
    achievements: List[str] = []
    links: List[LinkEntry] = []
    work_modes: List[WorkMode] = []
    preferred_locations: str = ""
    industries: List[str] = []

class ProfileUpdateRequest(ClaveBaseModel):
    headline: Optional[str] = None
    summary: Optional[str] = None
    target_roles: Optional[List[str]] = None
    experience_level: Optional[ExperienceLevel] = None
    industries: Optional[List[str]] = None
    preferred_locations: Optional[str] = None
    work_modes: Optional[List[WorkMode]] = None
    phone: Optional[str] = None
    location: Optional[str] = None
```

---

## 4. Structured Resume Schemas

```python
TemplateId = Literal[
    'classic', 'modern', 'compact', 'minimal', 'student',
    'designer', 'engineer', 'business', 'academic', 'executive'
]
ResumeSectionKey = Literal['experience', 'education', 'projects', 'skills', 'certifications']

class ResumeContact(ClaveBaseModel):
    name: str
    email: str
    phone: str
    location: str
    linkedin: Optional[str] = ""
    github: Optional[str] = ""
    portfolio: Optional[str] = ""

class ResumeExperience(ClaveBaseModel):
    id: str
    title: str
    company: str
    location: str
    start: str
    end: str
    description: str
    bullets: List[str] = []

class ResumeEducation(ClaveBaseModel):
    id: str
    degree: str
    institution: str
    location: str
    dates: str
    details: str

class ResumeProject(ClaveBaseModel):
    id: str
    name: str
    description: str
    tech: List[str] = []
    link: Optional[str] = ""
    bullets: List[str] = []

class ResumeSkills(ClaveBaseModel):
    technical: List[str] = []
    tools: List[str] = []
    other: List[str] = []

class ResumeCertification(ClaveBaseModel):
    id: str
    name: str
    issuer: str
    date: str
    link: Optional[str] = ""

class ResumeContent(ClaveBaseModel):
    contact: ResumeContact
    summary: str
    experience: List[ResumeExperience] = []
    education: List[ResumeEducation] = []
    projects: List[ResumeProject] = []
    skills: ResumeSkills
    certifications: List[ResumeCertification] = []

class ResumeDocument(ClaveBaseModel):
    id: str
    name: str
    target_role: str
    template: TemplateId = "modern"
    section_order: List[ResumeSectionKey] = [
        "experience", "education", "projects", "skills", "certifications"
    ]
    content: ResumeContent
    updated_at: str

class ResumeListItem(ClaveBaseModel):
    id: str
    name: str
    target_role: str
    template: TemplateId
    source_type: str
    source_resume_id: Optional[str] = None
    ats_score: Optional[int] = None
    updated_at: str
```

---

## 5. AI Pipelines & ATS Analysis Schemas

```python
class JobAnalysisRequest(ClaveBaseModel):
    target_role: str
    job_description: str
    career_profile: Optional[ProfileData] = None

class JobAnalysisResponse(ClaveBaseModel):
    role: str
    company: str
    location: str
    work_type: str
    experience: str
    alignment_score: int = Field(..., ge=0, le=100)
    key_requirements: List[str]
    matched_skills: List[str]
    gaps: List[str]
    insights: List[str]

class ResumeGenerateRequest(ClaveBaseModel):
    target_role: str
    template: TemplateId = "modern"
    job_description: Optional[str] = None
    job_analysis: Optional[JobAnalysisResponse] = None

class ResumeTailorRequest(ClaveBaseModel):
    job_title: str
    company: str
    job_description: str

class AtsFactors(ClaveBaseModel):
    keyword_match: int = Field(..., ge=0, le=100)
    skills_match: int = Field(..., ge=0, le=100)
    experience_match: int = Field(..., ge=0, le=100)
    formatting: int = Field(..., ge=0, le=100)
    section_completeness: int = Field(..., ge=0, le=100)

class AtsAnalysisResponse(ClaveBaseModel):
    score: int = Field(..., ge=0, le=100)
    summary: str
    factors: AtsFactors
    missing_keywords: List[str] = []
    suggestions: List[str] = []
```

---

## 6. Jobs Schemas

```python
WorkType = Literal['remote', 'hybrid', 'onsite']
JobLevel = Literal['internship', 'entry', 'junior', 'mid']

class Job(ClaveBaseModel):
    id: str
    title: str
    company: str
    location: str
    experience: str
    match_percent: int = Field(..., ge=0, le=100)
    skills: List[str]
    city: str
    work_type: WorkType
    level: JobLevel
    role_type: str
    posted_days_ago: int
    salary: Optional[str] = None

class JobDetail(ClaveBaseModel):
    job_type: str
    about: str
    responsibilities: List[str]
    requirements: List[str]
    nice_to_have: List[str]
    stretch_skill: str

class CompanyInfo(ClaveBaseModel):
    description: str
    industry: str
    size: str
    location: str
```
