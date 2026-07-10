# NAVI-BLUJ — AppSheet Schema (v1.002769)
> Parsed: 7/11/2026, 12:44:09 AM | 420T / 10666C / 90S / 480V / 810A / 372FR
> Deployable: Yes | Runnable: Yes

## Tables
```
  _Per User Settings        src=native   sheet=?                    mode=UPDATES_ONLY
  Candidate                 src=google   sheet=Candidate            mode=ALL_CHANGES
  Onboarding                src=google   sheet=Onboarding           mode=ALL_CHANGES
  Employee                  src=google   sheet=Employee             mode=ALL_CHANGES
  Users                     src=google   sheet=Users                mode=ALL_CHANGES
  Review                    src=google   sheet=Review               mode=ALL_CHANGES
  Fleet                     src=google   sheet=Fleet                mode=ALL_CHANGES
  RosterFremont             src=google   sheet=RosterFremont        mode=ALL_CHANGES
  Everyday                  src=google   sheet=Everyday             mode=ALL_CHANGES
  Week                      src=google   sheet=Week                 mode=ALL_CHANGES
  PlanningFremont           src=google   sheet=PlanningFremont      mode=ALL_CHANGES
  Schedule                  src=google   sheet=Schedule             mode=ALL_CHANGES
  ActionsCalling            src=google   sheet=ActionsCalling       mode=ALL_CHANGES
  FleetAssignment           src=google   sheet=FleetAssignment      mode=ALL_CHANGES
  Inspection                src=google   sheet=Inspection           mode=ALL_CHANGES
  Performance               src=google   sheet=Performance          mode=ALL_CHANGES
  Setup                     src=google   sheet=Setup                mode=ALL_CHANGES
  Summary                   src=google   sheet=Summary              mode=ALL_CHANGES
  Hours                     src=google   sheet=Hours                mode=ALL_CHANGES
  EfficiencyFremont         src=google   sheet=EfficiencyFremont    mode=ALL_CHANGES
  WeeklyEmployee            src=google   sheet=WeeklyEmployee       mode=ALL_CHANGES
  ExtraMiles                src=google   sheet=ExtraMiles           mode=ALL_CHANGES
  LoadoutSummary            src=google   sheet=LoadoutSummary       mode=ALL_CHANGES
  Tasks                     src=google   sheet=Tasks                mode=ALL_CHANGES
  Scorecard                 src=google   sheet=Scorecard            mode=ALL_CHANGES
  POD                       src=google   sheet=POD                  mode=ALL_CHANGES
  Tenured                   src=google   sheet=Tenured              mode=ALL_CHANGES
  ADP                       src=google   sheet=ADP                  mode=ALL_CHANGES
  PayCal                    src=google   sheet=PayCal               mode=ALL_CHANGES
  Uniform                   src=google   sheet=Uniform              mode=ALL_CHANGES
  Criterion                 src=google   sheet=Criterion            mode=READ_ONLY
  WHC                       src=google   sheet=WHC                  mode=ALL_CHANGES
  DAReview                  src=google   sheet=DAReview             mode=ALL_CHANGES
  PerformanceGuidelines     src=google   sheet=PerformanceGuidelines mode=READ_ONLY
  Inventory                 src=google   sheet=Inventory            mode=ALL_CHANGES
  Incident                  src=google   sheet=Incident             mode=ALL_CHANGES
  Contact                   src=google   sheet=Contact              mode=ALL_CHANGES
  Injury                    src=google   sheet=Injury               mode=ALL_CHANGES
  IncidentDocuments         src=google   sheet=IncidentDocuments    mode=ALL_CHANGES
  ContactAssignment         src=google   sheet=ContactAssignment    mode=ALL_CHANGES
  WorkHistory               src=google   sheet=WorkHistory          mode=ALL_CHANGES
  IncidentNotes             src=google   sheet=IncidentNotes        mode=ALL_CHANGES
  AppSettings               src=google   sheet=AppSettings          mode=ALL_CHANGES
  Treatment                 src=google   sheet=Treatment            mode=ALL_CHANGES
  Followup                  src=google   sheet=Followup             mode=ALL_CHANGES
  IncidentForm              src=google   sheet=IncidentForm         mode=ALL_CHANGES
  AppViews                  src=google   sheet=AppViews             mode=UPDATES_ONLY
  AppTriggers               src=google   sheet=AppTriggers          mode=ALL_CHANGES
  Ads                       src=google   sheet=Ads                  mode=ALL_CHANGES
  Invoice                   src=google   sheet=Invoice              mode=ALL_CHANGES
  FleetDocs                 src=google   sheet=FleetDocs            mode=ALL_CHANGES
  AppVariables              src=google   sheet=AppVariables         mode=READ_ONLY
  Compliance                src=google   sheet=Compliance           mode=ALL_CHANGES
  Policy                    src=google   sheet=Policy               mode=ALL_CHANGES
  Premium                   src=google   sheet=Premium              mode=ALL_CHANGES
  Notice                    src=google   sheet=Notice               mode=ALL_CHANGES
  Repairs                   src=google   sheet=Repairs              mode=ALL_CHANGES
  Notes                     src=google   sheet=Notes                mode=ALL_CHANGES
  PlanningTracy             src=google   sheet=PlanningTracy        mode=ALL_CHANGES
  RosterTracy               src=google   sheet=RosterTracy          mode=ALL_CHANGES
  DOTAudit                  src=google   sheet=DOTAudit             mode=ALL_CHANGES
  CommonDocs                src=google   sheet=CommonDocs           mode=ALL_CHANGES
  EmployeeDocs              src=google   sheet=EmployeeDocs         mode=ALL_CHANGES
  JJKRenewals               src=google   sheet=JJKRenewals          mode=ALL_CHANGES
  WHC_Tracy                 src=google   sheet=WHC_Tracy            mode=ALL_CHANGES
  EmployeeAudit             src=google   sheet=EmployeeAudit        mode=ALL_CHANGES
  ImportRelayPaymentDetails src=google   sheet=ImportPaymentDetails mode=ALL_CHANGES
  ImportRelayTrips          src=google   sheet=ImportTrips          mode=ALL_CHANGES
  RelayRoutes               src=google   sheet=Routes               mode=ALL_CHANGES
  Notifications             src=google   sheet=Notifications        mode=ALL_CHANGES
  DOTLatestAuditRecord      src=google   sheet=DOTLatestAuditRecord mode=ALL_CHANGES
  Separation                src=google   sheet=Separation           mode=ALL_CHANGES
  Income                    src=google   sheet=Income               mode=ALL_CHANGES
  WSTDeliveredPackages      src=google   sheet=WSTDeliveredPackages mode=ALL_CHANGES
  WSTServiceDetails         src=google   sheet=WSTServiceDetails    mode=ALL_CHANGES
  WSTUnplannedDelays        src=google   sheet=WSTUnplannedDelays   mode=ALL_CHANGES
  WSTWeeklyReport           src=google   sheet=WSTWeeklyReport      mode=ALL_CHANGES
  Rentals                   src=google   sheet=Rentals              mode=ALL_CHANGES
  PayCheck                  src=google   sheet=PayCheck             mode=ALL_CHANGES
  KnowledgeArticles         src=google   sheet=KnowledgeArticles    mode=ALL_CHANGES
  EfficiencyTracy           src=google   sheet=EfficiencyTracy      mode=ALL_CHANGES
  WeeklyReport              src=google   sheet=WeeklyReport         mode=ALL_CHANGES
  DailyHours                src=google   sheet=DailyHours           mode=ALL_CHANGES
  Payroll                   src=google   sheet=Payroll              mode=ALL_CHANGES
  AMXLServices              src=google   sheet=AMXLServices         mode=ALL_CHANGES
  PayrollHours              src=google   sheet=PayrollHours         mode=ALL_CHANGES
  CallBackFremont           src=google   sheet=CallBackFremont      mode=ALL_CHANGES
  ADPReport                 src=google   sheet=ADPReport            mode=ALL_CHANGES
  DADaily                   src=google   sheet=DADaily              mode=ALL_CHANGES
  DailyAPIReport            src=google   sheet=DailyAPIReport       mode=ALL_CHANGES
  RoutesDaily               src=google   sheet=RoutesDaily          mode=ALL_CHANGES
  Worker5020                src=google   sheet=Worker5020           mode=ALL_CHANGES
  i9Tracking                src=google   sheet=i9Tracking           mode=ALL_CHANGES
  Attendance                src=google   sheet=Attendance           mode=ALL_CHANGES
  EverydayIssue             src=google   sheet=EverydayIssue        mode=ALL_CHANGES
  ModifiedDuty              src=google   sheet=ModifiedDuty         mode=ALL_CHANGES
  CDF                       src=google   sheet=CDF                  mode=ALL_CHANGES
  SMSFremont                src=google   sheet=SMSFremont           mode=ALL_CHANGES
  SMSTracy                  src=google   sheet=SMSTracy             mode=ALL_CHANGES
  Process for UpdateOnbaodingstatus Process Table src=native   sheet=?                    mode=READ_ONLY
  Check if [Onboarding Status]is not Training Scheduled Output src=native   sheet=?                    mode=READ_ONLY
  Check if [Background] is Meet Requirement and drug test is result negative, JJK Audit Qualified Output src=native   sheet=?                    mode=READ_ONLY
  Check if [Training Date] is blank Output src=native   sheet=?                    mode=READ_ONLY
  Set [OnboardingStatus] to Schedule Training Output src=native   sheet=?                    mode=READ_ONLY
  Set [OnboaridngStatus] to Schedule Training Output src=native   sheet=?                    mode=READ_ONLY
  if failed Output          src=native   sheet=?                    mode=READ_ONLY
  New step Output           src=native   sheet=?                    mode=READ_ONLY
  set Onboarding status to Training scheduled Output src=native   sheet=?                    mode=READ_ONLY
  Check if [Background] is not Report Review Output src=native   sheet=?                    mode=READ_ONLY
  Set [Onboarding Status] to Background Failed Output src=native   sheet=?                    mode=READ_ONLY
  Check if [DrugTest] is Result Positive Output src=native   sheet=?                    mode=READ_ONLY
  Set [Onboarding Status] to Drug Test Failed Output src=native   sheet=?                    mode=READ_ONLY
  Check if [Onboarding Status] not set with responses 2 Output src=native   sheet=?                    mode=READ_ONLY
  Check if [Background] is pending Output src=native   sheet=?                    mode=READ_ONLY
  Set [Onboarding Status] to Waiting for Results Output src=native   sheet=?                    mode=READ_ONLY
  Set [Onboarding Status] to Followup Output src=native   sheet=?                    mode=READ_ONLY
  Process for SetDecisiontoScheduled Process Table src=native   sheet=?                    mode=READ_ONLY
  Set [Decision] to Scheduled Output src=native   sheet=?                    mode=READ_ONLY
  Process for MoveCandidateToOnboarding Process Table src=native   sheet=?                    mode=READ_ONLY
  StartOnboarding Output    src=native   sheet=?                    mode=READ_ONLY
  Process for AddEmployeeandCreateTasks Process Table src=native   sheet=?                    mode=READ_ONLY
  New step Output 2         src=native   sheet=?                    mode=READ_ONLY
  MoveToEmployee 2 Output   src=native   sheet=?                    mode=READ_ONLY
  CheckIfUpgradeEmployee Output src=native   sheet=?                    mode=READ_ONLY
  MarkAsDOTDriver Output    src=native   sheet=?                    mode=READ_ONLY
  Process for ActionCallerTracy Process Table src=native   sheet=?                    mode=READ_ONLY
  New step Output 3         src=native   sheet=?                    mode=READ_ONLY
  RosterCreationTracy Output src=native   sheet=?                    mode=READ_ONLY
  First Step Duplicate Remover Output src=native   sheet=?                    mode=READ_ONLY
  New step 2 Output         src=native   sheet=?                    mode=READ_ONLY
  Process for CreateScheduleForNewEmployee - 1 Process Table src=native   sheet=?                    mode=READ_ONLY
  RecreateEmployeeSchedule Output src=native   sheet=?                    mode=READ_ONLY
  Process for When an employee is terminated Process Table src=native   sheet=?                    mode=READ_ONLY
  RemovefromSchedule Output src=native   sheet=?                    mode=READ_ONLY
  RemoveFleetAssignment Output src=native   sheet=?                    mode=READ_ONLY
  RemoveRelatedRoster Output src=native   sheet=?                    mode=READ_ONLY
  RemoveWeeklyMessage Output src=native   sheet=?                    mode=READ_ONLY
  Process for UpdateEmployeeStatus - 1 Process Table src=native   sheet=?                    mode=READ_ONLY
  New step Output 4         src=native   sheet=?                    mode=READ_ONLY
  Process for AddToEverdayforTraining Process Table src=native   sheet=?                    mode=READ_ONLY
  New step Output 5         src=native   sheet=?                    mode=READ_ONLY
  Process for UpdateHoursPreviousPayroll Process Table src=native   sheet=?                    mode=READ_ONLY
  DeleteCurrentHours Output src=native   sheet=?                    mode=READ_ONLY
  CreateLastPayrollHours Output src=native   sheet=?                    mode=READ_ONLY
  Process for UpdateWeeklyEmployee Process Table src=native   sheet=?                    mode=READ_ONLY
  CheckforemployeeweeklyRow Output src=native   sheet=?                    mode=READ_ONLY
  AddNewRow Output          src=native   sheet=?                    mode=READ_ONLY
  Update Existing Rows Output src=native   sheet=?                    mode=READ_ONLY
  Process for StartTermination Process Table src=native   sheet=?                    mode=READ_ONLY
  TurnOFFTheSchedule Output src=native   sheet=?                    mode=READ_ONLY
  RemoveWeeklyText Output   src=native   sheet=?                    mode=READ_ONLY
  create the Separation Entry for the Employee Output src=native   sheet=?                    mode=READ_ONLY
  Process for CreateRepeatTask Process Table src=native   sheet=?                    mode=READ_ONLY
  CreateRepeatTask Output   src=native   sheet=?                    mode=READ_ONLY
  Process for WhenScorecardIsimportedAddtoPerformance Process Table src=native   sheet=?                    mode=READ_ONLY
  AddRowsPerformance Output src=native   sheet=?                    mode=READ_ONLY
  Process for UpdateEMployeeinPerformance Process Table src=native   sheet=?                    mode=READ_ONLY
  UpdatePerformance Output  src=native   sheet=?                    mode=READ_ONLY
  Process for UpdateHealthBenefitEnrollment Process Table src=native   sheet=?                    mode=READ_ONLY
  New step Output 6         src=native   sheet=?                    mode=READ_ONLY
  Process for PRCSentCreateTasksforDispatch Process Table src=native   sheet=?                    mode=READ_ONLY
  CreateTaskforDispatch Output src=native   sheet=?                    mode=READ_ONLY
  AddTransporterID Output   src=native   sheet=?                    mode=READ_ONLY
  Process for WhenADPDataisimported Process Table src=native   sheet=?                    mode=READ_ONLY
  DeletePayCal Output       src=native   sheet=?                    mode=READ_ONLY
  AddRowsToPayCal Output    src=native   sheet=?                    mode=READ_ONLY
  Process for DeleteReports Process Table src=native   sheet=?                    mode=READ_ONLY
  DeleteADPData Output      src=native   sheet=?                    mode=READ_ONLY
  DeleteTenured Output      src=native   sheet=?                    mode=READ_ONLY
  DeletePOD Output          src=native   sheet=?                    mode=READ_ONLY
  DeleteScorecard Output    src=native   sheet=?                    mode=READ_ONLY
  DeletePaycal Output 2     src=native   sheet=?                    mode=READ_ONLY
  Process for WhenPODIsimportedAddtoPerformance Process Table src=native   sheet=?                    mode=READ_ONLY
  AddRowsPerformance Output 2 src=native   sheet=?                    mode=READ_ONLY
  Process for UpdatePayCal Process Table src=native   sheet=?                    mode=READ_ONLY
  New step Output 7         src=native   sheet=?                    mode=READ_ONLY
  Process for CDVTraining Process Table src=native   sheet=?                    mode=READ_ONLY
  UpdateCDVSchedule Output  src=native   sheet=?                    mode=READ_ONLY
  Process for New Bot 5 - 1 Process Table src=native   sheet=?                    mode=READ_ONLY
  New step Output 8         src=native   sheet=?                    mode=READ_ONLY
  Process for CreateWeeklyEmployee Process Table src=native   sheet=?                    mode=READ_ONLY
  DeleteWeeklyEmployee Output src=native   sheet=?                    mode=READ_ONLY
  Check if employee is scheduled Output src=native   sheet=?                    mode=READ_ONLY
  CreateThisWeek Output     src=native   sheet=?                    mode=READ_ONLY
  CreateThisWeekPlusOne Output src=native   sheet=?                    mode=READ_ONLY
  CreateThisWeekPlusTwo Output src=native   sheet=?                    mode=READ_ONLY
  CreateThisWeekPlusThree Output src=native   sheet=?                    mode=READ_ONLY
  Process for ScorecardPDF Process Table src=native   sheet=?                    mode=READ_ONLY
  Process for AllScorecard Process Table src=native   sheet=?                    mode=READ_ONLY
  Process for UpdateHoursCurrentPayroll Process Table src=native   sheet=?                    mode=READ_ONLY
  Update Employee Write Up count Output src=native   sheet=?                    mode=READ_ONLY
  DeleteCurrentHours Output 2 src=native   sheet=?                    mode=READ_ONLY
  CreateCurrentHours Output src=native   sheet=?                    mode=READ_ONLY
  Process for WHC_Calculation Process Table src=native   sheet=?                    mode=READ_ONLY
  [Attendance]=&quot;Present&quot; Output src=native   sheet=?                    mode=READ_ONLY
  Check if ID is there in WHC already or Not Output src=native   sheet=?                    mode=READ_ONLY
  Action for Update the WHC Output src=native   sheet=?                    mode=READ_ONLY
  Add this to WHC Action - 1 Output src=native   sheet=?                    mode=READ_ONLY
  update roster entry fremont Output src=native   sheet=?                    mode=READ_ONLY
  update roster entry tracy Output src=native   sheet=?                    mode=READ_ONLY
  Delete the WHC if not Present Output src=native   sheet=?                    mode=READ_ONLY
  Process for Scheduled_Updates_WHC Process Table src=native   sheet=?                    mode=READ_ONLY
  not needed rows Output    src=native   sheet=?                    mode=READ_ONLY
  Process for GenerateDAReview Process Table src=native   sheet=?                    mode=READ_ONLY
  If type is Coaching Output src=native   sheet=?                    mode=READ_ONLY
  If Type is Write Up and Metric is Attendance Output src=native   sheet=?                    mode=READ_ONLY
  If Type is Write Up and Metric is Behavior Output src=native   sheet=?                    mode=READ_ONLY
  If Type is Write Up and Metric is Contact Compliance Output src=native   sheet=?                    mode=READ_ONLY
  Check if Metric is Customer Delivery Feedback Output src=native   sheet=?                    mode=READ_ONLY
  If Type is Write Up and Metric is Delivery Completion Output src=native   sheet=?                    mode=READ_ONLY
  If Type is Write Up and Metric is DVIC Quality Output src=native   sheet=?                    mode=READ_ONLY
  If Type is Write Up and Metric is Efficiency Output src=native   sheet=?                    mode=READ_ONLY
  If Type is Write Up and Metric is Fleet Damage Output src=native   sheet=?                    mode=READ_ONLY
  If Type is Write Up and Metric is Delivery Success Behaviors Output src=native   sheet=?                    mode=READ_ONLY
  If Type is Write Up and Metric is Meal Break Output src=native   sheet=?                    mode=READ_ONLY
  If Type is Write Up and Metric is Mentor Output src=native   sheet=?                    mode=READ_ONLY
  Check if it is write up for Photo Quality Output src=native   sheet=?                    mode=READ_ONLY
  Check if it is write up for Property Damage Output src=native   sheet=?                    mode=READ_ONLY
  Check if it is write up for Proper Park Sequence Output src=native   sheet=?                    mode=READ_ONLY
  Check if it is write up for Safety Output src=native   sheet=?                    mode=READ_ONLY
  Check if it is write up for Tier Infraction Output src=native   sheet=?                    mode=READ_ONLY
  Check if it is write up for weigh scale Output src=native   sheet=?                    mode=READ_ONLY
  Process for HourlyWHCUpdate Process Table src=native   sheet=?                    mode=READ_ONLY
  WHC Update Output         src=native   sheet=?                    mode=READ_ONLY
  Process for IncidentReportingBot Process Table src=native   sheet=?                    mode=READ_ONLY
  Process for IncidentCreatedUpdated Process Table src=native   sheet=?                    mode=READ_ONLY
  Vehicle Report Output     src=native   sheet=?                    mode=READ_ONLY
  Worker compensation Output src=native   sheet=?                    mode=READ_ONLY
  any check to generate incident overview Output src=native   sheet=?                    mode=READ_ONLY
  CheckIf SendNoticeAndDWCEmail Output src=native   sheet=?                    mode=READ_ONLY
  Update Email Status for WC Output src=native   sheet=?                    mode=READ_ONLY
  Email GM Output           src=native   sheet=?                    mode=READ_ONLY
  Process for TriggerForIncidentForm Process Table src=native   sheet=?                    mode=READ_ONLY
  Update LastEditOn in Incident forms where incidentID is blank Output src=native   sheet=?                    mode=READ_ONLY
  Process for DailyAttendanceWriteUps Process Table src=native   sheet=?                    mode=READ_ONLY
  Check if the Attendnace Writeup is already created Output src=native   sheet=?                    mode=READ_ONLY
  Create WriteUp for attendance Output src=native   sheet=?                    mode=READ_ONLY
  Process for TriggerHourlyActions - 1 Process Table src=native   sheet=?                    mode=READ_ONLY
  Some conditions if need to be evaluated Output src=native   sheet=?                    mode=READ_ONLY
  Update Hourly hours rows Output src=native   sheet=?                    mode=READ_ONLY
  Some Condition for WHC Output src=native   sheet=?                    mode=READ_ONLY
  Delete old whc Output     src=native   sheet=?                    mode=READ_ONLY
  Process for TriggerDailyActions - 1 Process Table src=native   sheet=?                    mode=READ_ONLY
  Create Missing Efficiency row if any Output src=native   sheet=?                    mode=READ_ONLY
  Create Efficiency Row missing for past 14 days Output src=native   sheet=?                    mode=READ_ONLY
  Check any condition if required Output src=native   sheet=?                    mode=READ_ONLY
  Trigger Efficiency Update for SecondLast Week Output src=native   sheet=?                    mode=READ_ONLY
  Trigger Efficiency Update for Last Week Output src=native   sheet=?                    mode=READ_ONLY
  Trigger Efficiency Update for This Week Output src=native   sheet=?                    mode=READ_ONLY
  Check any condition if required 2 Output src=native   sheet=?                    mode=READ_ONLY
  Create Trigger for updating Last week whc Output src=native   sheet=?                    mode=READ_ONLY
  Create Trigger for updating this week WHC Output src=native   sheet=?                    mode=READ_ONLY
  Check if there is planning for 7th day Output src=native   sheet=?                    mode=READ_ONLY
  Add a new Planning Row Fremont Output src=native   sheet=?                    mode=READ_ONLY
  Check if there is planning for 7th day Tracy Output src=native   sheet=?                    mode=READ_ONLY
  Add a new Planning Row Tracy Output src=native   sheet=?                    mode=READ_ONLY
  any conditions to be checked Output src=native   sheet=?                    mode=READ_ONLY
  Update all fleet Output   src=native   sheet=?                    mode=READ_ONLY
  Call for the WHC Tracy Calculations Output src=native   sheet=?                    mode=READ_ONLY
  Call for the WHC Tracy Trigger Output src=native   sheet=?                    mode=READ_ONLY
  Process for TriggerCalledFromTheApp Process Table src=native   sheet=?                    mode=READ_ONLY
  CheckIfItIs Output        src=native   sheet=?                    mode=READ_ONLY
  If Event is AppTrigger for Recalculating Weekly WHC Output src=native   sheet=?                    mode=READ_ONLY
  Delete All WHC Rows for that week Output src=native   sheet=?                    mode=READ_ONLY
  Recreate All WHC Rows for the Week Day1 Output src=native   sheet=?                    mode=READ_ONLY
  Recreate All WHC Rows for the Week Day2 Output src=native   sheet=?                    mode=READ_ONLY
  Recreate All WHC Rows for the Week Day3 Output src=native   sheet=?                    mode=READ_ONLY
  Recreate All WHC rows for the Week Day4 Output src=native   sheet=?                    mode=READ_ONLY
  Recreate All WHC rows for the Week Day5 Output src=native   sheet=?                    mode=READ_ONLY
  Recreate All WHC rows for the Week Day6 Output src=native   sheet=?                    mode=READ_ONLY
  Recreate All WHC rows for the Week Day7 Output src=native   sheet=?                    mode=READ_ONLY
  If The Trigger is AppTrigger for Recalculating Weekly Efficiency Output src=native   sheet=?                    mode=READ_ONLY
  Update the Efficiency Rows for the Week Output src=native   sheet=?                    mode=READ_ONLY
  Check if the trigger is for Weekly Planning Output src=native   sheet=?                    mode=READ_ONLY
  Add Planning for the selected week Day1 Output src=native   sheet=?                    mode=READ_ONLY
  AppTrigger for Updating weekly Employee Output src=native   sheet=?                    mode=READ_ONLY
  Delete all weekly empoloyee for this week Output src=native   sheet=?                    mode=READ_ONLY
  set weekyearid for all scheduled employee Output src=native   sheet=?                    mode=READ_ONLY
  Create Weekly employee Output src=native   sheet=?                    mode=READ_ONLY
  App Trigger for Email Notice for Absent AE_AbsentNotice Output src=native   sheet=?                    mode=READ_ONLY
  If trigger is for opening file Output src=native   sheet=?                    mode=READ_ONLY
  If trigger is for closing file Output src=native   sheet=?                    mode=READ_ONLY
  Timesheets Output         src=native   sheet=?                    mode=READ_ONLY
  WHC on Everyday Output    src=native   sheet=?                    mode=READ_ONLY
  Run WHC Everyday Appscript Output src=native   sheet=?                    mode=READ_ONLY
  WHC on Fremont Roster Output src=native   sheet=?                    mode=READ_ONLY
  Run WHC Appscript for Fremont Roster Output src=native   sheet=?                    mode=READ_ONLY
  WHC for Tracy Roster Output src=native   sheet=?                    mode=READ_ONLY
  Run WHC Appscript for Tracy Roster Output src=native   sheet=?                    mode=READ_ONLY
  RecreateEmployeeSchedule Output 2 src=native   sheet=?                    mode=READ_ONLY
  CallSchedulingAppscript Output src=native   sheet=?                    mode=READ_ONLY
  CreateWeekSchedule Output src=native   sheet=?                    mode=READ_ONLY
  ReCreateParticularWeekSchedule Output src=native   sheet=?                    mode=READ_ONLY
  ImportRelayTrips Output   src=native   sheet=?                    mode=READ_ONLY
  RunAppscriptForImport Output src=native   sheet=?                    mode=READ_ONLY
  ImportRelayPaymentDetails Output src=native   sheet=?                    mode=READ_ONLY
  MatchRelayPayments Output src=native   sheet=?                    mode=READ_ONLY
  If trigger is for export services Output src=native   sheet=?                    mode=READ_ONLY
  Trigger for DailyHours Output src=native   sheet=?                    mode=READ_ONLY
  Call Appscript for DailyHours calculation Output src=native   sheet=?                    mode=READ_ONLY
  Trigger Payroll Hours Output src=native   sheet=?                    mode=READ_ONLY
  appsheet for payroll calculation Output src=native   sheet=?                    mode=READ_ONLY
  Update Payroll Entry for the Payroll Output src=native   sheet=?                    mode=READ_ONLY
  Create DWC_1 Form Output  src=native   sheet=?                    mode=READ_ONLY
  New step Output 9         src=native   sheet=?                    mode=READ_ONLY
  Run trigger for DA Daily Import Output src=native   sheet=?                    mode=READ_ONLY
  Run DA Daily Import script Output src=native   sheet=?                    mode=READ_ONLY
  Run trigger for Routes Daily Import Output src=native   sheet=?                    mode=READ_ONLY
  Run Routes Daily Import Output src=native   sheet=?                    mode=READ_ONLY
  Run trigger for Routes ADP Report Output src=native   sheet=?                    mode=READ_ONLY
  Run script ADP Daily Output src=native   sheet=?                    mode=READ_ONLY
  Run trigger for API Plugin Daily Output src=native   sheet=?                    mode=READ_ONLY
  Run script for API Plugin Output src=native   sheet=?                    mode=READ_ONLY
  Generate CDF Dispute Data Output src=native   sheet=?                    mode=READ_ONLY
  Run CDF Appscript Output  src=native   sheet=?                    mode=READ_ONLY
  GenerateDailySMS Output   src=native   sheet=?                    mode=READ_ONLY
  GenerateSMSForDaily Output src=native   sheet=?                    mode=READ_ONLY
  GenerateWeeklySMS Output  src=native   sheet=?                    mode=READ_ONLY
  GenerateWeeklyScheduleSMS Output src=native   sheet=?                    mode=READ_ONLY
  SendSMS Output            src=native   sheet=?                    mode=READ_ONLY
  SendMessagesViaAPI Output src=native   sheet=?                    mode=READ_ONLY
  ClearSMSSheet Output      src=native   sheet=?                    mode=READ_ONLY
  ClearTheSMSSheet Output   src=native   sheet=?                    mode=READ_ONLY
  Process for TriggerWeeklyActionsMon5am - 1 Process Table src=native   sheet=?                    mode=READ_ONLY
  check any condition Output src=native   sheet=?                    mode=READ_ONLY
  Create new Invoice row Output src=native   sheet=?                    mode=READ_ONLY
  Remove the JJK Renewal Output src=native   sheet=?                    mode=READ_ONLY
  Delete Completed Entry Output src=native   sheet=?                    mode=READ_ONLY
  Process for UpdatePolicy Process Table src=native   sheet=?                    mode=READ_ONLY
  Recalculate policy info Output src=native   sheet=?                    mode=READ_ONLY
  Process for TriggerDailyActionsEmails - 1 Process Table src=native   sheet=?                    mode=READ_ONLY
  any condition to be evaluated Output src=native   sheet=?                    mode=READ_ONLY
  Process for UpdateInEveryday - 1 Process Table src=native   sheet=?                    mode=READ_ONLY
  Check if the new status is marked as absent Output src=native   sheet=?                    mode=READ_ONLY
  call the absent email notice trigger Output src=native   sheet=?                    mode=READ_ONLY
  trigger is set Output     src=native   sheet=?                    mode=READ_ONLY
  Call Send Email Trigger Output src=native   sheet=?                    mode=READ_ONLY
  TracyRouteStatusChanged Output src=native   sheet=?                    mode=READ_ONLY
  TracyRouteUpdateStatus Output src=native   sheet=?                    mode=READ_ONLY
  Process for ActionCallerFremont Process Table src=native   sheet=?                    mode=READ_ONLY
  New step Output 10        src=native   sheet=?                    mode=READ_ONLY
  RosterCreation Output     src=native   sheet=?                    mode=READ_ONLY
  First Step Duplicate Remover Output 2 src=native   sheet=?                    mode=READ_ONLY
  New step 2 Output 2       src=native   sheet=?                    mode=READ_ONLY
  Process for UnassignFleetForCanceled Process Table src=native   sheet=?                    mode=READ_ONLY
  New step Output 11        src=native   sheet=?                    mode=READ_ONLY
  Process for UpdateVehicleStatus Process Table src=native   sheet=?                    mode=READ_ONLY
  New step Output 12        src=native   sheet=?                    mode=READ_ONLY
  UpdateTruckStatus Output  src=native   sheet=?                    mode=READ_ONLY
  AddNotesFromDOTAuditToFleet Output src=native   sheet=?                    mode=READ_ONLY
  Process for UpdateInspectionAndRouteStatus Process Table src=native   sheet=?                    mode=READ_ONLY
  New step Output 13        src=native   sheet=?                    mode=READ_ONLY
  Process for TriggerWeeklySat5AM Process Table src=native   sheet=?                    mode=READ_ONLY
  check any condition Output 2 src=native   sheet=?                    mode=READ_ONLY
  Create Weekly Schedule - Fremont Output src=native   sheet=?                    mode=READ_ONLY
  Process for TriggerWeeklySat6AM Process Table src=native   sheet=?                    mode=READ_ONLY
  check any condition Output 3 src=native   sheet=?                    mode=READ_ONLY
  Create Weekly Schedule - Fremont Output 2 src=native   sheet=?                    mode=READ_ONLY
  Process for NewFleetAdded - 1 Process Table src=native   sheet=?                    mode=READ_ONLY
  AddVehicleLatestDOTAuditList Output src=native   sheet=?                    mode=READ_ONLY
  AddFleetToDOTLatestAudit Output src=native   sheet=?                    mode=READ_ONLY
  Process for UpdateRecentDOTStatus Process Table src=native   sheet=?                    mode=READ_ONLY
  UpdateAuditDateTime Output src=native   sheet=?                    mode=READ_ONLY
  Process for Separation Process Table src=native   sheet=?                    mode=READ_ONLY
  Update - Delete Existing Files Output src=native   sheet=?                    mode=READ_ONLY
  Delete Paycheck Output    src=native   sheet=?                    mode=READ_ONLY
  Delete Change Notice Output src=native   sheet=?                    mode=READ_ONLY
  Delete Email Preview Output src=native   sheet=?                    mode=READ_ONLY
  Create the PayCheck Output src=native   sheet=?                    mode=READ_ONLY
  Create the Change Notice Output src=native   sheet=?                    mode=READ_ONLY
  If reason is VR, NCNS, JA,WA,VREA Output src=native   sheet=?                    mode=READ_ONLY
  If reason is TERM, LO Output src=native   sheet=?                    mode=READ_ONLY
  Create Email Preview Output src=native   sheet=?                    mode=READ_ONLY
  If Voluntary Resignation Output src=native   sheet=?                    mode=READ_ONLY
  If Voluntary Resignation Early Acceptance Output src=native   sheet=?                    mode=READ_ONLY
  If Job Abandonment Output src=native   sheet=?                    mode=READ_ONLY
  If No Call No Show Output src=native   sheet=?                    mode=READ_ONLY
  If Termination Output     src=native   sheet=?                    mode=READ_ONLY
  If Sep_WA Output          src=native   sheet=?                    mode=READ_ONLY
  Send Email Output         src=native   sheet=?                    mode=READ_ONLY
  If VR Output              src=native   sheet=?                    mode=READ_ONLY
  IF VREA Output            src=native   sheet=?                    mode=READ_ONLY
  If Sep_NCNS Output        src=native   sheet=?                    mode=READ_ONLY
  If Sep_JA Output          src=native   sheet=?                    mode=READ_ONLY
  If Sep_Term &amp; LO Output src=native   sheet=?                    mode=READ_ONLY
  If Sep_WorkAuth Output    src=native   sheet=?                    mode=READ_ONLY
  Change Email Status to Sent Output src=native   sheet=?                    mode=READ_ONLY
  Employee Status terminated Output src=native   sheet=?                    mode=READ_ONLY
  Process for AddFleetNotes Process Table src=native   sheet=?                    mode=READ_ONLY
  Fleet Status Changed Output src=native   sheet=?                    mode=READ_ONLY
  Add notes Output          src=native   sheet=?                    mode=READ_ONLY
  Process for ImportDataProcess Process Table src=native   sheet=?                    mode=READ_ONLY
  Transfer Rows Output      src=native   sheet=?                    mode=READ_ONLY
  Delete Rows Output        src=native   sheet=?                    mode=READ_ONLY
  Process for FormGenerator Process Table src=native   sheet=?                    mode=READ_ONLY
  Form 5020 Output          src=native   sheet=?                    mode=READ_ONLY
  Generate Form 5021 Output src=native   sheet=?                    mode=READ_ONLY
  Action Done Output        src=native   sheet=?                    mode=READ_ONLY
  Generate Osha Form Output src=native   sheet=?                    mode=READ_ONLY
  Generate Osha 301 Form Output src=native   sheet=?                    mode=READ_ONLY
  Action as Done Output     src=native   sheet=?                    mode=READ_ONLY
  Process for Movei9Documents Process Table src=native   sheet=?                    mode=READ_ONLY
  IsActionChanged Output    src=native   sheet=?                    mode=READ_ONLY
  RunI9MoveAction Output    src=native   sheet=?                    mode=READ_ONLY
  Process for TriggerDaily12Noon Process Table src=native   sheet=?                    mode=READ_ONLY
  Run Complaince Output     src=native   sheet=?                    mode=READ_ONLY
  check any condition Output 4 src=native   sheet=?                    mode=READ_ONLY
  Process for TriggerDaily9PMDaily Process Table src=native   sheet=?                    mode=READ_ONLY
  Run Complaince Output 2   src=native   sheet=?                    mode=READ_ONLY
  check any condition Output 5 src=native   sheet=?                    mode=READ_ONLY
  Process for TriggerDaily3PMNoon Process Table src=native   sheet=?                    mode=READ_ONLY
  Run Complaince Output 3   src=native   sheet=?                    mode=READ_ONLY
  check any condition Output 6 src=native   sheet=?                    mode=READ_ONLY
  Process for CreateModifyDutyLetter Process Table src=native   sheet=?                    mode=READ_ONLY
  SendEmail Output          src=native   sheet=?                    mode=READ_ONLY
  ChangeEmailStatus Output  src=native   sheet=?                    mode=READ_ONLY
  Process for 2FAGen Process Table src=native   sheet=?                    mode=READ_ONLY
  2FARequested Output       src=native   sheet=?                    mode=READ_ONLY
  2FACreation Output        src=native   sheet=?                    mode=READ_ONLY
  Set2FACode Output         src=native   sheet=?                    mode=READ_ONLY
```

