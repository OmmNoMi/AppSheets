# Quotation — Transcend Counseling & Wellness IntakeSystem

**Prepared For:** David Phelan, LPC (Owner)
**Prepared By:** Nomeshwer Sharma, OmmNoMi Automation LLP
**Date:** June 1, 2026
**Project:** Transcend IntakeSystem (Phase 1)

---

## 1. Executive Summary
This quotation outlines the development of a HIPAA-compliant, automated Intake and Document Generation system for Transcend Counseling & Wellness. The system will leverage AppSheet and Google Workspace to eliminate manual data entry, automatically generate client contracts, organize files securely, and provide a streamlined administrative dashboard.

## 2. Scope of Work — Phase 1 (Core Automation)

### 2.1 Database & Architecture
- Setup HIPAA-compliant data schema within Google Workspace.
- Connect existing Google Intake Form to the AppSheet application without disrupting the current form.
- Implement automated normalization of flat form data (e.g., dynamically handling multiple medications).
- Enforce PCI compliance by automatically extracting only the last 4 digits of credit cards and securely discarding the rest.

### 2.2 App Script Automation Engine
- **Hourly Processing Bot:** An automated bot that runs every hour to check for new intake submissions, process the data, and create organized client records even when administrative staff are offline.
- **Document Generation:** Custom script to take the 5 separate forms (Client Info, Insurance, CC Auth, Medication, Service Contract) and merge them into a single, perfectly formatted Google Doc.
- **Smart Consent Handling:** The system will dynamically include or exclude Email and Telehealth consent paragraphs in the final contract based on the client's intake answers, removing the need for manual text entry during e-signing.

### 2.3 File Management & E-Signature Workflow
- **HIPAA Drive Structure:** Automated creation of client-specific folders within an organization-owned Google Shared Drive.
- **E-Signature Prep:** The generated document is formatted and ready for the Google e-Sign workflow, allowing staff to quickly send the merged contract for a legally binding signature.

### 2.4 Application Interface
- **Administrative Dashboard:** A kanban/pipeline view showing all clients grouped by their current status (New → Docs Generated → Awaiting Signature → Signed → Active).
- **Communication:** Built-in AppSheet SMS functionality to quickly send the intake form link to new inquiries.
- **Role-Based Access Control:** Secure access levels ensuring therapists only see necessary clinical data while administrators handle operational flows.

## 3. Deliverables & Timeline
**Estimated Timeline:** 2 Weeks from project kickoff.

| Milestone | Deliverable | Estimated Completion |
|-----------|-------------|----------------------|
| **Milestone 1** | Database schema, Form integration, and Base AppSheet UI | End of Week 1 |
| **Milestone 2** | App Script Document Generation & Shared Drive Automation | Mid Week 2 |
| **Milestone 3** | E-Signature Workflow Testing, Dashboard Polish, and Training | End of Week 2 |

## 4. Investment

**Estimated Hours:** 25 Hours (Phase 1)
**Hourly Rate:** $25.00/hr

| Item | Description | Cost |
|------|-------------|------|
| **Phase 1 Development** | Full design, development, and deployment of the Phase 1 scope outlined above. | $625.00 |
| **Testing & Deployment** | End-to-end testing, HIPAA compliance verification, and staff onboarding. | Included |
| **Discount** | Initial project discount applied. | -$125.00 |
| **Total Phase 1 Investment** | | **$500.00** |

## 5. Ongoing Costs (Third-Party)
- **Google Workspace:** Existing subscription (Ensure BAA is signed).
- **AppSheet Core/Enterprise:** Depending on user count and specific features required by Google.
- **Google e-Sign:** Currently included in eligible Workspace plans.

## 6. Future Roadmap (Phase 2 - Not Included in this Quote)
To ensure we deliver rapid value, the following items are scheduled for a future phase:
- Twilio + Google Voice routing for automated SMS on missed calls.
- Automated DocuSign API integration (replacing manual Google e-Sign).
- Insurance verification workflows.
- Appointment scheduling and billing status tracking.

---

**Acceptance of Quotation:**

_______________________________________
Signature (Transcend Counseling & Wellness)

_______________________________________
Date
