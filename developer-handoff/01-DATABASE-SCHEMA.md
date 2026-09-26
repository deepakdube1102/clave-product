# 01 — Database Schema (PostgreSQL / Supabase)

This document contains the complete, production-ready PostgreSQL / Supabase relational schema for Clave.

---

## 1. Schema Diagram Overview

```text
               ┌───────────────┐
               │     users     │
               └───────┬───────┘
                       │ 1:1
       ┌───────────────┴───────────────┐
       ▼                               ▼
┌───────────────┐              ┌────────────────┐
│ career_profiles│             │ subscriptions  │
└──────┬────────┘              └────────────────┘
       │ 1:N
       ├─► profile_education
       ├─► profile_experience
       ├─► profile_projects
       ├─► profile_skills
       ├─► profile_certifications
       ├─► profile_achievements
       └─► profile_links

       ┌───────────────┐
       │     users     │
       └───────┬───────┘
               │ 1:N
       ┌───────┴───────────────────────────────┐
       ▼                                       ▼
┌───────────────┐                       ┌──────────────┐
│    resumes    │                       │  saved_jobs  │
└──────┬────────┘                       └──────┬───────┘
       │ 1:N                                   │ N:1
       ├─► resume_versions                     ▼
       ├─► ats_analyses                 ┌──────────────┐
       │                                │     jobs     │
       ▼                                └──────┬───────┘
┌────────────────┐                             │ 1:N
│ uploaded_files │◄────────────────────────────┴─► job_analyses
└────────────────┘
```

---

## 2. Complete SQL DDL