## Columns
### _Per User Settings (15 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  _EMAIL: Email [HIDDEN]
  _NAME: Name [HIDDEN]
  _LOCATION: LatLong [HIDDEN]
  Options Heading: Show [HIDDEN,RO]
  AccessKey: Text (→"="Login Access Key"")
  Option 2: Number [HIDDEN]
  Country Option: Enum [HIDDEN] [Values: 'Australia', 'Brazil', 'Canada']
  Language Option: Enum [HIDDEN] [Values: 'English', 'French', 'Tamil']
  Option 5: Text [HIDDEN]
  Option 6: Number [HIDDEN]
  Option 7: Text [HIDDEN]
  Option 8: Text [HIDDEN]
  Option 9: Text [HIDDEN]
  _THISUSER: Text [HIDDEN] = onlyvalue
```

### Candidate (22 cols)
[Inherits all 23 columns from Table: Process for SetDecisiontoScheduled Process Table]
+ Modified/Added Columns:
  - _RowNumber: Number

### Onboarding (64 cols)
[Inherits all 68 columns from Table: Process for AddEmployeeandCreateTasks Process Table]
+ Modified/Added Columns:
  - _RowNumber: Number

### Employee (85 cols)
[Inherits all 91 columns from Table: Process for CreateWeeklyEmployee Process Table]
+ Modified/Added Columns:
  - _RowNumber: Number

### Users (39 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  UserID: Text = =uniqueid()
  Name: Name
  Email: Enum
  AccessKey: Text { Logic: [ShowIf]="=context("view")="Users_Form"" }
  Designation: Text
  Role: Enum { Logic: [ValidIf]="=sort(
  split(lookup(
    "AppUserRoles ",
    "AppVariables",
    "ID",
    "MultiValues"
  ),
  ","),
  false
)" }
  Employee: Enum
  ReportsTo: Enum
  Status: Enum
  Image: Image
  Time: Text
  Tasks: Ref
  WorkingDays: DateTime = NOW()
  Location: EnumList { Logic: [ValidIf]="=sort(
  split(lookup(
    "CompanyLocation",
    "AppVariables",
    "ID",
    "MultiValues"
  ),
  ","),
  false
)" }
  LastEditBy: Enum = =Any(Me[UserID]) { Logic: [EditIf]="=isblank([LastEditBy])" } { Slices Cross-Ref: Me -> Users }
  LastEditOn: DateTime = =Now() { Logic: [EditIf]="=isblank([LastEditOn])" }
  TasksCompleted: Number [RO]
  TotalTasksToday: Number [RO]
  ShowProgress: Text [RO]
  TaskPercentage: Number [RO]
  Related Tasks: List [RO,VC]
  Related Candidates: List [RO,VC]
  Related Everydays: List [RO,VC]
  Related Candidates By UpdatedBy: List [RO,VC]
  Related Candidates By CandidateAddedBy: List [RO,VC]
  Related Inspections: List [RO,VC]
  Related Repairs: List [RO,VC]
  Related Notes: List [RO,VC]
  Related RosterFremonts: List [RO,VC]
  Related RosterTracys: List [RO,VC]
  Related Notices: List [RO,VC]
  Related RelayRoutes: List [RO,VC]
  Related EmployeeDocs: List [RO,VC]
  Related KnowledgeArticles By UpdatedBy: List [RO,VC]
  Related KnowledgeArticles By CreatedBy: List [RO,VC]
  Related Worker5020s By CreatedBy: List [RO,VC]
  Related Worker5020s By UpdatedBy: List [RO,VC]
  Related Attendances: List [RO,VC]
```

### Review (10 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  UID: Text = =uniqueid()
  Name: Name
  Phone: Phone
  Position: Enum
  Location: Enum
  Formatted Phone Number: Text [RO]
  Status: Enum [RO] [Values: 'No Response', 'Rejected', 'Selected', 'Not Interested', 'No Show', 'Scheduled']
  CandidateID: Number [RO]
  Date: Date [RO]
```

### Fleet (42 cols)
[Inherits all 44 columns from Table: Process for NewFleetAdded - 1 Process Table]
+ Modified/Added Columns:
  - _RowNumber: Number

### RosterFremont (38 cols)
[Inherits all 39 columns from Table: Process for UnassignFleetForCanceled Process Table]
+ Modified/Added Columns:
  - _RowNumber: Number

### Everyday (84 cols)
[Inherits all 91 columns from Table: Process for WHC_Calculation Process Table]
+ Modified/Added Columns:
  - _RowNumber: Number

### Week (34 cols)
[Inherits all 34 columns from Table: Process for AllScorecard Process Table]
+ Modified/Added Columns:
  - _RowNumber: Number

### PlanningFremont (27 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  PlanningID: Text = =left([Location],1)& text([Date],"yy")& text([Date],"mm")& text([Date],"dd")
  SummaryID: Number
  WeekNumber: Ref [RO] = =index(
  select(
    Week[WeekYearID],
    and(
      [StartDate]<=[_THISROW].[Date],
      [EndDate]>=[_THISROW].[Date]
    )
  ),
  1
)
  Date: Date = TODAY()
  VanRoutes: Number (→"=Scheduled Van Routes")
  BoxTruckRoutes: Number (→"=Scheduled Box Truck Routes")
  UDSRoutes: Number (→"=Scheduled UDS Routes")
  MARoutes: Number (→"=Scheduled MA Routes")
  Location: Text
  ExtraDrivers: Number [RO] (→"=Extra Drivers")
  WeekDay: Number [RO] (→"="Week Day"")
  DriversRostered: LongText [RO] (→"=Routes Rostered")
  Extras: LongText [RO]
  Other: LongText [RO]
  WorkingVans: LongText [RO] (→"="Working Vans for " & [Date]")
  Ride Along: Number [RO]
  Trainee: Number [RO]
  VanDriversShow: Number [RO] (→"=Van Drivers")
  BTDriversShow: Text [RO] (→"=BT Drivers")
  UDSDriversShow: Text [RO] (→"=UDS Drivers")
  HelpersShow: Text [RO] (→"=Helpers")
  VanDriversCount: Number [RO]
  BTDriversCount: Number [RO]
  UDSDriversCount: Number [RO]
  HelpersCount: Number [RO]
  HelpersRoute: Number [RO]
```

### Schedule (16 cols)
[Inherits all 16 columns from Table: New step Output 4]
+ Modified/Added Columns:
  - _RowNumber: Number

### ActionsCalling (4 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  UID: Text = UNIQUEID()
  Action Name Fremont: Enum [Values: 'Create Roster Fremont'] (→"=Action Name")
  Action Name Tracy: Enum [Values: 'Create Roster Tracy'] = ="" (→"=Action Name")
```

### FleetAssignment (10 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  AssignmentID: Number = =max(FleetAssignment[AssignmentID])+1
  EmployeeID: Ref
  FleetID: Ref
  LastEditBy: Enum = =Any(Me[UserID]) { Logic: [EditIf]="=isblank([LastEditBy])" } { Slices Cross-Ref: Me -> Users }
  LastEditOn: DateTime = =now() { Logic: [EditIf]="=isblank([LastEditOn])" }
  FlletAssignedto: Ref [RO]
  Type: Text [RO]
  Subtype: Text [RO]
  FleetStatus: Text [RO]
```

### Inspection (65 cols)
[Inherits all 66 columns from Table: Process for UpdateInspectionAndRouteStatus Process Table]
+ Modified/Added Columns:
  - _RowNumber: Number

### Performance (56 cols)
[Inherits all 56 columns from Table: Process for ScorecardPDF Process Table]
+ Modified/Added Columns:
  - _RowNumber: Number

### Setup (11 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  SID: Text = UNIQUEID()
  Category: Enum [Values: 'Advertisement', 'Drug Test', 'Background']
  UserName: Name
  Status: Enum [Values: 'Open', 'Pause', 'Close']
  BudgetType: Enum [Values: 'Daily', 'Monthly', 'Per Application']
  Budget: Text
  Action: Enum [Values: 'Review', 'Reject']
  StartDate: Date = TODAY()
  EndDate: Date = TODAY()
  Notes: LongText
```

### Summary (9 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  SID: Number
  Description: Text
  ApplicantsApplied: Number [RO] (→"="Applicant's Applied"")
  TodaysInterviews: Number [RO] (→"="Today's Interviews"")
  TomorrowsInterviews: Number [RO] (→"="Tomorrow's Interviews"")
  CurrentOnboarding: Number [RO] (→"=Onboarding")
  Joining Soon: Number [RO]
  Joined Today: Number [RO]
```

### Hours (19 cols)
[Inherits all 20 columns from Table: Process for UpdatePayCal Process Table]
+ Modified/Added Columns:
  - _RowNumber: Number

### EfficiencyFremont (20 cols)
[Inherits all 15 columns from Table: EfficiencyTracy]
+ Modified/Added Columns:
  - VanRoutes: Number
  - BoxRoutes: Number
  - Cost: Price
  - Volume: Number
  - WeeklyReport: Ref

### WeeklyEmployee (26 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  WID: Text = =[WeekID]&"-"&[EmployeeID]
  EmployeeID: Ref
  WeekID: Ref
  UpdatedOn: DateTime = =now()
  Notes: LongText
  Location: Text = =INDEX(
   select(
    Employee[Location],
    [EmployeeID]=[_THISROW].[EmployeeID]
  ),
  1
)
  Sunday: Text [RO]
  Monday: Text [RO]
  Tuesday: Text [RO]
  Wednesday: Text [RO]
  Thursday: Text [RO]
  Friday: Text [RO]
  Saturday: Text [RO]
  Working Days: Number [RO]
  Phone: Text [RO]
  Notification: LongText [RO]
  EmployeeType: Text [RO]
  EditSunday: Text [RO]
  EditMonday: Text [RO] (→"=""")
  EditTuesday: Text [RO]
  EditWednesday: Text [RO]
  EditThursday: Text [RO]
  EditFriday: Text [RO]
  EditSaturday: Text [RO]
  EditEmployeeInfo: Text [RO]
```

### ExtraMiles (9 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  EMID: Text = UNIQUEID()
  Date: Date = TODAY()
  EmployeeID: Ref
  Status: Enum [Values: 'Form Filled', 'Amazon Approved', 'Amazon Rejected', 'Ordered', 'Shipped', 'Received']
  Story: Text
  AwardApproved: Enum [Values: 'Gold', 'Silver', 'Bronze'] (→"=Award Approved")
  ProductOrdered: Text (→"=Product Ordered")
  Transporter ID: Text [RO]
```

### LoadoutSummary (21 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  LSID: Text = UNIQUEID()
  Date: Date [RO]
  Fremont Routes: Number [RO] (→"=Total Routes")
  Fremont CallOuts: Number [RO]
  Fremont Standby: Number [RO]
  Fremont Trainees: Number [RO]
  Fremont Operations: Number [RO]
  Fremont Shift Cancelled: Number [RO]
  Fremont Efficiency: List [RO]
  UDS Routes: Number [RO]
  Van Routes: Number [RO]
  Box Truck Routes: Number [RO]
  MA Routes: Number [RO]
  Tracy Routes: Number [RO] (→"=Routes")
  Tracy Callouts: Number [RO] (→"=Callouts")
  Tracy Standby: Number [RO] (→"=Standby")
  Tracy Trainees: Number [RO] (→"=Trainees")
  Tracy Operations: Number [RO] (→"=Operations")
  Tracy Shift Cancelled: Number [RO] (→"=Shift Cancelled")
  Tracy Efficiency: List [RO] (→"=Efficiency")
```

### Tasks (14 cols)
[Inherits all 14 columns from Table: CreateRepeatTask Output]
+ Modified/Added Columns:
  - _RowNumber: Number

### Scorecard (25 cols)
[Inherits all 26 columns from Table: Process for WhenScorecardIsimportedAddtoPerformance Process Table]
+ Modified/Added Columns:
  - _RowNumber: Number

### POD (17 cols)
[Inherits all 17 columns from Table: AddRowsPerformance Output 2]
+ Modified/Added Columns:
  - _RowNumber: Number

### Tenured (17 cols)
[Inherits all 17 columns from Table: New step Output 8]
+ Modified/Added Columns:
  - _RowNumber: Number

### ADP (16 cols)
[Inherits all 16 columns from Table: DeletePayCal Output]
+ Modified/Added Columns:
  - _RowNumber: Number

### PayCal (12 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  EmployeeID: Ref
  Payroll: Text
  WHC_w1: Text [HIDDEN]
  WHC_w2: Text [HIDDEN]
  ADPID: Number
  EverydayPay: Price
  ADPPay: Price
  BenefitsDue: Price
  Difference: Price
  UpdatedOn: DateTime
  TotalBenefits: Price [RO]
```

### Uniform (6 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  UID: Text = UNIQUEID()
  Date: Date = TODAY()
  EmployeeID: Ref
  Uniform: EnumList [Values: 'Tshirt', 'Shorts', 'Vest', 'Pants', 'Jacket', 'Cap', 'Other']
  Notes: LongText
```

### Criterion (5 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Number
  Metric: Enum
  SubMetric: Enum
  Tips: LongText
```

### WHC (18 cols)
[Inherits all 18 columns from Table: not needed rows Output]
+ Modified/Added Columns:
  - _RowNumber: Number

