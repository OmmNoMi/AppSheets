# Schema — CmF SHG Women Entrepreneurs Study (Pilot App)
> **Always reflects CURRENT state.** When columns change, update in place.
> History of schema decisions goes in `Decisions.md`.

---

## Google Sheets Structure
| Tab Name | AppSheet Table | Type | Notes |
|----------|---------------|------|-------|
| AppUser | AppUser | System | Pre-seeded with OmmNoMi dev & study team accounts |
| AppViews | AppViews | System | Pre-seeded with navigation entries |
| AppVariables | AppVariables | System | Stores questions (`Q_*`), options (`OPT_*`), and translations |
| AppSettings | AppSettings | System | Project settings & target quotas |
| SamplingFrame | SamplingFrame | Master | Pre-loaded list of 4 pilot districts & target CLFs |
| Survey | Survey | Operational | Core parent record for each surveyed entrepreneur |
| ProfileAgency | ProfileAgency | Operational | Lens 1: Entrepreneur demographics, ownership & agency |
| BusinessInclination | BusinessInclination | Operational | Lens 2: Motivation, choices, challenges & aspirations |
| GenderObstacles | GenderObstacles | Operational | Lens 2b: Gender-based obstacles, area breakdown & solutions |
| EnterprisePerformance | EnterprisePerformance | Operational | Lens 3: Financials, capital trajectory, sales & margins |
| InstitutionalSupport | InstitutionalSupport | Operational | Lens 4: CLF/RGAVP training, credit & market support |
| MultiSelect | MultiSelect | Operational | Universal child junction table for multi-choice responses |
| SupervisorAudit | SupervisorAudit | Quality Control | Field verification and spot-check logs |

---

## System & Master Tables

### AppVariables — Questionnaire & Options Dictionary
| Column | Type | Description / Notes |
|--------|------|---------------------|
| ID | Text (Key) | `Q_P_01_00`, `OPT_TRD_01`, `Q_B_02_00`, `Q_G_01_00`, etc. |
| Category | Enum | `Question`, `Option`, `Config`, `Role` |
| SubCategory | Enum | `Profile`, `Business`, `GenderObstacles`, `Performance`, `Institutional`, `System` |
| Title | Text | Base English string |
| Title_hi | Text | Hindi translation |
| Title_local | Text | Local dialect translation (Vagdi / Marwari where applicable) |
| Description | Text | Parent pointer for cascading choices or prompt guidance |
| VariableList | LongText | Comma-separated list of child Option IDs |
| ValueControl | Enum | `Text`, `Number`, `Enum`, `EnumList`, `Date`, `Ref` |

---

### SamplingFrame — 4 Pilot Districts
| Column | Type | Notes |
|--------|------|-------|
| ID | Text (Key) | `DIST_CHURU`, `DIST_DAUSA`, `DIST_DUNGARPUR`, `DIST_BARAN` |
| DistrictName | Text | Churu, Dausa, Dungarpur, Baran |
| AgroZone | Text | Arid West, Semi-Arid, Southern Tribal, Fertile East |
| EnterpriseDatasetRecords | Number | Churu (921), Dausa (493), Dungarpur (211), Baran (117) |
| TargetQuota | Number | 55 per district (Total 220 pilot sample) |
| ModelCLFStatus | Yes/No | TRUE (Registered under Coop Act, >3 yrs old) |

---

## Operational Tables

### Survey (Parent Table)
**Purpose**: Primary container for an entrepreneur's survey session.  
**Key Relationship**: Parent of `ProfileAgency`, `BusinessInclination`, `GenderObstacles`, `EnterprisePerformance`, `InstitutionalSupport`, and `MultiSelect`.

