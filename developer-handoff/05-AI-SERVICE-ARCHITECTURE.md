# 05 — AI Service Architecture & Guardrails

This document outlines the architecture, prompts, anti-fabrication guardrails, and validation mechanisms for all AI-powered services in Clave.

---

## 1. Architecture & Service Abstraction

All AI calls are encapsulated behind the `AIService` abstract base class. FastAPI route handlers **never** make direct calls to OpenAI or Anthropic SDKs.

```text
FastAPI Route Handler
          │
          ▼
   AIService (Interface)
          │
    ┌─────┴────────────────┐
    ▼                      ▼
OpenAIProvider       AnthropicProvider
(GPT-4o / mini)     (Claude 3.5 Sonnet)
```

### `AIService` Abstract Base Class
```python
from abc import ABC, abstractmethod
from typing import Dict, Any
from app.schemas.resume import ResumeContent, ResumeDocument
from app.schemas.profile import ProfileData
from app.schemas.ai import JobAnalysisResponse, AtsAnalysisResponse

class BaseAIService(ABC):
    @abstractmethod
    async def analyze_job(self, target_role: str, job_description: str, career_profile: ProfileData) -> JobAnalysisResponse:
        """Analyzes compatibility between user profile and job description."""
        pass

    @abstractmethod
    async def generate_resume(self, target_role: str, career_profile: ProfileData, job_analysis: JobAnalysisResponse) -> ResumeContent:
        """Generates structured resume content strictly based on verified career profile data."""
        pass

    @abstractmethod
    async def tailor_resume(self, original_content: ResumeContent, job_title: str, company: str, job_description: str) -> ResumeContent:
        """Tailors an existing resume's summary and bullet points to match the target job description."""
        pass

    @abstractmethod
    async def analyze_ats(self, resume_content: ResumeContent, job_description: str = None) -> AtsAnalysisResponse:
        """Evaluates ATS parsing readiness, keyword presence, and formatting strength."""
        pass

    @abstractmethod
    async def parse_resume_text(self, raw_text: str) -> Dict[str, Any]:
        """Extracts structured profile and resume information from raw uploaded resume text."""
        pass
```

---

## 2. Anti-Fabrication Principles & Guardrails

> **PRIMARY DIRECTIVE**: Clave AI must **NEVER** fabricate, hallucinate, or extrapolate facts.
>
> ❌ **Prohibited**:
> - Inventing companies, institutions, job titles, or dates.
> - Adding skills or certifications the user did not declare.
> - Fabricating metrics (e.g., claiming "increased revenue by 40%" when the user did not provide that number).
> - Adding fake degrees or educational honors.
>
> ✅ **Allowed & Expected**:
> - Rephrasing existing bullet points using active, impact-oriented verbs (e.g., "Led", "Engineered", "Designed").
> - Reordering skills or experiences to prioritize those requested in the job description.
> - Tailoring the professional summary to align with the target role.
> - Correcting grammar, punctuation, and typographical errors.

---

## 3. Core System Prompts

### Resume Generation & Tailoring System Prompt
```text
You are Clave AI, an elite career copilot and professional resume architect.
Your mission is to craft exceptional, ATS-optimized, high-impact resumes for students, freshers, and early-career professionals.

CRITICAL CONSTRAINTS:
1. STRICT TRUTH-TELLING: You may only use facts, experiences, education, and skills provided in the user's verified profile.
2. NO FABRICATION: Never invent employers, project names, credentials, dates, or metrics. If a metric was not supplied, focus on the methodology and scope of work rather than inventing numbers.
3. ACTION-ORIENTED BULLETS: Start every bullet point with a compelling action verb (e.g., "Spearheaded", "Engineered", "Optimized", "Architected").
4. KEYWORD RELEVANCE: Naturally integrate relevant technical and domain keywords from the target job description where supported by user experience.
5. CONCISE & READABLE: Keep bullet points concise (1 to 2 lines maximum). Ensure tone is confident, professional, and humble.
6. OUTPUT FORMAT: Respond ONLY with valid JSON conforming to the requested schema. Do not include markdown code block markers or conversational preamble.
```

---

## 4. ATS Scoring Algorithm

ATS analysis does not rely solely on probabilistic LLM responses; it uses a deterministic hybrid scoring engine:

$$\text{ATS Score} = (0.35 \times K) + (0.25 \times S) + (0.20 \times E) + (0.10 \times F) + (0.10 \times C)$$

Where:
- **$K$ (Keyword Match)**: Exact and fuzzy matching of required skills and terms from the job description in the resume text.
- **$S$ (Skills Match)**: Percentage of required technical and soft skills explicitly present in `resume.content.skills`.
- **$E$ (Experience Match)**: Alignment between role responsibilities and experience bullet points.
- **$F$ (Formatting)**: Structural validation (clean contact info, valid dates, absence of problematic special characters).
- **$C$ (Completeness)**: Presence of core sections (Summary, Experience, Education, Skills).

### Alignment Score vs ATS Score
- **Alignment Score** (`POST /api/resumes/analyze-job`): Measures how well the user's **Career Profile** matches a prospective job before writing a resume.
- **ATS Score** (`POST /api/resumes/{id}/analyze`): Measures the structural and keyword quality of a **specific Resume Document** for applicant tracking systems.

---

## 5. Structured JSON Output Enforcement

FastAPI enforces Pydantic schemas on all AI outputs using OpenAI's Structured Outputs (`response_format={"type": "json_schema", ...}`):

```python
from openai import AsyncOpenAI

client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)

async def call_structured_ai(prompt: str, schema_cls: type[BaseModel]) -> BaseModel:
    response = await client.beta.chat.completions.parse(
        model="gpt-4o-2024-08-06",
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": prompt}
        ],
        response_format=schema_cls,
        temperature=0.2, # Low temperature for consistency and deterministic adherence
    )
    return response.choices[0].message.parsed
```