### DAReview (88 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = =uniqueid() { Logic: [EditIf]="=isblank([ID])" }
  Employee: Ref
  Location: Enum [Values: 'Tracy', 'Fremont'] = =[Employee].[Location]
  Supervisor: Enum = =index(Me[UserID],1) { Slices Cross-Ref: Me -> Users }
  Type: Enum [Values: 'Write Up', 'Coaching'] = =Ifs(
   [Employee].[Level]="Poor Performance",
   "Write Up",
   [Metric].[Coaching]>=count(Select(
    DAReview[ID],
    and(
      [Metric]=[_THISROW].[Metric],
      [Employee]=[_THISROW].[Employee],
      [ReviewDate]<=[_THISROW].[ReviewDate],
      [_RowNumber]<[_THISROW].[_RowNumber]
    )
  ))+1,
   "Coaching",
   1=1,
   "Write Up"
) { Logic: [EditIf]="=In(
  Any(
    Me[Role]
  ),
  {"Admin",
  "OpsManager",
  "HR"}
)" } { Slices Cross-Ref: Me -> Users }
  Corrective Action: Enum [Values: 'Written Warning', 'Final Written Warning'] = =ifs(
   [Employee].[Level]="Poor Performance",
  "Final Written Warning",
   1=1,
  "Written Warning"
)
  Metric: Ref
  Code: Text
  WeekYear: Enum
  ReviewDate: Date = =Lookup(
  index(
    Orderby(
      Select(
        Schedule[ScheduleID],
        and(
          [EmployeeID]=[_THISROW].[Employee],
          [Date]>=today(),
          [Status]="Scheduled"
        )
      ),
      [Date],
      false
    ),
    1
  ),
  "Schedule",
  "ScheduleID",
  "Date"
) (→"=Corrective Action Date")
  Incident: Enum [Values: 'Day', 'Week'] = =if(
  [Metric].[Frequency]="Weekly",
   "Week",
   "Day"
) (→"=Duration of Incident") { Logic: [ValidIf]="=count(Select(
  DAReview[ID],
   and(
    [Employee]=[_THISROW].[Employee],
    [Metric]=[_THISROW].[Metric],
    [IncidentDate]=[_THISROW].[IncidentDate],
    [IncidentWeek]=[_THISROW].[IncidentWeek]
  )
) - List([ID]))<1" }
  IncidentDate: Date = =if([Incident]="Day",[ReviewDate],"") (→"=Incident Date") { Logic: [ShowIf]="=[Incident]="Day"" | [ValidIf]="=[Incident]="Day"" | [ReqIf]="=[Incident]="Day"" | [EditIf]="=[Incident]="Day"" }
  IncidentWeek: Enum = =if(
  [Incident]="Week",
  Index(
    Orderby(
      Select(
        Week[WeekYearID],
        and(
          [StartDate]>=[_THISROW].[ReviewDate]-60,
          [StartDate]<=[_THISROW].[ReviewDate]
        )
      ),
      [WeekYearID],
      true
    ),
    1
  ),
  ""
) { Logic: [ShowIf]="=[Incident]="Week"" | [ValidIf]="=[Incident]="Week"" | [ReqIf]="=[Incident]="Week"" | [EditIf]="=[Incident]="Week"" }
  Status: Enum [Values: 'Created', 'Printed', 'Completed', 'Voided'] = =if(
  not(isblank([Uploaded Signed Files])),
  "Completed",
  "Created"
)
  NoticeNo: Number (→"=Corrective Action #")
  Count: Number (→"=Metric Notice #")
  CDF: Percent { Logic: [ShowIf]="=[Metric]="Customer Delivery Feedback"" | [ReqIf]="=[Metric]="Customer Delivery Feedback"" }
  Mishandled packages: Number { Logic: [ShowIf]="=[Metric]="Customer Delivery Feedback"" }
  Unprofessional behavior: Number { Logic: [ShowIf]="=[Metric]="Customer Delivery Feedback"" }
  Failure to follow delivery instructions: Number { Logic: [ShowIf]="=[Metric]="Customer Delivery Feedback"" }
  Delivered to Wrong Address: Number { Logic: [ShowIf]="=[Metric]="Customer Delivery Feedback"" }
  Never Received Delivery: Number { Logic: [ShowIf]="=[Metric]="Customer Delivery Feedback"" }
  Delivery Success Behaviors: Number (→"=Lost Packages") { Logic: [ShowIf]="=[Metric]="Delivery Success Behaviors"" | [ReqIf]="=[Metric]="Delivery Success Behaviors"" }
  Simultaneous Deliveries: Number { Logic: [ShowIf]="=[Metric]="Delivery Success Behaviors"" }
  Delivered 50m: Number { Logic: [ShowIf]="=[Metric]="Delivery Success Behaviors"" }
  Delivered to Household Member: Number { Logic: [ShowIf]="=[Metric]="Delivery Success Behaviors"" }
  No Photo on Delivery: Number { Logic: [ShowIf]="=[Metric]="Delivery Success Behaviors"" }
  Photo Quality: Percent { Logic: [ShowIf]="=[Metric]="Photo Quality"" | [ReqIf]="=[Metric]="Photo Quality"" }
  Rejects: Number { Logic: [ShowIf]="=[Metric]="Photo Quality"" }
  Blurry: Number { Logic: [ShowIf]="=[Metric]="Photo Quality"" }
  Human: Number { Logic: [ShowIf]="=[Metric]="Photo Quality"" }
  NoPackage: Number { Logic: [ShowIf]="=[Metric]="Photo Quality"" }
  PackageInCar: Number { Logic: [ShowIf]="=[Metric]="Photo Quality"" }
  PackageInHand: Number { Logic: [ShowIf]="=[Metric]="Photo Quality"" }
  NotVisible: Number { Logic: [ShowIf]="=[Metric]="Photo Quality"" }
  TooClose: Number { Logic: [ShowIf]="=[Metric]="Photo Quality"" }
  TooDark: Number { Logic: [ShowIf]="=[Metric]="Photo Quality"" }
  PPS: Show [RO] { Logic: [ShowIf]="=and(
  [Metric]="Proper Park Sequence",
  1=1
)" }
  PPSCompliance: Percent { Logic: [ShowIf]="=[Metric]="Proper Park Sequence"" | [ReqIf]="=[Metric]="Proper Park Sequence"" }
  Missing Gear in Park: Percent { Logic: [ShowIf]="=[Metric]="Proper Park Sequence"" }
  Missing Parking Brake: Percent { Logic: [ShowIf]="=[Metric]="Proper Park Sequence"" }
  Safety: Number { Logic: [ShowIf]="=[Metric]="Safety"" | [ReqIf]="=[Metric]="Safety"" }
  Speeding: Number (→"=Driving Above Speed limit") { Logic: [ShowIf]="=[Metric]="Safety"" }
  Seatbelt: Number (→"=Not Wearing Seatbelt") { Logic: [ShowIf]="=[Metric]="Safety"" }
  FollowingDistance: Number (→"=Following Distance") { Logic: [ShowIf]="=[Metric]="Safety"" }
  SignalViolation: Number (→"=Traffic Sign Violations") { Logic: [ShowIf]="=[Metric]="Safety"" }
  Distraction: Number { Logic: [ShowIf]="=[Metric]="Safety"" }
  Efficency: Show [RO] { Logic: [ShowIf]="=[Metric]="Efficiency"" }
  Packages Rescued: Number { Logic: [ShowIf]="=[Metric]="Efficiency"" | [ReqIf]="=[Metric]="Efficiency"" }
  Delay Minutes: Number (→"="Minutes behind Schedule"") { Logic: [ShowIf]="=[Metric]="Efficiency"" | [ReqIf]="=[Metric]="Efficiency"" }
  Mentor: Number { Logic: [ShowIf]="=[Metric]="Mentor"" }
  FICO: Number { Logic: [ShowIf]="=[Metric]="Mentor"" | [ReqIf]="=[Metric]="Mentor"" }
  LessThan30Min: Text { Logic: [ShowIf]="=[Metric]="Meal Break"" | [ReqIf]="=[Metric]="Meal Break"" }
  Remarks: Text { Logic: [ShowIf]="=[Metric]="Meal Break"" | [ReqIf]="=[Metric]="Meal Break"" }
  Contact Compliance: Percent { Logic: [ShowIf]="=[Metric]="Contact Compliance"" | [ReqIf]="=[Metric]="Contact Compliance"" }
  Delivery Completion: Percent { Logic: [ShowIf]="=[Metric]="Delivery Completion"" }
  DVIC: Show [RO] { Logic: [ShowIf]="=[Metric]="DVIC Quality"" }
  Premium Fuel: Percent { Logic: [ShowIf]="=[Metric]="Premium Fuel"" }
  Fleet Damage: Show [RO] { Logic: [ShowIf]="=[Metric]="Fleet Damage"" }
  Location of Incident: Address { Logic: [ShowIf]="=in(
  [Metric],
  {"Fleet Damage",
  "Property Damage"}
)" | [ReqIf]="=[Metric]="Fleet Damage"" }
  Time of Incident: Time = TIMENOW() { Logic: [ShowIf]="=in(
  [Metric],
  {"Fleet Damage",
  "Property Damage"}
)" | [ReqIf]="=[Metric]="Fleet Damage"" }
  Vehicles Involved: Text { Logic: [ShowIf]="=in(
  [Metric],
  {"Fleet Damage",
  "Property Damage"}
)" | [ReqIf]="=[Metric]="Fleet Damage"" }
  Statement1: LongText = =IF(
  isblank([Mishandled packages]),
  "",
  " • Mishandled packages: "&[Mishandled packages]&""
)& IF(
  isblank([Unprofessional behavior]),
  "",
  " • Unprofessional behavior: "&[Unprofessional behavior]&""
)& IF(
  isblank([Failure to follow delivery instructions]),
  "",
  " • Failure to follow delivery instructions: "&[Failure to follow delivery instructions]&""
)& IF(
  isblank([Delivered to Wrong Address]),
  "",
  " • Delivered to Wrong Address: "&[Delivered to Wrong Address]&""
)& IF(
  isblank([Never Received Delivery]),
  "",
  " • Never Received Delivery: "&[Never Received Delivery]&""
)& IF(
  isblank([Simultaneous Deliveries]),
  "",
  " • Simultaneous Deliveries: "&[Simultaneous Deliveries]&""
)& IF(
  isblank([Delivered 50m]),
  "",
  " • Delivered 50m+: "&[Delivered 50m]&""
)& IF(
  isblank([Delivered to Household Member]),
  "",
  " • Delivered to Household Member: "&[Delivered to Household Member]&""
)& IF(
  isblank([No Photo on Delivery]),
  "",
  " • No Photo on Delivery: "&[No Photo on Delivery]&""
)& IF(
  isblank([Rejects]),
  "",
  " • Bypassed Photos: "&[Rejects]&""
)& IF(
  isblank([Blurry]),
  "",
  " • Blurry Photos: "&[Blurry]&""
)& IF(
  isblank([Human]),
  "",
  " • Human In the Photo: "&[Human]&""
)& IF(
  isblank([NoPackage]),
  "",
  " • No Package Detected in Photo: "&[NoPackage]&""
)& IF(
  isblank([PackageInCar]),
  "",
  " • Photo taken inside Van: "&[PackageInCar]&""
)& IF(
  isblank([PackageInHand]),
  "",
  " • Photo taken while package in hand: "&[PackageInHand]&""
)& IF(
  isblank([NotVisible]),
  "",
  " • Package not clearly visible in photo: "&[NotVisible]&""
)& IF(
  isblank([TooClose]),
  "",
  " • Package Too Close: "&[TooClose]&""
)& IF(
  isblank([TooDark]),
  "",
  " • Photo is too dark: "&[TooDark]&""
)& IF(
  isblank([Missing Gear in Park]),
  "",
  " • Missing Gear in Park: "&text([Missing Gear in Park])&""
)& IF(
  isblank([Missing Parking Brake]),
  "",
  " • Missing Parking Brake: "&text([Missing Parking Brake])&""
)& IF(
  isblank([Speeding]),
  "",
  " • Speeding: "&[Speeding]&""
)& IF(
  isblank([Seatbelt]),
  "",
  " • Seatbelt: "&[Seatbelt]&""
)& IF(
  isblank([FollowingDistance]),
  "",
  " • Following Distance: "&[FollowingDistance]&""
)& IF(
  isblank([SignalViolation]),
  "",
  " • Signal Violation: "&[SignalViolation]&""
)& IF(
  isblank([Distraction]),
  "",
  " • Distraction: "&[Distraction]&""
)& IF(
  isblank([LessThan30Min]),
  "",
  " • "&[LessThan30Min]&""
)& IF(
  isblank([Remarks]),
  "",
  " • "&[Remarks]&""
)& IF(
  Or(
    isblank([Packages Rescued]),
    [Packages Rescued]<=0
  ),
  "",
  " • The driver was rescued by another team member, who took over "&[Packages Rescued]&" packages."
) IF(
  or(
    isblank([Delay Minutes]),
    [Delay Minutes]<=0
  ),
  "",
  " • The driver was "&[Delay Minutes]&" minutes behind the scheduled delivery time."
) (→"=Statement of the problem") { Logic: [ShowIf]="=in(
  [Metric],
  {"Behavior",
  "Customer Delivery Feedback",
  "Delivery Success Behaviors",
  "Efficiency",
  "Proper Park Sequence",
  "Safety",
  "Tier Infraction",
  "Attendance",
  "Meal Break",
  "Missing Weigh Scale"}
)" }
  Statement2: LongText = =If(
  count(Select(
    DAReview[ID],
    and(
      [Employee]=[_THISROW].[Employee],
      In(
        [Type],
        {"Write Up",
        "Coaching"}
      ),
      [Metric]=[_THISROW].[Metric],
      [ReviewDate]<=[_THISROW].[ReviewDate],
      [ID]<>[_THISROW].[ID]
    )
  ))>0,
   "",
  " • "&"Training - "&[Employee].[JoiningDate]&""
)& IF(
  and(
    [Metric]="Fleet Damage",
    count(Select(
      DAReview[ID],
      and(
        [Employee]=[_THISROW].[Employee],
        In(
          [Type],
          {"Write Up",
          "Coaching"}
        ),
        [Metric]=[_THISROW].[Metric],
        [ReviewDate]<=[_THISROW].[ReviewDate],
        [ID]<>[_THISROW].[ID]
      )
    ))>0
  ),
   "Delivery Associate has undergone the following all safety related class room as well as on the road training and coaching sessions. Employee has also received write ups for driver controllable fleet damages on the following dates: ",
   ""
) & IFs(
  count(Select(
    DAReview[ReviewInfo],
    and(
      [Employee]=[_THISROW].[Employee],
      In(
        [Type],
        {"Write Up",
        "Coaching"}
      ),
      [Metric]=[_THISROW].[Metric],
      [ReviewDate]<=[_THISROW].[ReviewDate],
      [ReviewDate]>=[_THISROW].[ReviewDate]-[_THISROW].[Metric].[Duration in days]
    )
  ))<=5,
   " • "&Substitute( top(Sort(
    Select(
      DAReview[ReviewInfo],
      and(
        [Employee]=[_THISROW].[Employee],
        In(
          [Type],
          {"Write Up",
          "Coaching"}
        ),
        [Metric]=[_THISROW].[Metric],
        [ReviewDate]<=[_THISROW].[ReviewDate]
      )
    ),
    true
  ),
  5) ,
  ",",
  " • " ),
   count(Select(
    DAReview[ReviewInfo],
    and(
      [Employee]=[_THISROW].[Employee],
      In(
        [Type],
        {"Write Up",
        "Coaching"}
      ),
      [Metric]=[_THISROW].[Metric],
      [ReviewDate]<=[_THISROW].[ReviewDate],
      [ReviewDate]>=[_THISROW].[ReviewDate]-[_THISROW].[Metric].[Duration in days]
    )
  ))>5,
   " • "&Substitute( top(Sort(
    Select(
      DAReview[ReviewInfo],
      and(
        [Employee]=[_THISROW].[Employee],
        In(
          [Type],
          {"Write Up",
          "Coaching"}
        ),
        [Metric]=[_THISROW].[Metric],
        [ReviewDate]<=[_THISROW].[ReviewDate],
        [ReviewDate]>=[_THISROW].[ReviewDate]-[_THISROW].[Metric].[Duration in days]
      )
    ),
    true
  ),
  5) ,
  ",",
  " • " ),
   1=1,
  ""
) (→"=Prior discussion or warnings on this subject")
  Statement3: LongText = =" "&" "&" • "& Substitute({""} +IF(
  isblank([Metric]),
  {},
  Select(
    Criterion[Tips],
    and(
      [Metric]=[_THISROW].[Metric],
      [SubMetric]="Default"
    )
  )
) +IF(
  isblank([Mishandled packages]),
  {},
  Select(
    Criterion[Tips],
    [SubMetric]="Mishandled packages"
  )
) +IF(
  isblank([Unprofessional behavior]),
  {},
  Select(
    Criterion[Tips],
    [SubMetric]="Unprofessional behavior"
  )
) +IF(
  isblank([Failure to follow delivery instructions]),
  {},
  Select(
    Criterion[Tips],
    [SubMetric]="Failure to follow delivery instructions"
  )
) +IF(
  isblank([Delivered to Wrong Address]),
  {},
  Select(
    Criterion[Tips],
    [SubMetric]="Delivered to Wrong Address"
  )
) +IF(
  isblank([Never Received Delivery]),
  {},
  Select(
    Criterion[Tips],
    [SubMetric]="Never Received Delivery"
  )
) +IF(
  isblank([Simultaneous Deliveries]),
  {},
  Select(
    Criterion[Tips],
    [SubMetric]="Simultaneous Deliveries"
  )
) +IF(
  isblank([Delivered 50m]),
  {},
  Select(
    Criterion[Tips],
    [SubMetric]="Delivered 50m+"
  )
) +IF(
  isblank([Delivered to Household Member]),
  {},
  Select(
    Criterion[Tips],
    [SubMetric]="Delivered to Household Member"
  )
) +IF(
  isblank([No Photo on Delivery]),
  {},
  Select(
    Criterion[Tips],
    [SubMetric]="No Photo on Delivery"
  )
) +IF(
  isblank([Rejects]),
  {},
  Select(
    Criterion[Tips],
    [SubMetric]="Bypassed Photos"
  )
) +IF(
  isblank([Blurry]),
  {},
  Select(
    Criterion[Tips],
    [SubMetric]="Blurry Photos"
  )
) +IF(
  isblank([Human]),
  {},
  Select(
    Criterion[Tips],
    [SubMetric]="Human In the Photo"
  )
) +IF(
  isblank([NoPackage]),
  {},
  Select(
    Criterion[Tips],
    [SubMetric]="No Package Detected in Photo"
  )
) +IF(
  isblank([PackageInCar]),
  {},
  Select(
    Criterion[Tips],
    [SubMetric]="Photo taken inside Van"
  )
) +IF(
  isblank([PackageInHand]),
  {},
  Select(
    Criterion[Tips],
    [SubMetric]="Photo taken while package in hand"
  )
) +IF(
  isblank([NotVisible]),
  {},
  Select(
    Criterion[Tips],
    [SubMetric]="Package not clearly visible in photo"
  )
) +IF(
  isblank([TooClose]),
  {},
  Select(
    Criterion[Tips],
    [SubMetric]="Package Too Close"
  )
) +IF(
  isblank([TooDark]),
  {},
  Select(
    Criterion[Tips],
    [SubMetric]="Photo is too dark"
  )
) +IF(
  isblank([Speeding]),
  {},
  Select(
    Criterion[Tips],
    [SubMetric]="Speeding"
  )
) +IF(
  isblank([Seatbelt]),
  {},
  Select(
    Criterion[Tips],
    [SubMetric]="Seatbelt"
  )
) +IF(
  isblank([FollowingDistance]),
  {},
  Select(
    Criterion[Tips],
    [SubMetric]="FollowingDistance"
  )
) +IF(
  isblank([SignalViolation]),
  {},
  Select(
    Criterion[Tips],
    [SubMetric]="SignalViolation"
  )
) +IF(
  isblank([Distraction]),
  {},
  Select(
    Criterion[Tips],
    [SubMetric]="Distraction"
  )
) ," , "," • ") (→"="Summary of corrective action discussed"")
  Paragraph1: LongText (→"="Describe the Damage"") { Logic: [ShowIf]="=in(
  [Metric],
  {"Fleet Damage",
  "Property Damage"}
)" | [ReqIf]="=[Metric]="Fleet Damage"" }
  Goal: Text = =[Metric].[Goal]
  ImprovedBy: Enum [Values: 'immediately', 'one week', 'two week', 'three week'] = =ifs(
   [Incident]="Day",
  "immediately",
   [Incident]="Week",
  "one week"
) (→"="Improved By"")
  ImprovedByDate: Date
  Photo1: Image (→"="Photo 1"")
  Photo2: Image (→"="Photo 2"")
  Photo3: Image (→"="Photo 3"")
  Photo4: Image { Logic: [ShowIf]="=[Metric]="Customer Delivery Feedback"" }
  Photo5: Image { Logic: [ShowIf]="=[Metric]="Customer Delivery Feedback"" }
  Photo6: Image { Logic: [ShowIf]="=[Metric]="Customer Delivery Feedback"" }
  GeneratedFile: DateTime [HIDDEN] = =now()
  CustomFile: File { Logic: [ShowIf]="=[Metric]="Custom"" }
  Signed On: Text
  Uploaded Signed Files: File { Logic: [ShowIf]="=Context("view")="DA_Review_Form"" | [ValidIf]="=[Status]<>"Created"" }
  Suggestion: Enum [Values: 'Start Termination', 'Issue Final Warning', 'Final Warning Issued']
  CreatedBy: Enum = =Any(Me[UserID]) { Slices Cross-Ref: Me -> Users }
  LastEditBy: Enum = =index(Me[UserID],1) { Logic: [EditIf]="=isblank([LastEditBy])" } { Slices Cross-Ref: Me -> Users }
  LastEditOn: DateTime = =now() { Logic: [EditIf]="=isblank([LastEditOn])" }
  ReviewPDF: File [HIDDEN,RO]
  ReviewInfo: Text [RO]
  MainMetricValue: Text [RO] (→"="Metric"") { Logic: [ReqIf]="=[Metric]="Contact Compliance"" }
  For: Ref [RO]
```

### PerformanceGuidelines (10 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  Metric: Enum
  Coaching: Number
  WriteUp: Number
  Frequency: Enum
  Duration in days: Number
  MainMetric: Text
  Goal: Text
  GoalDes: Text
  Related DAReviews: List [RO,VC]
```

### Inventory (16 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = =ifs(
   [Type]="Phone",
   [IMEI]&"-"&[SIM],
   1=1,
  uniqueid()
)
  Type: Enum [Values: 'Phone', 'Kit']
  Name: Name
  IMEI: Text { Logic: [EditIf]="=and([Type]="Phone",isblank([IMEI]))" }
  SIM: Text { Logic: [EditIf]="=and([Type]="Phone",isblank([SIM]))" }
  Fuel Card: Text { Logic: [EditIf]="=and([Type]="Kit",isblank([Fuel Card]))" }
  Number: Number
  Status: Enum [Values: 'Active', 'Inactive'] = =Active
  Location: Enum [Values: 'Fremont', 'Tracy']
  LastEditBy: Enum = =any(Me[UserID]) { Logic: [EditIf]="=isblank([LastEditBy])" } { Slices Cross-Ref: Me -> Users }
  LastEditOn: DateTime = =now() { Logic: [EditIf]="=isblank([LastEditOn])" }
  Label: Text [RO]
  Related RosterTracys: List [RO,VC]
  Related RosterFremonts: List [RO,VC]
  Related RosterFremonts By KitId: List [RO,VC]
```

### Incident (96 cols)
[Inherits all 102 columns from Table: Process for IncidentCreatedUpdated Process Table]
+ Modified/Added Columns:
  - _RowNumber: Number

### Contact (19 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ContactID: Text = UNIQUEID()
  Name: Name
  Email: Email
  Phone: Text
  Designation: Enum [Values: 'Claim Adjuster', 'Claimant', 'Claim Helper', 'Brokers Claim Manager', 'DSP Owner', 'Employee', "Employee's Lawyer", 'HR Manager', ... +3 more]
  Notes: LongText
  Company: Text
  Address: Address
  Ref_Type: Enum
  Ref_ID: Text
  LastEditBy: Enum = =Any(Me[UserID]) { Logic: [EditIf]="=isblank([LastEditBy])" } { Slices Cross-Ref: Me -> Users }
  LastEditOn: DateTime = =now() { Logic: [EditIf]="=isblank([LastEditOn])" }
  Email_ID: Text [RO] (→"=Email")
  Related ContactAssignments: List [RO,VC]
  Related IncidentNotes By WhoContacted: List [RO,VC]
  Related Incidents: List [RO,VC]
  Related Incidents By WhomReportedName: List [RO,VC]
  Related Treatments: List [RO,VC]
```

### Injury (10 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  INJID: Text = UNIQUEID()
  IncidentID: Ref
  NeedMedicalTreatment: Yes/No
  MedicalProvider: Text
  PainLevel: Number
  AreaofPain: Text
  Diagnosis: Text
  PreviousInjuryReported: Text
  DWCForm: Text
```

### IncidentDocuments (16 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = =uniqueid()
  IncidentID: Ref { Logic: [EditIf]="=isblank([NoticeID])" }
  NoticeID: Ref { Logic: [EditIf]="=isblank([IncidentID])" }
  Date: Date = TODAY()
  Type: Enum [Values: 'Company Vehicle Photo', 'Documents', 'Incident Report', 'Legal Notice', 'Modified Offer Letter', 'Medical Report', 'Paystubs', 'Physical Timesheets', ... +8 more]
  Title: Text
  Photo1: Image
  Photo2: Image
  Photo3: Image
  Photo4: Image
  Photo5: Image
  File1: File
  File2: File
  AddedBy: Enum = =Any(Me[UserID]) { Logic: [EditIf]="=isblank([AddedBy])" } { Slices Cross-Ref: Me -> Users }
  AddedOn: DateTime = =now() { Logic: [EditIf]="=isblank([AddedOn])" }
```

### ContactAssignment (10 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  CAID: Text = UNIQUEID() { Logic: [EditIf]="=isblank([CAID])" }
  IncidentID: Ref { Logic: [EditIf]="=isblank([NoticeID])" }
  NoticeID: Ref { Logic: [EditIf]="=isblank([IncidentID])" }
  ContactID: Ref
  LastEditBy: Enum = =Any(Me[UserID]) { Logic: [EditIf]="=isblank([LastEditBy])" } { Slices Cross-Ref: Me -> Users }
  LastEditOn: DateTime = NOW() { Logic: [EditIf]="=isblank([LastEditOn])" }
  Name: Text [RO]
  Designation: Text [RO]
  Phone: Text [RO]
```

### WorkHistory (6 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  WHID: Text = UNIQUEID()
  IncidentID: Ref
  DateFrom: Date = TODAY()
  DateTo: Date = TODAY()
  Description: Enum [Values: 'Dispatch Cancelled Shift', 'Employee Cancelled Shift', 'Full Duty', 'Full Duty with Observation', 'Modified Duty', 'Modified Duty Declined', 'No Show', 'No Response to Modified Duty', ... +5 more]
```

### IncidentNotes (13 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = =uniqueid()
  IncidentID: Ref { Logic: [EditIf]="=isblank([NoticeID])" }
  NoticeID: Ref { Logic: [EditIf]="=isblank([IncidentID])" }
  Date: Date = TODAY()
  Type: Enum [Values: 'Email', 'Phone', 'Meeting']
  WhoContacted: Ref
  WhomContacted: Enum
  Description: LongText
  Result: Text
  LastEditBy: Enum = =Any(Me[UserID]) { Logic: [EditIf]="=isblank([LastEditBy])" } { Slices Cross-Ref: Me -> Users }
  LastEditOn: DateTime = =now() { Logic: [EditIf]="=isblank([LastEditOn])" }
  Title: Text [RO]
```

### AppSettings (17 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
  Level: Enum [Values: 'System', 'Code']
  Table: Enum
  Trigger: Enum
  View: Enum
  Column: Enum
  Title: Text
  Description: LongText
  Role: EnumList = =Any(Me[Role]) { Logic: [EditIf]="=In(Any(Me[Role]),{"Admin"})" } { Slices Cross-Ref: Me -> Users }
  Email: Enum = =any(Me[Email]) { Logic: [EditIf]="=In(Any(Me[Role]),{"Admin"})" } { Slices Cross-Ref: Me -> Users }
  User: Enum = =Any(me[UserID]) { Logic: [EditIf]="=In(Any(Me[Role]),{"Admin"})" } { Slices Cross-Ref: Me -> Users }
  Decimal: Number (→"="Days"")
  Date: Date = TODAY()
  AllowedValues: EnumList
  LastEditBy: Enum = =Any(Me[UserID]) { Logic: [EditIf]="=isblank([LastEditBy])" } { Slices Cross-Ref: Me -> Users }
  LastEditOn: DateTime = =now() { Logic: [EditIf]="=isblank([LastEditOn])" }
```

### Treatment (10 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
  IncidentID: Ref
  Date: Date = TODAY() (→"=Date of Visit")
  MedicalProvider: Ref
  Diagnosis: Text
  TreatmentStatus: Enum
  WorkStatus: Enum [Values: 'Modify Duty', 'Total Temporary Disability', 'Full Duty with Observation']
  WorkRestrictions: Text
  Clinic: Text [RO]
```

### Followup (11 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = =uniqueid() { Logic: [EditIf]="=isblank([ID])" }
  IncidentID: Ref { Logic: [EditIf]="=isblank([NoticeID])" }
  NoticeID: Ref { Logic: [EditIf]="=isblank([IncidentID])" }
  DueDate: Date = TODAY() (→"="Due Date"")
  Description: LongText
  Status: Enum [Values: 'Scheduled', 'Pending', 'Completed', 'Cancelled'] = =Scheduled
  CreatedBy: Enum = =Any(Me[UserID]) { Slices Cross-Ref: Me -> Users }
  LastEditBy: Enum = =Any(Me[UserID]) { Logic: [EditIf]="=isblank([LastEditBy])" } { Slices Cross-Ref: Me -> Users }
  LastEditOn: DateTime = =now() { Logic: [EditIf]="=isblank([LastEditOn])" }
  Reference: Text [RO]
```

### IncidentForm (38 cols)
[Inherits all 38 columns from Table: Process for IncidentReportingBot Process Table]
+ Modified/Added Columns:
  - _RowNumber: Number

### AppViews (22 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
  Type: Enum
  AppName: Name
  View: Enum
  Group: Enum
  Category: Enum
  Name: Name
  Description: Text
  Icon: Image
  Link: Url
  AllowOnly: EnumList
  AllowValues: EnumList
  AllowMultiple: EnumList
  AllowRoles: EnumList
  MinQty: Decimal
  MaxQty: Decimal
  MinAmount: Number
  MaxAmount: Number
  LastEditBy: Enum = =Any(Me[UserID]) { Logic: [EditIf]="=isblank([LastEditBy])" } { Slices Cross-Ref: Me -> Users }
  LastEditOn: DateTime = =now() { Logic: [EditIf]="=isblank([LastEditOn])" }
  AppLink: App [RO]
```

### AppTriggers (16 cols)
[Inherits all 16 columns from Table: Update LastEditOn in Incident forms where incidentID is blank Output]
+ Modified/Added Columns:
  - _RowNumber: Number

### Ads (14 cols)
[Inherits all 14 columns from Table: Set2FACode Output]
+ Modified/Added Columns:
  - _RowNumber: Number

### Invoice (19 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  WeekYear: Enum = =index(
  select(
    Week[WeekYearID],
    and(
      [StartDate]<=TODAY(),
      [EndDate]>=today()
    )
  ),
  1
)
  PaidHours: Number
  Package: Number
  Trainings: Number
  AMZN Cancel: Number
  DSP Cancel: Number
  WeeklyInvoice: Price (→"=Invoice Expected")
  InvHomeStation: Price (→"=Home Station")
  InvOtherStation: Price (→"=Other Station")
  InvTotalAMZN: Price (→"=Invoice Paid")
  Scorecard: Enum
  Incentive: Price (→"=Incentive Expected")
  IncentiveAMZN: Price (→"=Incentive Paid")
  LastEditBy: Enum = =Any(Me[UserID]) { Logic: [EditIf]="=isblank([LastEditBy])" } { Slices Cross-Ref: Me -> Users }
  LastEditOn: DateTime = =now() { Logic: [EditIf]="=isblank([LastEditOn])" }
  InvoiceDiff: Price [RO] (→"=Invoice Difference")
  IncentiveDiff: Price [RO] (→"=Incentive Difference")
  Related Incomes: List [RO,VC]
```

### FleetDocs (10 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID() { Logic: [EditIf]="=isblank([ID])" }
  Fleet: Ref
  Type: Enum
  RgsExpiryDate: Date { Logic: [ShowIf]="=[Type]="Registration"" }
  RentalExpiryDate: Date { Logic: [ShowIf]="=[Type]="Rental Agreement"" }
  File: File
  Status: Enum [Values: 'Active', 'Inactive']
  LastEditBy: Enum = =Any(Me[UserID]) { Logic: [EditIf]="=isblank([LastEditBy])" } { Slices Cross-Ref: Me -> Users }
  LastEditOn: DateTime = =now() { Logic: [EditIf]="=isblank([LastEditOn])" }
```

### AppVariables (12 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
  Type: Enum
  SubType: Text
  Title: Text
  Decimal: Decimal
  DateValue: Date = TODAY()
  EnumValue: Enum
  MultiValues: EnumList
  URL: Url
  Photo: Image
  Description: Text
```

### Compliance (8 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
  Type: Enum
  Title: Text
  Status: Enum
  CreatedBy: Enum = =Any(Me[UserID]) { Logic: [EditIf]="=isblank([CreatedBy])" } { Slices Cross-Ref: Me -> Users }
  LastEditBy: Enum = =Any(Me[UserID]) { Logic: [EditIf]="=isblank([LastEditBy])" } { Slices Cross-Ref: Me -> Users }
  LastEditOn: DateTime = =now() { Logic: [EditIf]="=isblank([LastEditOn])" }
```

### Policy (24 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID() { Logic: [EditIf]="=isblank([ID])" }
  InsuranceType: Enum [Values: 'Auto', 'Worker Compensation'] (→"="Insurance Type"")
  PolicyNumber: Text (→"="Policy Number"")
  StartDate: Date = TODAY() (→"="Start Date"")
  EndDate: Date = TODAY() (→"="End Date"") { Logic: [ValidIf]="=[EndDate]>[StartDate]" }
  Broker: Enum
  Insurance Carrier: Enum
  Claim Adjuster: Enum
  Certificate: File
  Card: File
  Rate: Number (→"="Premium Paid"")
  TotalClaims: Number (→"="Total Claims"")
  OpenClaims: Number (→"="Open Claims"")
  ClaimsPaid: Price (→"="Claims Paid"")
  ClaimIncurred: Price (→"="Claim Incurred"")
  LastEditBy: Enum = =Any(Me[UserID]) { Logic: [EditIf]="=isblank([LastEditBy])" } { Slices Cross-Ref: Me -> Users }
  LastEditOn: DateTime = =now() { Logic: [EditIf]="=isblank([LastEditOn])" }
  LossRatio: Percent [RO] (→"="Loss Ratio"")
  Label: Text [RO]
  PremiumPaid: Price [RO] (→"="Premium Paid"")
  Related Premiums: List [RO,VC]
  Related Incidents: List [RO,VC]
  Related Claims: List [HIDDEN,RO,VC]
```

### Premium (8 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID() { Logic: [EditIf]="=isblank([ID])" }
  Date: Date
  Premium: Price
  Policy: Ref
  LastEditBy: Enum = =Any(Me[UserID]) { Logic: [EditIf]="=isblank([LastEditBy])" } { Slices Cross-Ref: Me -> Users }
  LastEditOn: DateTime = =now() { Logic: [EditIf]="=isblank([LastEditOn])" }
  Type: Enum [RO]