| Column | Type | Initial Value / App Formula | Editable_If | Notes |
|--------|------|----------------------------|-------------|-------|
| ID | Text (Key) | `UNIQUEID()` | `ISBLANK([_THIS])` | |
| SamplingID | Ref → SamplingFrame | | `TRUE` | Selected district |
| BlockName | Text | | `TRUE` | |
| GramPanchyat | Text | | `TRUE` | |
| VillageName | Text | | `TRUE` | |
| CLFName | Text | | `TRUE` | Model CLF |
| EntrepreneurName | Text | | `TRUE` | |
| ContactNumber | Phone | | `TRUE` | |
| EnterpriseTrade | Enum Ref → AppVariables | | `TRUE` | Kirana, Tailoring, Dairy, etc. |
| EnterpriseAgeCohort | Enum | | `TRUE` | 2-3 yrs, 3-4 yrs, 4-5 yrs, >5 yrs |
| EnterpriseCategory | Enum | | `TRUE` | New (>50% quota), Existing |
| Status | Enum | `"Draft"` | `TRUE` | Draft, Submitted, Verified, Rejected |
| InvestigatorID | Ref → AppUser | `ANY(Me[ID])` | `ISBLANK([_THIS])` | |
| CreatedOn | DateTime | `NOW()` | `ISBLANK([_THIS])` | |
| Latitude | Decimal | `HERE()[Latitude]` | `TRUE` | GPS validation |
| Longitude | Decimal | `HERE()[Longitude]` | `TRUE` | GPS validation |

---

### ProfileAgency (Lens 1)
| Column | Type | Notes |
|--------|------|-------|
| ID | Text (Key) | `UNIQUEID()` |
| SurveyID | Ref → Survey | IsPartOf = TRUE |
| CasteCategory | Enum | SC, ST, OBC, General |
| EducationLevel | Enum | Illiterate, Primary, Secondary, Higher Secondary, Graduate |
| OwnershipType | Enum | Self, Husband's Enterprise, Family Business, Women's Group |
| EmploymentPattern | Enum | Only Woman, Family Labor, Hired Paid Help |
| SmartphoneUsage | EnumList | Calls, Banking, SHG groups, UPI, Shopping, Social Media, Entertainment |
| InstitutionalRole | EnumList | SHG Member, VO Office Bearer, CLF Board, CRP, None |

---

### GenderObstacles (Lens 2b - From Data Analysis Prototype)
| Column | Type | Notes |
|--------|------|-------|
| ID | Text (Key) | `UNIQUEID()` |
| SurveyID | Ref → Survey | IsPartOf = TRUE |
| FacedGenderObstacles | Enum | Yes, No |
| ObstacleAreas | EnumList | Premises Denial, Safety, Material Pricing, Transport, Customer interaction, Recovery, etc. |
| AdoptedSolutions | EnumList | Male member purchases, Male member sales, Cash transactions only, Compromise |

---

### EnterprisePerformance (Lens 3)
| Column | Type | Notes |
|--------|------|-------|
| ID | Text (Key) | `UNIQUEID()` |
| SurveyID | Ref → Survey | IsPartOf = TRUE |
| InitialStartCapital | Price | Initial investment at setup (INR) |
| CurrentTotalCapital | Price | Total capital invested to date (INR) |
| FinancingSourcesReceived | EnumList | SHG loan, CIF, VO Bank, SVEP, Bank, Mahila Nidhi, Moneylender, Reinvested profit |
| MonthlySalesAvg | Price | Average monthly turnover (INR) |
| MonthlyProfitAvg | Price | Net monthly margin/profit (INR) |
| GrowthTrajectoryTag | Enum | High Growth, Stagnant, Declining, Survival Only |

---

### InstitutionalSupport (Lens 4)
| Column | Type | Notes |
|--------|------|-------|
| ID | Text (Key) | `UNIQUEID()` |
| SurveyID | Ref → Survey | IsPartOf = TRUE |
| TrainingReceived | Yes/No | Whether RGAVP/CLF training was attended |
| TrainingTypes | EnumList | Financial literacy, Technical skill, Marketing, Bookkeeping, Online selling, None |
| PerceivedTrainingUtility | Enum | Very Useful, Moderately Useful, Not Useful |
| MarketLinkageSupport | EnumList | Saras Mela, Local Haat, OBOP, Private Buyer, None |
| WorkingCapitalSufficiency | Enum | Yes, No |
