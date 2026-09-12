# High Heal — Website Requirements Specification Template (BRD / PRD)

**Project Name:** High Heal Sports Medicine & Advanced Physiotherapy Website  
**Document Type:** Business & Technical Requirements Specification  
**Version:** 1.0  
**Status:** In Progress / Gathering  
**Owner / PM:** Shubham  
**Client Stakeholder:** Dr. [Doctor Name], Lead Consultant Physiotherapist  
**Target Delivery:** Static Multi-Page Responsive Web Platform  

---

## 1. Executive Summary & Business Goals

### 1.1 Business Purpose
Create an Apple-grade, performance-focused web platform for **High Heal** that establishes the clinic as Ahmedabad’s authority in sports injury rehabilitation, biomechanical motion analysis, and corporate ergonomics.

### 1.2 Primary Conversion Objectives (KPIs)
* **Lead Conversion**: Maximize direct 1-click WhatsApp booking consultations for acute sports trauma and spinal flare-ups.
* **Corporate Inquiries**: Secure retainers and onsite ergonomic audit requests from IT, finance, and corporate offices.
* **Authority Positioning**: Differentiate High Heal from generic "passive heat-pack" clinics by emphasizing objective kinetic testing, 1-on-1 private sessions, and active load rehab.

---

## 2. Target Audience & User Personas

| Persona | Demographics | Pain Point / Trigger | Primary Conversion Flow |
| :--- | :--- | :--- | :--- |
| **Persona A: The Competitive Athlete** | Runners, Cricketers, Gym Lifters (Age 18–40) | Acute joint tear (ACL/meniscus), chronic shin splints, rotator cuff pain threatening upcoming season. | Interactive Anatomy Explorer → Sports Physio 4-Phase Timeline → WhatsApp direct booking. |
| **Persona B: The Desk Worker / Executive** | Tech workers, founders, corporate managers (Age 26–55) | 8–12 hrs/day sitting, severe lower back sciatica, cervical "tech-neck", chronic tension headaches. | Corporate Wellness ROI Calculator → Posture / Spine protocol → Appointment request. |
| **Persona C: Post-Operative Patient** | Individuals post-orthopedic surgery (Age 20–65) | Rebuilding range-of-motion and muscle symmetry after joint replacement or reconstruction. | Services Post-Op page → Doctor credentials & certifications → Phone / Email intake. |

---

## 3. Brand Identity, Visual Design & Aesthetic System