```

### Notice (17 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = =uniqueid() { Logic: [EditIf]="=isblank([ID])" }
  Type: Enum [Values: 'Lawsuit', 'Notice', 'Employee Inquiry', 'Follow-up', 'Other']
  SubType: EnumList [Values: 'Unemployment Claim', 'Non-Payment Claim', 'Child Support Order', 'Income Withholding for Support (IWO)', 'Wage Garnishment', 'Court Hearing', 'Disability Claim', 'Other', ... +17 more]
  DateOfNotice: Date (→"="Date of Notice"")
  Task Owner: Ref
  Employee: Enum
  Sender: Text
  Due Date: Date = TODAY()
  Status: Enum [Values: 'Received', 'Email Drafted', 'Responded', 'Closed', 'Waiting for Response']
  Description: LongText
  LastEditBy: Enum = =Any(Me[UserID]) { Logic: [EditIf]="=isblank([LastEditBy])" } { Slices Cross-Ref: Me -> Users }
  LastEditOn: DateTime = =now() { Logic: [EditIf]="=isblank([LastEditOn])" }
  Related ContactAssignments: List [RO,VC] (→"="Assigned Contacts"")
  Related IncidentDocuments: List [RO,VC] (→"="Case Documents"")
  Related Followups: List [RO,VC] (→"="Follow Ups"")
  Related IncidentNotes: List [RO,VC] (→"="Communication"")
```

### Repairs (23 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  RID: Text = UNIQUEID()
  Location: Enum
  Date: Date = TODAY()
  FleetID: Ref
  Type: EnumList
  Description: LongText
  Status: Enum [Values: 'Open', 'Closed'] = =Open
  Current Status: Enum [Values: 'Completed', 'Not Started', 'Sent to Repair Shop', 'Scheduled', 'Ready for pickup', 'Waiting for Parts', 'Waiting for Appointment', 'Waiting for tow']
  DamagedBy: Ref (→"=Damaged By")
  RepairedBy: Text (→"=Repair Shop")
  Invoice: Price (→"=Repair Amount")
  Paid By: Enum [Values: 'Amazon Vendor', 'Our Company', 'Company Insurance', 'No Payment Required', 'Rental Company', 'Third Party', 'Unpaid']
  Document: File
  Photo1: Image
  Photo2: Image
  Photo3: Image
  Photo4: Image
  Amazon Repair ID: Text { Logic: [ShowIf]="=[Location]="Tracy"" }
  Repair Ordered via: Enum [Values: 'Click to Call', 'DVIR'] { Logic: [ShowIf]="=[Location]="Tracy"" }
  UpdatedBy: Ref
  UpdatedOn: DateTime
  Related Notes: List [RO,VC]
```

### Notes (10 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  RNID: Text = UNIQUEID()
  Date: Date = TODAY()
  RID: Ref
  FleetID: Ref
  EmployeeID: Ref
  Description: LongText
  UpdatedBy: Ref
  UpdatedOn: DateTime
  Related Payrolls: List [RO,VC]
```

### PlanningTracy (16 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  PlanningID: Text = UNIQUEID()
  SummaryID: Number
  WeekNumber: Text
  Date: Date = TODAY()
  Routes: Number = =16
  Location: Text
  ExtraDrivers: Number [RO]
  WeekDay: Text [RO]
  DriversRostered: Text [RO]
  Extras: LongText [RO]
  Other: LongText [RO]
  WorkingTrucks: Text [RO]
  Drivers: Number [RO]
  Ride Along: Number [RO]
  Trainee: Number [RO]
```

### RosterTracy (31 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  Date: Date = TODAY()
  RosterID: Text = UNIQUEID()
  EmployeeID: Ref (→"=Employee")
  FleetID: Ref (→"=Vehicle")
  WorkType: Enum = =INDEX(
  SELECT(
    Schedule[WorkType],
     AND(
      [EmployeeID] = [_THISROW].[EmployeeID],
      [Date]=[_THISROW].[DATE],
      [_THISROW].[EmployeeID].[WorkType]<>null
    )
  ),
  1
)
  SubType: Enum (→"="Type"")
  Route: Text (→"=Block Id")
  RouteStartTime: Time (→"=Route Start Time")
  Priority: Text
  ReportingTime: Time (→"=Reporting Time")
  Station: Text (→"=Loading Station")
  Inventory: Ref (→"=Phone Assigned")
  ExpectedWHC: Enum [Values: 'Passed', 'Risky', 'Failed']
  WHCNotes: LongText [RO] (→"="Work Hour Complaince Notes"")
  ReportingLocation: Enum [Values: 'Diesel Yard', 'EBT Lot'] = =Diesel Yard (→"=Report At")
  Confirmed: Text
  Notes: LongText
  Location: Enum [Values: 'Tracy'] = ="Tracy"
  UpdatedBy: Ref = =INDEX(ME[UserID],1)
  UpdatedOn: DateTime = NOW()
  InputReason: Enum (→"="Reason"")
  FleetDuplicate: Number [RO]
  SafetyViolations: Number [RO]
  Phone: Phone [RO]
  Absent: Number [RO]
  Rating: Decimal [RO]
  Type: Text [RO]
  FuelType: Enum [RO]
  Snow Chain: Text [RO]
  Notification: LongText [RO]
```

### DOTAudit (100 cols)
[Inherits all 103 columns from Table: Process for UpdateVehicleStatus Process Table]
+ Modified/Added Columns:
  - _RowNumber: Number

### CommonDocs (4 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  Name: Name
  Description: LongText
  Link: File
```

### EmployeeDocs (14 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  IID: Text [HIDDEN] = =uniqueid()
  EmployeeId: Ref
  Type: Enum [Values: 'Driver License', 'EAD', 'MEC', 'Permanent Resident Card', 'Passport', 'SSN', 'Citizenship Certificate', 'Birth Certificate'] = ="MEC"
  Status: Enum [Values: 'Active', 'Inactive'] = ="Active"
  Expiry: Date
  Link: File (→"="Upload File"")
  PicFront: Text
  PicBack: Text
  Notes: LongText
  UploadDate: Date = TODAY()
  Category: Text
  UploadBy: Ref = =Any(Me[UserID]) { Slices Cross-Ref: Me -> Users }
  Location: Text [RO]
```

### JJKRenewals (18 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text [HIDDEN] = =[Employee Code]&"-"&[Form Abbreviation]
  Last Name: Text
  First Name: Text
  Middle Initial: Text
  DL State: Enum
  Employee Code: Text (→"="JJK ID"")
  Job Class: Enum
  Form Abbreviation: Enum
  Form Type: Enum
  Expiration Date: Date = TODAY()
  Status: Enum (→"="JJK Status"")
  DocStatus: Enum [Values: 'Completed', 'In Progress', 'Offboarded', 'Uploaded', 'Repeat'] (→"="Status"")
  Notes: LongText
  LastEditBy: Enum = =Any(Me[UserID]) { Logic: [EditIf]="=isblank([_this])" } { Slices Cross-Ref: Me -> Users }
  LastEditOn: DateTime = =now() { Logic: [EditIf]="=isblank([_this])" }
  EmployeeID: Ref [RO]
  _ComputedName: Name [RO,VC] (→"="Name"")
```

### WHC_Tracy (19 cols)
[Inherits all 18 columns from Table: WHC]
+ Modified/Added Columns:
  - RelatedRosterTracy: List
  - LastEntries: List

### EmployeeAudit (11 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  Id: Text [HIDDEN] = UNIQUEID()
  EmployeeId: Ref
  Type: Enum [Values: 'Address']
  IsAddressCorrect: Yes/No (→"="Does driver lives at the address mentioned on the Driving License? Or Is the address updated with DMV?"")
  Status: Text [HIDDEN]
  LastUpdateBy: Enum
  LastUpdateOn: DateTime
  IsDOTEmployee: Yes/No [HIDDEN,RO]
  EmployeeAddress: Address [RO]
  PhoneNumber: Phone [HIDDEN,RO]
```

### ImportRelayPaymentDetails (27 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  UniqueID: Text = =UNIQUEID()
  Invoice Number: Text
  Block Id: Text
  Trip ID: Text
  Load ID: Text
  Start Date: Text
  End Date: Text
  Route/Domicile: Text
  Operator Type: Text
  Equipment: Text
  Distance (Mi): Text
  Item Type: Text
  Program Type: Text
  Hourly Rate: Text
  Duration (hrs): Text
  Variable Total: Text
  Column_17: Show [HIDDEN,RO]
  Column_18: Show [HIDDEN,RO]
  Base Rate: Text
  Fuel Surcharge: Text
  Tolls: Text
  Detention: Text
  TONU: Text
  Others: Text
  Gross Pay: Text
  Comments: Text
```

### ImportRelayTrips (129 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  UniqueID: Text = UNIQUEID()
  Block ID: Text
  Trip ID: Text
  Block/Trip: Text
  Trip Stage: Text
  Load ID: Text
  Facility Sequence: Text
  Load Execution Status: Text
  Transit Operator Type: Text
  Driver Name: Name
  Equipment Type: Text
  Trailer ID: Text
  Tractor Vehicle ID: Text
  Estimate Distance: Text
  Unit: Text
  Rate Type: Text
  Estimated Cost: Price
  Currency: Text
  Truck Filter: Text
  Operator ID: Text
  Shipper Account: Text
  Sub Carrier: Text
  CR_ID: Text
  Port Appointment Date: Date
  Port Appointment Time: Time
  Port Pin Code: Text
  Spot Work: Text
  Contract Type: Text
  Contract ID: Text
  Stop 1: Text
  Stop 1 UTC Offset: Text
  Stop 1 Planned Arrival Date: Date
  Stop 1 Planned Arrival Time: Time
  Stop 1  Actual Arrival Date: Date
  Stop 1  Actual Arrival Time: Time
  Stop 1  Planned Departure Date: Date
  Stop 1  Planned Departure Time: Time
  Stop 1 Actual Departure Date: Date
  Stop 1 Actual Departure Time: Time
  Stop 1 Container ID: Text
  Stop 2: Text
  Stop 2 UTC Offset: Text
  Stop 2 Planned Arrival Date: Date
  Stop 2 Planned Arrival Time: Time
  Stop 2  Actual Arrival Date: Date
  Stop 2  Actual Arrival Time: Time
  Stop 2  Planned Departure Date: Date
  Stop 2  Planned Departure Time: Time
  Stop 2 Actual Departure Date: Date
  Stop 2 Actual Departure Time: Time
  Stop 2 Container ID: Text
  Stop 3: Text
  Stop 3 UTC Offset: Text
  Stop 3 Planned Arrival Date: Date
  Stop 3 Planned Arrival Time: Time
  Stop 3  Actual Arrival Date: Date
  Stop 3  Actual Arrival Time: Time
  Stop 3  Planned Departure Date: Date
  Stop 3  Planned Departure Time: Time
  Stop 3 Actual Departure Date: Date
  Stop 3 Actual Departure Time: Time
  Stop 3 Container ID: Text
  Stop 4: Text
  Stop 4 UTC Offset: Text
  Stop 4 Planned Arrival Date: Date
  Stop 4 Planned Arrival Time: Time
  Stop 4  Actual Arrival Date: Date
  Stop 4  Actual Arrival Time: Time
  Stop 4  Planned Departure Date: Date
  Stop 4  Planned Departure Time: Time
  Stop 4 Actual Departure Date: Date
  Stop 4 Actual Departure Time: Time
  Stop 4 Container ID: Text
  Stop 5: Text
  Stop 5 UTC Offset: Text
  Stop 5 Planned Arrival Date: Date
  Stop 5 Planned Arrival Time: Time
  Stop 5  Actual Arrival Date: Date
  Stop 5  Actual Arrival Time: Time
  Stop 5  Planned Departure Date: Date
  Stop 5  Planned Departure Time: Time
  Stop 5 Actual Departure Date: Date
  Stop 5 Actual Departure Time: Time
  Stop 5 Container ID: Text
  Stop 6: Text
  Stop 6 UTC Offset: Text
  Stop 6 Planned Arrival Date: Date
  Stop 6 Planned Arrival Time: Time
  Stop 6  Actual Arrival Date: Date
  Stop 6  Actual Arrival Time: Time
  Stop 6  Planned Departure Date: Date
  Stop 6  Planned Departure Time: Time
  Stop 6 Actual Departure Date: Date
  Stop 6 Actual Departure Time: Time
  Stop 6 Container ID: Text
  Stop 7: Text
  Stop 7 UTC Offset: Text
  Stop 7 Planned Arrival Date: Date
  Stop 7 Planned Arrival Time: Time
  Stop 7  Actual Arrival Date: Date
  Stop 7  Actual Arrival Time: Time
  Stop 7  Planned Departure Date: Date
  Stop 7  Planned Departure Time: Time
  Stop 7 Actual Departure Date: Date
  Stop 7 Actual Departure Time: Time
  Stop 7 Container ID: Text
  Stop 8: Text
  Stop 8 UTC Offset: Text
  Stop 8 Planned Arrival Date: Date
  Stop 8 Planned Arrival Time: Time
  Stop 8  Actual Arrival Date: Date
  Stop 8  Actual Arrival Time: Time
  Stop 8  Planned Departure Date: Date
  Stop 8  Planned Departure Time: Time
  Stop 8 Actual Departure Date: Date
  Stop 8 Actual Departure Time: Time
  Stop 8 Container ID: Text
  Stop 9: Text
  Stop 9 UTC Offset: Text
  Stop 9 Planned Arrival Date: Date
  Stop 9 Planned Arrival Time: Time
  Stop 9  Actual Arrival Date: Date
  Stop 9  Actual Arrival Time: Time
  Stop 9  Planned Departure Date: Date
  Stop 9  Planned Departure Time: Time
  Stop 9 Actual Departure Date: Date
  Stop 9 Actual Departure Time: Time
  Stop 9 Container ID: Text
```

### RelayRoutes (16 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  RouteId: Text
  Date: Date
  First Stop: Name
  FirstStopArrivalTime: Text
  Assigned Driver: Text
  RouteStatus: Text
  Payment Status: Enum [Values: 'Paid', 'Partially Paid', 'Disputed', 'Not Eligible', 'Queued', 'Let Go']
  DisputeType: Enum [Values: 'Trip Completion ', 'Relay Invoice', 'MMRO Support Hub']
  Dispute Status: Enum [Values: 'Submitted', 'Pending', 'Accepted', 'Rejected']
  CaseId: Text
  WorkId: Ref
  Notes: LongText
  Source: Text { Logic: [EditIf]="=CONTEXT("View")<>"Routes_Detail"" }
  UpdatedOn: DateTime = =NOW()
  UpdatedBy: Ref = =INDEX(ME[UserID],1)
```

### Notifications (6 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  Id: Number
  DailyNotificationTracy: Text
  DailyNotificationFremont: Text
  MessageCSVTracy: LongText [RO] (→"="Text Messages - Tracy"") { Logic: [ShowIf]="=in("Tracy",Any(Me[Location]))" } { Slices Cross-Ref: Me -> Users }
  MessageCSVFremont: LongText [RO] (→"="Text Messages - Fremont"") { Logic: [ShowIf]="=in("Fremont",Any(Me[Location]))" } { Slices Cross-Ref: Me -> Users }
```

### DOTLatestAuditRecord (7 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  FleetID: Ref = UNIQUEID()
  LastInspectionId: Ref
  LastInspectionDate: DateTime = TODAY()
  Name: Name [RO]
  Location: Text [RO]
  Status: Text [RO]
```

### Separation (81 cols)
[Inherits all 81 columns from Table: Change Email Status to Sent Output]
+ Modified/Added Columns:
  - _RowNumber: Number

### Income (20 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  Key: Text = =CONCATENATE([Location Code],Text([Pay Date]),[Job Title Description])
  PayrollNumber: Number
  Location Code: Text
  Gross Pay: Price
  Job Title Description: LongText
  Take Home: Price
  Regular Earnings Total: Price
  Overtime Earnings Total: Price
  All Additional Earnings: Price
  Regular Hours Total: Number
  Overtime Hours Total: Number
  Pay Date: Date
  Employment Profile - Effective Date: Date
  WorkersComp: Price = =IFS(
   [Job Title Description] = "Office Personal",
   [Gross Pay] * LOOKUP(
     "WorkerCompRateClerical",
     "AppVariables",
     "ID",
     "Decimal"
  ),
   1 = 1,
   [Gross Pay] * LOOKUP(
     "WorkerCompRateDA",
     "AppVariables",
     "ID",
     "Decimal"
  )
)
  Pega: Price = =[Gross Pay]*LOOKUP(
  "PEGA",
  "AppVariables",
  "ID",
  "Decimal"
)
  AdditionalCharges: Price = =[Gross Pay]*LOOKUP(
  "AdditionalPayrollCharges",
  "AppVariables",
  "ID",
  "Decimal"
)
  Total Cost: Price = =[Gross Pay]+[WorkersComp]+[AdditionalCharges]+[Pega]
  Invoice: Ref
  Profit: Price
```

### WSTDeliveredPackages (7 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = =[Date]
  Week: Text = =SELECT(
   WeeklyMapping[WeekYearID],
   AND(
     [_THISROW].[Date] >= [StartDate],
     [_THISROW].[Date] <= [EndDate]
  )
) { Slices Cross-Ref: WeeklyMapping -> Week }
  Date: Date = TODAY()
  Station: Text
  DSP Short Code: Text
  delivered packages: Number
```

### WSTServiceDetails (19 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = =Concatenate([Date],[Route],"-",[Shipments delivered])
  Week: Text = =SELECT(
   WeeklyMapping[WeekYearID],
   AND(
     [_THISROW].[Date] >= [StartDate],
     [_THISROW].[Date] <= [EndDate]
  )
) { Slices Cross-Ref: WeeklyMapping -> Week }
  Date: Date = TODAY()
  Station: Text
  DSP Short Code: Text
  Delivery Associate: Text
  Route: Text
  Service Type: Text
  Planned Duration: Text
  Log in: DateTime
  Log out: DateTime
  Total Distance Planned: Number
  Total Distance Allowance: Number
  Distance unit: Text
  Shipments delivered: Number
  Shipments returned: Number
  Excluded?: Yes/No
  Duration: Duration [RO]
```

### WSTUnplannedDelays (10 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = =CONCATENATE([Date],[Impacted routes])
  Week: Text = =SELECT(
   WeeklyMapping[WeekYearID],
   AND(
     [_THISROW].[Date] >= [StartDate],
     [_THISROW].[Date] <= [EndDate]
  )
) { Slices Cross-Ref: WeeklyMapping -> Week }
  Date: Date = TODAY()
  Station: Text
  DSP Short Code: Text
  unplanned delay: Text
  total delay in minutes: Number
  Impacted routes: Text
  Notes: LongText
```

### WSTWeeklyReport (16 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = =CONCATENATE([Date],[Service Type],"-",[Planned Duration])
  Week: Text = =SELECT(
   WeeklyMapping[WeekYearID],
   AND(
     [_THISROW].[Date] >= [StartDate],
     [_THISROW].[Date] <= [EndDate]
  )
) { Slices Cross-Ref: WeeklyMapping -> Week }
  Date: Date
  Station: Text
  DSP Short Code: Text
  Service Type: Text
  Planned Duration: Text
  Total Distance Planned: Number
  Total Distance Allowance: Number
  Planned Distance Unit: Text
  AMZL late cancel: Text
  DSP late cancel: Text
  Quick coverage: Text
  accepted: Text
  completed routes: Number
```

### Rentals (12 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  RentalID: Text = UNIQUEID() { Logic: [EditIf]="=ISBLANK([_this])" }
  AgreementID: Text
  Vehicle: Text
  FleetID: Ref = =INDEX(
  select(
    Fleet[FleetID],
    [Rental ID]=[_THISROW].[Vehicle]
  ),
  1
)
  Status: Enum = =INDEX(
  select(
    Fleet[Status],
    [Rental ID]=[_THISROW].[Vehicle]
  ),
  1
)
  BillingDate: Date = TODAY()
  RentalStartDate: Date (→"=Out Date")
  RentalEndDate: Date (→"=In Date")
  Amount: Price
  Agreement: File
  Return Date: Date [RO]
```

### PayCheck (17 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID() { Logic: [EditIf]="=ISBLANK([_this])" }
  EmployeeID: Enum
  EmployeeName: Name [HIDDEN] = =[EmployeeID].[Name]
  EmployeeEmail: Email = =[EmployeeID].[Email]
  ReasonForCheck: Enum [Values: 'Training', 'Reimbursement']
  CheckAmount: Decimal
  CheckNumber: Text
  CheckMemo: Text
  ManualCheck: Text
  UploadedManualCheck: File
  PayCheckAcknowledgment: File
  UploadSignedAcknowledgment: File
  Email: Email [HIDDEN]
  Trigger: Text [HIDDEN]
  LastEditBy: Enum = =Any(Me[UserID]) { Logic: [EditIf]="=isblank([_this])" } { Slices Cross-Ref: Me -> Users }
  LastEditOn: DateTime = =NOW() { Logic: [EditIf]="=isblank([_this])" }
```

### KnowledgeArticles (16 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
  Topic: LongText
  Solution: LongText
  Keywords: Text
  Pic_1: Image (→"="Picture"")
  Solution_2: LongText
  Pic_2: Image (→"="Picture"")
  File: File
  URL: Url
  Category: EnumList [Values: 'Truck Issue', 'On Road Stop ']
  Notes: LongText
  Location: Enum [Values: 'Fremont', 'Tracy']
  UpdatedBy: Ref = =Any(Me[UserID]) { Slices Cross-Ref: Me -> Users }
  CreatedBy: Ref = =Any(Me[UserID]) { Slices Cross-Ref: Me -> Users }
  UpdatedOn: DateTime = =NOW()
```

### EfficiencyTracy (15 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  Date: Date = TODAY()
  Week: Ref
  Routes: Number
  Training: Number
  PaidRouteHours: Number
  TrainingPaidHours: Number
  AMZNCancel: Number
  DSPLateCancel: Number
  Packages: Number
  TotalTime: Decimal
  PerRouteDeliveryTime: Decimal
  Overtime: Decimal
  UpdatedBy: Text = =Any(Me[UserID]) { Logic: [EditIf]="=isblank([UpdatedBy])" } { Slices Cross-Ref: Me -> Users }
  UpdatedOn: DateTime = NOW() { Logic: [EditIf]="=isblank([UpdatedOn])" }
```

### WeeklyReport (19 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
  Week: Enum
  Location: Enum
  Performance: Enum
  Routes: Number
  Training: Number
  PaidRouteHours: Number
  TrainingPaidHours: Number
  AMZNCancel: Number
  DSPLateCancel: Number
  Packages: Number
  TotalTime: Decimal
  PerRouteDeliveryTime: Decimal
  Cost: Price
  Overtime: Decimal
  LastEditBy: Name
  LastEditOn: DateTime = NOW()
  Related EfficiencyFremont: List [RO,VC]
```

### DailyHours (10 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Number
  Date: Date = TODAY()
  Employee: Enum
  Hours: Decimal
  WorkID: Ref
  StartDateTime: DateTime
  EndDateTime: DateTime
  Overlap: Enum [RO]
  PayrollEntry: Enum [RO]
```

### Payroll (10 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  Id: Number
  EmployeeId: Number
  Date: Date = TODAY()
  HoursWorked: Decimal
  MealPenalty: Yes/No
  Notes: Ref
  WorkId_1: Text
  WorkId_2: Text
  WorkId_3: Text
```

### AMXLServices (11 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  Tracking ID: Text = UNIQUEID()
  Date: Date = TODAY()
  Route ID: Text
  Stop Number: Number
  Stop Type: Enum [Values: 'DELIVERY', 'PICKUP']
  Services: Text
  Slot Window: Text
  Item Name: Name
  Count: Number
  ServiceInstructions: Text [RO]
```

### PayrollHours (17 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  HID: Text = UNIQUEID()
  Payroll: Enum
  EmployeeID: Number
  Payrate: Decimal
  RegularHours1: Decimal
  OvertimeHours1: Number
  RegularHours2: Decimal
  OvertimeHours2: Decimal
  PTO: Text
  ReportingTime: Time = TIMENOW()
  Bonus Week1: Price
  Bonus Week2: Price
  WHC Week1: Yes/No
  WHC Week2: Yes/No
  UpdatedOn: DateTime = NOW()
  RetroPay: Price
```

### CallBackFremont (13 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  IId: Text [HIDDEN] = =UNIQUEID()
  City: Text
  Drive Time: Duration (→"="Expected Time to Drive Back"")
  RTSTime: Duration (→"="Expected Time to RTS and drive to lot"")
  Buffer: Duration (→"="Additional Buffer"")
  Duration: Time = TIMENOW()
  ToParking: Time = TIMENOW()
  Wave1ClockIn: Time = ="10:00 AM" (→"="Wave-1 Clock-In Time"")
  Wave2ClockIn: Time = ="10:30 AM" (→"="Wave-2 Clock In Time"")
  Wave1CallBackTime: Time [RO]
  Wave2CallBackTime: Time [RO]
  Rescue: Enum [Values: 'Yes', 'No Rescue unless it is Driver/Dispatch fault', 'Dispatch Call', 'No'] (→"="Rescue Strategy"")
```

### ADPReport (13 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  Key: Text = =UNIQUEID()
  Company Code: Text
  Last Name: Name
  First Name: Name
  Position ID: Text
  Worked Department: Text
  State: Text
  In time: Text
  Out time: Text
  Out Punch Type: Text
  Hours: Text
  Pay Code: Text
```

### DADaily (21 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  Transporter Id: Text = UNIQUEID()
  Driver name: Name
  DSP: Text
  DA activity: Text
  Route code: Text
  Progress Status: Text
  Projected Return to Station: Text
  projected overtime duration (minutes): Text
  Delivery Service Type: Text
  cortex_vin_number: Text
  All stops: Text
  Stops complete: Text
  not started stops: Text
  total packages: Number
  cortex_avg_pace_stops_per_hour: Text
  cortex_remaining_state_of_charge: Text
  App sign in:: Text
  App sign out:: Text
  cortex_last_stop_execution_time: Text
  cortex_total_break_time_used: Text
```

### DailyAPIReport (13 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  IID: Text = UNIQUEID()
  Date: Date
  CapturedAt: Text
  vinNumber: Text
  AppLogin: Text
  AppLogout: Text
  MealIn: Text
  MealOut: Text
  Route: Text
  transporterId: Text
  workPhoneNumber: Phone
  DAName: Name
```

### RoutesDaily (12 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  Route code: Text
  DSP: Text
  Transporter Id: Text
  Driver name: Name
  Route progress: Text
  Delivery Service Type: Text
  Route Duration: Text
  All stops: Text
  Stops complete: Text
  not started stops: Text
  Date: Date = TODAY()
```

### Worker5020 (68 cols)
[Inherits all 74 columns from Table: Process for FormGenerator Process Table]
+ Modified/Added Columns:
  - _RowNumber: Number

### i9Tracking (12 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  Token: Text [RO] = =UNIQUEID()
  EmployeeName: Name [RO] = =IFS(
   ISNOTBLANK(
    [EmpId]
  ),
  [EmpId].[Name],
   ISNOTBLANK(
    [CandidateId]
  ),
  [CandidateId].[Name],
   1=1,
  ""
)
  Position: Enum [Values: 'Driver', 'Helper', 'Other']
  Status: Text = =Active
  CompanyName: Name [RO] = ="BLUJ"
  UploadedAt: DateTime [RO]
  FolderId: Url [RO]
  Message: Text [RO] = =CONCATENATE("Please upload the required documents using the link below: ", "https://empdocverifier-857017022688.us-west1.run.app/?token=",[Token],"&company=BLUJ", " Once the upload is complete, please confirm here.")
  EmpId: Ref (→"="Employee"") { Logic: [ShowIf]="=ISBLANK([CandidateId])" }
  CandidateId: Ref (→"="Candidate"") { Logic: [ShowIf]="=ISBLANK([EmpId])" }
  Action: Enum [Values: 'Move to Employee Folder', 'Delete'] { Logic: [ShowIf]="=[Status]<>"Active"" }
```

### Attendance (7 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  IID: Date [RO] = =UNIQUEID()
  Present: EnumList [Values: 'Test'] { Logic: [ValidIf]="=IFS(
   [Location] = "Tracy",
   LIST() + SELECT(
    RosterTracy[RosterID],
     TRUE
  ),
   [Location] = "Fremont",
   LIST() + SELECT(
    RosterFremont[RosterID],
     TRUE
  )
)" }
  ComingSoon: Text
  Location: Text [RO] = =CONTEXT("View")
  LastEditBy: Ref [RO] = =INDEX(ME[UserID],1)
  LastEditOn: DateTime [RO] = =NOW()
```

### EverydayIssue (3 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  WorkId: Ref = UNIQUEID()
  Reason: Text
```

### ModifiedDuty (22 cols)
[Inherits all 22 columns from Table: ChangeEmailStatus Output]
+ Modified/Added Columns:
  - _RowNumber: Number

### CDF (23 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  TBA: Text
  TransporterId: Text
  EmployeeId: Text
  EmployeeName: Name
  Photo: Image
  FeedbackDetails: Text
  FeedbackType: Text
  Address: Address
  DropOffLocation: Text
  Distance: Text
  CustomerNotes: LongText
  DeliveryDate: Date = TODAY()
  Week: Ref
  CreatedAt: Text
  NonDisputable: Yes/No
  DisputeReason: Text
  DisputeStrength: Text
  AIProcessedAt: Text
  AIModelUsed: Text
  ErrorMessage: Text
  Dispute_Text: Text
  IsArchived: Yes/No
```

### SMSFremont (8 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  IID: Text = UNIQUEID()
  EmployeeName: Name
  EmployeePhoneNumber: Phone
  TextMessage: Text
  MessageStatus: Text
  SendBy: Text
  SentOn: DateTime (→"="Created On"")
```

### SMSTracy (8 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  IID: Text = UNIQUEID()
  EmployeeName: Name
  EmployeePhoneNumber: Phone
  TextMessage: Text
  MessageStatus: Text
  SendBy: Text
  SentOn: Text
```

