# 11 — Seed & Mock Data Strategy

This document provides seed scripts and initial data to bootstrap local development and testing environments.

---

## 1. Resume Templates Seed Data

These 10 templates match the template IDs configured in the Clave frontend (`src/types/resumeDocument.ts`):

```sql
INSERT INTO resume_templates (id, name, description, is_active) VALUES
('classic', 'Classic Elegance', 'Traditional single-column layout optimized for conservative corporate and finance roles.', true),
('modern', 'Modern Clean', 'Balanced, contemporary design with subtle accent colors ideal for technology and startups.', true),
('compact', 'Compact Dense', 'High-density format designed for professionals with extensive experience who need a single page.', true),
('minimal', 'Minimal Editorial', 'Sophisticated typographical hierarchy with generous white space and clean dividers.', true),
('student', 'Student & Entry Level', 'Education-first layout with prominent sections for academic projects, skills, and leadership.', true),
('designer', 'Creative & Design', 'Visual balance with portfolio links and prominent skills blocks tailored for UX/UI designers.', true),
('engineer', 'Software Engineer', 'Code-focused template emphasizing technical proficiencies, repositories, and technical stack details.', true),
('business', 'Business Analyst', 'Metrics-oriented format highlighting analytical competencies, business impact, and certifications.', true),
('academic', 'Academic Curriculum Vitae', 'Multi-page academic structure detailing research, publications, presentations, and teaching.', true),
('executive', 'Executive Leadership', 'Distinguished format emphasizing strategic leadership, revenue ownership, and board experience.', true)
ON CONFLICT (id) DO NOTHING;
```

---

## 2. Python Seeding Script (`scripts/seed_data.py`)

Run this script to seed a demo account, career profile, and initial sample jobs:

```python
import asyncio
from uuid import uuid4
from passlib.context import CryptContext
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import async_session_factory
from app.models.user import User
from app.models.profile import CareerProfile, ProfileEducation, ProfileExperience, ProfileProject, ProfileSkill
from app.models.resume import Resume
from app.models.job import Job
from app.models.subscription import Subscription

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

async def seed_database():
    async with async_session_factory() as session:
        # 1. Create Demo User
        demo_user_id = uuid4()
        user = User(
            id=demo_user_id,
            email="alex.chen@university.edu",
            hashed_password=pwd_context.hash("Password123!"),
            full_name="Alex Chen",
            is_active=True,
            is_verified=True
        )
        session.add(user)

        # 2. Create Career Profile
        profile_id = uuid4()
        profile = CareerProfile(
            id=profile_id,
            user_id=demo_user_id,
            headline="Full Stack Engineer & AI Enthusiast",
            summary="Versatile software engineer with hands-on experience building performant web applications using React, TypeScript, and Python. Passionate about AI-assisted developer workflows and clean API architectures.",
            experience_level="early",
            target_roles=["Full Stack Engineer", "Frontend Engineer", "Software Engineer"],
            industries=["Technology", "SaaS", "Artificial Intelligence"],
            preferred_locations=["San Francisco, CA", "Remote"],
            work_modes=["remote", "hybrid"],
            is_onboarded=True
        )
        session.add(profile)

        # Education
        session.add(ProfileEducation(
            profile_id=profile_id,
            institution="University of California, Berkeley",
            degree="B.S. in Computer Science",
            field="Computer Science",
            start_date="2022",
            end_date="2026",
            grade="GPA: 3.8 / 4.0",
            description="Relevant coursework: Data Structures, Artificial Intelligence, Database Systems, Web Architecture."
        ))

        # Experience
        session.add(ProfileExperience(
            profile_id=profile_id,
            company="TechStart Labs",
            role="Software Engineer Intern",
            location="San Francisco, CA",
            employment_type="Internship",
            start_date="Jun 2025",
            end_date="Aug 2025",
            description="Engineered interactive analytics dashboards and automated resume tailoring pipelines.",
            achievements=[
                "Reduced dashboard latency by 35% through query optimization and client-side caching.",
                "Built 12 reusable TypeScript component packages adopted across 4 internal services."
            ]
        ))

        # Skills
        for skill in ["TypeScript", "React", "Python", "FastAPI", "PostgreSQL", "Docker", "Tailwind CSS"]:
            session.add(ProfileSkill(profile_id=profile_id, name=skill, category="technical"))

        # 3. Create Subscription Record (Free Tier)
        session.add(Subscription(
            user_id=demo_user_id,
            plan="free",
            status="active",
            single_resumes_balance=0
        ))

        # 4. Seed Sample Jobs
        sample_jobs = [
            Job(
                title="Junior Full Stack Engineer",
                company="Synthetix AI",
                location="San Francisco, CA",
                city="San Francisco",
                work_type="hybrid",
                experience_level="entry",
                experience_years="0-2 years",
                role_type="Full-time",
                salary="$95,000 - $125,000",
                description="We are building the next generation of generative AI tools for modern developers. You will work across React frontends and Python microservices.",
                responsibilities=[
                    "Build responsive user interfaces using React, Next.js, and TypeScript.",
                    "Design scalable REST and WebSocket endpoints in FastAPI.",
                    "Collaborate with product designers to ship delightful features."
                ],
                requirements=[
                    "Strong foundation in TypeScript, React, and modern JavaScript.",
                    "Familiarity with Python or Node.js backend development.",
                    "Curiosity and passion for modern AI workflows."
                ],
                skills=["React", "TypeScript", "Python", "FastAPI", "PostgreSQL"],
                stretch_skill="Docker & Kubernetes"
            ),
            Job(
                title="Frontend Developer (Early Career)",
                company="Pinnacle Cloud",
                location="Remote, US",
                city="Remote",
                work_type="remote",
                experience_level="junior",
                experience_years="1-3 years",
                role_type="Full-time",
                salary="$85,000 - $110,000",
                description="Join our core applications team developing high-performance SaaS monitoring interfaces.",
                responsibilities=["Develop accessible component libraries in React.", "Optimize core web vitals."],
                requirements=["Experience with React, CSS/Tailwind, and state management."],
                skills=["React", "TypeScript", "Tailwind CSS", "Next.js"],
                stretch_skill="GraphQL"
            )
        ]
        session.add_all(sample_jobs)

        await session.commit()
        print("✅ Database successfully seeded with demo user and sample jobs!")

if __name__ == "__main__":
    asyncio.run(seed_database())
```
