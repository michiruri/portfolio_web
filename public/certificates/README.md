# Certificates & Credentials Directory

This directory stores verified certificates, transcripts, and official exam credentials for the portfolio.

## Folder Organization & Naming Conventions

All folders and files follow standard lowercase kebab-case naming:

```
public/certificates/
├── topcit/
│   ├── topcit-level-3.pdf           # Most recent & highest score (13th Exam, Level 3)
│   ├── topcit-first-attempt.pdf     # Initial baseline score showing rapid progression
│   └── README.md
│
└── civil-service/
    ├── csc-eligibility.pdf           # Civil Service Commission (CSE-PPT Professional Level)
    └── README.md
```

## Naming Rules

1. **Category Folder:** Group by institution/exam in lowercase:
   - `topcit/` for Test of Practical Competency in IT
   - `civil-service/` for Civil Service Commission Philippines
   - `academic/` for degrees, honors, and university records
   - `technical/` for platform certifications (AWS, GCP, etc.)

2. **File Naming Standard:**
   - Format: `<issuer/exam>-<credential-name-or-level>.pdf`
   - Examples:
     - `topcit-level-3.pdf`
     - `topcit-first-attempt.pdf`
     - `csc-eligibility.pdf`

3. **Accepted Formats:**
   - `.pdf` (primary, vector-crisp and multi-page capable)
   - `.png` / `.webp` (optional raster backup or scanned preview)