### Process for UpdateOnbaodingstatus Process Table (80 cols)
[Inherits all 68 columns from Table: Process for AddEmployeeandCreateTasks Process Table]
+ Modified/Added Columns:
  - Check if [Onboarding Status]is not Training Scheduled: Ref
  - Check if [Background] is Meet Requirement and drug test is result negative, JJK Audit Qualified: Ref
  - Check if [Training Date] is blank: Ref
  - Set [OnboardingStatus] to Schedule Training: Ref
  - Set [OnboaridngStatus] to Schedule Training: Ref
  - if failed: Ref
  - set Onboarding status to Training scheduled: Ref
  - Check if [Background] is not Report Review: Ref
  - Set [Onboarding Status] to Background Failed: Ref
  - Check if [DrugTest] is Result Positive: Ref
  - Set [Onboarding Status] to Drug Test Failed: Ref
  - Check if [Onboarding Status] not set with responses 2: Ref
  - Check if [Background] is pending: Ref
  - Set [Onboarding Status] to Waiting for Results: Ref
  - Set [Onboarding Status] to Followup: Ref

### Check if [Onboarding Status]is not Training Scheduled Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Check if [Background] is Meet Requirement and drug test is result negative, JJK Audit Qualified Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Check if [Training Date] is blank Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Set [OnboardingStatus] to Schedule Training Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Set [OnboaridngStatus] to Schedule Training Output (64 cols)
[Inherits all 68 columns from Table: Process for AddEmployeeandCreateTasks Process Table]

### if failed Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### New step Output (64 cols)
[Inherits all 68 columns from Table: Process for AddEmployeeandCreateTasks Process Table]

### set Onboarding status to Training scheduled Output (64 cols)
[Inherits all 68 columns from Table: Process for AddEmployeeandCreateTasks Process Table]

### Check if [Background] is not Report Review Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Set [Onboarding Status] to Background Failed Output (64 cols)
[Inherits all 68 columns from Table: Process for AddEmployeeandCreateTasks Process Table]

### Check if [DrugTest] is Result Positive Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Set [Onboarding Status] to Drug Test Failed Output (64 cols)
[Inherits all 68 columns from Table: Process for AddEmployeeandCreateTasks Process Table]

### Check if [Onboarding Status] not set with responses 2 Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Check if [Background] is pending Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Set [Onboarding Status] to Waiting for Results Output (64 cols)
[Inherits all 68 columns from Table: Process for AddEmployeeandCreateTasks Process Table]

### Set [Onboarding Status] to Followup Output (64 cols)
[Inherits all 68 columns from Table: Process for AddEmployeeandCreateTasks Process Table]

### Process for SetDecisiontoScheduled Process Table (23 cols)
[Inherits all 23 columns from Table: Process for MoveCandidateToOnboarding Process Table]
+ Modified/Added Columns:
  - Set [Decision] to Scheduled: Ref

### Set [Decision] to Scheduled Output (22 cols)
[Inherits all 23 columns from Table: Process for SetDecisiontoScheduled Process Table]

### Process for MoveCandidateToOnboarding Process Table (23 cols)
[Inherits all 23 columns from Table: Process for SetDecisiontoScheduled Process Table]
+ Modified/Added Columns:
  - StartOnboarding: Ref

### StartOnboarding Output (22 cols)
[Inherits all 23 columns from Table: Process for SetDecisiontoScheduled Process Table]

### Process for AddEmployeeandCreateTasks Process Table (68 cols)
[Inherits all 66 columns from Table: Process for PRCSentCreateTasksforDispatch Process Table]
+ Modified/Added Columns:
  - New step: Ref
  - MoveToEmployee 2: Ref
  - CheckIfUpgradeEmployee: Ref
  - MarkAsDOTDriver: Ref

### New step Output 2 (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### MoveToEmployee 2 Output (64 cols)
[Inherits all 68 columns from Table: Process for AddEmployeeandCreateTasks Process Table]

### CheckIfUpgradeEmployee Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### MarkAsDOTDriver Output (64 cols)
[Inherits all 68 columns from Table: Process for AddEmployeeandCreateTasks Process Table]

### Process for ActionCallerTracy Process Table (8 cols)
```
  Instance Id: Text
  UID: Text
  Action Name Fremont: Enum [Values: 'Create Roster Fremont']
  Action Name Tracy: Enum [Values: 'Create Roster Tracy']
  New step: Ref
  RosterCreationTracy: Ref
  First Step Duplicate Remover: Ref
  New step 2: Ref
```

### New step Output 3 (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### RosterCreationTracy Output (4 cols)
```
  Instance Id: Text
  UID: Text
  Action Name Fremont: Enum [Values: 'Create Roster Fremont']
  Action Name Tracy: Enum [Values: 'Create Roster Tracy']
```

### First Step Duplicate Remover Output (4 cols)
```
  Instance Id: Text
  UID: Text
  Action Name Fremont: Enum [Values: 'Create Roster Fremont']
  Action Name Tracy: Enum [Values: 'Create Roster Tracy']
```

### New step 2 Output (4 cols)
```
  Instance Id: Text
  UID: Text
  Action Name Fremont: Enum [Values: 'Create Roster Fremont']
  Action Name Tracy: Enum [Values: 'Create Roster Tracy']
```

### Process for CreateScheduleForNewEmployee - 1 Process Table (86 cols)
[Inherits all 91 columns from Table: Process for CreateWeeklyEmployee Process Table]
+ Modified/Added Columns:
  - RecreateEmployeeSchedule: Ref

### RecreateEmployeeSchedule Output (1 cols)
```
  Instance Id: Text
```

### Process for When an employee is terminated Process Table (89 cols)
[Inherits all 91 columns from Table: Process for CreateWeeklyEmployee Process Table]
+ Modified/Added Columns:
  - RemovefromSchedule: Ref
  - RemoveFleetAssignment: Ref
  - RemoveRelatedRoster: Ref
  - RemoveWeeklyMessage: Ref

### RemovefromSchedule Output (85 cols)
[Inherits all 91 columns from Table: Process for CreateWeeklyEmployee Process Table]

### RemoveFleetAssignment Output (85 cols)
[Inherits all 91 columns from Table: Process for CreateWeeklyEmployee Process Table]

### RemoveRelatedRoster Output (85 cols)
[Inherits all 91 columns from Table: Process for CreateWeeklyEmployee Process Table]

### RemoveWeeklyMessage Output (85 cols)
[Inherits all 91 columns from Table: Process for CreateWeeklyEmployee Process Table]

### Process for UpdateEmployeeStatus - 1 Process Table (17 cols)
[Inherits all 16 columns from Table: Schedule]
+ Modified/Added Columns:
  - Instance Id: Text
  - New step: Ref

### New step Output 4 (16 cols)
[Inherits all 17 columns from Table: Process for UpdateEmployeeStatus - 1 Process Table]

### Process for AddToEverdayforTraining Process Table (86 cols)
[Inherits all 91 columns from Table: Process for CreateWeeklyEmployee Process Table]
+ Modified/Added Columns:
  - New step: Ref

### New step Output 5 (85 cols)
[Inherits all 91 columns from Table: Process for CreateWeeklyEmployee Process Table]

### Process for UpdateHoursPreviousPayroll Process Table (87 cols)
[Inherits all 91 columns from Table: Process for CreateWeeklyEmployee Process Table]
+ Modified/Added Columns:
  - DeleteCurrentHours: Ref
  - CreateLastPayrollHours: Ref

### DeleteCurrentHours Output (85 cols)
[Inherits all 91 columns from Table: Process for CreateWeeklyEmployee Process Table]

### CreateLastPayrollHours Output (85 cols)
[Inherits all 91 columns from Table: Process for CreateWeeklyEmployee Process Table]

### Process for UpdateWeeklyEmployee Process Table (19 cols)
[Inherits all 17 columns from Table: Process for UpdateEmployeeStatus - 1 Process Table]
+ Modified/Added Columns:
  - CheckforemployeeweeklyRow: Ref
  - AddNewRow: Ref
  - Update Existing Rows: Ref

### CheckforemployeeweeklyRow Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### AddNewRow Output (16 cols)
[Inherits all 17 columns from Table: Process for UpdateEmployeeStatus - 1 Process Table]

### Update Existing Rows Output (16 cols)
[Inherits all 17 columns from Table: Process for UpdateEmployeeStatus - 1 Process Table]

### Process for StartTermination Process Table (88 cols)
[Inherits all 91 columns from Table: Process for CreateWeeklyEmployee Process Table]
+ Modified/Added Columns:
  - TurnOFFTheSchedule: Ref
  - RemoveWeeklyText: Ref
  - create the Separation Entry for the Employee: Ref

### TurnOFFTheSchedule Output (85 cols)
[Inherits all 91 columns from Table: Process for CreateWeeklyEmployee Process Table]

### RemoveWeeklyText Output (85 cols)
[Inherits all 91 columns from Table: Process for CreateWeeklyEmployee Process Table]

### create the Separation Entry for the Employee Output (85 cols)
[Inherits all 91 columns from Table: Process for CreateWeeklyEmployee Process Table]

### Process for CreateRepeatTask Process Table (15 cols)
[Inherits all 14 columns from Table: Tasks]
+ Modified/Added Columns:
  - Instance Id: Text
  - CreateRepeatTask: Ref

### CreateRepeatTask Output (14 cols)
[Inherits all 15 columns from Table: Process for CreateRepeatTask Process Table]

### Process for WhenScorecardIsimportedAddtoPerformance Process Table (26 cols)
[Inherits all 25 columns from Table: Scorecard]
+ Modified/Added Columns:
  - Instance Id: Text
  - AddRowsPerformance: Ref

### AddRowsPerformance Output (25 cols)
[Inherits all 26 columns from Table: Process for WhenScorecardIsimportedAddtoPerformance Process Table]

### Process for UpdateEMployeeinPerformance Process Table (86 cols)
[Inherits all 91 columns from Table: Process for CreateWeeklyEmployee Process Table]
+ Modified/Added Columns:
  - UpdatePerformance: Ref

### UpdatePerformance Output (85 cols)
[Inherits all 91 columns from Table: Process for CreateWeeklyEmployee Process Table]

### Process for UpdateHealthBenefitEnrollment Process Table (65 cols)
[Inherits all 68 columns from Table: Process for AddEmployeeandCreateTasks Process Table]

### New step Output 6 (64 cols)
[Inherits all 68 columns from Table: Process for AddEmployeeandCreateTasks Process Table]

### Process for PRCSentCreateTasksforDispatch Process Table (66 cols)
[Inherits all 68 columns from Table: Process for AddEmployeeandCreateTasks Process Table]
+ Modified/Added Columns:
  - CreateTaskforDispatch: Ref
  - AddTransporterID: Ref

### CreateTaskforDispatch Output (64 cols)
[Inherits all 68 columns from Table: Process for AddEmployeeandCreateTasks Process Table]

### AddTransporterID Output (64 cols)
[Inherits all 68 columns from Table: Process for AddEmployeeandCreateTasks Process Table]

### Process for WhenADPDataisimported Process Table (18 cols)
[Inherits all 16 columns from Table: ADP]
+ Modified/Added Columns:
  - Instance Id: Text
  - DeletePayCal: Ref
  - AddRowsToPayCal: Ref

### DeletePayCal Output (16 cols)
[Inherits all 16 columns from Table: ADP]
+ Modified/Added Columns:
  - Instance Id: Text

### AddRowsToPayCal Output (16 cols)
[Inherits all 16 columns from Table: ADP]
+ Modified/Added Columns:
  - Instance Id: Text

### Process for DeleteReports Process Table (90 cols)
[Inherits all 91 columns from Table: Process for CreateWeeklyEmployee Process Table]
+ Modified/Added Columns:
  - DeleteADPData: Ref
  - DeleteTenured: Ref
  - DeletePOD: Ref
  - DeleteScorecard: Ref
  - DeletePaycal: Ref

### DeleteADPData Output (85 cols)
[Inherits all 91 columns from Table: Process for CreateWeeklyEmployee Process Table]

### DeleteTenured Output (85 cols)
[Inherits all 91 columns from Table: Process for CreateWeeklyEmployee Process Table]

### DeletePOD Output (85 cols)
[Inherits all 91 columns from Table: Process for CreateWeeklyEmployee Process Table]

### DeleteScorecard Output (85 cols)
[Inherits all 91 columns from Table: Process for CreateWeeklyEmployee Process Table]

### DeletePaycal Output 2 (85 cols)
[Inherits all 91 columns from Table: Process for CreateWeeklyEmployee Process Table]

### Process for WhenPODIsimportedAddtoPerformance Process Table (18 cols)
[Inherits all 17 columns from Table: POD]
+ Modified/Added Columns:
  - Instance Id: Text
  - AddRowsPerformance: Ref

### AddRowsPerformance Output 2 (17 cols)
[Inherits all 18 columns from Table: Process for WhenPODIsimportedAddtoPerformance Process Table]

### Process for UpdatePayCal Process Table (20 cols)
[Inherits all 19 columns from Table: Hours]
+ Modified/Added Columns:
  - Instance Id: Text
  - New step: Ref

### New step Output 7 (19 cols)
[Inherits all 20 columns from Table: Process for UpdatePayCal Process Table]

### Process for CDVTraining Process Table (86 cols)
[Inherits all 91 columns from Table: Process for CreateWeeklyEmployee Process Table]
+ Modified/Added Columns:
  - UpdateCDVSchedule: Ref

### UpdateCDVSchedule Output (85 cols)
[Inherits all 91 columns from Table: Process for CreateWeeklyEmployee Process Table]

### Process for New Bot 5 - 1 Process Table (18 cols)
[Inherits all 17 columns from Table: Tenured]
+ Modified/Added Columns:
  - Instance Id: Text
  - New step: Ref

### New step Output 8 (17 cols)
[Inherits all 18 columns from Table: Process for New Bot 5 - 1 Process Table]

### Process for CreateWeeklyEmployee Process Table (91 cols)
[Inherits all 90 columns from Table: Process for DeleteReports Process Table]
+ Modified/Added Columns:
  - DeleteWeeklyEmployee: Ref
  - Check if employee is scheduled: Ref
  - CreateThisWeek: Ref
  - CreateThisWeekPlusOne: Ref
  - CreateThisWeekPlusTwo: Ref
  - CreateThisWeekPlusThree: Ref

### DeleteWeeklyEmployee Output (85 cols)
[Inherits all 91 columns from Table: Process for CreateWeeklyEmployee Process Table]

### Check if employee is scheduled Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### CreateThisWeek Output (85 cols)
[Inherits all 91 columns from Table: Process for CreateWeeklyEmployee Process Table]

### CreateThisWeekPlusOne Output (85 cols)
[Inherits all 91 columns from Table: Process for CreateWeeklyEmployee Process Table]

### CreateThisWeekPlusTwo Output (85 cols)
[Inherits all 91 columns from Table: Process for CreateWeeklyEmployee Process Table]

### CreateThisWeekPlusThree Output (85 cols)
[Inherits all 91 columns from Table: Process for CreateWeeklyEmployee Process Table]

### Process for ScorecardPDF Process Table (56 cols)
[Inherits all 56 columns from Table: Performance]
+ Modified/Added Columns:
  - Instance Id: Text

### Process for AllScorecard Process Table (34 cols)
[Inherits all 34 columns from Table: Week]
+ Modified/Added Columns:
  - Instance Id: Text

### Process for UpdateHoursCurrentPayroll Process Table (88 cols)
[Inherits all 91 columns from Table: Process for CreateWeeklyEmployee Process Table]
+ Modified/Added Columns:
  - Update Employee Write Up count: Ref
  - DeleteCurrentHours: Ref
  - CreateCurrentHours: Ref

### Update Employee Write Up count Output (85 cols)
[Inherits all 91 columns from Table: Process for CreateWeeklyEmployee Process Table]

### DeleteCurrentHours Output 2 (85 cols)
[Inherits all 91 columns from Table: Process for CreateWeeklyEmployee Process Table]

### CreateCurrentHours Output (85 cols)
[Inherits all 91 columns from Table: Process for CreateWeeklyEmployee Process Table]

### Process for WHC_Calculation Process Table (91 cols)
[Inherits all 90 columns from Table: Process for UpdateInEveryday - 1 Process Table]
+ Modified/Added Columns:
  - [Attendance]="Present": Ref
  - Check if ID is there in WHC already or Not: Ref
  - Action for Update the WHC: Ref
  - Add this to WHC Action - 1: Ref
  - update roster entry fremont: Ref
  - update roster entry tracy: Ref
  - Delete the WHC if not Present: Ref

### [Attendance]=&quot;Present&quot; Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Check if ID is there in WHC already or Not Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Action for Update the WHC Output (84 cols)
[Inherits all 91 columns from Table: Process for WHC_Calculation Process Table]

### Add this to WHC Action - 1 Output (84 cols)
[Inherits all 91 columns from Table: Process for WHC_Calculation Process Table]

### update roster entry fremont Output (84 cols)
[Inherits all 91 columns from Table: Process for WHC_Calculation Process Table]

### update roster entry tracy Output (84 cols)
[Inherits all 91 columns from Table: Process for WHC_Calculation Process Table]

### Delete the WHC if not Present Output (84 cols)
[Inherits all 91 columns from Table: Process for WHC_Calculation Process Table]

### Process for Scheduled_Updates_WHC Process Table (19 cols)
[Inherits all 18 columns from Table: WHC]
+ Modified/Added Columns:
  - Instance Id: Text
  - not needed rows: Ref

### not needed rows Output (18 cols)
[Inherits all 19 columns from Table: Process for Scheduled_Updates_WHC Process Table]

### Process for GenerateDAReview Process Table (106 cols)
[Inherits all 88 columns from Table: DAReview]
+ Modified/Added Columns:
  - Instance Id: Text
  - If type is Coaching: Ref
  - If Type is Write Up and Metric is Attendance: Ref
  - If Type is Write Up and Metric is Behavior: Ref
  - If Type is Write Up and Metric is Contact Compliance: Ref
  - Check if Metric is Customer Delivery Feedback: Ref
  - If Type is Write Up and Metric is Delivery Completion: Ref
  - If Type is Write Up and Metric is DVIC Quality: Ref
  - If Type is Write Up and Metric is Efficiency: Ref
  - If Type is Write Up and Metric is Fleet Damage: Ref
  - If Type is Write Up and Metric is Delivery Success Behaviors: Ref
  - If Type is Write Up and Metric is Meal Break: Ref
  - If Type is Write Up and Metric is Mentor: Ref
  - Check if it is write up for Photo Quality: Ref
  - Check if it is write up for Property Damage: Ref
  - Check if it is write up for Proper Park Sequence: Ref
  - Check if it is write up for Safety: Ref
  - Check if it is write up for Tier Infraction: Ref
  - Check if it is write up for weigh scale: Ref

### If type is Coaching Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### If Type is Write Up and Metric is Attendance Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### If Type is Write Up and Metric is Behavior Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### If Type is Write Up and Metric is Contact Compliance Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Check if Metric is Customer Delivery Feedback Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### If Type is Write Up and Metric is Delivery Completion Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### If Type is Write Up and Metric is DVIC Quality Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### If Type is Write Up and Metric is Efficiency Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### If Type is Write Up and Metric is Fleet Damage Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### If Type is Write Up and Metric is Delivery Success Behaviors Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### If Type is Write Up and Metric is Meal Break Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### If Type is Write Up and Metric is Mentor Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Check if it is write up for Photo Quality Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Check if it is write up for Property Damage Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Check if it is write up for Proper Park Sequence Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Check if it is write up for Safety Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Check if it is write up for Tier Infraction Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Check if it is write up for weigh scale Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Process for HourlyWHCUpdate Process Table (85 cols)
[Inherits all 91 columns from Table: Process for WHC_Calculation Process Table]
+ Modified/Added Columns:
  - WHC Update: Ref

### WHC Update Output (1 cols)
```
  Instance Id: Text
```

### Process for IncidentReportingBot Process Table (38 cols)
[Inherits all 38 columns from Table: IncidentForm]
+ Modified/Added Columns:
  - Instance Id: Text

### Process for IncidentCreatedUpdated Process Table (102 cols)
[Inherits all 96 columns from Table: Incident]
+ Modified/Added Columns:
  - Instance Id: Text
  - Vehicle Report: Ref
  - Worker compensation: Ref
  - any check to generate incident overview: Ref
  - CheckIf SendNoticeAndDWCEmail: Ref
  - Update Email Status for WC: Ref
  - Email GM: Ref

### Vehicle Report Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Worker compensation Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### any check to generate incident overview Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### CheckIf SendNoticeAndDWCEmail Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Update Email Status for WC Output (96 cols)
[Inherits all 102 columns from Table: Process for IncidentCreatedUpdated Process Table]

### Email GM Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Process for TriggerForIncidentForm Process Table (17 cols)
[Inherits all 17 columns from Table: Process for TriggerDailyActionsEmails - 1 Process Table]
+ Modified/Added Columns:
  - Update LastEditOn in Incident forms where incidentID is blank: Ref

### Update LastEditOn in Incident forms where incidentID is blank Output (16 cols)
[Inherits all 17 columns from Table: Process for TriggerForIncidentForm Process Table]

### Process for DailyAttendanceWriteUps Process Table (86 cols)
[Inherits all 91 columns from Table: Process for WHC_Calculation Process Table]
+ Modified/Added Columns:
  - Check if the Attendnace Writeup is already created: Ref
  - Create WriteUp for attendance: Ref

### Check if the Attendnace Writeup is already created Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Create WriteUp for attendance Output (84 cols)
[Inherits all 91 columns from Table: Process for WHC_Calculation Process Table]

### Process for TriggerHourlyActions - 1 Process Table (20 cols)
[Inherits all 17 columns from Table: Process for TriggerForIncidentForm Process Table]
+ Modified/Added Columns:
  - Some conditions if need to be evaluated: Ref
  - Update Hourly hours rows: Ref
  - Some Condition for WHC: Ref
  - Delete old whc: Ref

### Some conditions if need to be evaluated Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Update Hourly hours rows Output (16 cols)
[Inherits all 17 columns from Table: Process for TriggerForIncidentForm Process Table]

### Some Condition for WHC Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Delete old whc Output (16 cols)
[Inherits all 17 columns from Table: Process for TriggerForIncidentForm Process Table]

### Process for TriggerDailyActions - 1 Process Table (33 cols)
[Inherits all 17 columns from Table: Process for TriggerForIncidentForm Process Table]
+ Modified/Added Columns:
  - Create Missing Efficiency row if any: Ref
  - Create Efficiency Row missing for past 14 days: Ref
  - Check any condition if required: Ref
  - Trigger Efficiency Update for SecondLast Week: Ref
  - Trigger Efficiency Update for Last Week: Ref
  - Trigger Efficiency Update for This Week: Ref
  - Check any condition if required 2: Ref
  - Create Trigger for updating Last week whc: Ref
  - Create Trigger for updating this week WHC: Ref
  - Check if there is planning for 7th day: Ref
  - Add a new Planning Row Fremont: Ref
  - Check if there is planning for 7th day Tracy: Ref
  - Add a new Planning Row Tracy: Ref
  - any conditions to be checked: Ref
  - Update all fleet: Ref
  - Call for the WHC Tracy Calculations: Ref
  - Call for the WHC Tracy Trigger: Ref

### Create Missing Efficiency row if any Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Create Efficiency Row missing for past 14 days Output (16 cols)
[Inherits all 17 columns from Table: Process for TriggerForIncidentForm Process Table]

### Check any condition if required Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Trigger Efficiency Update for SecondLast Week Output (16 cols)
[Inherits all 17 columns from Table: Process for TriggerForIncidentForm Process Table]

### Trigger Efficiency Update for Last Week Output (16 cols)
[Inherits all 17 columns from Table: Process for TriggerForIncidentForm Process Table]

### Trigger Efficiency Update for This Week Output (16 cols)
[Inherits all 17 columns from Table: Process for TriggerForIncidentForm Process Table]

### Check any condition if required 2 Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Create Trigger for updating Last week whc Output (16 cols)
[Inherits all 17 columns from Table: Process for TriggerForIncidentForm Process Table]

### Create Trigger for updating this week WHC Output (16 cols)
[Inherits all 17 columns from Table: Process for TriggerForIncidentForm Process Table]

### Check if there is planning for 7th day Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Add a new Planning Row Fremont Output (16 cols)
[Inherits all 17 columns from Table: Process for TriggerForIncidentForm Process Table]

### Check if there is planning for 7th day Tracy Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Add a new Planning Row Tracy Output (16 cols)
[Inherits all 17 columns from Table: Process for TriggerForIncidentForm Process Table]

### any conditions to be checked Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Update all fleet Output (16 cols)
[Inherits all 17 columns from Table: Process for TriggerForIncidentForm Process Table]

### Call for the WHC Tracy Calculations Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Call for the WHC Tracy Trigger Output (16 cols)
[Inherits all 17 columns from Table: Process for TriggerForIncidentForm Process Table]

### Process for TriggerCalledFromTheApp Process Table (78 cols)
[Inherits all 17 columns from Table: Process for TriggerForIncidentForm Process Table]
+ Modified/Added Columns:
  - CheckIfItIs: Ref
  - If Event is AppTrigger for Recalculating Weekly WHC: Ref
  - Delete All WHC Rows for that week: Ref
  - Recreate All WHC Rows for the Week Day1: Ref
  - Recreate All WHC Rows for the Week Day2: Ref
  - Recreate All WHC Rows for the Week Day3: Ref
  - Recreate All WHC rows for the Week Day4: Ref
  - Recreate All WHC rows for the Week Day5: Ref
  - Recreate All WHC rows for the Week Day6: Ref
  - Recreate All WHC rows for the Week Day7: Ref
  - If The Trigger is AppTrigger for Recalculating Weekly Efficiency: Ref
  - Update the Efficiency Rows for the Week: Ref
  - Check if the trigger is for Weekly Planning: Ref
  - Add Planning for the selected week Day1: Ref
  - AppTrigger for Updating weekly Employee: Ref
  - Delete all weekly empoloyee for this week: Ref
  - set weekyearid for all scheduled employee: Ref
  - Create Weekly employee: Ref
  - App Trigger for Email Notice for Absent AE_AbsentNotice: Ref
  - If trigger is for opening file: Ref
  - If trigger is for closing file: Ref
  - Timesheets: Ref
  - WHC on Everyday: Ref
  - Run WHC Everyday Appscript: Ref
  - WHC on Fremont Roster: Ref
  - Run WHC Appscript for Fremont Roster: Ref
  - WHC for Tracy Roster: Ref
  - Run WHC Appscript for Tracy Roster: Ref
  - RecreateEmployeeSchedule: Ref
  - CallSchedulingAppscript: Ref
  - CreateWeekSchedule: Ref
  - ReCreateParticularWeekSchedule: Ref
  - ImportRelayTrips: Ref
  - RunAppscriptForImport: Ref
  - ImportRelayPaymentDetails: Ref
  - MatchRelayPayments: Ref
  - If trigger is for export services: Ref
  - Trigger for DailyHours: Ref
  - Call Appscript for DailyHours calculation: Ref
  - Trigger Payroll Hours: Ref
  - appsheet for payroll calculation: Ref
  - Update Payroll Entry for the Payroll: Ref
  - Create DWC_1 Form: Ref
  - New step: Ref
  - Run trigger for DA Daily Import: Ref
  - Run DA Daily Import script: Ref
  - Run trigger for Routes Daily Import: Ref
  - Run Routes Daily Import: Ref
  - Run trigger for Routes ADP Report: Ref
  - Run script ADP Daily: Ref
  - Run trigger for API Plugin Daily: Ref
  - Run script for API Plugin: Ref
  - Generate CDF Dispute Data: Ref
  - Run CDF Appscript: Ref
  - GenerateDailySMS: Ref
  - GenerateSMSForDaily: Ref
  - GenerateWeeklySMS: Ref
  - GenerateWeeklyScheduleSMS: Ref
  - SendSMS: Ref
  - SendMessagesViaAPI: Ref
  - ClearSMSSheet: Ref
  - ClearTheSMSSheet: Ref

### CheckIfItIs Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### If Event is AppTrigger for Recalculating Weekly WHC Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Delete All WHC Rows for that week Output (16 cols)
[Inherits all 17 columns from Table: Process for TriggerForIncidentForm Process Table]

### Recreate All WHC Rows for the Week Day1 Output (16 cols)
[Inherits all 17 columns from Table: Process for TriggerForIncidentForm Process Table]

### Recreate All WHC Rows for the Week Day2 Output (16 cols)
[Inherits all 17 columns from Table: Process for TriggerForIncidentForm Process Table]

### Recreate All WHC Rows for the Week Day3 Output (16 cols)
[Inherits all 17 columns from Table: Process for TriggerForIncidentForm Process Table]

### Recreate All WHC rows for the Week Day4 Output (16 cols)
[Inherits all 17 columns from Table: Process for TriggerForIncidentForm Process Table]

### Recreate All WHC rows for the Week Day5 Output (16 cols)
[Inherits all 17 columns from Table: Process for TriggerForIncidentForm Process Table]

### Recreate All WHC rows for the Week Day6 Output (16 cols)
[Inherits all 17 columns from Table: Process for TriggerForIncidentForm Process Table]

### Recreate All WHC rows for the Week Day7 Output (16 cols)
[Inherits all 17 columns from Table: Process for TriggerForIncidentForm Process Table]