```sql
-- ============================================================================
-- CLAVE CAREER WORKSPACE — POSTGRESQL / SUPABASE SCHEMA
-- ============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Enum Types
CREATE TYPE experience_level_enum AS ENUM ('student', 'fresher', 'early', 'experienced');
CREATE TYPE work_mode_enum AS ENUM ('remote', 'hybrid', 'onsite');
CREATE TYPE resume_source_type_enum AS ENUM ('ai_generated', 'manual', 'imported', 'tailored', 'template');
CREATE TYPE resume_status_enum AS ENUM ('draft', 'ready', 'archived');
CREATE TYPE subscription_plan_enum AS ENUM ('free', 'single', 'monthly');
CREATE TYPE subscription_status_enum AS ENUM ('active', 'past_due', 'canceled', 'expired');
CREATE TYPE file_type_enum AS ENUM ('pdf', 'docx');
CREATE TYPE file_status_enum AS ENUM ('uploading', 'parsing', 'ready', 'error');

-- ----------------------------------------------------------------------------
-- 1. USERS & ACCOUNTS
-- ----------------------------------------------------------------------------
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    hashed_password VARCHAR(255),
    full_name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    auth_provider VARCHAR(50) DEFAULT 'local', -- 'local', 'google', 'github', 'supabase'
    auth_provider_id VARCHAR(255),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    is_verified BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);

-- ----------------------------------------------------------------------------
-- 2. CAREER PROFILES (SOURCE OF TRUTH)
-- ----------------------------------------------------------------------------
CREATE TABLE career_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    headline VARCHAR(255),
    summary TEXT,
    experience_level experience_level_enum,
    target_roles TEXT[] DEFAULT '{}',
    industries TEXT[] DEFAULT '{}',
    preferred_locations TEXT[] DEFAULT '{}',
    work_modes work_mode_enum[] DEFAULT '{}',
    career_interests TEXT[] DEFAULT '{}',
    phone VARCHAR(50),
    location VARCHAR(150),
    is_onboarded BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_career_profiles_user ON career_profiles(user_id);

-- Profile Education
CREATE TABLE profile_education (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES career_profiles(id) ON DELETE CASCADE,
    institution VARCHAR(255) NOT NULL,
    degree VARCHAR(255) NOT NULL,
    field VARCHAR(255),
    start_date VARCHAR(50),
    end_date VARCHAR(50),
    grade VARCHAR(50),
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_education_profile ON profile_education(profile_id);

-- Profile Experience
CREATE TABLE profile_experience (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES career_profiles(id) ON DELETE CASCADE,
    company VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL,
    location VARCHAR(150),
    employment_type VARCHAR(50),
    start_date VARCHAR(50),
    end_date VARCHAR(50),
    description TEXT,
    achievements TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_experience_profile ON profile_experience(profile_id);

-- Profile Projects
CREATE TABLE profile_projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES career_profiles(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    role VARCHAR(150),
    technologies TEXT[] DEFAULT '{}',
    project_url TEXT,
    start_date VARCHAR(50),
    end_date VARCHAR(50),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_projects_profile ON profile_projects(profile_id);

-- Profile Skills
CREATE TABLE profile_skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES career_profiles(id) ON DELETE CASCADE,
    name VARCHAR(150) NOT NULL,
    category VARCHAR(100) DEFAULT 'technical', -- 'technical', 'tools', 'soft'
    proficiency VARCHAR(50),                    -- 'beginner', 'intermediate', 'advanced'
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_skills_profile ON profile_skills(profile_id);
CREATE UNIQUE INDEX idx_skills_profile_name ON profile_skills(profile_id, LOWER(name));

-- Profile Certifications
CREATE TABLE profile_certifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES career_profiles(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    issuer VARCHAR(255) NOT NULL,
    issue_date VARCHAR(50),
    credential_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_certifications_profile ON profile_certifications(profile_id);

-- Profile Achievements
CREATE TABLE profile_achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES career_profiles(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    date VARCHAR(50),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_achievements_profile ON profile_achievements(profile_id);

-- Profile Links
CREATE TABLE profile_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    profile_id UUID NOT NULL REFERENCES career_profiles(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- 'linkedin', 'github', 'portfolio', 'other'
    url TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_links_profile ON profile_links(profile_id);

-- ----------------------------------------------------------------------------
-- 3. RESUME TEMPLATES
-- ----------------------------------------------------------------------------
CREATE TABLE resume_templates (
    id VARCHAR(50) PRIMARY KEY, -- 'classic', 'modern', 'compact', 'minimal', 'student', etc.
    name VARCHAR(100) NOT NULL,
    description TEXT,
    preview_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 4. RESUMES & VERSIONS
-- ----------------------------------------------------------------------------
CREATE TABLE resumes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    target_role VARCHAR(255) NOT NULL,
    template_id VARCHAR(50) NOT NULL REFERENCES resume_templates(id),
    source_type resume_source_type_enum NOT NULL DEFAULT 'manual',
    source_resume_id UUID REFERENCES resumes(id) ON DELETE SET NULL, -- Ensures original resume reference
    status resume_status_enum NOT NULL DEFAULT 'ready',
    section_order TEXT[] NOT NULL DEFAULT '{"experience","education","projects","skills","certifications"}',
    content JSONB NOT NULL, -- Structured ResumeContent { contact, summary, experience, education, projects, skills, certifications }
    ats_score INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_resumes_user ON resumes(user_id);
CREATE INDEX idx_resumes_source_resume ON resumes(source_resume_id);
CREATE INDEX idx_resumes_updated_at ON resumes(updated_at);

-- Resume Version History
CREATE TABLE resume_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resume_id UUID NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,
    version_number INTEGER NOT NULL,
    content JSONB NOT NULL,
    change_summary VARCHAR(255),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_resume_versions_resume ON resume_versions(resume_id);
CREATE UNIQUE INDEX idx_resume_version_unique ON resume_versions(resume_id, version_number);

-- ----------------------------------------------------------------------------
-- 5. JOBS & SAVED JOBS
-- ----------------------------------------------------------------------------
CREATE TABLE jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    company_logo TEXT,
    location VARCHAR(150) NOT NULL,
    city VARCHAR(100),
    work_type work_mode_enum NOT NULL DEFAULT 'onsite',
    experience_level VARCHAR(50) NOT NULL,
    experience_years VARCHAR(50),
    role_type VARCHAR(100),
    salary VARCHAR(100),
    description TEXT NOT NULL,
    responsibilities TEXT[] DEFAULT '{}',
    requirements TEXT[] DEFAULT '{}',
    nice_to_have TEXT[] DEFAULT '{}',
    skills TEXT[] DEFAULT '{}',
    stretch_skill VARCHAR(150),
    source VARCHAR(100) DEFAULT 'clave',
    external_url TEXT,
    posted_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_jobs_title ON jobs(title);
CREATE INDEX idx_jobs_location ON jobs(location);
CREATE INDEX idx_jobs_work_type ON jobs(work_type);
CREATE INDEX idx_jobs_posted_at ON jobs(posted_at DESC);

-- Saved Jobs (User Bookmarks)
CREATE TABLE saved_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    saved_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_saved_jobs_user_job ON saved_jobs(user_id, job_id);
CREATE INDEX idx_saved_jobs_user ON saved_jobs(user_id);

-- ----------------------------------------------------------------------------
-- 6. JOB ANALYSES & ATS ANALYSES
-- ----------------------------------------------------------------------------
CREATE TABLE job_analyses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    job_id UUID REFERENCES jobs(id) ON DELETE SET NULL,
    target_role VARCHAR(255) NOT NULL,
    job_description TEXT NOT NULL,
    alignment_score INTEGER NOT NULL, -- 0-100% Match of Career Profile to JD
    analysis_data JSONB NOT NULL,     -- { keyRequirements, matchedSkills, gaps, insights }
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_job_analyses_user ON job_analyses(user_id);

CREATE TABLE ats_analyses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resume_id UUID NOT NULL REFERENCES resumes(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    score INTEGER NOT NULL,           -- 0-100%
    summary TEXT,
    factors JSONB NOT NULL,           -- { keyword_match, skills_match, experience_match, formatting, section_completeness }
    missing_keywords TEXT[] DEFAULT '{}',
    suggestions TEXT[] DEFAULT '{}',
    target_job_description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_ats_analyses_resume ON ats_analyses(resume_id);
CREATE INDEX idx_ats_analyses_user ON ats_analyses(user_id);

-- ----------------------------------------------------------------------------
-- 7. FILE UPLOADS
-- ----------------------------------------------------------------------------
CREATE TABLE uploaded_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_size_bytes BIGINT NOT NULL,
    file_type file_type_enum NOT NULL,
    storage_path TEXT NOT NULL,
    status file_status_enum NOT NULL DEFAULT 'uploading',
    extracted_text TEXT,
    error_message TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_uploaded_files_user ON uploaded_files(user_id);

-- ----------------------------------------------------------------------------
-- 8. SUBSCRIPTIONS & USAGE TRACKING
-- ----------------------------------------------------------------------------
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    plan subscription_plan_enum NOT NULL DEFAULT 'free',
    status subscription_status_enum NOT NULL DEFAULT 'active',
    provider VARCHAR(50) DEFAULT 'manual', -- 'razorpay', 'stripe', 'manual'
    provider_customer_id VARCHAR(255),
    provider_subscription_id VARCHAR(255),
    single_resumes_balance INTEGER NOT NULL DEFAULT 0, -- For 'single' purchases (₹49)
    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_subscriptions_user ON subscriptions(user_id);

CREATE TABLE usage_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    billing_period VARCHAR(7) NOT NULL, -- Format: YYYY-MM
    resumes_created INTEGER NOT NULL DEFAULT 0,
    resumes_tailored INTEGER NOT NULL DEFAULT 0,
    ai_generations INTEGER NOT NULL DEFAULT 0,
    ats_analyses INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_usage_user_period ON usage_records(user_id, billing_period);

-- ----------------------------------------------------------------------------
-- 9. TRIGGERS FOR UPDATED_AT
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER trg_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER trg_career_profiles_updated_at BEFORE UPDATE ON career_profiles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER trg_resumes_updated_at BEFORE UPDATE ON resumes FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER trg_jobs_updated_at BEFORE UPDATE ON jobs FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER trg_subscriptions_updated_at BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER trg_usage_updated_at BEFORE UPDATE ON usage_records FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
CREATE TRIGGER trg_uploaded_files_updated_at BEFORE UPDATE ON uploaded_files FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
```

---

## 3. Supabase Row Level Security (RLS) Policies

When using Supabase, enable RLS on all tables containing user data:

```sql
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE career_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_education ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE profile_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE ats_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE uploaded_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE usage_records ENABLE ROW LEVEL SECURITY;

-- Resumes: Users can only see and modify their own resumes
CREATE POLICY "Users can manage their own resumes"
ON resumes FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Career Profile: Users can only view/edit their own profile
CREATE POLICY "Users can manage their own career profile"
ON career_profiles FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Jobs: Publicly viewable by all authenticated users
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Jobs are viewable by all users"
ON jobs FOR SELECT
USING (TRUE);
```