### 3.1 Design Direction ("Apple Health-Tech")
* **Tone**: Precise, clinical luxury, energetic, technologically superior, scientific.
* **Benchmark Aesthetic**: [Hyperlab](https://www.hyperlab.life) (dark kinetic precision) + [Shreerang](https://www.shreerangsfitnessstudio.com) (athletic energy) + Apple Health (clean typography & micro-interactions).

### 3.2 Design Tokens
* **Primary Background**: `#050811` (Deep Obsidian Slate)
* **Card Surface**: `rgba(15, 23, 42, 0.65)` with `backdrop-filter: blur(16px)`
* **Primary Accent**: `#10b981` (Surgical Emerald)
* **Secondary Accent**: `#06b6d4` (Electric Cyan)
* **Typography**:
  - Headings & Body: `Plus Jakarta Sans`
  - Badges, Numbers & Metrics: `Space Grotesk` (Monospace tech styling)

### 3.3 Media Asset Requirements
* [ ] Doctor Headshot: High-resolution portrait on clean dark or clinical background (minimum 1200x1200px).
* [ ] Clinic Environment Photos: Treatment suites, medical gym floor, turf strip, equipment stations (16:9 aspect ratio).
* [ ] Action Shots: In-action dry needling, gait analysis motion capture, IASTM scraping (with patient consent).
* [ ] Brand Logo: Vector format (`.svg`) or high-resolution transparent PNG (`> 2000px`).

---

## 4. Information Architecture & Page Requirements

```
High Heal Web Architecture
│
├── 1. Home (index.astro)
│   ├── Hero with dynamic neon glow & value proposition
│   ├── Interactive Anatomy & Pain Navigator (6 clickable zones)
│   ├── 4 Clinical Pillars (Objective Biomechanics, 1-on-1 Slots, Modalities, RTS Guarantee)
│   ├── Verified Google Reviews & Patient Recovery Stories
│   └── Direct Consultation Booking CTA
│
├── 2. Services (services.astro)
│   ├── Category-filtered clinical catalog
│   ├── Detailed protocol cards (Indications, Procedure, Expected Timelines)
│   ├── In-house diagnostic technology breakdown (Force plates, CDNT, Normatec)
│   └── Direct "Book Protocol Evaluation" triggers
│
├── 3. Sports Physio (sports-physio.astro)
│   ├── Athletic discipline cards (Marathoners, Cricket, Football, Racket, Strength)
│   ├── 4-Phase Return-to-Play Framework (Clearance gate criteria)
│   └── Pre-Season Movement & Injury Screening package
│
├── 4. Corporate Wellness (corporate-wellness.astro)
│   ├── Workplace ergonomics audit breakdown
│   ├── C-Suite posture masterclass overview
│   ├── Interactive Health Economics ROI Calculator (Staff slider → Sick days saved)
│   └── Corporate proposal inquiry trigger
│
├── 5. About Doctor (about.astro)
│   ├── Consultant Doctor profile, MPT Sports, MIAP, CDNT credentials
│   ├── Clinical movement philosophy narrative
│   ├── Private treatment acoustic suites vs. generic open wards
│   └── 12+ years clinical experience metrics
│
└── 6. Contact & Booking (contact.astro)
    ├── Interactive patient intake form (Triage condition selection)
    ├── Dual submission: Email/SMTP dispatch + Direct WhatsApp confirmation
    ├── Clinic address, operating hours, emergency trauma hotline
    ├── Google Maps embed
    └── Patient FAQs (Duration, referral requirements, clothing, insurance)
```

---

## 5. Functional & Technical Requirements

### 5.1 Technology Architecture
* **Framework**: Astro 5 (Static Site Generation - SSG).
* **UI Components**: React 19 island hydration (`client:load`) for interactive widgets.
* **Styling**: Tailwind CSS v4 with custom glassmorphism and ambient glow utilities.
* **Hosting**: Vercel (Global Edge CDN, Automatic SSL/HTTPS, ₹0 initial tier).

### 5.2 Form Submission & Lead Triage
* **Fields**: Patient Name, WhatsApp Number, Email Address, Primary Complaint, Preferred Slot (Morning/Afternoon/Evening), Clinical Symptoms / Prior Scans.
* **Dual Dispatch Workflow**:
  1. **Email Notification**: Automated asynchronous POST to Web3Forms / SMTP API delivering instant email to doctor's inbox.
  2. **WhatsApp Action**: Dynamic deep-link URL opening WhatsApp with pre-formatted patient clinical synopsis.

### 5.3 SEO & Local Search Specification
* **Structured Data**: JSON-LD Schema matching `schema.org/MedicalBusiness` and `schema.org/SportsActivityLocation`.
* **Local Targeting**: Primary keywords targeted for *"sports physiotherapy Ahmedabad"*, *"ACL rehabilitation Bodakdev"*, *"running gait analysis Sindhu Bhavan Road"*.
* **Social Sharing**: Open Graph (`og:title`, `og:image`, `og:description`) and Twitter Card metadata configured for WhatsApp and LinkedIn link previews.

### 5.4 Performance & Accessibility Targets
* **Lighthouse Performance Score**: > 95 / 100.
* **First Contentful Paint (FCP)**: < 0.8s.
* **Largest Contentful Paint (LCP)**: < 1.4s.
* **Cumulative Layout Shift (CLS)**: < 0.05.
* **Mobile Responsiveness**: 100% responsive across mobile (375px), tablet (768px), and desktop (1440px+).

---

## 6. Scope Boundaries & Out of Scope (Per Vendor Quote)

To maintain project focus and avoid scope creep, the following items are formally categorized:

| In-Scope (Static Site Scope) | Out-of-Scope (Future / Separate Phase) |
| :--- | :--- |
| Complete 6-page responsive static architecture | Custom backend user login / Patient authentication portals |
| Interactive Anatomy & Pain Navigator | Electronic Health Record (EHR) database integration |
| 4-Phase Return-to-Play interactive timeline | Online payment gateway integration (Razorpay/Stripe) |
| Corporate ROI Calculator | Ongoing paid Google Ads / SEO backlink campaigns |
| Email lead dispatch via free-tier service + WhatsApp | E-commerce store for physical braces/supplements |
| Vercel deployment & GitHub version control | Third-party paid subscription APIs |

---

## 7. Requirement Collection Sign-off Matrix

| Section | Status | Assigned Stakeholder | Verified Date |
| :--- | :---: | :--- | :---: |
| **1. Clinic Name & Tagline** | Pending Doctor Review | Client (Doctor) | |
| **2. Doctor Degrees & Bio** | Pending Doctor Review | Client (Doctor) | |
| **3. Clinic Address & Hours** | Pending Doctor Review | Client (Doctor) | |
| **4. WhatsApp & Phone Number** | Pending Doctor Review | Client (Doctor) | |
| **5. Doctor Portrait & Photos** | Pending Doctor Review | Client (Doctor) | |
| **6. Form Notification Email** | Pending Doctor Review | Client (Doctor) | |
| **7. Wireframe Approval** | **Approved (v1.0)** | Client & Dev Team | 12-Sep-2026 |
| **8. Codebase & Git Repo** | **Completed** | Dev Team (Misiryn/High-Heal) | 12-Sep-2026 |