### If The Trigger is AppTrigger for Recalculating Weekly Efficiency Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Update the Efficiency Rows for the Week Output (16 cols)
[Inherits all 17 columns from Table: Process for TriggerForIncidentForm Process Table]

### Check if the trigger is for Weekly Planning Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Add Planning for the selected week Day1 Output (16 cols)
[Inherits all 17 columns from Table: Process for TriggerForIncidentForm Process Table]

### AppTrigger for Updating weekly Employee Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Delete all weekly empoloyee for this week Output (16 cols)
[Inherits all 17 columns from Table: Process for TriggerForIncidentForm Process Table]

### set weekyearid for all scheduled employee Output (16 cols)
[Inherits all 17 columns from Table: Process for TriggerForIncidentForm Process Table]

### Create Weekly employee Output (16 cols)
[Inherits all 17 columns from Table: Process for TriggerForIncidentForm Process Table]

### App Trigger for Email Notice for Absent AE_AbsentNotice Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### If trigger is for opening file Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### If trigger is for closing file Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Timesheets Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### WHC on Everyday Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Run WHC Everyday Appscript Output (1 cols)
```
  Instance Id: Text
```

### WHC on Fremont Roster Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Run WHC Appscript for Fremont Roster Output (1 cols)
```
  Instance Id: Text
```

### WHC for Tracy Roster Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Run WHC Appscript for Tracy Roster Output (1 cols)
```
  Instance Id: Text
```

### RecreateEmployeeSchedule Output 2 (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### CallSchedulingAppscript Output (1 cols)
```
  Instance Id: Text
```

### CreateWeekSchedule Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### ReCreateParticularWeekSchedule Output (1 cols)
```
  Instance Id: Text
```

### ImportRelayTrips Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### RunAppscriptForImport Output (1 cols)
```
  Instance Id: Text
```

### ImportRelayPaymentDetails Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### MatchRelayPayments Output (1 cols)
```
  Instance Id: Text
```

### If trigger is for export services Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Trigger for DailyHours Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Call Appscript for DailyHours calculation Output (1 cols)
```
  Instance Id: Text
```

### Trigger Payroll Hours Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### appsheet for payroll calculation Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Update Payroll Entry for the Payroll Output (16 cols)
[Inherits all 17 columns from Table: Process for TriggerForIncidentForm Process Table]

### Create DWC_1 Form Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### New step Output 9 (1 cols)
```
  Instance Id: Text
```

### Run trigger for DA Daily Import Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Run DA Daily Import script Output (1 cols)
```
  Instance Id: Text
```

### Run trigger for Routes Daily Import Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Run Routes Daily Import Output (1 cols)
```
  Instance Id: Text
```

### Run trigger for Routes ADP Report Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Run script ADP Daily Output (1 cols)
```
  Instance Id: Text
```

### Run trigger for API Plugin Daily Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Run script for API Plugin Output (1 cols)
```
  Instance Id: Text
```

### Generate CDF Dispute Data Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Run CDF Appscript Output (1 cols)
```
  Instance Id: Text
```

### GenerateDailySMS Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### GenerateSMSForDaily Output (1 cols)
```
  Instance Id: Text
```

### GenerateWeeklySMS Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### GenerateWeeklyScheduleSMS Output (1 cols)
```
  Instance Id: Text
```

### SendSMS Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### SendMessagesViaAPI Output (1 cols)
```
  Instance Id: Text
```

### ClearSMSSheet Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### ClearTheSMSSheet Output (1 cols)
```
  Instance Id: Text
```

### Process for TriggerWeeklyActionsMon5am - 1 Process Table (20 cols)
[Inherits all 17 columns from Table: Process for TriggerForIncidentForm Process Table]
+ Modified/Added Columns:
  - check any condition: Ref
  - Create new Invoice row: Ref
  - Remove the JJK Renewal: Ref
  - Delete Completed Entry: Ref

### check any condition Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Create new Invoice row Output (16 cols)
[Inherits all 17 columns from Table: Process for TriggerForIncidentForm Process Table]

### Remove the JJK Renewal Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Delete Completed Entry Output (16 cols)
[Inherits all 17 columns from Table: Process for TriggerForIncidentForm Process Table]

### Process for UpdatePolicy Process Table (9 cols)
```
  Instance Id: Text
  ID: Text { Logic: [EditIf]="=isblank([ID])" }
  Date: Date
  Premium: Price
  Policy: Ref
  LastEditBy: Enum { Logic: [EditIf]="=isblank([LastEditBy])" }
  LastEditOn: DateTime { Logic: [EditIf]="=isblank([LastEditOn])" }
  Type: Enum
  Recalculate policy info: Ref
```

### Recalculate policy info Output (8 cols)
```
  Instance Id: Text
  ID: Text { Logic: [EditIf]="=isblank([ID])" }
  Date: Date
  Premium: Price
  Policy: Ref
  LastEditBy: Enum { Logic: [EditIf]="=isblank([LastEditBy])" }
  LastEditOn: DateTime { Logic: [EditIf]="=isblank([LastEditOn])" }
  Type: Enum
```

### Process for TriggerDailyActionsEmails - 1 Process Table (17 cols)
[Inherits all 17 columns from Table: Process for TriggerForIncidentForm Process Table]
+ Modified/Added Columns:
  - any condition to be evaluated: Ref

### any condition to be evaluated Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Process for UpdateInEveryday - 1 Process Table (90 cols)
[Inherits all 91 columns from Table: Process for WHC_Calculation Process Table]
+ Modified/Added Columns:
  - Check if the new status is marked as absent: Ref
  - call the absent email notice trigger: Ref
  - trigger is set: Ref
  - Call Send Email Trigger: Ref
  - TracyRouteStatusChanged: Ref
  - TracyRouteUpdateStatus: Ref

### Check if the new status is marked as absent Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### call the absent email notice trigger Output (84 cols)
[Inherits all 91 columns from Table: Process for WHC_Calculation Process Table]

### trigger is set Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Call Send Email Trigger Output (84 cols)
[Inherits all 91 columns from Table: Process for WHC_Calculation Process Table]

### TracyRouteStatusChanged Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### TracyRouteUpdateStatus Output (1 cols)
```
  Instance Id: Text
```

### Process for ActionCallerFremont Process Table (8 cols)
```
  Instance Id: Text
  UID: Text
  Action Name Fremont: Enum [Values: 'Create Roster Fremont']
  Action Name Tracy: Enum [Values: 'Create Roster Tracy']
  New step: Ref
  RosterCreation: Ref
  First Step Duplicate Remover: Ref
  New step 2: Ref
```

### New step Output 10 (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### RosterCreation Output (4 cols)
```
  Instance Id: Text
  UID: Text
  Action Name Fremont: Enum [Values: 'Create Roster Fremont']
  Action Name Tracy: Enum [Values: 'Create Roster Tracy']
```

### First Step Duplicate Remover Output 2 (4 cols)
```
  Instance Id: Text
  UID: Text
  Action Name Fremont: Enum [Values: 'Create Roster Fremont']
  Action Name Tracy: Enum [Values: 'Create Roster Tracy']
```

### New step 2 Output 2 (4 cols)
```
  Instance Id: Text
  UID: Text
  Action Name Fremont: Enum [Values: 'Create Roster Fremont']
  Action Name Tracy: Enum [Values: 'Create Roster Tracy']
```

### Process for UnassignFleetForCanceled Process Table (39 cols)
[Inherits all 38 columns from Table: RosterFremont]
+ Modified/Added Columns:
  - Instance Id: Text
  - New step: Ref

### New step Output 11 (38 cols)
[Inherits all 39 columns from Table: Process for UnassignFleetForCanceled Process Table]

### Process for UpdateVehicleStatus Process Table (103 cols)
[Inherits all 101 columns from Table: Process for UpdateRecentDOTStatus Process Table]
+ Modified/Added Columns:
  - New step: Ref
  - UpdateTruckStatus: Ref
  - AddNotesFromDOTAuditToFleet: Ref

### New step Output 12 (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### UpdateTruckStatus Output (100 cols)
[Inherits all 103 columns from Table: Process for UpdateVehicleStatus Process Table]

### AddNotesFromDOTAuditToFleet Output (100 cols)
[Inherits all 103 columns from Table: Process for UpdateVehicleStatus Process Table]

### Process for UpdateInspectionAndRouteStatus Process Table (66 cols)
[Inherits all 65 columns from Table: Inspection]
+ Modified/Added Columns:
  - Instance Id: Text
  - New step: Ref

### New step Output 13 (1 cols)
```
  Instance Id: Text
```

### Process for TriggerWeeklySat5AM Process Table (3 cols)
```
  Instance Id: Text
  check any condition: Ref
  Create Weekly Schedule - Fremont: Ref
```

### check any condition Output 2 (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Create Weekly Schedule - Fremont Output (1 cols)
```
  Instance Id: Text
```

### Process for TriggerWeeklySat6AM Process Table (3 cols)
```
  Instance Id: Text
  check any condition: Ref
  Create Weekly Schedule - Fremont: Ref
```

### check any condition Output 3 (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Create Weekly Schedule - Fremont Output 2 (1 cols)
```
  Instance Id: Text
```

### Process for NewFleetAdded - 1 Process Table (44 cols)
[Inherits all 44 columns from Table: Process for AddFleetNotes Process Table]
+ Modified/Added Columns:
  - AddVehicleLatestDOTAuditList: Ref
  - AddFleetToDOTLatestAudit: Ref

### AddVehicleLatestDOTAuditList Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### AddFleetToDOTLatestAudit Output (42 cols)
[Inherits all 44 columns from Table: Process for NewFleetAdded - 1 Process Table]

### Process for UpdateRecentDOTStatus Process Table (101 cols)
[Inherits all 103 columns from Table: Process for UpdateVehicleStatus Process Table]
+ Modified/Added Columns:
  - UpdateAuditDateTime: Ref

### UpdateAuditDateTime Output (100 cols)
[Inherits all 103 columns from Table: Process for UpdateVehicleStatus Process Table]

### Process for Separation Process Table (105 cols)
[Inherits all 81 columns from Table: Separation]
+ Modified/Added Columns:
  - Instance Id: Text
  - Update - Delete Existing Files: Ref
  - Delete Paycheck: Ref
  - Delete Change Notice: Ref
  - Delete Email Preview: Ref
  - Create the PayCheck: Ref
  - Create the Change Notice: Ref
  - If reason is VR, NCNS, JA,WA,VREA: Ref
  - If reason is TERM, LO: Ref
  - Create Email Preview: Ref
  - If Voluntary Resignation: Ref
  - If Voluntary Resignation Early Acceptance: Ref
  - If Job Abandonment: Ref
  - If No Call No Show: Ref
  - If Termination: Ref
  - If Sep_WA: Ref
  - Send Email: Ref
  - If VR: Ref
  - IF VREA: Ref
  - If Sep_NCNS: Ref
  - If Sep_JA: Ref
  - If Sep_Term & LO: Ref
  - If Sep_WorkAuth: Ref
  - Change Email Status to Sent: Ref
  - Employee Status terminated: Ref

### Update - Delete Existing Files Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Delete Paycheck Output (1 cols)
```
  Instance Id: Text
```

### Delete Change Notice Output (1 cols)
```
  Instance Id: Text
```

### Delete Email Preview Output (1 cols)
```
  Instance Id: Text
```

### Create the PayCheck Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Create the Change Notice Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### If reason is VR, NCNS, JA,WA,VREA Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### If reason is TERM, LO Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Create Email Preview Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### If Voluntary Resignation Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### If Voluntary Resignation Early Acceptance Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### If Job Abandonment Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### If No Call No Show Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### If Termination Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### If Sep_WA Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Send Email Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### If VR Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### IF VREA Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### If Sep_NCNS Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### If Sep_JA Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### If Sep_Term &amp; LO Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### If Sep_WorkAuth Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Change Email Status to Sent Output (81 cols)
[Inherits all 81 columns from Table: Separation]
+ Modified/Added Columns:
  - Instance Id: Text

### Employee Status terminated Output (81 cols)
[Inherits all 81 columns from Table: Separation]
+ Modified/Added Columns:
  - Instance Id: Text

### Process for AddFleetNotes Process Table (44 cols)
[Inherits all 44 columns from Table: Process for NewFleetAdded - 1 Process Table]
+ Modified/Added Columns:
  - Fleet Status Changed: Ref
  - Add notes: Ref

### Fleet Status Changed Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Add notes Output (42 cols)
[Inherits all 44 columns from Table: Process for NewFleetAdded - 1 Process Table]

### Process for ImportDataProcess Process Table (12 cols)
[Inherits all 10 columns from Table: Review]
+ Modified/Added Columns:
  - Instance Id: Text
  - Transfer Rows: Ref
  - Delete Rows: Ref

### Transfer Rows Output (10 cols)
```
  Instance Id: Text
  UID: Text
  Name: Name
  Phone: Phone
  Position: Enum
  Location: Enum
  Formatted Phone Number: Text
  Status: Enum [Values: 'No Response', 'Rejected', 'Selected', 'Not Interested', 'No Show', 'Scheduled']
  CandidateID: Number
  Date: Date
```

### Delete Rows Output (10 cols)
```
  Instance Id: Text
  UID: Text
  Name: Name
  Phone: Phone
  Position: Enum
  Location: Enum
  Formatted Phone Number: Text
  Status: Enum [Values: 'No Response', 'Rejected', 'Selected', 'Not Interested', 'No Show', 'Scheduled']
  CandidateID: Number
  Date: Date
```

### Process for FormGenerator Process Table (74 cols)
[Inherits all 68 columns from Table: Worker5020]
+ Modified/Added Columns:
  - Instance Id: Text
  - Form 5020: Ref
  - Generate Form 5021: Ref
  - Action Done: Ref
  - Generate Osha Form: Ref
  - Generate Osha 301 Form: Ref
  - Action as Done: Ref

### Form 5020 Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Generate Form 5021 Output (1 cols)
```
  Instance Id: Text
```

### Action Done Output (68 cols)
[Inherits all 74 columns from Table: Process for FormGenerator Process Table]

### Generate Osha Form Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Generate Osha 301 Form Output (1 cols)
```
  Instance Id: Text
```

### Action as Done Output (68 cols)
[Inherits all 74 columns from Table: Process for FormGenerator Process Table]

### Process for Movei9Documents Process Table (14 cols)
[Inherits all 12 columns from Table: i9Tracking]
+ Modified/Added Columns:
  - Instance Id: Text
  - IsActionChanged: Ref
  - RunI9MoveAction: Ref

### IsActionChanged Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### RunI9MoveAction Output (1 cols)
```
  Instance Id: Text
```

### Process for TriggerDaily12Noon Process Table (3 cols)
```
  Instance Id: Text
  Run Complaince: Ref
  check any condition: Ref
```

### Run Complaince Output (1 cols)
```
  Instance Id: Text
```

### check any condition Output 4 (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Process for TriggerDaily9PMDaily Process Table (3 cols)
```
  Instance Id: Text
  Run Complaince: Ref
  check any condition: Ref
```

### Run Complaince Output 2 (1 cols)
```
  Instance Id: Text
```

### check any condition Output 5 (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Process for TriggerDaily3PMNoon Process Table (3 cols)
```
  Instance Id: Text
  Run Complaince: Ref
  check any condition: Ref
```

### Run Complaince Output 3 (1 cols)
```
  Instance Id: Text
```

### check any condition Output 6 (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Process for CreateModifyDutyLetter Process Table (24 cols)
[Inherits all 22 columns from Table: ModifiedDuty]
+ Modified/Added Columns:
  - Instance Id: Text
  - SendEmail: Ref
  - ChangeEmailStatus: Ref

### SendEmail Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### ChangeEmailStatus Output (22 cols)
[Inherits all 24 columns from Table: Process for CreateModifyDutyLetter Process Table]

### Process for 2FAGen Process Table (17 cols)
[Inherits all 14 columns from Table: Ads]
+ Modified/Added Columns:
  - Instance Id: Text
  - 2FARequested: Ref
  - 2FACreation: Ref
  - Set2FACode: Ref

### 2FARequested Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### 2FACreation Output (2 cols)
```
  Instance Id: Text
  Output: Number
```

### Set2FACode Output (14 cols)
[Inherits all 14 columns from Table: Ads]
+ Modified/Added Columns:
  - Instance Id: Text

## Slices
- **ScheduledEmployee** (Employee): `=or([EmployeeStatus]="Scheduled", [EmployeeStatus]="Training")`
- **CurrentTo3WeekSlice** (Week): `=AND([EndDate]>=today(),[StartDate]`
- **NewCandidate** (Candidate): `=or(AND([Date] >= NOW()-7,[Decision]<>"Not Interested",[Decision]<>"Selected",[Decision]<>"Never Responded",[Decision]<>"Rejected"),[Interview Date]>today())`
- **CurrentOnboarding** (Onboarding): `=AND([OnboardingStatus] <> "Training Scheduled", [OnboardingStatus] <> "Background Failed",[OnboardingStatus] <> "Drug Test Failed", [OnboardingStatus]<>"Not Moving Forward", [OnboardingStatus]<>"No Response",[OnboardingStatus]<>"Declined to Join"
,[Position]<>"DOT Driver")`
- **NewHire** (Onboarding): `=AND([NewHireStatus]<>"All Completed",[NewHireStatus]<>"Declined to Join",isnotblank([TrainingDate]))`
- **CurrentEmployees** (Employee): `=[EmployeeStatus]<>"Terminated"`
- **RosterPlanningFremont** (PlanningFremont): `=AND([Date]=INDEX(select(RosterFremont[Date],[Date]>=today()),1),[Location]='Fremont')`
- **Safety** (Everyday): ``
- **TodayFremont** (Everyday): `=AND(
 [Date]=today(),
 [Attendance]="Present",
 [Location]="Fremont"
)`
- **LoadoutFremont** (Everyday): `=AND([Date] = TODAY(),[Location]="Fremont")`
- **TodayClosing** (Everyday): `=AND([Date]=today(),[Attendance]="Present",isblank([Clockout]))`
- **PlanningDetailFremont** (PlanningFremont): `=and(
 [Date]>=today(),
 [Location]="Fremont"
 )`
- **TodayInterview** (Candidate): `=Date([Interview Date]) = today()`
- **WeeklyEfficiency** (Week): `=AND([StartDate]<=today(),[StartDate]>today()-42)`
- **Absent** (Everyday): `=or([Attendance] = "Absent",[Attendance] = "Employee Canceled",[Late]="Yes")`
- **Training** (Everyday): `=OR([Type]="Training",[Type]="CDV Training")`
- **Attendance1** (Everyday): `=AND([Attendance]="Present",[EmployeeID].[JobType]<>"Salaried")`
- **Me** (Users): `=AND([Status]="Active",[Email]=useremail(),[AccessKey]=usersettings(AccessKey))`
- **AssignedToMe** (Tasks): `=AND([AssignedTo]=ANY(ME[UserID]),[StartDate]<=today())`
- **AssignedByMe** (Tasks): `=[AssignedBy]=ANY(ME[UserID])`
- **AssignedToMyTeam** (Tasks): `=IN([AssignedTo],List(ME[UserID],select(Users[UserID],[ReportsTo]=ANY(ME[UserID]))))`
- **MyTeam** (Users): `=IN([_thisRow].[UserID],
List(
select(Users[UserID],[ReportsTo]=ANY(ME[UserID])),
select(Users[UserID],IN([ReportsTo],select(Users[UserID],[ReportsTo]=ANY(ME[UserID])))),
select(Users[UserID],IN([ReportsTo],select(Users[UserID],IN([ReportsTo],select(Users[UserID],[ReportsTo]=ANY(ME[UserID])))))))

)`
- **AssignedToUser** (Tasks): `=AND([StartDate]>today()-3,[StartDate]<=today())`
- **DeliveryQuality** (Performance): ``
- **HealthBenefits** (Employee): `=OR([HealthBenefits]="Enrolled",[HealthBenefits]="Added to ADP")`
- **EfficiencyTodayFremont** (EfficiencyFremont): `=[Date]<=today()`
- **PayrollBiweekly** (Hours): `=[Payroll]=INDEX(select(Week[Payroll],AND([EndDate]>=today()-7,[StartDate]<=today()-7)),1)`
- **SafetyViolations** (Performance): ``
- **PhotoQuality** (Performance): ``
- **CustomerFeedback** (Performance): ``
- **DAEfficiency** (Performance): ``
- **Ranking** (Performance): ``
- **EmployeeRanking** (Employee): `=[EmployeeStatus]="Scheduled"`
- **EfficiencyFor7daysFremont** (EfficiencyFremont): `=AND([Date]>today()-8, [Date]`
- **ScheduledEmployees** (Performance): `=IN([TransporterID],Select(Employee[TransporterID],AND([EmployeeStatus]<>"Terminated",[EmployeeStatus]<>"Start Termination")))`
- **PendingCDV** (Employee): `=AND([CDVTraining]<>"Y",[EmployeeStatus]="Scheduled")`
- **Route** (Everyday): ``
- **LoginF** (Employee): `=and(
 [EmployeeStatus]="Scheduled",
 [Location]="Fremont"
 )`
- **WorkingTodayF** (Employee): `=and(
 IN([EmployeeID],select(Everyday[EmployeeID],AND([Attendance]="Present",[Date]=today())))
 ,[Location]="Fremont"
)`
- **PrintScorecard** (Week): `=AND([StartDate]<=today(),[StartDate]>today()-50)`
- **CreatedPrintedReviewF** (DAReview): `=and(
 in([Status],{"Created","Printed"}),
 [Location]="Fremont"
)`
- **AdminView** (AppViews): `=[Type]="Admin"`
- **PayrollView** (AppViews): `=And([Type]="Payroll",in(Any(Me[Role]),[AllowRoles]))`
- **DispatchFremontView** (AppViews): `=And([Type]="DispatchFremont",in(Any(Me[Role]),[AllowRoles]))`
- **ManagementView** (AppViews): `=And([Type]="Management",in(Any(Me[Role]),[AllowRoles]))`
- **OpenAuto** (Incident): `=and(
 [TypeOfClaim]="Auto",
 [ClaimStatus]<>"Closed",
[ClaimStatus]<>"Closed without Claim"
)`
- **OpenInjury** (Incident): `=and(
 [TypeOfClaim]="Worker Compensation",
 [ClaimStatus]<>"Closed",
[ClaimStatus]<>"Closed without Claim"
)`
- **FollowupOpen** (Followup): `=[Status]<> "Completed"`
- **Open** (Setup): `[Status] = "Open"`
- **OpenOther** (Incident): `=and(
 [TypeOfClaim]<>"Auto",
 [TypeOfClaim]<>"Worker Compensation",
 [ClaimStatus]<>"Closed",
[ClaimStatus]<>"Closed without Claim"
)`
- **ClaimsView** (AppViews): `=And([Type]="Claims",in(Any(Me[Role]),[AllowRoles]))`
- **OpenProperty** (Incident): `=and(
 [TypeOfClaim]="Property Damage",
 [ClaimStatus]<>"Closed",
[ClaimStatus]<>"Closed without Claim"
)`
- **OpenNotice** (Notice): `=[Status]<>"Closed"`
- **Fleet_NotWorking** (Fleet): `=[Status] = "Not Working"`
- **Fleet_RegExpiry** (Fleet): `=and(
 [Expiry Date]<=today()+45,
 not(in([Status],{"Returned","Excluded"})),
 in([Group],{"OWNED","Amazon Branded"})
)`
- **OpenRepairsFremont** (Repairs): `=and(
 [Status] <> "Closed",
 [Location]="Fremont"
 )`
- **FleetView** (AppViews): `=And([Type]="Fleet",in(Any(Me[Role]),[AllowRoles]))`
- **CurrentOnboardingDOTDriver** (Onboarding): `=AND([OnboardingStatus] <> "Training Scheduled", [OnboardingStatus] <> "Background Failed",[OnboardingStatus] <> "Drug Test Failed", [OnboardingStatus]<>"Not Moving Forward", [OnboardingStatus]<>"No Response",[OnboardingStatus]<>"Declined to Join"
,[Position]="DOT Driver")`
- **DispatchTView** (AppViews): `=And([Type]="DispatchTracy",in(Any(Me[Role]),[AllowRoles]))`
- **TodayTracy** (Everyday): `=AND(
 [IsSameDayTracy]="Yes",
 [Attendance]="Present",
 [Location]="Tracy"
)`
- **WorkingTodayT** (Employee): `=and(
 IN([EmployeeID],select(Everyday[EmployeeID],AND([Attendance]="Present",[Date]=today())))
 ,[Location]="Tracy"
)`
- **CreatedPrintedReviewT** (DAReview): `=and(
 in([Status],{"Created","Printed"}),
 [Location]="Tracy"
)`
- **LoginT** (Employee): `=and(
 [EmployeeStatus]="Scheduled",
 [Location]="Tracy"
 )`
- **OpenRepairsTracy** (Repairs): `=and(
 [Status] <> "Closed",
 [Location]="Tracy"
 )`
- **ScheduleF** (Schedule): `=[Location]="Fremont"`
- **ScheduleT** (Schedule): `=[Location]="Tracy"`
- **PlanningDetailTracy** (PlanningTracy): `=and(
 [Date]>=today(),
 [Location]="Tracy"
 )`
- **LoadoutTracy** (Everyday): `=AND([IsSameDayTracy]=true,[Location]="Tracy")`
- **RosterPlanningTracy** (PlanningTracy): `=AND([Date]=INDEX(select(RosterTracy[Date],[Date]>=today()),1),[Location]='Tracy')`
- **TodayFremontDrivers** (Everyday): `=AND(
 [Date]=today(),
 [Attendance]="Present",
 [Location]="Fremont",
 [Type]="Route"
)`
- **WeeklyEmployeeFremont** (WeeklyEmployee): `=AND([Location]="Fremont",[EmployeeID].[WorkType]<>"Zip")`
- **WeeklyEmployeeTracy** (WeeklyEmployee): `=[Location]="Tracy"`
- **AuditView** (AppViews): `=And([Type]="Audit",in(Any(Me[Role]),[AllowRoles]))`
- **QualificationAuditEmployee** (Employee): `=not(in([EmployeeStatus],{"Start Termination","Terminated"}))`
- **ActiveDocuments** (EmployeeDocs): `=AND(
  [Status] = "Active",
  [EmployeeId].[EmployeeStatus] <> "Terminated",
  [EmployeeId].[EmployeeStatus] <> "Start Termination",
  [EmployeeId].[EmployeeStatus] <> "Not Working"
)`
- **EverydayWHC** (Everyday): ``
- **RecentRelayTrips** (RelayRoutes): `=AND([Date]>TODAY()-7,[Date]`
- **RecentDOTInspections** (DOTAudit): `=AND([Date]>TODAY()-20,IN([Vehicle].[Location],Any(Me[Location])))`
- **UnpaidRelayTrips** (RelayRoutes): `=AND([Date] < TODAY(), AND([Payment Status] <> "Paid",[Payment Status]<>"Not Eligible"))`
- **DOTLatestInspections** (DOTLatestAuditRecord): `=NOT(IN([FleetID].[Status],{"Excluded","Returned"}))`
- **PendingSeparation** (Separation): `=[SeparationStatus]<>"All Completed"`
- **WeeklyMapping** (Week): `=IN([Year],{2025,2026})`
- **RecruitmentView** (AppViews): `=OR([Type]="Recruitment" ,[Type]="Recruiter")`
- **PickUp** (Separation): `=AND(
OR([ManualCheck] = "2. Check Printed", [ManualCheck] = "1. Ready to Print"),
  IN([EmployeeID].[Location], ANY(ME[Location]))
)`
- **EfficiencyFor7DaysTracy** (EfficiencyTracy): `=AND([Date]>today()-8, [Date]`
- **EfficiencyTodayTracy** (EfficiencyTracy): `=[Date]<=today()`
- **WeeklyReportFremont** (WeeklyReport): `=[Location]="Fremont"`
- **WeeklyReportTracy** (WeeklyReport): `=[Location]="Tracy"`
- **AMXLServiceToday** (AMXLServices): `=[Date]=TODAY()`
- **NonArchivedCDF** (CDF): `=NOT([IsArchived])`

