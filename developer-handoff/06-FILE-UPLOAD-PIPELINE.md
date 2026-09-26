# 06 — File Upload & Resume Parsing Pipeline

This document defines the file upload, storage, text extraction, and resume parsing pipeline for Clave.

---

## 1. Overview & Upload Pipeline

Users can upload existing PDF or DOCX resumes during onboarding or from the resumes dashboard.

```text
[Client / Browser]
       │
       │ 1. Multipart POST /api/files/upload (PDF/DOCX <= 10MB)
       ▼
[FastAPI Validation Layer]
       │ 2. Check Content-Length & magic bytes
       │ 3. Store raw file in S3 / Supabase Storage
       ▼
[Text Extraction Engine]
       │ 4. Extract plain text (pdfplumber / python-docx)
       ▼
[AI Parsing Service]
       │ 5. Parse into structured ResumeContent & ProfileData
       ▼
[Review & Confirmation Flow]
       │ 6. Return candidate profile data for user review
       │ 7. Save to CareerProfile / Resumes only upon user approval
```

---

## 2. File Validation & Size Limits

1. **Size Limit**: Strictly enforce a maximum size of **10 MB** (10,485,760 bytes).
2. **Format Limit**: Only allow `.pdf` and `.docx`.
3. **Magic Byte Validation**: Never trust the user-supplied `Content-Type` header or file extension alone. Validate using file magic headers:
   - PDF: `%PDF-` (`0x25 0x50 0x44 0x46`)
   - DOCX: `PK\x03\x04` (Zip archive signature for Office Open XML)

### FastAPI Upload Handler
```python
import io
import filetype
from fastapi import APIRouter, UploadFile, File, HTTPException, status, Depends
from app.models.user import User
from app.core.security import get_current_user

router = APIRouter()

MAX_FILE_SIZE = 10 * 1024 * 1024 # 10 MB

@router.post("/files/upload")
async def upload_file(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user)
):
    contents = await file.read()
    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={"error": {"code": "FILE_TOO_LARGE", "message": "File exceeds the 10 MB maximum limit."}}
        )

    # Validate actual file content
    kind = filetype.guess(contents)
    valid_mimes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"]
    
    # Fallback check for docx which is a zip file
    if kind is None or (kind.mime not in valid_mimes and not file.filename.endswith(".docx")):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={"error": {"code": "UNSUPPORTED_FILE_TYPE", "message": "Only PDF and DOCX files are supported."}}
        )

    # Save to storage (S3 / Supabase Storage)
    storage_path = f"resumes/{current_user.id}/{file.filename}"
    # await storage_service.upload(storage_path, contents, kind.mime)

    return {
        "data": {
            "fileId": str(uuid.uuid4()),
            "fileName": file.filename,
            "fileSize": len(contents),
            "fileType": "pdf" if "pdf" in (kind.mime if kind else "") else "docx",
            "status": "ready"
        }
    }
```

---

## 3. Text Extraction Pipeline

### PDF Extraction with `pdfplumber`
```python
import pdfplumber
import io

def extract_text_from_pdf(file_bytes: bytes) -> str:
    extracted_text = []
    with pdfplumber.open(io.BytesIO(file_bytes)) as pdf:
        for page in pdf.pages:
            text = page.extract_text(layout=True)
            if text:
                extracted_text.append(text)
    return "\n\n".join(extracted_text)
```

### DOCX Extraction with `python-docx`
```python
import docx
import io

def extract_text_from_docx(file_bytes: bytes) -> str:
    doc = docx.Document(io.BytesIO(file_bytes))
    paragraphs = [p.text for p in doc.paragraphs if p.text.strip()]
    return "\n".join(paragraphs)
```

---

## 4. AI Structured Parsing & User Confirmation

Once raw text is extracted:
1. Pass raw text to `AIService.parse_resume_text(raw_text)`.
2. AI extracts:
   - Personal information (Name, Email, Phone, Location, Links)
   - Work Experience (Company, Role, Dates, Bullets)
   - Education (Degree, Institution, Dates, GPA/Details)
   - Projects & Skills
3. **Product Rule**: Do **not** overwrite the user's existing Career Profile automatically.
   - Return parsed data to the frontend review screen (`/onboarding/review`).
   - The user reviews, edits, and confirms the extracted entries before saving.
