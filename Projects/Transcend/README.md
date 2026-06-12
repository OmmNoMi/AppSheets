# Transcend Counseling & Wellness — Project Overview

**App Name:** Transcend (Full Business Solution)  
**Client:** David Phelan, LPC (Owner)  
**Website:** [https://www.transcendaz.com/](https://www.transcendaz.com/)  
**Status:** Phase 1 Development  
**Compliance:** HIPAA (Google Workspace BAA required)

## What is Transcend?
Transcend Counseling & Wellness is transitioning its administrative intake, document generation, and basic pipeline tracking into a customized, HIPAA-compliant AppSheet application. The goal is to reduce the manual overhead of onboarding clients by connecting their Google Form intake process directly to AppSheet, automatically generating necessary documents, and tracking the client lifecycle (e.g., awaiting signature, intake scheduled, etc.).

## Key Features (Phase 1 - "Painkillers")
- **Intake Automation:** Form submissions are captured and an hourly App Script bot processes them into normalized Client records.
- **Document Generation:** Automatically generate an all-in-one Google Doc containing all 5 necessary consent and policy forms, appropriately configured based on client choices (e.g., telehealth consent).
- **Client Pipeline Dashboard:** Visual status tracking (Red/Yellow/Green) of a client from "New" to "Intake Complete" and "Active".
- **Session Tracking:** A space for the admin to track appointment dates/times and for the therapist to securely capture clinical session notes.
- **Role-Based Access Control:** 
  - **System Admin (David):** Full access to all data, including clinical session notes.
  - **Operations Manager (Admin Assistant):** Access to the client pipeline and schedules, but explicitly blocked from viewing sensitive clinical `SessionNotes`.

## Data Managed (Schema Overview)
The application relies on a Google Sheet backend, structured into several key operational tables:

### Core Operational Data
- **`IntakeForm`:** Raw data directly from the Google Form. It's read-only for historical tracking, which the system processes into the tables below.
- **`Client`:** The core record representing a patient. Holds demographic info, contact preferences, telehealth/email consent, assigned therapist, and current status in the pipeline.
- **`Session`:** Represents a scheduled appointment between a client and their therapist. Includes date, time, and status (Scheduled/Completed/Cancelled).
- **`SessionNotes`:** Clinical notes linked to a specific session. Secure and restricted to the System Admin (therapist) only.

### Client Sub-Records (Child Tables)
- **`ClientInsurance`:** Insurance details per client. Can hold primary and secondary insurance information, including front/back images of the card.
- **`ClientPayment`:** Credit/debit card on file. For HIPAA/PCI compliance, only the last 4 digits are extracted and stored in AppSheet.
- **`ClientMedication`:** A normalized list of medications the client is taking, including dosage and frequency.
- **`ClientDocument`:** Tracks the lifecycle of generated documents (Pending → Generating → SentForSignature → Signed → UploadedToEMR) and stores links to the Google Doc and signed PDF.

## Technical Architecture
- **Frontend / UI:** AppSheet App
- **Database:** Google Sheets
- **File Storage:** Google Shared Drive (HIPAA compliant). App Script automatically creates per-client folders and stores generated documents and uploaded insurance cards.
- **Automation Engine:** Google Apps Script is used heavily for tasks AppSheet cannot natively handle well, such as complex document generation, PCI/HIPAA-compliant data extraction (last 4 digits of CC), and creating Drive folders.