## Views
### Custom Views
- **Dashboard**: dashboard → ? pos=center
- **Tasks**: dashboard → ? pos=left
- **TasksManager**: dashboard → ? pos=right
- **RecruitmentView**: gallery → ? pos=menu
- **DispatchFremont**: gallery → ? pos=menu
- **DispatchTracy**: gallery → ? pos=menu
- **Employee**: card → ? pos=menu
- **Fleet**: gallery → ? pos=menu
- **Everyday**: dashboard → ? pos=menu
- **Payroll**: gallery → ? pos=menu
- **Management**: gallery → ? pos=menu
- **Audit**: gallery → ? pos=menu
- **ClaimsView**: card → ? pos=menu
- **AdminView**: card → ? pos=menu
- **Settings**: form → ? pos=menu
- **Absent**: table → ? pos=ref
- **ActionFremont**: detail → ? pos=ref
- **ActionsTracy**: detail → ? pos=ref
- **ActionsTracy 2**: detail → ? pos=ref
- **ADP**: table → ? pos=ref
- **ADPReportDailyImportView**: table → ? pos=ref
- **Ads**: dashboard → ? pos=ref
- **All_Incidents**: table → ? pos=ref
- **All_Notices**: table → ? pos=ref
- **AllPickUps**: dashboard → ? pos=ref
- **AllRepairs**: table → ? pos=ref
- **AllSeparation**: table → ? pos=ref
- **AMXLServices**: table → ? pos=ref
- **AppSettings**: table → ? pos=ref
- **AppVariables**: table → ? pos=ref
- **AppViews**: table → ? pos=ref
- **Attendance_Inline**: table → ? pos=ref
- **CallBackFremont**: table → ? pos=ref
- **Candidate**: table → ? pos=ref
- **Candidate_Inline**: table → ? pos=ref
- **CandidateAll**: card → ? pos=ref
- **CandidateReview**: dashboard → ? pos=ref
- **CDF 2_Inline**: deck → ? pos=ref
- **CDFView**: table → ? pos=ref
- **ClaimsIncurred**: table → ? pos=ref
- **ClosingFremont**: card → ? pos=ref
- **ClosingTracy**: card → ? pos=ref
- **CommonDocs**: card → ? pos=ref
- **ContactAssignment_Inline**: table → ? pos=ref
- **Contacts**: table → ? pos=ref
- **CustomerFeedback**: detail → ? pos=ref
- **DADailyImportView**: table → ? pos=ref
- **DailyEfficiencyFremont**: table → ? pos=ref
- **DailyEfficiencyTracy**: table → ? pos=ref
- **DailyHours**: table → ? pos=ref
- **DailyHours_Inline**: table → ? pos=ref
- **DAPerformance**: dashboard → ? pos=ref
- **DAPerformanceReview**: table → ? pos=ref
- **DAReview_Inline**: deck → ? pos=ref
- **DeliveryQuality**: detail → ? pos=ref
- **DispatchDailyReport**: dashboard → ? pos=ref
- **DispatchNotificationFremont**: table → ? pos=ref
- **DispatchNotificationTracy**: table → ? pos=ref
- **DocumentsExpiry**: table → ? pos=ref
- **DOTAudit**: table → ? pos=ref
- **DOTAudit_Inline**: deck → ? pos=ref
- **DOTLatestAuditList**: table → ? pos=ref
- **DOTLatestAuditRecord_Inline**: table → ? pos=ref
- **EditPickUp**: form → ? pos=ref
- **Efficiency_Inline**: table → ? pos=ref
- **EfficiencyFremont**: dashboard → ? pos=ref
- **EfficiencyPreview**: card → ? pos=ref
- **EfficiencyTracy**: dashboard → ? pos=ref
- **EfficiencyTracy_Inline**: table → ? pos=ref
- **Employee_Inline**: table → ? pos=ref
- **EmployeeAudit**: table → ? pos=ref
- **EmployeeAudit_Inline**: table → ? pos=ref
- **EmployeeDocs_Inline**: table → ? pos=ref
- **Everyday_Inline**: table → ? pos=ref
- **EverydayIssue_Inline**: table → ? pos=ref
- **EverydayIssues**: table → ? pos=ref
- **EverydaySafety**: table → ? pos=ref
- **ExtraMiles**: table → ? pos=ref
- **ExtraMiles_Inline**: table → ? pos=ref
- **Fleet_**: dashboard → ? pos=ref
- **FleetAssignment**: table → ? pos=ref
- **FleetAssignment_Inline**: table → ? pos=ref
- **FleetDocs_Inline**: table → ? pos=ref
- **FleetNotWorking**: table → ? pos=ref
- **FleetRegExpiry**: table → ? pos=ref
- **FleetSummary**: table → ? pos=ref
- **Followup_Detail2**: detail → ? pos=ref
- **Followup_Form2**: form → ? pos=ref
- **Followup_Inline**: table → ? pos=ref
- **Followup_Inline2**: table → ? pos=ref
- **Health**: table → ? pos=ref
- **Hours**: table → ? pos=ref
- **Hours_Inline**: table → ? pos=ref
- **I9-Documents**: table → ? pos=ref
- **i9Tracking_Inline**: table → ? pos=ref
- **ImportRelayPaymentDetails**: table → ? pos=ref
- **ImportRelayRoutes**: table → ? pos=ref
- **Incident**: dashboard → ? pos=ref
- **Incident_Inline**: table → ? pos=ref
- **IncidentDocuments_Inline**: table → ? pos=ref
- **IncidentNotes_Inline**: card → ? pos=ref
- **Incidents**: table → ? pos=ref
- **Income_Inline**: table → ? pos=ref
- **IncomeView**: table → ? pos=ref
- **INineVerification**: table → ? pos=ref
- **Injury_Inline**: table → ? pos=ref
- **Inspection**: card → ? pos=ref
- **Inspection_Form_Old**: form → ? pos=ref
- **Inspection_Inline**: deck → ? pos=ref
- **Insurance**: dashboard → ? pos=ref
- **Inventory**: table → ? pos=ref
- **Invoices**: table → ? pos=ref
- **JJKRenewals**: table → ? pos=ref
- **JJKRenewals_Inline**: table → ? pos=ref
- **KnowledgeArticles_Inline**: deck → ? pos=ref
- **KnowledgeArticleView**: table → ? pos=ref
- **LoadoutDetailFremont**: table → ? pos=ref
- **LoadoutDetailTracy**: table → ? pos=ref
- **LoadoutFremont**: dashboard → ? pos=ref
- **LoadoutSummaryFremont**: detail → ? pos=ref
- **LoadoutSummaryTracy**: detail → ? pos=ref
- **LoadoutTracy**: dashboard → ? pos=ref
- **LoadoutTracyDetailView**: detail → ? pos=ref
- **LoginFremont**: table → ? pos=ref
- **LoginTracy**: table → ? pos=ref
- **ModifiedDuty**: table → ? pos=ref
- **ModifiedDuty 2_Inline**: table → ? pos=ref
- **MyProfile**: card → ? pos=ref
- **MyTasks**: deck → ? pos=ref
- **MyTeam**: card → ? pos=ref
- **New View**: card → ? pos=ref
- **NewHire**: table → ? pos=ref
- **NewProcess**: table → ? pos=ref
- **Notes_Inline**: table → ? pos=ref
- **Notice_Inline**: table → ? pos=ref
- **Onboarding**: table → ? pos=ref
- **OnboardingAll**: table → ? pos=ref
- **OnboardingDashboard**: dashboard → ? pos=ref
- **OnboardingDOTDriver**: table → ? pos=ref
- **OpenAuto**: table → ? pos=ref
- **OpeningFremont**: table → ? pos=ref
- **OpeningTracy**: table → ? pos=ref
- **OpenNotices**: table → ? pos=ref
- **OpenOtherClaims**: table → ? pos=ref
- **OpenPropeertyClaims**: table → ? pos=ref
- **Overview**: detail → ? pos=ref
- **Paycal**: table → ? pos=ref
- **PayCal_Inline**: table → ? pos=ref
- **PayCheck**: table → ? pos=ref
- **Payroll_Inline**: table → ? pos=ref
- **PayrollBiweekly**: table → ? pos=ref
- **PayrollCalculation**: dashboard → ? pos=ref
- **PayrollDashboard**: dashboard → ? pos=ref
- **PayrollHours**: table → ? pos=ref
- **PendingCDV**: table → ? pos=ref
- **Performance_Inline**: table → ? pos=ref
- **PhotoQuality**: detail → ? pos=ref
- **PickUp**: table → ? pos=ref
- **Planning_Inline**: table → ? pos=ref
- **PlanningDetailFremont**: table → ? pos=ref
- **PlanningDetailTracy**: table → ? pos=ref
- **PluginDailyImportView**: table → ? pos=ref
- **POD**: table → ? pos=ref
- **Policy**: table → ? pos=ref
- **PostingAds**: table → ? pos=ref
- **Premium**: table → ? pos=ref
- **Premium_Inline**: table → ? pos=ref
- **PunchInsForEveryday**: table → ? pos=ref
- **PunchInsFremont**: table → ? pos=ref
- **PunchInsTracy**: table → ? pos=ref
- **QualificationAuditEmployee**: form → ? pos=ref
- **QualificationView**: table → ? pos=ref
- **Ranking**: table → ? pos=ref
- **Recruitment**: dashboard → ? pos=ref
- **RecruitmentSummary**: detail → ? pos=ref
- **RelayRoutes_Inline**: table → ? pos=ref
- **RelayTrips**: table → ? pos=ref
- **Rentals**: table → ? pos=ref
- **Rentals_Inline**: table → ? pos=ref
- **Repairs_Inline**: table → ? pos=ref
- **RepairsFremont**: table → ? pos=ref
- **RepairsTracy**: table → ? pos=ref
- **Review**: table → ? pos=ref
- **Roster_Inline**: table → ? pos=ref
- **RosterAssignmentFremont**: table → ? pos=ref
- **RosterAssignmentTracy**: table → ? pos=ref
- **RosterFremont**: dashboard → ? pos=ref
- **RosterPlanningFremont**: detail → ? pos=ref
- **RosterPlanningTracy**: detail → ? pos=ref
- **RosterTracy**: dashboard → ? pos=ref
- **RosterTracy_Inline**: table → ? pos=ref
- **Route**: table → ? pos=ref
- **RoutesDailyImportView**: table → ? pos=ref
- **Schedule_Inline**: table → ? pos=ref
- **ScheduleExpandView**: card → ? pos=ref
- **ScheduleFremont**: dashboard → ? pos=ref
- **SchedulePlanningDetailFremont**: card → ? pos=ref
- **SchedulePlanningDetailTracy**: card → ? pos=ref
- **ScheduleTracy**: dashboard → ? pos=ref
- **Scorecard**: table → ? pos=ref
- **ScorecardImport**: table → ? pos=ref
- **Separation**: table → ? pos=ref
- **Separation_Inline**: table → ? pos=ref
- **Setup**: table → ? pos=ref
- **SFOAudit**: table → ? pos=ref
- **SMSFremontTable**: table → ? pos=ref
- **SMSTracyTable**: table → ? pos=ref
- **Tasks_Inline**: table → ? pos=ref
- **TasksAssignedByMe**: deck → ? pos=ref
- **Tenured**: table → ? pos=ref
- **TodayInterview**: table → ? pos=ref
- **Training**: table → ? pos=ref
- **Treatment_Inline**: table → ? pos=ref
- **Uniform**: table → ? pos=ref
- **Uniform_Inline**: table → ? pos=ref
- **UnpaidRelayTrips**: table → ? pos=ref
- **UploadPerformance**: dashboard → ? pos=ref
- **Users**: table → ? pos=ref
- **Users_Inline**: deck → ? pos=ref
- **UserTasks**: deck → ? pos=ref
- **Week**: card → ? pos=ref
- **Week_Inline**: table → ? pos=ref
- **WeeklyEfficiencyFremont**: table → ? pos=ref
- **WeeklyEfficiencyTracy**: table → ? pos=ref
- **WeeklyEmployee_Inline**: table → ? pos=ref
- **WeeklyPerformance**: card → ? pos=ref
- **WeeklyReportFremont_Efficiency**: table → ? pos=ref
- **WeeklySafety**: detail → ? pos=ref
- **WeeklyScheduleFremont**: table → ? pos=ref
- **WeeklyScheduleTracy**: table → ? pos=ref
- **WeekMapping**: table → ? pos=ref
- **WHC_Fremont**: table → ? pos=ref
- **WHC_Inline**: table → ? pos=ref
- **WHC_Tracy**: table → ? pos=ref
- **WHC_Tracy_Inline**: table → ? pos=ref
- **WorkDetails**: table → ? pos=ref
- **Worker5020_Inline**: table → ? pos=ref
- **Workers Compensation**: table → ? pos=ref
- **WorkersForm5020**: table → ? pos=ref
- **WorkHistory_Inline**: table → ? pos=ref
- **WorkSummaryToolView**: dashboard → ? pos=ref
- **WriteUpsFremont**: table → ? pos=ref
- **WriteUpsTracy**: table → ? pos=ref
- **WSTDeliveredPackagesView**: table → ? pos=ref
- **WSTServiceDetailsView**: table → ? pos=ref
- **WSTWeeklyReportView**: table → ? pos=ref
### Auto-generated (234)
  ActionsCalling_Detail, ActionsCalling_Form, ActiveDocuments_Detail, ActiveDocuments_Form, AdminView_Detail, AdminView_Form, ADP_Detail, ADP_Form, ADPReport_Detail, ADPReport_Form, Ads_Detail, Ads_Form, AMXLServices_Detail, AMXLServices_Form, AppSettings_Detail, AppSettings_Form, AppTriggers_Detail, AppTriggers_Form, AppVariables_Detail, AppViews_Detail, AppViews_Form, AssignedByMe_Detail, AssignedByMe_Form, AssignedToMe_Detail, AssignedToMe_Form, Attendance_Detail, Attendance_Form, AuditView_Detail, AuditView_Form, CallBackFremont_Detail, CallBackFremont_Form, Candidate_Detail, Candidate_Form, CDF 2_Detail, CDF 2_Form, CheckList_Detail, CheckList_Form, ClaimsView_Detail, ClosingToday_Detail, ClosingToday_Form, CommonDocs_Detail, CommonDocs_Form, Compliance_Detail, Compliance_Form, Contact_Detail, Contact_Form, ContactAssignment_Detail, ContactAssignment_Form, Criterion_Detail, DA_Review_Detail, DA_Review_Form, DADaily_Detail, DADaily_Form, DAEfficiency_Detail, DAEfficiency_Form, DailyAPIReport_Detail, DailyAPIReport_Form, DailyHours_Detail, DailyHours_Form, DeliveryQuality_Detail, DeliveryQuality_Form, DispatchTView_Detail, DispatchTView_Form, DispatchView_Detail, DispatchView_Form, DOTAudit_Detail, DOTAudit_Form, DOTLatestAuditRecord_Detail, DOTLatestAuditRecord_Form, Efficiency_Detail, Efficiency_Form, EfficiencyFor7days_Detail, EfficiencyFor7days_Form, Employee_Detail, Employee_Form, EmployeeAudit_Detail, EmployeeAudit_Form, EmployeeDocs_Detail, EmployeeDocs_Form, Everyday_Detail, Everyday_Form, EverydayIssue_Detail, EverydayIssue_Form, ExtraMiles_Detail, ExtraMiles_Form, Fleet_Detail, Fleet_Form, FleetAssignment_Detail, FleetAssignment_Form, FleetDocs_Detail, FleetDocs_Form, FleetView_Detail, FleetView_Form, Followup_Detail, Followup_Form, Hours_Detail, Hours_Form, i9Tracking_Detail, i9Tracking_Form, ImportPaymentDetails_Detail, ImportPaymentDetails_Form, ImportTrips_Detail, ImportTrips_Form, Incident_Detail, Incident_Form, IncidentDocuments_Detail, IncidentDocuments_Form, IncidentForm_Detail, IncidentForm_Form, IncidentNotes_Detail, IncidentNotes_Form, Income_Detail, Income_Form, Injury_Detail, Injury_Form, Inspection_Detail, Inspection_Form, Inventory_Detail, Inventory_Form, Invoice_Detail, Invoice_Form, JJKRenewals_Detail, JJKRenewals_Form, KnowledgeArticles_Detail, KnowledgeArticles_Form, LoadoutSummary_Detail, LoadoutSummary_Form, ManagementView_Detail, ManagementView_Form, Me_Detail, ModifiedDuty 2_Detail, ModifiedDuty 2_Form, NaviReports_Detail, NaviReports_Form, Non_Route_Inspection_Form, Notes_Detail, Notes_Form, Notice_Detail, Notice_Form, Notifications_Detail, Notifications_Form, Onboarding_Detail, Onboarding_Form, PayCal_Detail, PayCal_Form, Payroll_Detail, Payroll_Form, PayrollHours_Detail, PayrollHours_Form, PayrollView_Detail, PayrollView_Form, Performance_Detail, Performance_Form, PerformanceGuidelines_Detail, PhotoQuality_Detail, PhotoQuality_Form, Planning_Detail, Planning_Form, PlanningTracy_Detail, PlanningTracy_Form, POD_Detail, POD_Form, Policy_Detail, Policy_Form, Premium_Detail, Premium_Form, RecruitmentView_Detail, RecruitmentView_Form, Rentals_Detail, Rentals_Form, Repairs_Detail, Repairs_Form, Review_Detail, Review_Form, Roster_Detail, Roster_Form, RosterTracy_Detail, RosterTracy_Form, Routes_Detail, Routes_Form, RoutesDaily_Detail, RoutesDaily_Form, SafetyViolations_Detail, SafetyViolations_Form, Schedule_Detail, Schedule_Form, Scorecard_Detail, Scorecard_Form, Separation_Detail, Separation_Form, Setup_Detail, Setup_Form, SMSFremont_Detail, SMSFremont_Form, SMSTracy_Detail, SMSTracy_Form, Summary_Detail, Summary_Form, Tasks_Detail, Tasks_Form, Tenured_Detail, Tenured_Form, Treatment_Detail, Treatment_Form, Uniform_Detail, Uniform_Form, UnpaidRelayTrips_Detail, UnpaidRelayTrips_Form, Users_Detail, Users_Form, Week_Detail, Week_Form, WeeklyEfficiency_Detail, WeeklyEfficiency_Form, WeeklyEmployee_Detail, WeeklyEmployee_Form, WeeklyReport_Detail, WeeklyReport_Form, WHC_Detail, WHC_Form, WHC_Tracy_Detail, WHC_Tracy_Form, Worker5020_Detail, Worker5020_Form, WorkHistory_Detail, WorkHistory_Form, WSTDeliveredPackages_Detail, WSTDeliveredPackages_Form, WSTServiceDetails_Detail, WSTServiceDetails_Form, WSTUnplannedDelays_Detail, WSTUnplannedDelays_Form, WSTWeeklyReport_Detail, WSTWeeklyReport_Form

## Actions
### Candidate
  _Auto (294): ADD_RECORD, DELETE_RECORD, EDIT_RECORD, NAVIGATE_APP_
  - **StartOnboarding (→"Start Onboarding")**: ADD_RECORD_TO IF `=[Decision] = "Selected"`
  - **UpdateCandidate**: SET_COLUMN_VALUE IF `true`
  - **Set [Decision] to Scheduled**: SET_COLUMN_VALUE
  - **Set [Decision] to Scheduled 2**: SET_COLUMN_VALUE
  - **Export (→"Download")**: EXPORT_VIEW
  - **New step Action - 5**: REF_ACTION IF `true`
  - **ReviewedCandidate (→"Candidate Reviewed")**: SET_COLUMN_VALUE
  - **Call Phone (Phone) (→"Phone call")**: CALL IF `NOT(ISBLANK([Phone]))`
  - **Send SMS (Phone) (→"Text message")**: SMS IF `NOT(ISBLANK([Phone]))`

### Review
  - **CSV Import**: IMPORT_FILE
  - **Download CSV**: EXPORT_VIEW IF `true`
  - **AddNewCandidates**: ADD_RECORD_TO IF `=LEN([Formatted Phone Number])=10`
  - **AddAllEligibleRowstoCandidate**: REF_ACTION IF `true`
  - **UpdateCandidates**: REF_ACTION IF `true`
  - **DeleteAllRowsFromReview**: REF_ACTION IF `true`
  - **Import CSV File**: COMPOSITE IF `true`

### Onboarding
  _Auto (7): EMAIL, NAVIGATE_URL_
  - **Set [Onboarding Status] to Background Failed Action - 1**: SET_COLUMN_VALUE IF `true`
  - **Action for Set [Onboarding Status] to Drug Test Failed**: SET_COLUMN_VALUE
  - **Action for Set [Onboarding Status] to Followup**: SET_COLUMN_VALUE
  - **set Onboarding status to Training scheduled Action - 1**: SET_COLUMN_VALUE IF `true`
  - **Set [Onboarding Status] to Waiting for Results**: SET_COLUMN_VALUE
  - **MoveToEmployee**: ADD_RECORD_TO IF `true`
  - **ExportOnboarding (→"Download")**: EXPORT_VIEW
  - **New step Action - 3**: REF_ACTION IF `true`
  - **Action for CreateTaskforDispatch**: ADD_RECORD_TO IF `true`
  - **AddTransporterID Action - 1**: ADD_RECORD_TO IF `true`
  - **Set [OnboaridngStatus] to Schedule Training Action - 1**: SET_COLUMN_VALUE IF `true`
  - **New step Action - 1**: SET_COLUMN_VALUE IF `true`
  - **FirstDayDocusign (→"Send New Hire Docusign")**: NAVIGATE_URL IF `=AND([NewHireStatus]="Joined",isblank([Docusign]))`
  - **Edit_Onboarding (→"Edit")**: NAVIGATE_APP IF `true`
  - **Action for MarkAsDOTDriver**: REF_ACTION IF `true`

### Schedule
  _Auto (4): NAVIGATE_APP_
  - **Route**: SET_COLUMN_VALUE IF `true`
  - **Employee Canceled**: SET_COLUMN_VALUE IF `=true`
  - **Day OFF**: SET_COLUMN_VALUE IF `true`
  - **PTO**: SET_COLUMN_VALUE IF `true`
  - **CopyScheduleToRosterFremont**: ADD_RECORD_TO IF `=count(FILTER("RosterFremont", ([EmployeeID] = [_THISROW].[EmployeeID])))=0`
  - **Ride Along**: SET_COLUMN_VALUE IF `true`
  - **IfNoAssignScheduleinSchedule**: REF_ACTION IF `=AND(COUNT(FILTER("Schedule", AND([Status] = "Assign Schedule",[EmployeeID]=[_TH`
  - **Training**: SET_COLUMN_VALUE IF `true`
  - **CDV Training**: SET_COLUMN_VALUE IF `true`
  - **Dispatch Canceled**: SET_COLUMN_VALUE IF `true`
  - **Action for AddNewRow**: ADD_RECORD_TO IF `true`
  - **Action for Update Existing Rows**: REF_ACTION IF `true`
  - **UpdateEverydayForNotAvailable**: ADD_RECORD_TO IF `true`
  - **Reduce Day**: SET_COLUMN_VALUE IF `true`
  - **CopyScheduleToRosterTracy**: ADD_RECORD_TO IF `=count(FILTER("RosterTracy", ([EmployeeID] = [_THISROW].[EmployeeID])))=0`
  - **EditShift**: SET_COLUMN_VALUE IF `true`
  - **EditEmployeeShift (→"=CONCATENATE("Edit Schedule - ", [Day])")**: SET_COLUMN_VALUE IF `true`

### PlanningFremont
  _Auto (1): NAVIGATE_APP_

### ActionsCalling
  - **DeleteCurrentWeekSchedules**: REF_ACTION IF `=WEEKDAY(TODAY())=1`
  - **DeleteCurrentRosterFremont**: REF_ACTION IF `true`
  - **CopyScheduletoRoaster_1Fremont**: REF_ACTION IF `true`
  - **RoasterCreatorTracy (→"Create Roster")**: COMPOSITE
  - **FleetDuplicateRemoverFremont**: REF_ACTION IF `true`
  - **RemoveFleetID_GroupFremont (→"Remove Duplicates")**: REF_ACTION IF `true`
  - **New step Action - 2**: SET_COLUMN_VALUE IF `true`
  - **Create Roster Tracy (→"Create Roster")**: SET_COLUMN_VALUE IF `=[Action Name Tracy] <> "Create Roster Tracy"`
  - **DeleteCurrentRosterTracy**: REF_ACTION IF `true`
  - **RemoveFleetID_GroupTracy (→"Remove Duplicates")**: REF_ACTION IF `true`
  - **CopyScheduletoRoaster_1Tracy**: REF_ACTION IF `true`
  - **New step Action - 8**: SET_COLUMN_VALUE IF `true`
  - **Create Roster Fremont (→""Create Roster"")**: SET_COLUMN_VALUE IF `=[Action Name Fremont] <> "Create Roster Fremont"`
  - **RoasterCreatorFremont (→"Create Roster")**: COMPOSITE
  - **RunComplianceCheck 2 (→""Compliance Check"")**: ADD_RECORD_TO IF `true`

### FleetAssignment
  _Auto (1): NAVIGATE_APP_

### Everyday
  _Auto (2): NAVIGATE_APP_
  - **RouteCompleted (→"Route Completed")**: SET_COLUMN_VALUE
  - **Action for DeleteExistingHours**: REF_ACTION IF `true`
  - **AddPayrollHours Action - 1**: ADD_RECORD_TO IF `true`
  - **DeleteExistingHours Action - 2**: REF_ACTION IF `true`
  - **DownloadEveryday (→"Download")**: EXPORT_VIEW
  - **Action for Update the WHC**: REF_ACTION IF `true`
  - **Delete the WHC if not Present Action - 1**: REF_ACTION IF `true`
  - **Add this to WHC Action - 1 Action - 1**: ADD_RECORD_TO IF `true`
  - **Action for update roster entry fremont**: REF_ACTION IF `true`
  - **Late**: SET_COLUMN_VALUE
  - **Create WriteUp for attendance Action - 1**: ADD_RECORD_TO IF `true`
  - **AddEntryToWHC**: ADD_RECORD_TO IF `true`
  - **call the absent email notice trigger Action - 1**: ADD_RECORD_TO IF `true`
  - **SendEmail_AbsentNotice (→"Send Email for Absent")**: SET_COLUMN_VALUE IF `=and(
 in(Context("view"),{"Absent","Late"}),
 [Attendance]="Absent",
 isblank([`
  - **Call Send Email Trigger Action - 1**: ADD_RECORD_TO IF `true`
  - **update roster entry tracy Action - 1**: REF_ACTION IF `true`
  - **MarkInspectionComplete**: SET_COLUMN_VALUE IF `true`
  - **CreateReportEveryday (→"Create Report")**: NAVIGATE_APP IF `=OR(CONTEXT("View") = "ClosingFremont",CONTEXT("View") = "OpeningFremont")`
  - **OpenFileEveryday (→"Open Files")**: NAVIGATE_URL IF `=CONTEXT("View") = "ClosingFremont"`
  - **CallNonRouteInspection (→""Non Route Closing"")**: NAVIGATE_APP IF `true`
  - **GoToOpening (→""Go To Opening"")**: NAVIGATE_APP IF `=OR(CONTEXT("View")="LoadoutTracy",CONTEXT("View")="LoadoutDetailTracy")`

### Unknown
  - **Set [Termination Status] to Terminated Action - 1**: SET_COLUMN_VALUE IF `true`
  - **Set [Termination Status] to Terminated Action - 2**: SET_COLUMN_VALUE IF `true`
  - **DeleteExistingHours Action - 1**: SET_COLUMN_VALUE IF `true`

### Employee
  _Auto (9): NAVIGATE_APP_
  - **DeleteRelatedSchedule**: REF_ACTION IF `true`
  - **DeleteRelatedFleet**: REF_ACTION IF `true`
  - **DeleteRelatedRosterFremont**: REF_ACTION IF `true`
  - **UpdateEverydayForTraining**: ADD_RECORD_TO IF `=ISNOTBLANK([EmployeeID])`
  - **UpdateEmpStatustoScheduled**: SET_COLUMN_VALUE IF `true`
  - **AddToEveryday (→"Add Training")**: ADD_RECORD_TO IF `true`
  - **Action for DeleteCurrentHours**: REF_ACTION IF `true`
  - **CreateLastPayrollHours Action - 1**: ADD_RECORD_TO IF `true`
  - **Action for TurnOFFTheSchedule**: REF_ACTION IF `true`
  - **RemoveWeeklyMessage Action - 1**: REF_ACTION IF `true`
  - **RemoveWeeklyText Action - 1**: REF_ACTION IF `true`
  - **Action for UpdatePerformance**: REF_ACTION IF `true`
  - **UpdateBenefitsEnrolled**: SET_COLUMN_VALUE IF `true`
  - **Action for UpdateCDVSchedule**: REF_ACTION IF `true`
  - **UpdateRoutesCompleted**: SET_COLUMN_VALUE IF `true`
  - **Action for DeleteWeeklyEmployee**: REF_ACTION IF `true`
  - **CreateThisWeek Action - 1**: ADD_RECORD_TO IF `true`
  - **CreateThisWeekPlusOne Action - 1**: ADD_RECORD_TO IF `true`
  - **CreateThisWeekPlusTwo Action - 1**: ADD_RECORD_TO IF `true`
  - **CreateThisWeekPlusThree Action - 1**: ADD_RECORD_TO IF `true`
  - **DeleteADPData Action - 1**: REF_ACTION IF `true`
  - **DeleteTenured Action - 1**: REF_ACTION IF `true`
  - **DeletePOD Action - 1**: REF_ACTION IF `true`
  - **DeleteScorecard Action - 1**: REF_ACTION IF `true`
  - **Retraining**: SET_COLUMN_VALUE IF `true`
  - **Action for DeleteCurrentHours 2**: REF_ACTION IF `true`
  - **CreateCurrentHours Action - 2**: ADD_RECORD_TO IF `true`
  - **DeletePaycal Action - 1**: REF_ACTION IF `true`
  - **Update Employee Write Up count Action - 1**: SET_COLUMN_VALUE IF `true`
  - **EmployeeLevel**: SET_COLUMN_VALUE IF `true`
  - **CreateWeeklyEmployeeEntry**: ADD_RECORD_TO IF `true`
  - **SetWeekYearIDwithInput**: SET_COLUMN_VALUE IF `true`
  - **DeleteRelatedRosterTracy**: REF_ACTION IF `true`
  - **UpgradeEmployee (→"=DOT")**: ADD_RECORD_TO IF `=AND(in(Any(Me[Role]),{"Admin","HR","SuperAdmin"}),[SubWorkType]="Van")`
  - **UpgradeEmployeeSubWorkTypeToDOT**: SET_COLUMN_VALUE IF `true`
  - **EditEmployeeDays (→""Edit Employee Info"")**: SET_COLUMN_VALUE IF `true`
  - **RecreateSchedule (→""Recreate Schedule"")**: ADD_RECORD_TO IF `=in(Any(Me[Role]),{"Admin","HR","SuperAdmin","OpsManager"})`
  - **InputValuesEmployee**: SET_COLUMN_VALUE IF `true`
  - **create the Separation Entry for the Employee Action - 1**: ADD_RECORD_TO IF `true`

### Week
  _Auto (4): NAVIGATE_APP, OPEN_FILE_
  - **Create Scorecard**: SET_COLUMN_VALUE IF `true`
  - **UpdateWeeklyEfficiency (→"Update")**: SET_COLUMN_VALUE IF `=CONTEXT("View")<>"Week_Detail"`

### EfficiencyFremont
  _Auto (1): NAVIGATE_APP_
  - **UpdateEfficiencyFremont (→"Update")**: SET_COLUMN_VALUE IF `true`

### Hours
  - **ExportHours (→"Download")**: EXPORT_VIEW
  - **UpdateHours (→"Update")**: REF_ACTION IF `true`
  - **HoursUpdate (→"Update")**: SET_COLUMN_VALUE IF `true`

### WeeklyEmployee
  _Auto (3): NAVIGATE_APP_
  - **UpdateWeeklyEmployee**: SET_COLUMN_VALUE IF `true`
  - **DownloadWeekly (→"Download")**: EXPORT_VIEW IF `=OR(CONTEXT("View")="WeeklyScheduleTracy",CONTEXT("View")="WeeklyScheduleFremont`
  - **TriggerCreateWeeklyEmployee (→"Update")**: NAVIGATE_APP IF `true`
  - **EditSunday (→"Edit Sunday Schedule")**: REF_ACTION IF `true`
  - **EditMonday (→"Edit Monday Schedule")**: REF_ACTION IF `true`
  - **EditTuesday (→"Edit Tuesday Schedule")**: REF_ACTION IF `true`
  - **EditWednesday (→"Edit Wednesday Schedule")**: REF_ACTION IF `true`
  - **EditThursday (→"Edit Thursday Schedule")**: REF_ACTION IF `true`
  - **EditFriday (→"Edit Friday Schedule")**: REF_ACTION IF `true`
  - **EditSaturday (→"Edit Saturday Schedule")**: REF_ACTION IF `true`
  - **EditEmployeeDaysRef (→"Edit Friday Schedule")**: REF_ACTION IF `true`

### Tasks
  _Auto (1): NAVIGATE_APP_
  - **Completed**: SET_COLUMN_VALUE IF `=[Status]<>"Completed"`
  - **CreateRepeatTask**: ADD_RECORD_TO IF `true`

### Users
  _Auto (2): NAVIGATE_APP_

### Scorecard
  - **ImportScorecard (→"Upload")**: IMPORT_FILE IF `true`
  - **Action for AddRowsPerformance**: ADD_RECORD_TO IF `true`
  - **Action for AddRowsPerformance 2**: ADD_RECORD_TO IF `true`
  - **Action for AddRowsPerformance 3**: ADD_RECORD_TO IF `true`

### Performance
  _Auto (1): OPEN_FILE_
  - **UpdateEmployeeID**: SET_COLUMN_VALUE IF `true`
  - **UpdatePOD**: SET_COLUMN_VALUE IF `true`
  - **Reviewed**: SET_COLUMN_VALUE IF `true`
  - **CreateScorecard (→"Create Scorecard")**: SET_COLUMN_VALUE IF `true`
  - **CreateRetraining Action - 1**: ADD_RECORD_TO IF `true`

### ADP
  - **ImportEmployeeSummary (→"Upload Employee Summary")**: IMPORT_FILE IF `true`
  - **AddRowsToPayCal Action - 1**: ADD_RECORD_TO IF `true`
  - **Action for DeletePayCal**: REF_ACTION IF `true`
  - **Action for DeleteADPData**: REF_ACTION IF `true`

### PayCal
  - **ExportPayCal (→"Download")**: EXPORT_VIEW
  - **UpdatePayCal**: SET_COLUMN_VALUE IF `true`
  - **AppIssues (→""Issues"")**: NAVIGATE_APP IF `true`

### POD
  - **AddRowsPerformance Action - 1**: REF_ACTION IF `true`
  - **ImportPOD (→"Upload")**: IMPORT_FILE IF `true`
  - **AddRowsPerformance Action - 2**: REF_ACTION IF `true`

### CDF
  - **New step Action - 4**: REF_ACTION IF `true`
  - **CDF_AI_Generation (→""Generate Dispute Reason"")**: ADD_RECORD_TO IF `=ISBLANK([DisputeReason])`
  - **DownloadCDF (→""Download"")**: EXPORT_VIEW IF `true`

### Coaching
  - **AddTaskforCoaching Action - 1**: ADD_RECORD_TO IF `true`

### Tenured
  - **ImportTenured (→"Upload")**: IMPORT_FILE IF `true`
  - **New step Action - 6**: REF_ACTION IF `true`

### Fleet
  - **ExportFleet (→"Download")**: EXPORT_VIEW
  - **Update**: SET_COLUMN_VALUE IF `true`
  - **UpdateVehicleStatus**: SET_COLUMN_VALUE IF `true`
  - **Action for AddFleetToDOTLatestAudit**: ADD_RECORD_TO IF `true`
  - **Action for Add notes**: ADD_RECORD_TO IF `true`

### Inspection
  _Auto (7): NAVIGATE_APP_
  - **Action for MarkInspectionCompleteBasedOnWorkId**: REF_ACTION IF `true`

### WHC
  _Auto (8): DELETE_RECORD, NAVIGATE_APP_
  - **Update_WHC**: SET_COLUMN_VALUE IF `true`
  - **SetWHCStatus (→"Status")**: SET_COLUMN_VALUE IF `true`
  - **TriggerWeeklyUpdateWHC (→"Update WHC")**: NAVIGATE_APP IF `true`

### DAReview
  _Auto (5): NAVIGATE_APP, OPEN_FILE_
  - **Open File (Uploaded Signed Files) (→""Signed PDF"")**: OPEN_FILE IF `NOT(ISBLANK([Uploaded Signed Files]))`
  - **SetPrintedStatus**: SET_COLUMN_VALUE IF `true`
  - **Print**: COMPOSITE IF `true`
  - **AddDAReview (→"Add")**: NAVIGATE_APP IF `true`
  - **ViewDAReview (→"View")**: NAVIGATE_APP IF `true`
  - **Void**: SET_COLUMN_VALUE IF `=in(Any(Me[Role]),{"Admin","HR","SuperAdmin","OpsManager"})`

### ContactAssignment
  _Auto (1): NAVIGATE_APP_

### IncidentNotes
  _Auto (1): NAVIGATE_APP_

### Incident
  _Auto (9): EMAIL, NAVIGATE_APP, NAVIGATE_URL, OPEN_FILE_
  - **Open File (IncidentPDF) (→"Incident Report")**: OPEN_FILE IF `NOT(ISBLANK([IncidentPDF]))`
  - **TriggerFetchIncidentForm (→"Update")**: NAVIGATE_APP IF `true`
  - **AddIncident (→"Add")**: NAVIGATE_APP IF `=in(context("view"),{"Incident"})`
  - **Call Phone (Employee Phone) (→"Phone call")**: CALL IF `NOT(ISBLANK([Employee Phone]))`
  - **Send SMS (Employee Phone) (→"Text message")**: SMS IF `NOT(ISBLANK([Employee Phone]))`
  - **Open File (IncidentFilePDF) (→"Incident Photo")**: OPEN_FILE IF `NOT(ISBLANK([IncidentFilePDF]))`
  - **TriggerSendIncidentForm (→""Send Incident Form"")**: NAVIGATE_APP IF `true`
  - **Open File (IncidentDetailsPDF) (→"Download")**: OPEN_FILE IF `NOT(ISBLANK([IncidentDetailsPDF]))`
  - **SendNoticeAndDWCEmail (→""Send Notice And DWC Email"")**: SET_COLUMN_VALUE IF `=AND(
  OR([TypeOfClaim] = "Worker Compensation", [Employee Injury]),
  [DateRep`
  - **Action for Update Email Status for WC**: SET_COLUMN_VALUE IF `true`

### IncidentForm
  _Auto (7): EMAIL, NAVIGATE_APP_
  - **Action for Create Vehicle Claim 2**: ADD_RECORD_TO IF `true`
  - **Action for Create Injury Claim 2**: ADD_RECORD_TO IF `true`
  - **UpdateIncidentForm**: SET_COLUMN_VALUE IF `true`

### IncidentReporting
  - **New step Action - 7**: ADD_RECORD_TO IF `true`

### AppViews
  _Auto (2): NAVIGATE_APP, NAVIGATE_URL_
  - **TriggerWeeklyRecalculateWHC (→"Update WHC")**: NAVIGATE_APP IF `true`

### AppTriggers
  - **Update LastEditOn in Incident forms where incidentID is blank Action - 1**: REF_ACTION IF `true`
  - **Update Hourly hours rows Action - 2**: REF_ACTION IF `true`
  - **Action for Delete old whc**: REF_ACTION IF `true`
  - **Delete All WHC Rows for that week Action - 1**: REF_ACTION IF `true`
  - **Action for Recreate All WHC Rows for the Week Day1**: REF_ACTION IF `true`
  - **Recreate All WHC Rows for the Week Day2 Action - 1**: REF_ACTION IF `true`
  - **Recreate All WHC Rows for the Week Day3 Action - 1**: REF_ACTION IF `true`
  - **Action for Recreate All WHC rows for the Week Day4**: REF_ACTION IF `true`
  - **Recreate All WHC rows for the Week Day5 Action - 1**: REF_ACTION IF `true`
  - **Recreate All WHC rows for the Week Day6 Action - 1**: REF_ACTION IF `true`
  - **Recreate All WHC rows for the Week Day7 Action - 1**: REF_ACTION IF `true`
  - **Action for Trigger Efficiency Update for SecondLast Week**: ADD_RECORD_TO IF `true`
  - **Update the Efficiency Rows for the Week Action - 1**: REF_ACTION IF `true`
  - **Trigger Efficiency Update for Last Week Action - 1**: ADD_RECORD_TO IF `true`
  - **Action for Trigger Efficiency Update for This Week**: SET_COLUMN_VALUE IF `true`
  - **Create Efficiency Row missing for past 14 days Action - 1**: ADD_RECORD_TO IF `true`
  - **Action for Create Trigger for updating Last week whc**: ADD_RECORD_TO IF `true`
  - **Create Trigger for updating this week WHC Action - 1**: ADD_RECORD_TO IF `true`
  - **Create new Invoice row Action - 1**: ADD_RECORD_TO IF `true`
  - **Action for Add Planning for the selected week Day1**: ADD_RECORD_TO IF `true`
  - **Action for Add a new Planning Row Fremont**: ADD_RECORD_TO IF `true`
  - **Action for Delete all weekly empoloyee for this week**: REF_ACTION IF `true`
  - **Action for Create Weekly employee**: REF_ACTION IF `true`
  - **set weekyearid for all scheduled employee Action - 1**: REF_ACTION IF `true`
  - **Update all fleet Action - 1**: REF_ACTION IF `true`
  - **Add a new Planning Row Tracy Action - 1**: ADD_RECORD_TO IF `true`
  - **Delete Completed Entry Action - 1**: REF_ACTION IF `true`
  - **Call for the WHC Tracy Trigger Action - 1**: ADD_RECORD_TO IF `true`
  - **Action for Create Weekly Schedule - Fremont**: ADD_RECORD_TO IF `true`
  - **Update Payroll Entry for the Payroll Action - 1**: REF_ACTION IF `true`

### IncidentDocuments
  _Auto (6): NAVIGATE_APP, OPEN_FILE_

### Followup
  - **FollowupCompleted (→"Done")**: SET_COLUMN_VALUE IF `=in([Status],{"Scheduled","Pending"})`

### AppSettings
  - **Update Hourly hours rows Action - 1**: REF_ACTION IF `true`

### Treatment
  _Auto (1): NAVIGATE_APP_

### FleetDocs
  _Auto (3): NAVIGATE_APP, OPEN_FILE_

### AppVariables
  _Auto (2): NAVIGATE_URL_

### Policy
  _Auto (2): OPEN_FILE_
  - **UpdatePolicy (→"Recalculate")**: SET_COLUMN_VALUE IF `true`

### Premium
  _Auto (2): NAVIGATE_APP_
  - **Recalculate policy info Action - 2**: REF_ACTION IF `true`

### Notice
  _Auto (2): NAVIGATE_APP_
  - **AddNotice (→"Add")**: NAVIGATE_APP IF `=in(context("view"),{"Incident"})`

### Repairs
  _Auto (2): NAVIGATE_APP, OPEN_FILE_
  - **Add_Repair (→"Add")**: NAVIGATE_APP IF `true`

### Notes
  _Auto (18): NAVIGATE_APP_

### Injury
  _Auto (7): NAVIGATE_APP_

### RosterTracy
  _Auto (4): EDIT_RECORD, NAVIGATE_APP_
  - **FleetDuplicateRemoverTracy**: SET_COLUMN_VALUE IF `true`
  - **UpdateRosterTracy**: SET_COLUMN_VALUE IF `true`
  - **RemoveFleetId_IfDuplicatedTracy**: SET_COLUMN_VALUE IF `true`
  - **ConfirmedTracy (→"Confirmed")**: SET_COLUMN_VALUE IF `true`
  - **AbsentTracy (→"Absent")**: COMPOSITE IF `true`
  - **NoShiftTracy (→"NoShift")**: COMPOSITE IF `true`
  - **DownloadTracy (→"Download")**: EXPORT_VIEW IF `true`
  - **PresentTracy (→"Present")**: COMPOSITE IF `=AND(isnotblank([EmployeeID]),OR([WorkType] <> "Standby",
count(SELECT(RosterTra`
  - **AssignFleetToRosterTracy**: SET_COLUMN_VALUE IF `true`
  - **UnassignFleetTracy**: SET_COLUMN_VALUE IF `true`
  - **UpdateEverydayForAbsentTracy (→"Absent")**: ADD_RECORD_TO IF `true`
  - **UpdateEverydayForPresentTracy**: ADD_RECORD_TO IF `true`
  - **UpdateEverydayForCancelledTracy**: ADD_RECORD_TO IF `true`
  - **UpdateEverydayForComingSoonTracy**: ADD_RECORD_TO IF `true`
  - **ComingSoonTracy (→"Coming Soon")**: COMPOSITE IF `=AND(isnotblank([EmployeeID]),OR([WorkType] <> "Standby",
count(SELECT(RosterTra`
  - **TriggerExportOpeningTracy (→"Export Roster")**: NAVIGATE_APP IF `true`
  - **RunComplianceCheck (→""Compliance Check"")**: NAVIGATE_APP IF `true`
  - **UnassignFleetAndAbsentReasonTracy (→""Enter Absent Reason"")**: SET_COLUMN_VALUE IF `true`
  - **GoToLoadout (→""Go To Loadout"")**: NAVIGATE_APP IF `=CONTEXT("View")="OpeningTracy"`
  - **DailyTextMessageTracy (→""Text Message"")**: NAVIGATE_APP IF `=OR(CONTEXT("View")="RosterTracy",Context("View")="RosterAssignmentTracy")`
  - **GenerateDailySMSTracy (→""Generate SMS"")**: NAVIGATE_APP IF `=OR(CONTEXT("View")="RosterTracy",Context("View")="RosterAssignmentTracy")`

### RosterFremont
  _Auto (3): EDIT_RECORD, NAVIGATE_APP_
  - **UpdateRosterFremont**: SET_COLUMN_VALUE IF `true`
  - **RemoveFleetId_IfDuplicatedFremont**: SET_COLUMN_VALUE IF `true`
  - **AbsentFremont (→"Absent")**: COMPOSITE IF `true`
  - **AssignFleetToRosterFremont**: SET_COLUMN_VALUE IF `true`
  - **ConfirmedFremont (→"Confirmed")**: SET_COLUMN_VALUE IF `true`
  - **DownloadFremont**: EXPORT_VIEW IF `true`
  - **NoShiftFremont (→"NoShift")**: COMPOSITE IF `true`
  - **PresentFremont (→"Present")**: COMPOSITE IF `=AND(isnotblank([EmployeeID]),OR([WorkType] <> "Standby",
count(SELECT(ROSTERFre`
  - **UnassignFleetFremont**: SET_COLUMN_VALUE IF `true`
  - **UpdateEverydayForAbsentFremont (→"Absent")**: ADD_RECORD_TO IF `true`
  - **UpdateEverydayForCancelledFremont**: ADD_RECORD_TO IF `true`
  - **UpdateEverydayForPresentFremont**: ADD_RECORD_TO IF `true`
  - **New step Action - 9**: SET_COLUMN_VALUE IF `true`
  - **TriggerExportOpeningFremont (→"Export Roster")**: NAVIGATE_APP IF `=CONTEXT("View") = "ClosingFremont"`
  - **OpenFileRoster (→"Open Files")**: NAVIGATE_URL IF `=CONTEXT("View") = "OpeningFremont"`
  - **CreateReportRoster (→"Create Report")**: NAVIGATE_APP IF `=CONTEXT("View") = "OpeningFremont"`
  - **RunWHCCheck (→""Run Complaince Check"")**: NAVIGATE_APP IF `true`
  - **DailyTextMessageFremont (→""Text Message"")**: NAVIGATE_APP IF `=OR(CONTEXT("View")="RosterFremont",Context("View")="RosterAssignmentFremont")`
  - **GenerateDailySMSFremont (→""Generate SMS"")**: NAVIGATE_APP IF `=OR(CONTEXT("View")="RosterFremont",Context("View")="RosterAssignmentFremont")`

### DOTAudit
  _Auto (2): NAVIGATE_APP_
  - **Action for UpdateTruckStatus**: REF_ACTION IF `true`
  - **Action for AddNotesFromDOTAuditToFleet**: ADD_RECORD_TO IF `true`
  - **GoToLatestInspections (→""Go to Latest Audits"")**: NAVIGATE_APP IF `true`
  - **Action for UpdateAuditDateTime**: REF_ACTION IF `true`

### CommonDocs
  _Auto (2): OPEN_FILE_

### EmployeeDocs
  _Auto (3): NAVIGATE_APP_

### JJKRenewals
  - **ImportReport**: IMPORT_FILE IF `true`

### WHC_Tracy
  - **TriggerWeeklyUpdateWHCTracy (→"Update WHC")**: NAVIGATE_APP IF `true`

### EmployeeAudit
  _Auto (1): NAVIGATE_APP_

### ImportRelayTrips
  - **ImportRelayRoutes (→"Import")**: IMPORT_FILE IF `true`
  - **ProcessRelayTripImport (→"Process")**: ADD_RECORD_TO IF `true`

### ImportRelayPaymentDetails
  - **ImportRelayPayments (→"Import")**: IMPORT_FILE IF `true`
  - **ProcessRelayPayments (→"Process")**: ADD_RECORD_TO IF `true`

### RelayRoutes
  _Auto (3): NAVIGATE_APP_
  - **GotoRelayPaymentImport (→""Go to Payment Import"")**: NAVIGATE_APP IF `=in(Any(Me[Role]),{"Admin","HR","SuperAdmin"})`
  - **RelayUnpaidTrips (→""Go to Unpaid Trips"")**: NAVIGATE_APP IF `=in(Any(Me[Role]),{"Admin","HR","SuperAdmin"})`

### DOTLatestAuditRecord
  _Auto (2): NAVIGATE_APP_
  - **UpdateLatestInspectionDateForVehicle**: SET_COLUMN_VALUE IF `true`

### Separation
  _Auto (14): NAVIGATE_APP, OPEN_FILE_
  - **View_Separation (→"Detail")**: NAVIGATE_APP IF `true`
  - **Change Email Status to Sent Action - 1**: SET_COLUMN_VALUE IF `true`
  - **Employee Status terminated Action - 1**: REF_ACTION IF `true`
  - **AddSepration (→"Add")**: NAVIGATE_APP IF `=not(in(context("view"),{"Separation_Form","Separation_Detail"}))`
  - **SendSeparationEmail**: SET_COLUMN_VALUE IF `=true`

### Income
  _Auto (1): NAVIGATE_APP_
  - **ImportPayrollInfo**: IMPORT_FILE IF `true`

### WSTDeliveredPackages
  - **ImportWSTDeliveredPackages**: IMPORT_FILE IF `true`

### WSTServiceDetails
  - **ImportWSTServiceDetails**: IMPORT_FILE IF `true`

### WSTUnplannedDelays
  - **ImportWSTUnplannedDetails**: IMPORT_FILE IF `true`

### WSTWeeklyReport
  - **ImportWSTWeeklyImport**: IMPORT_FILE IF `true`

### Rentals
  _Auto (1): OPEN_FILE_

### PayCheck
  _Auto (3): EMAIL, OPEN_FILE_

### KnowledgeArticles
  _Auto (2): NAVIGATE_APP_

### Payroll
  _Auto (1): NAVIGATE_APP_

### AMXLServices
  - **UploadAMXLServices (→"Upload")**: IMPORT_FILE IF `true`
  - **CreateAMXLServicesPDF (→"Create Report")**: NAVIGATE_APP
  - **OpenFileRoster_AMXL (→"Open Files")**: NAVIGATE_URL

### DailyHours
  - **TriggerDailyHoursCalculation (→"Recalculate DailyHours")**: NAVIGATE_APP IF `true`

### PayrollHours
  - **TriggerPayrollHoursCalculation (→"Recalculate PayrollHours")**: NAVIGATE_APP IF `true`
  - **Update_PayrollHours (→"Update")**: SET_COLUMN_VALUE IF `true`

### DailyAPIReport
  - **Call Phone (workPhoneNumber) (→"Phone call")**: CALL IF `NOT(ISBLANK([workPhoneNumber]))`
  - **Send SMS (workPhoneNumber) (→"Text message")**: SMS IF `NOT(ISBLANK([workPhoneNumber]))`
  - **ImportAPIDaily (→""Upload"")**: IMPORT_FILE IF `true`
  - **RunImportProcessAPIDaily (→"Process")**: ADD_RECORD_TO IF `true`

### DADaily
  - **ImportDADaily (→""Upload"")**: IMPORT_FILE IF `true`
  - **RunImportProcessDADaily (→"Process")**: ADD_RECORD_TO IF `true`

### RoutesDaily
  - **ImportRouteDaily (→""Upload"")**: IMPORT_FILE IF `true`
  - **RunImportProcessRoutesDaily (→"Process")**: ADD_RECORD_TO IF `true`

### ADPReport
  - **ImportADPDaily (→""Upload"")**: IMPORT_FILE IF `true`
  - **RunImportProcessADPReportDaily (→"Process")**: ADD_RECORD_TO IF `true`

### Worker5020
  _Auto (13): NAVIGATE_APP, OPEN_FILE_
  - **CreateOsha (→"301")**: SET_COLUMN_VALUE IF `true`
  - **Create_Form5020 (→"5020")**: SET_COLUMN_VALUE IF `true`
  - **Action for Action Done**: SET_COLUMN_VALUE IF `true`
  - **Action as Done Action - 1**: SET_COLUMN_VALUE IF `true`

### i9Tracking
  _Auto (3): NAVIGATE_APP, NAVIGATE_URL_

### Attendance
  _Auto (1): NAVIGATE_APP_

### ModifiedDuty
  _Auto (1): OPEN_FILE_
  - **Action for ChangeEmailStatus**: SET_COLUMN_VALUE IF `true`
  - **SendModifiedDuty (→""Send Modified Duty"")**: SET_COLUMN_VALUE IF `=AND(ISBLANK([EmailStatus]),in(Any(Me[Role]),{"Admin","SuperAdmin"}))`

### Ads
  - **2FA**: SET_COLUMN_VALUE IF `=ISNOTBLANK([SecretCode])`
  - **Action for Set2FACode**: SET_COLUMN_VALUE IF `true`

### SMSFremont
  - **SendFremontSMS (→""Send SMS"")**: NAVIGATE_APP IF `true`

### SMSTracy
  - **SendTracySMS (→""Send SMS"")**: NAVIGATE_APP IF `true`

## Observations
- ℹ️ **Candidate** has no Label column
- ℹ️ **Onboarding** has no Label column
- ℹ️ **Employee** has no Label column
- ℹ️ **Users** has no Label column
- ℹ️ **Review** has no Label column
- ℹ️ **Fleet** has no Label column
- ℹ️ **RosterFremont** has no Label column
- ℹ️ **Everyday** has no Label column
- ℹ️ **Week** has no Label column
- ℹ️ **PlanningFremont** has no Label column
- ℹ️ **Schedule** has no Label column
- ℹ️ **ActionsCalling** has no Label column
- ℹ️ **FleetAssignment** has no Label column
- ℹ️ **Inspection** has no Label column
- ℹ️ **Performance** has no Label column
- ℹ️ **Setup** has no Label column
- ℹ️ **Summary** has no Label column
- ℹ️ **Hours** has no Label column
- ℹ️ **EfficiencyFremont** has no Label column
- ℹ️ **WeeklyEmployee** has no Label column
- ℹ️ **ExtraMiles** has no Label column
- ℹ️ **LoadoutSummary** has no Label column
- ℹ️ **Tasks** has no Label column
- ℹ️ **Scorecard** has no Label column
- ℹ️ **POD** has no Label column
- ℹ️ **Tenured** has no Label column
- ℹ️ **ADP** has no Label column
- ℹ️ **PayCal** has no Label column
- ℹ️ **Uniform** has no Label column
- ℹ️ **Criterion** has no Label column
- ℹ️ **WHC** has no Label column
- ℹ️ **DAReview** has no Label column
- ℹ️ **PerformanceGuidelines** has no Label column
- ℹ️ **Inventory** has no Label column
- ℹ️ **Incident** has no Label column
- ℹ️ **Contact** has no Label column
- ℹ️ **Injury** has no Label column
- ℹ️ **IncidentDocuments** has no Label column
- ℹ️ **ContactAssignment** has no Label column
- ℹ️ **WorkHistory** has no Label column
- ℹ️ **IncidentNotes** has no Label column
- ℹ️ **AppSettings** has no Label column
- ℹ️ **Treatment** has no Label column
- ℹ️ **Followup** has no Label column
- ℹ️ **IncidentForm** has no Label column
- ℹ️ **AppViews** has no Label column
- ℹ️ **AppTriggers** has no Label column
- ℹ️ **Ads** has no Label column
- ℹ️ **Invoice** has no Label column
- ℹ️ **FleetDocs** has no Label column
- ℹ️ **AppVariables** has no Label column
- ℹ️ **Compliance** has no Label column
- ℹ️ **Policy** has no Label column
- ℹ️ **Premium** has no Label column
- ℹ️ **Notice** has no Label column
- ℹ️ **Repairs** has no Label column
- ℹ️ **Notes** has no Label column
- ℹ️ **PlanningTracy** has no Label column
- ℹ️ **RosterTracy** has no Label column
- ℹ️ **DOTAudit** has no Label column
- ℹ️ **CommonDocs** has no Label column
- ℹ️ **EmployeeDocs** has no Label column
- ℹ️ **JJKRenewals** has no Label column
- ℹ️ **WHC_Tracy** has no Label column
- ℹ️ **EmployeeAudit** has no Label column
- ℹ️ **ImportRelayPaymentDetails** has no Label column
- ℹ️ **ImportRelayTrips** has no Label column
- ℹ️ **RelayRoutes** has no Label column
- ℹ️ **Notifications** has no Label column
- ℹ️ **DOTLatestAuditRecord** has no Label column
- ℹ️ **Separation** has no Label column
- ℹ️ **Income** has no Label column
- ℹ️ **WSTDeliveredPackages** has no Label column
- ℹ️ **WSTServiceDetails** has no Label column
- ℹ️ **WSTUnplannedDelays** has no Label column
- ℹ️ **WSTWeeklyReport** has no Label column
- ℹ️ **Rentals** has no Label column
- ℹ️ **PayCheck** has no Label column
- ℹ️ **KnowledgeArticles** has no Label column
- ℹ️ **EfficiencyTracy** has no Label column
- ℹ️ **WeeklyReport** has no Label column
- ℹ️ **DailyHours** has no Label column
- ℹ️ **Payroll** has no Label column
- ℹ️ **AMXLServices** has no Label column
- ℹ️ **PayrollHours** has no Label column
- ℹ️ **CallBackFremont** has no Label column
- ℹ️ **ADPReport** has no Label column
- ℹ️ **DADaily** has no Label column
- ℹ️ **DailyAPIReport** has no Label column
- ℹ️ **RoutesDaily** has no Label column
- ℹ️ **Worker5020** has no Label column
- ℹ️ **i9Tracking** has no Label column
- ℹ️ **Attendance** has no Label column
- ℹ️ **EverydayIssue** has no Label column
- ℹ️ **ModifiedDuty** has no Label column
- ℹ️ **CDF** has no Label column
- ℹ️ **SMSFremont** has no Label column
- ℹ️ **SMSTracy** has no Label column
