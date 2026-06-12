# Navi ONDT — AppSheet Schema (v3.000198)
> Parsed: 6/12/2026, 8:14:58 PM | 323T / 8682C / 70S / 379V / 658A / 251FR
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
  Roster                    src=google   sheet=Roster               mode=ALL_CHANGES
  Everyday                  src=google   sheet=Everyday             mode=ALL_CHANGES
  Week                      src=google   sheet=Week                 mode=ALL_CHANGES
  Planning                  src=google   sheet=Planning             mode=ALL_CHANGES
  Schedule                  src=google   sheet=Schedule             mode=ALL_CHANGES
  ActionsCalling            src=google   sheet=ActionsCalling       mode=ALL_CHANGES
  FleetAssignment           src=google   sheet=FleetAssignment      mode=ALL_CHANGES
  Inspection                src=google   sheet=Inspection           mode=ALL_CHANGES
  Performance               src=google   sheet=Performance          mode=ALL_CHANGES
  Setup                     src=google   sheet=Setup                mode=ALL_CHANGES
  Summary                   src=google   sheet=Summary              mode=ALL_CHANGES
  Hours                     src=google   sheet=Hours                mode=ALL_CHANGES
  Efficiency                src=google   sheet=Efficiency           mode=ALL_CHANGES
  WeeklyEmployee            src=google   sheet=WeeklyEmployee       mode=ALL_CHANGES
  ExtraMiles                src=google   sheet=ExtraMiles           mode=ALL_CHANGES
  LoadoutSummary            src=google   sheet=LoadoutSummary       mode=ALL_CHANGES
  Tasks                     src=google   sheet=Tasks                mode=ALL_CHANGES
  Scorecard                 src=google   sheet=Scorecard            mode=ALL_CHANGES
  POD                       src=google   sheet=POD                  mode=ALL_CHANGES
  Tenured                   src=google   sheet=Tenured              mode=ALL_CHANGES
  CDF                       src=google   sheet=CDF                  mode=ALL_CHANGES
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
  AppVariables              src=google   sheet=AppVariables         mode=ALL_CHANGES
  Policy                    src=google   sheet=Policy               mode=ALL_CHANGES
  Premium                   src=google   sheet=Premium              mode=ALL_CHANGES
  Notice                    src=google   sheet=Notice               mode=ALL_CHANGES
  Repairs                   src=google   sheet=Repairs              mode=ALL_CHANGES
  Notes                     src=google   sheet=Notes                mode=ALL_CHANGES
  Separation                src=google   sheet=Separation           mode=ALL_CHANGES
  Rentals                   src=google   sheet=Rentals              mode=ALL_CHANGES
  PayCheck                  src=google   sheet=PayCheck             mode=ALL_CHANGES
  Volume                    src=google   sheet=Volume               mode=ALL_CHANGES
  UPD                       src=google   sheet=UPD                  mode=ALL_CHANGES
  EmployeeDocs              src=google   sheet=EmployeeDocs         mode=ALL_CHANGES
  WSTWeeklyReport           src=google   sheet=WSTWeeklyReport      mode=ALL_CHANGES
  WSTDeliveredPackages      src=google   sheet=WSTDeliveredPackages mode=ALL_CHANGES
  WSTUnplannedDelays        src=google   sheet=WSTUnplannedDelays   mode=ALL_CHANGES
  WSTServiceDetails         src=google   sheet=WSTServiceDetails    mode=ALL_CHANGES
  DAReviewMetric            src=google   sheet=DAReviewMetric       mode=ALL_CHANGES
  DADaily                   src=google   sheet=DADaily              mode=ALL_CHANGES
  ADPReport                 src=google   sheet=ADPReport            mode=ALL_CHANGES
  DailyAPIReport            src=google   sheet=DailyAPIReport       mode=ALL_CHANGES
  RoutesDaily               src=google   sheet=RoutesDaily          mode=ALL_CHANGES
  i9Tracking                src=google   sheet=i9Tracking           mode=ALL_CHANGES
  CDFDisputes               src=google   sheet=CDFDisputes          mode=ALL_CHANGES
  WSTVerification           src=google   sheet=WSTVerification      mode=ALL_CHANGES
  RosterSMS                 src=google   sheet=RosterSMS            mode=ALL_CHANGES
  ScheduleSMS               src=google   sheet=ScheduleSMS          mode=ALL_CHANGES
  Process for ImportDataProcess - 1 Process Table src=native   sheet=?                    mode=READ_ONLY
  Transfer Rows Output      src=native   sheet=?                    mode=READ_ONLY
  New step Output           src=native   sheet=?                    mode=READ_ONLY
  Process for UpdateOnbaodingstatus Process Table src=native   sheet=?                    mode=READ_ONLY
  Check if [Onboarding Status]is not Training Scheduled Output src=native   sheet=?                    mode=READ_ONLY
  Check if [Background] is Meet Requirement and drug test is result negative Output src=native   sheet=?                    mode=READ_ONLY
  Check if [Training Date] is blank Output src=native   sheet=?                    mode=READ_ONLY
  Set [OnboardingStatus] to Schedule Training Output src=native   sheet=?                    mode=READ_ONLY
  Set [OnboaridngStatus] to Schedule Training Output src=native   sheet=?                    mode=READ_ONLY
  if failed Output          src=native   sheet=?                    mode=READ_ONLY
  New step Output 2         src=native   sheet=?                    mode=READ_ONLY
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
  New step Output 3         src=native   sheet=?                    mode=READ_ONLY
  MoveToEmployee 2 Output   src=native   sheet=?                    mode=READ_ONLY
  Process for ActionCaller - 1 Process Table src=native   sheet=?                    mode=READ_ONLY
  New step Output 4         src=native   sheet=?                    mode=READ_ONLY
  RosterCreation Output     src=native   sheet=?                    mode=READ_ONLY
  First Step Duplicate Remover Output src=native   sheet=?                    mode=READ_ONLY
  New step 2 Output         src=native   sheet=?                    mode=READ_ONLY
  Process for DuplicateRemover - 1 Process Table src=native   sheet=?                    mode=READ_ONLY
  New step Output 5         src=native   sheet=?                    mode=READ_ONLY
  Process for CreateScheduleForNewEmployee - 1 Process Table src=native   sheet=?                    mode=READ_ONLY
  New step Output 6         src=native   sheet=?                    mode=READ_ONLY
  Process for When an employee is terminated Process Table src=native   sheet=?                    mode=READ_ONLY
  RemovefromSchedule Output src=native   sheet=?                    mode=READ_ONLY
  RemoveFleetAssignment Output src=native   sheet=?                    mode=READ_ONLY
  RemoveRelatedRoster Output src=native   sheet=?                    mode=READ_ONLY
  RemoveWeeklyMessage Output src=native   sheet=?                    mode=READ_ONLY
  Process for UpdateEmployeeStatus - 1 Process Table src=native   sheet=?                    mode=READ_ONLY
  New step Output 7         src=native   sheet=?                    mode=READ_ONLY
  Process for AddToEverdayforTraining Process Table src=native   sheet=?                    mode=READ_ONLY
  New step Output 8         src=native   sheet=?                    mode=READ_ONLY
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
  New step Output 9         src=native   sheet=?                    mode=READ_ONLY
  Process for PRCSentCreateTasksforDispatch Process Table src=native   sheet=?                    mode=READ_ONLY
  CreateTaskforDispatch Output src=native   sheet=?                    mode=READ_ONLY
  AddTransporterID Output   src=native   sheet=?                    mode=READ_ONLY
  Process for WhenADPDataisimported Process Table src=native   sheet=?                    mode=READ_ONLY
  DeletePayCal Output       src=native   sheet=?                    mode=READ_ONLY
  AddRowsToPayCal Output    src=native   sheet=?                    mode=READ_ONLY
  Process for DeleteReports Process Table src=native   sheet=?                    mode=READ_ONLY
  DeleteADPData Output      src=native   sheet=?                    mode=READ_ONLY
  DeleteTenured Output      src=native   sheet=?                    mode=READ_ONLY
  DeleteCDF Output          src=native   sheet=?                    mode=READ_ONLY
  DeletePOD Output          src=native   sheet=?                    mode=READ_ONLY
  DeleteScorecard Output    src=native   sheet=?                    mode=READ_ONLY
  DeletePaycal Output 2     src=native   sheet=?                    mode=READ_ONLY
  Process for WhenPODIsimportedAddtoPerformance Process Table src=native   sheet=?                    mode=READ_ONLY
  AddRowsPerformance Output 2 src=native   sheet=?                    mode=READ_ONLY
  Process for WhenPODIsimportedAddtoPerformance 2 Process Table src=native   sheet=?                    mode=READ_ONLY
  New step Output 10        src=native   sheet=?                    mode=READ_ONLY
  Process for UpdatePayCal Process Table src=native   sheet=?                    mode=READ_ONLY
  New step Output 11        src=native   sheet=?                    mode=READ_ONLY
  Process for New Bot 5 - 1 Process Table src=native   sheet=?                    mode=READ_ONLY
  New step Output 12        src=native   sheet=?                    mode=READ_ONLY
  Process for CreateWeeklyEmployee Process Table src=native   sheet=?                    mode=READ_ONLY
  DeleteWeeklyEmployee Output src=native   sheet=?                    mode=READ_ONLY
  Delete unwanted Weekly Employee Entry Output src=native   sheet=?                    mode=READ_ONLY
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
  update roster entry Output src=native   sheet=?                    mode=READ_ONLY
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
  if status is changed to Emailed Output src=native   sheet=?                    mode=READ_ONLY
  Process for HourlyWHCUpdate Process Table src=native   sheet=?                    mode=READ_ONLY
  WHC Update Output         src=native   sheet=?                    mode=READ_ONLY
  Process for IncidentReportingBot Process Table src=native   sheet=?                    mode=READ_ONLY
  Vehicle Claim Output      src=native   sheet=?                    mode=READ_ONLY
  Create Vehicle Claim Output src=native   sheet=?                    mode=READ_ONLY
  Employee Claim Output     src=native   sheet=?                    mode=READ_ONLY
  Create Injury Claim Output src=native   sheet=?                    mode=READ_ONLY
  Update the Incident Output src=native   sheet=?                    mode=READ_ONLY
  Process for IncidentCreatedUpdated Process Table src=native   sheet=?                    mode=READ_ONLY
  Vehicle Report Output     src=native   sheet=?                    mode=READ_ONLY
  Worker compensation Output src=native   sheet=?                    mode=READ_ONLY
  any check to generate incident overview Output src=native   sheet=?                    mode=READ_ONLY
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
  any condition check Output src=native   sheet=?                    mode=READ_ONLY
  create all the repairs for today Output src=native   sheet=?                    mode=READ_ONLY
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
  Add a new Planning Row Output src=native   sheet=?                    mode=READ_ONLY
  any conditions to be checked Output src=native   sheet=?                    mode=READ_ONLY
  Update all fleet Output   src=native   sheet=?                    mode=READ_ONLY
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
  Delete WeeklyEmployee Entry for the past weeks Output src=native   sheet=?                    mode=READ_ONLY
  Delete Unwanted WeeklyEmployee Entry for this week Output src=native   sheet=?                    mode=READ_ONLY
  Set WeekYearID for all scheduled employee in this week Output src=native   sheet=?                    mode=READ_ONLY
  Create WeeklyEmployee for this week Output src=native   sheet=?                    mode=READ_ONLY
  App Trigger for Email Notice for Absent AE_AbsentNotice Output src=native   sheet=?                    mode=READ_ONLY
  update status to Email Sent Output src=native   sheet=?                    mode=READ_ONLY
  Trigger is to clear the PayCal table Output src=native   sheet=?                    mode=READ_ONLY
  Delete all PayCal Rows Output src=native   sheet=?                    mode=READ_ONLY
  Trigger is called to Recalculate PayCal Output src=native   sheet=?                    mode=READ_ONLY
  Delete the PaycalRows in based on ADP Output src=native   sheet=?                    mode=READ_ONLY
  Create PayCal for all rows in ADP Output src=native   sheet=?                    mode=READ_ONLY
  Trigger is called to Process DA Daily Import PayCal Output src=native   sheet=?                    mode=READ_ONLY
  Run Script - Update Everyday from DA Daily Output src=native   sheet=?                    mode=READ_ONLY
  Trigger is called to Process ADP Daily Output src=native   sheet=?                    mode=READ_ONLY
  Run script - ADP Import Daily Output src=native   sheet=?                    mode=READ_ONLY
  Trigger is called to Process Daily API Report Output src=native   sheet=?                    mode=READ_ONLY
  RunDailyAPIReport Script Output src=native   sheet=?                    mode=READ_ONLY
  Trigger is called to process Routes Daily Report Output src=native   sheet=?                    mode=READ_ONLY
  Run script to import Routes Daily Output src=native   sheet=?                    mode=READ_ONLY
  Process for TriggerWeeklyActionsMon5am - 1 Process Table src=native   sheet=?                    mode=READ_ONLY
  check any condition Output src=native   sheet=?                    mode=READ_ONLY
  Create new Invoice row Output src=native   sheet=?                    mode=READ_ONLY
  Any Condition to be verified Output src=native   sheet=?                    mode=READ_ONLY
  Process for UpdatePolicy Process Table src=native   sheet=?                    mode=READ_ONLY
  Recalculate policy info Output src=native   sheet=?                    mode=READ_ONLY
  Process for SendAbsentEmail Process Table src=native   sheet=?                    mode=READ_ONLY
  trigger is set Output     src=native   sheet=?                    mode=READ_ONLY
  Call Send Email Trigger Output src=native   sheet=?                    mode=READ_ONLY
  Process for Separation Process Table src=native   sheet=?                    mode=READ_ONLY
  Create the PayCheck Output src=native   sheet=?                    mode=READ_ONLY
  Create the Change Notice Output src=native   sheet=?                    mode=READ_ONLY
  If reason is VR, NCNS, JA Output src=native   sheet=?                    mode=READ_ONLY
  If reason is TERM, LO Output src=native   sheet=?                    mode=READ_ONLY
  Create Email Preview Output src=native   sheet=?                    mode=READ_ONLY
  If Voluntary Resignation Output src=native   sheet=?                    mode=READ_ONLY
  If Voluntary Resignation Early Acceptance Output src=native   sheet=?                    mode=READ_ONLY
  If Job Abandonment Output src=native   sheet=?                    mode=READ_ONLY
  If No Call No Show Output src=native   sheet=?                    mode=READ_ONLY
  If LO, TERM Output        src=native   sheet=?                    mode=READ_ONLY
  Send Email Output         src=native   sheet=?                    mode=READ_ONLY
  If VR Output              src=native   sheet=?                    mode=READ_ONLY
  IF VREA Output            src=native   sheet=?                    mode=READ_ONLY
  If Sep_NCNS Output        src=native   sheet=?                    mode=READ_ONLY
  If Sep_JA Output          src=native   sheet=?                    mode=READ_ONLY
  If Sep_LO, Sep_TERM Output src=native   sheet=?                    mode=READ_ONLY
  Change Email Status to Sent Output src=native   sheet=?                    mode=READ_ONLY
  Employee Status terminated Output src=native   sheet=?                    mode=READ_ONLY
  Process for TriggerDailyActions02am Process Table src=native   sheet=?                    mode=READ_ONLY
  any condition on UDP creation Output src=native   sheet=?                    mode=READ_ONLY
  Create Entry in UDP Output src=native   sheet=?                    mode=READ_ONLY
  WeeklyEmployee Creation Output src=native   sheet=?                    mode=READ_ONLY
  Launch Trigger for Current Week WeeklyEmployee Output src=native   sheet=?                    mode=READ_ONLY
  Launch Trigger for Next Week WeeklyEmployee Output src=native   sheet=?                    mode=READ_ONLY
  Launch Trigger for 3rd week WeeklyEmployee Output src=native   sheet=?                    mode=READ_ONLY
  Launch Trigger for 4th week WeeklyEmployee Output src=native   sheet=?                    mode=READ_ONLY
  Process for DocumentRenaming Process Table src=native   sheet=?                    mode=READ_ONLY
  any condition to be checked Output src=native   sheet=?                    mode=READ_ONLY
  MoveAndRenameFile Output  src=native   sheet=?                    mode=READ_ONLY
  Update File URL Output    src=native   sheet=?                    mode=READ_ONLY
  Update Employee Output    src=native   sheet=?                    mode=READ_ONLY
  Completed Employee I9Status Output src=native   sheet=?                    mode=READ_ONLY
  Process for WSTVerification - 1 Process Table src=native   sheet=?                    mode=READ_ONLY
  test verification any Output src=native   sheet=?                    mode=READ_ONLY
  add to WST Verificaiton Output src=native   sheet=?                    mode=READ_ONLY
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

### Candidate (21 cols)
[Inherits all 22 columns from Table: Process for SetDecisiontoScheduled Process Table]
+ Modified/Added Columns:
  - _RowNumber: Number

### Onboarding (61 cols)
[Inherits all 63 columns from Table: Process for AddEmployeeandCreateTasks Process Table]
+ Modified/Added Columns:
  - _RowNumber: Number

### Employee (86 cols)
[Inherits all 93 columns from Table: Process for CreateWeeklyEmployee Process Table]
+ Modified/Added Columns:
  - _RowNumber: Number

### Users (30 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  UserID: Number = =max( Users[UserID] -{777,701,702,703,704,705,706,707,708,709} )+1
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
  Location: Text
  AppTags: EnumList
  LastEditBy: Enum = =Any(Me[UserID]) { Logic: [EditIf]="=isblank([LastEditBy])" } { Slices Cross-Ref: Me -> Users }
  LastEditOn: DateTime = =Now() { Logic: [EditIf]="=isblank([LastEditOn])" }
  TasksCompleted: Number [RO]
  TotalTasksToday: Number [RO]
  ShowProgress: Text [RO]
  TaskPercentage: Number [RO]
  Related Tasks: List [RO,VC]
  Related Candidates: List [RO,VC]
  Related Everydays: List [RO,VC]
  Related Rosters: List [RO,VC]
  Related Candidates By UpdatedBy: List [RO,VC]
  Related Candidates By CandidateAddedBy: List [RO,VC]
  Related Inspections: List [RO,VC]
  Related Repairs: List [RO,VC]
  Related Notes: List [RO,VC]
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

### Fleet (37 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  FleetID: Number = =max(Fleet[FleetID])+1
  Name: Name
  Provider: Text (→"=Owner")
  Type: Enum { Logic: [ValidIf]="=sort(
  split(lookup(
    "Eday_FleetType",
    "AppVariables",
    "ID",
    "MultiValues"
  ),
  ","),
  false
)" }
  SubType: Enum [Values: 'Camera', 'No Camera']
  Group: Enum
  License Plate: Text
  VIN: Text
  Mileage: Number = =index(
  select(
    inspection[OdometerReading],
    and(
      in(
        [IID],
        [_THISROW].[Related Inspections]
      ),
      [Date]=max([Related Inspections][Date])
    )
  ),
  1
)
  Year: Text
  MakeModel: Text
  Status: Enum [Values: 'Working', 'Not Working', 'Requires Maintenance', 'Grounded', 'Returned', 'Excluded']
  Assignment: Text
  DEF Level: Text
  Fuel: Enum [Values: 'Diesel', 'Gas']
  Location: Text
  QRCode: Image
  Rental Start Date: Date = TODAY()
  Rental Returned: Date { Logic: [ReqIf]="=[Status]="Returned"" }
  Rental ID: Text
  Expiry Date: Date
  Notes: LongText
  LastEditBy: Enum = =Any(Me[UserID]) { Logic: [EditIf]="=isblank([LastEditBy])" } { Slices Cross-Ref: Me -> Users }
  LastEditOn: DateTime = =now() { Logic: [EditIf]="=isblank([LastEditOn])" }
  AssignedOnCurrentRoster: Text [RO]
  Info: Text [RO]
  OpenRepairs: List [RO]
  Related Rosters: List [RO,VC]
  Related FleetAssignments: List [RO,VC]
  Related Inspections: List [RO,VC] (→"=Inspection")
  Related Everydays: List [RO,VC] (→"=Everyday")
  Related Employees: List [RO,VC] (→"=Employees")
  Related FleetDocs: List [RO,VC]
  Related Repairs: List [RO,VC]
  Related Notes: List [RO,VC]
  Related Rentals: List [RO,VC]
```

### Roster (40 cols)
[Inherits all 41 columns from Table: Process for DuplicateRemover - 1 Process Table]
+ Modified/Added Columns:
  - _RowNumber: Number

### Everyday (76 cols)
[Inherits all 82 columns from Table: Process for WHC_Calculation Process Table]
+ Modified/Added Columns:
  - _RowNumber: Number

### Week (31 cols)
[Inherits all 31 columns from Table: Process for AllScorecard Process Table]
+ Modified/Added Columns:
  - _RowNumber: Number

### Planning (22 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
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
  OKAMI: Number (→"=Route Target")
  AmazonRoute: Number (→"=Assigned Route")
  DSPCapacity: Number (→"="Capacity"")
  Route C0: Number
  Route C1: Number
  ExtraDrivers: Number [RO] (→"=Extra Drivers")
  WeekDay: Number [RO] (→"="Week Day"")
  DriversRostered: LongText [RO] (→"=Routes Rostered")
  Extras: LongText [RO]
  Other: LongText [RO]
  WorkingVans: LongText [RO] (→"="Working Vans for " & [Date]")
  Drivers: Number [RO]
  Ride Along: Number [RO]
  Cycle 0: Number [RO]
  Cycle 1: Number [RO]
  DA C0: Number [RO]
  DA C1: Number [RO]
  Related Schedules: List [RO,VC]
```

### Schedule (17 cols)
[Inherits all 17 columns from Table: New step Output 7]
+ Modified/Added Columns:
  - _RowNumber: Number

### ActionsCalling (3 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  UID: Text = UNIQUEID()
  Action Name: Enum [Values: 'Create Rosters'] = =""
```

### FleetAssignment (11 cols)
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
  Camera Trained: Text [RO]
```

### Inspection (63 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  IID: Text = =UNIQUEID()
  WorkID: Ref
  FleetID: Ref
  EmployeeID: Ref
  Inspector: Ref
  Date: Date = TODAY()
  Location: LatLong = =HERE()
  OdometerReading: Number (→"=Odometer Reading")
  FuelLevel: Enum [Values: 'Full', '3/4', 'Half', '1/4', 'Low']
  Clean: Yes/No (→"="Is this van Clean?"")
  FrontImage: Image (→"=Front Image")
  DriversSideImage: Image (→"=Driver Side Image")
  PassengerSideImage: Image (→"=Back Side Image")
  BackImage: Image (→"=Passenger Side Image")
  BodyDamageFront: EnumList (→"=Damage Front")
  BodyDamageDriver: EnumList (→"=Damage Driver")
  BodyDamageBack: EnumList (→"=Damage Back")
  BodyDamagePassenger: EnumList (→"=Damage Passenger")
  DashboardAlerts: EnumList (→"=Dashboard Alerts")
  Fluids: Show [RO]
  EngineOil: Enum (→"=Engine Oil")
  Transmission: Enum
  Differential: Enum
  Coolant: Enum
  Brake: Enum
  PowerSteering: Enum (→"=Power Steering")
  Wiper: Enum
  Air: Enum
  Fuel: Enum
  Oil: Enum
  LFront: EnumList (→"=Driver Side Front")
  LRear: EnumList (→"=Driver Side Back")
  RFront: EnumList (→"=Passenger Side Front")
  RRear: EnumList (→"=Passenger Side Back")
  Safety: Show [RO]
  EmergencyBrake: Enum
  FrontWiperBlades: Enum
  RearWiperBlades: Enum
  Notes: LongText
  InspectionTime: Time = TIMENOW()
  HasDolly: Yes/No (→"="Does this van has Dolly?"")
  TabRepair: Show [RO]
  RepairType: EnumList (→"="Add New Repair"")
  RepairDesc: LongText (→"="Repair Description"")
  FleetName: Show [RO]
  RoutePerformance: Show [RO]
  Filters: Show [RO]
  Tires: Show [RO]
  NewBodyDamage: Show [RO]
  SafetyViolations: Show [RO]
  Speeding: Show [RO] { Logic: [ShowIf]="=[WorkID].[Speeding]>0" }
  Seatbelt: Show [RO] { Logic: [ShowIf]="=[WorkID].[Seatbelt]>0" }
  FollowingDistance: Show [RO] { Logic: [ShowIf]="=[WorkID].[FollowingDistance]>0" }
  Distraction: Show [RO] { Logic: [ShowIf]="=[WorkID].[Distraction]>0" }
  SignalViolations: Show [RO] { Logic: [ShowIf]="=[WorkID].[SignalViolation]>0" }
  Route Completed At: Show [RO]
  PlannedCompletionTime: Time [RO]
  RouteCompletionTime: Time [RO] (→"=Route Completion At")
  Efficiency: Show [RO]
  Packages Rescued: Show [RO] { Logic: [ShowIf]="=[WorkID].[PackagesRescued]>0" }
  Extra Packages Delivered: Show [RO] { Logic: [ShowIf]="=[WorkID].[ExtraPackages]>0" }
  OpenRepairs: List [RO] (→"="Open Repairs"")
```

### Performance (57 cols)
[Inherits all 57 columns from Table: Process for ScorecardPDF Process Table]
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

### Efficiency (18 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  Date: Date = TODAY()
  Week: Ref
  Routes: Number
  Training: Number
  PaidRouteHours: Decimal
  TrainingPaidHours: Number
  AMZNCancel: Number
  DSPLateCancel: Number
  Packages: Number
  TotalTime: Decimal
  PerRouteDeliveryTime: Decimal (→"=Efficiency")
  Overtime: Decimal
  Cost: Price
  Volume: Percent
  UpdatedBy: Enum = =Any(Me[UserID]) { Logic: [EditIf]="=isblank([UpdatedBy])" } { Slices Cross-Ref: Me -> Users }
  UpdatedOn: DateTime = =now() { Logic: [EditIf]="=isblank([UpdatedOn])" }
  Efficiency: Price [HIDDEN]
```

### WeeklyEmployee (27 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  WID: Text = =[WeekID]&"-"&[EmployeeID]
  EmployeeID: Ref
  WeekID: Ref
  UpdatedOn: DateTime = =now()
  Notes: LongText
  Sunday: Enum [RO]
  Monday: Enum [RO]
  Tuesday: Enum [RO]
  Wednesday: Enum [RO]
  Thursday: Enum [RO]
  Friday: Enum [RO]
  Saturday: Enum [RO]
  Working Days: Number [RO]
  Phone: Text [RO]
  Notification: LongText [RO]
  EmployeeType: Enum [RO]
  EditSunday: Text [RO]
  EditMonday: Text [RO]
  EditTuesday: Text [RO]
  EditWednesday: Text [RO]
  EditThursday: Text [RO]
  EditFriday: Text [RO]
  EditSaturday: Text [RO]
  EditEmployee: Text [RO]
  Efficiency: Decimal [RO]
  EmployeeName: Name [RO] { Logic: [ShowIf]="=1=2" }
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

### LoadoutSummary (11 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  LSID: Text = UNIQUEID()
  Date: Date [RO]
  Routes: Number [RO]
  CallOuts: Number [RO]
  Standby: Number [RO]
  Trainees: Number [RO]
  CDV Training: Number [RO]
  Operations: Number [RO]
  Shift Cancelled: Number [RO]
  Efficiency: List [RO]
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
[Inherits all 17 columns from Table: New step Output 12]
+ Modified/Added Columns:
  - _RowNumber: Number

### CDF (24 cols)
[Inherits all 25 columns from Table: Process for WhenPODIsimportedAddtoPerformance 2 Process Table]
+ Modified/Added Columns:
  - _RowNumber: Number

### ADP (18 cols)
[Inherits all 18 columns from Table: DeletePayCal Output]
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

### WHC (23 cols)
[Inherits all 24 columns from Table: Process for Scheduled_Updates_WHC Process Table]
+ Modified/Added Columns:
  - _RowNumber: Number

### DAReview (88 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = =uniqueid() { Logic: [EditIf]="=isblank([ID])" }
  Employee: Ref = ="-"
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
  "HR",
  "OffsiteOPS"}
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
  Status: Enum [Values: 'Created', 'Printed', 'Emailed', 'Completed'] = =if(
  not(isblank([Uploaded Signed Files])),
  "Completed",
  "Created"
)
  NoticeNo: Number (→"=Corrective Action #")
  Count: Number (→"=Metric Notice #")
  CDF: Number { Logic: [ShowIf]="=[Metric]="Customer Delivery Feedback"" }
  Mishandled packages: Number { Logic: [ShowIf]="=[Metric]="Customer Delivery Feedback"" }
  Unprofessional behavior: Number { Logic: [ShowIf]="=[Metric]="Customer Delivery Feedback"" }
  Failure to follow delivery instructions: Number { Logic: [ShowIf]="=[Metric]="Customer Delivery Feedback"" }
  Delivered to Wrong Address: Number { Logic: [ShowIf]="=[Metric]="Customer Delivery Feedback"" }
  Never Received Delivery: Number { Logic: [ShowIf]="=[Metric]="Customer Delivery Feedback"" }
  Delivery Success Behaviors: Number (→"=Lost Packages") { Logic: [ShowIf]="=[Metric]="Delivery Success Behaviors"" | [ReqIf]="=[Metric]="Delivery Success Behaviors"" }
  Simultaneous Deliveries: Number { Logic: [ShowIf]="=[Metric]="Delivery Success Behaviors"" }
  Delivered 50m: Number { Logic: [ShowIf]="=[Metric]="Delivery Success Behaviors"" }
  Delivered to Household Member: Number { Logic: [ShowIf]="=[Metric]="Delivery Success BehaviorsX"" }
  Incorrect Scan Desc: Text (→"="Incorrect Scan Description"") { Logic: [ShowIf]="=[Metric]="Delivery Success Behaviors"" }
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
  isblank([Incorrect Scan Desc]),
  "",
  " • Incorrect Scan Desc: "&[Incorrect Scan Desc]&""
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
)& IF(
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
  "Meal Break"}
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
  DAStatus: Text [RO]
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

### Inventory (10 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = =ifs(
   [Type]="Phone",
   [IMEI]&"-"&[SIM],
   1=1,
  uniqueid()
)
  Type: Enum
  Name: Name
  IMEI: Text { Logic: [EditIf]="=and([Type]="Phone",isblank([IMEI]))" }
  SIM: Text { Logic: [EditIf]="=and([Type]="Phone",isblank([SIM]))" }
  Status: Enum [Values: 'Active', 'Inactive']
  LastEditBy: Enum = =any(Me[UserID]) { Logic: [EditIf]="=isblank([LastEditBy])" } { Slices Cross-Ref: Me -> Users }
  LastEditOn: DateTime = =now() { Logic: [EditIf]="=isblank([LastEditOn])" }
  Label: Text [RO]
```

### Incident (90 cols)
[Inherits all 93 columns from Table: Process for IncidentCreatedUpdated Process Table]
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
  Role: EnumList = =Any(Me[Role]) { Logic: [ValidIf]="=sort(
  split(lookup(
    "AppUserRoles ",
    "AppVariables",
    "ID",
    "MultiValues"
  ),
  ","),
  false
)" | [EditIf]="=In(Any(Me[Role]),{"Admin"})" } { Slices Cross-Ref: Me -> Users }
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
[Inherits all 38 columns from Table: Create Vehicle Claim Output]
+ Modified/Added Columns:
  - _RowNumber: Number

### AppViews (21 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
  Type: Enum
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

### AppTriggers (13 cols)
[Inherits all 13 columns from Table: Update LastEditOn in Incident forms where incidentID is blank Output]
+ Modified/Added Columns:
  - _RowNumber: Number

### Ads (7 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ADID: Text = =UNIQUEID()
  Email: Text
  Password: Text
  Candidate Status: Text
  Day to Post Ad: Enum [Values: '1-Sunday', '2-Monday', '3-Tuesday', '4-Wednesday', '5-Thursday', '6-Friday', '7-Saturday']
  City: Text
```

### Invoice (18 cols)
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
  Scorecard: Enum { Logic: [ValidIf]="=sort(
  split(lookup(
    "ScorecardOptions",
    "AppVariables",
    "ID",
    "MultiValues"
  ),
  ","),
  true
)" }
  Incentive: Price (→"=Incentive Expected")
  IncentiveAMZN: Price (→"=Incentive Paid")
  LastEditBy: Enum = =Any(Me[UserID]) { Logic: [EditIf]="=isblank([LastEditBy])" } { Slices Cross-Ref: Me -> Users }
  LastEditOn: DateTime = =now() { Logic: [EditIf]="=isblank([LastEditOn])" }
  InvoiceDiff: Price [RO] (→"=Invoice Difference")
  IncentiveDiff: Price [RO] (→"=Incentive Difference")
```

### FleetDocs (9 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID() { Logic: [EditIf]="=isblank([ID])" }
  Fleet: Ref
  Type: Enum
  RgsExpiryDate: Date { Logic: [ShowIf]="=[Type]="Registration"" }
  RentalExpiryDate: Date { Logic: [ShowIf]="=[Type]="Rental Agreement"" }
  File: File
  LastEditBy: Enum = =Any(Me[UserID]) { Logic: [EditIf]="=isblank([LastEditBy])" } { Slices Cross-Ref: Me -> Users }
  LastEditOn: DateTime = =now() { Logic: [EditIf]="=isblank([LastEditOn])" }
```

### AppVariables (18 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
  Type: Enum
  Tags: EnumList [Values: 'System', 'Standard', 'Migration', 'Company', 'Configuration', 'Custom', 'Outdated']
  ValueControl: EnumList [Values: 'Date', 'Decimal', 'Enum', 'File', 'Multi', 'Photo', 'URL']
  Title: Text
  UsedFor: Text
  Decimal: Decimal { Logic: [EditIf]="=in("Decimal",[ValueControl])" }
  EnumValue: Enum { Logic: [EditIf]="=in("Enum",[ValueControl])" }
  MultiValues: EnumList { Logic: [EditIf]="=in("Multi",[ValueControl])" }
  DateValue: Date = TODAY() { Logic: [EditIf]="=in("Date",[ValueControl])" }
  Photo: Image { Logic: [EditIf]="=in("Photo",[ValueControl])" }
  URL: Url { Logic: [EditIf]="=in("URL",[ValueControl])" }
  File: File { Logic: [EditIf]="=in("File",[ValueControl])" }
  Description: Text
  EnumList: EnumList [HIDDEN]
  LastEditBy: Enum = =Any(me[UserID]) { Logic: [EditIf]="=isblank([LastEditBy])" }
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

### Notice (16 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = =uniqueid() { Logic: [EditIf]="=isblank([ID])" }
  Type: Enum [Values: 'Lawsuit', 'Notice', 'Employee Inquiry', 'Follow-up', 'Other']
  SubType: EnumList [Values: 'Unemployment Claim', 'Non-Payment Claim', 'Child Support Order', 'Wage Garnishment', 'Court Hearing', 'Disability Claim', 'Other', "Doctor's Note", ... +16 more]
  DateOfNotice: Date (→"="Date of Notice"")
  Employee: Enum
  Sender: Text
  Due Date: Date = TODAY()
  Status: Enum [Values: 'Received', 'Responded', 'Waiting for Result', 'Closed', 'Waiting for Response']
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
  Date: Date = TODAY()
  FleetID: Ref
  Type: EnumList
  Description: LongText
  Status: Enum [Values: 'Open', 'Closed'] = =Open
  Current Status: Enum [Values: 'Completed', 'Not Started', 'Sent to Repair Shop', 'Scheduled', 'Ready for pickup', 'Waiting for Parts', 'Waiting for Appointment', 'Waiting for tow']
  DamagedBy: Ref (→"=Damaged By")
  Repair Date: Date
  RepairedBy: Text (→"=Repair Shop")
  Invoice: Price (→"=Repair Amount")
  Paid By: Enum [Values: 'Amazon Vendor', 'Our Company', 'Company Insurance', 'No Payment Required', 'Rental Company', 'Third Party', 'Unpaid']
  Document: File
  Photo1: Image
  Photo2: Image
  Photo3: Image
  Photo4: Image
  Inspection: Enum [HIDDEN]
  UpdatedBy: Ref
  UpdatedOn: DateTime
  Label: Text [RO]
  Related Notes: List [RO,VC]
```

### Notes (9 cols)
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
```

### Separation (78 cols)
[Inherits all 78 columns from Table: Change Email Status to Sent Output]
+ Modified/Added Columns:
  - _RowNumber: Number

### Rentals (12 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  RentalID: Text = UNIQUEID()
  AgreementID: Text
  Vehicle: Text
  FleetID: Ref = =INDEX(
  select(
    Fleet[FleetID],
    [Rental ID]=[_THISROW].[Vehicle]
  ),
  1
)
  Status: Text = =INDEX(
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
  ID: Text = =UniqueId() { Logic: [EditIf]="=isblank([ID])" }
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
  UploadSignedAcknowledgment: File (→"="Upload Signed Acknowledgment"")
  Email: Email [HIDDEN]
  Trigger: Text [HIDDEN]
  LastEditBy: Enum = =Any(Me[UserID]) { Logic: [EditIf]="=isblank([LastEditBy])" } { Slices Cross-Ref: Me -> Users }
  LastEditOn: DateTime = NOW() { Logic: [EditIf]="=isblank([LastEditOn])" }
```

### Volume (8 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  Date: Date = TODAY()
  DSP: Enum
  Routes: Number
  Reductions: Number
  Total: Number
  Volume Share: Percent [RO]
  _ComputedKey: Text [RO,VC]
```

### UPD (20 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  UID: Ref
  Date: Date
  Route: Text
  InvoiceHours: Number
  Start Time 1: Time
  End Time 1: Time { Logic: [ValidIf]="=[End Time 1]>[Start Time 1]" | [EditIf]="=isnotblank([Start Time 1])" }
  Start Time 2: Time { Logic: [EditIf]="=isnotblank([Start Time 1])" }
  End Time 2: Time { Logic: [ValidIf]="=[Start Time 2]<=[_this]" | [EditIf]="=isnotblank([Start Time 2])" }
  Start Time 3: Time { Logic: [EditIf]="=isnotblank([Start Time 2])" }
  End Time 3: Time { Logic: [ValidIf]="=[Start Time 3]<[_this]" | [EditIf]="=isnotblank([Start Time 3])" }
  Start Time 4: Time { Logic: [EditIf]="=isnotblank([Start Time 3])" }
  End Time 4: Time { Logic: [ValidIf]="=[Start Time 4]<[_this]" | [EditIf]="=isnotblank([Start Time 4])" }
  Total Time: Decimal
  Note: LongText
  Status: Enum [Values: 'Disqualified', 'Qualify', 'Requested', 'Approved', 'Rejected']
  LastEditBy: Enum = =Any(Me[UserID]) { Logic: [EditIf]="=isblank([_this])" } { Slices Cross-Ref: Me -> Users }
  LastEditOn: DateTime = =now() { Logic: [EditIf]="=isblank([_this])" }
  WeekYear: Enum [RO]
  Related WorkIDs: List [RO,VC]
```

### EmployeeDocs (18 cols)
[Inherits all 18 columns from Table: Update File URL Output]
+ Modified/Added Columns:
  - _RowNumber: Number

### WSTWeeklyReport (16 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = =CONCATENATE([Date],[Service Type],"-",[Planned Duration])UNIQUEID()
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

### WSTServiceDetails (21 cols)
[Inherits all 21 columns from Table: add to WST Verificaiton Output]
+ Modified/Added Columns:
  - _RowNumber: Number

### DAReviewMetric (6 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  Key: Text
  Employee: Number
  MetricName: Name
  MetricCount: Number
  NoticeCount: Number
```

### DADaily (21 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  Transporter Id: Text = UNIQUEID()
  Driver name: Text
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
  total packages: Text
  cortex_avg_pace_stops_per_hour: Text
  cortex_remaining_state_of_charge: Text
  App sign in:: Text
  App sign out:: Text
  cortex_last_stop_execution_time: Text
  cortex_total_break_time_used: Text
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
  Hours: Decimal
  Pay Code: Text
```

### DailyAPIReport (13 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  IID: Text = =UNIQUEID()
  Date: Date
  CapturedAt: DateTime
  vinNumber: Text
  AppLogin: Time
  AppLogout: Time
  MealIn: Time
  MealOut: Time
  Route: Text
  transporterId: Text
  workPhoneNumber: Text
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
  Route Duration: Number
  All stops: Number
  Stops complete: Number
  not started stops: Number
  Date: Date = TODAY()
```

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
  Position: Enum [Values: 'Driver', 'Helper']
  Status: Enum [Values: 'Active', 'Complete', 'Inactive'] = =Active
  CompanyName: Name = ="ONDOT"
  UploadedAt: DateTime
  FolderId: Url
  Message: Text [RO] = =CONCATENATE("Please upload the required documents using the link below: ", "https://empdocverifier-857017022688.us-west1.run.app/?token=",[Token],"&company=ONDOT", " Once the upload is complete, please confirm here.")
  EmpId: Ref (→"="Employee"") { Logic: [ShowIf]="=ISBLANK([CandidateId])" }
  CandidateId: Ref (→"="Candidate"") { Logic: [ShowIf]="=ISBLANK([EmpId])" }
  Action: Text { Logic: [ShowIf]="=[Status]<>"Active"" }
```

### CDFDisputes (23 cols)
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
  NonDisputable: Text
  DisputeReason: Text
  DisputeStrength: Text
  AIProcessedAt: Text
  AIModelUsed: Text
  ErrorMessage: Text
  Dispute_Text: Text
  IsArchived: Yes/No
```

### WSTVerification (6 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text [HIDDEN] = UNIQUEID()
  WSTServiceDetails: Ref
  Date: Date = =[WSTServiceDetails].[Date]
  EmployeeID: Enum = =ANY(
   SELECT(
    Employee[EmployeeID],
     OR(
       [Name] = [_THISROW].[WSTServiceDetails].[Delivery Associate],
       IN(
        [_THISROW].[WSTServiceDetails].[Delivery Associate],
         [FuzzyMatchNames]
      )
    )
  )
) { Logic: [ValidIf]="=FILTER(
  "Employee",
   [EmployeeStatus] = "Scheduled"
)" }
  EveryDay: Enum = =ANY(
   SELECT(
    Everyday[WorkID],
     AND(
       [EmployeeID] = [_THISROW].[EmployeeID],
       [Date] = [_THISROW].[Date]
    )
  )
)
```

### RosterSMS (9 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  IID: Text = UNIQUEID()
  RosterId: Text
  EmployeeName: Name
  EmployeePhoneNumber: Phone
  TextMessage: Text
  MessageStatus: Text
  SendBy: Text
  SentOn: Text
```

### ScheduleSMS (9 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  IID: Text = UNIQUEID()
  ScheduleId: Text
  EmployeeName: Name
  EmployeePhoneNumber: Phone
  TextMessage: Text
  MessageStatus: Text
  SendBy: Text
  SentOn: Text
```

### Process for ImportDataProcess - 1 Process Table (12 cols)
[Inherits all 10 columns from Table: Review]
+ Modified/Added Columns:
  - Instance Id: Text
  - Transfer Rows: Ref
  - New step: Ref

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

### New step Output (10 cols)
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

### Process for UpdateOnbaodingstatus Process Table (77 cols)
[Inherits all 63 columns from Table: Process for AddEmployeeandCreateTasks Process Table]
+ Modified/Added Columns:
  - Check if [Onboarding Status]is not Training Scheduled: Ref
  - Check if [Background] is Meet Requirement and drug test is result negative: Ref
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

### Check if [Background] is Meet Requirement and drug test is result negative Output (2 cols)
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

### Set [OnboaridngStatus] to Schedule Training Output (61 cols)
[Inherits all 63 columns from Table: Process for AddEmployeeandCreateTasks Process Table]

### if failed Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### New step Output 2 (61 cols)
[Inherits all 63 columns from Table: Process for AddEmployeeandCreateTasks Process Table]

### set Onboarding status to Training scheduled Output (61 cols)
[Inherits all 63 columns from Table: Process for AddEmployeeandCreateTasks Process Table]

### Check if [Background] is not Report Review Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Set [Onboarding Status] to Background Failed Output (61 cols)
[Inherits all 63 columns from Table: Process for AddEmployeeandCreateTasks Process Table]

### Check if [DrugTest] is Result Positive Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Set [Onboarding Status] to Drug Test Failed Output (61 cols)
[Inherits all 63 columns from Table: Process for AddEmployeeandCreateTasks Process Table]

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

### Set [Onboarding Status] to Waiting for Results Output (61 cols)
[Inherits all 63 columns from Table: Process for AddEmployeeandCreateTasks Process Table]

### Set [Onboarding Status] to Followup Output (61 cols)
[Inherits all 63 columns from Table: Process for AddEmployeeandCreateTasks Process Table]

### Process for SetDecisiontoScheduled Process Table (22 cols)
[Inherits all 22 columns from Table: Process for MoveCandidateToOnboarding Process Table]
+ Modified/Added Columns:
  - Set [Decision] to Scheduled: Ref

### Set [Decision] to Scheduled Output (21 cols)
[Inherits all 22 columns from Table: Process for SetDecisiontoScheduled Process Table]

### Process for MoveCandidateToOnboarding Process Table (22 cols)
[Inherits all 22 columns from Table: Process for SetDecisiontoScheduled Process Table]
+ Modified/Added Columns:
  - StartOnboarding: Ref

### StartOnboarding Output (21 cols)
[Inherits all 22 columns from Table: Process for SetDecisiontoScheduled Process Table]

### Process for AddEmployeeandCreateTasks Process Table (63 cols)
[Inherits all 63 columns from Table: Process for PRCSentCreateTasksforDispatch Process Table]
+ Modified/Added Columns:
  - New step: Ref
  - MoveToEmployee 2: Ref

### New step Output 3 (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### MoveToEmployee 2 Output (61 cols)
[Inherits all 63 columns from Table: Process for AddEmployeeandCreateTasks Process Table]

### Process for ActionCaller - 1 Process Table (7 cols)
```
  Instance Id: Text
  UID: Text
  Action Name: Enum [Values: 'Create Rosters']
  New step: Ref
  RosterCreation: Ref
  First Step Duplicate Remover: Ref
  New step 2: Ref
```

### New step Output 4 (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### RosterCreation Output (3 cols)
```
  Instance Id: Text
  UID: Text
  Action Name: Enum [Values: 'Create Rosters']
```

### First Step Duplicate Remover Output (3 cols)
```
  Instance Id: Text
  UID: Text
  Action Name: Enum [Values: 'Create Rosters']
```

### New step 2 Output (3 cols)
```
  Instance Id: Text
  UID: Text
  Action Name: Enum [Values: 'Create Rosters']
```

### Process for DuplicateRemover - 1 Process Table (41 cols)
[Inherits all 40 columns from Table: Roster]
+ Modified/Added Columns:
  - Instance Id: Text
  - New step: Ref

### New step Output 5 (40 cols)
[Inherits all 41 columns from Table: Process for DuplicateRemover - 1 Process Table]

### Process for CreateScheduleForNewEmployee - 1 Process Table (87 cols)
[Inherits all 93 columns from Table: Process for CreateWeeklyEmployee Process Table]
+ Modified/Added Columns:
  - New step: Ref

### New step Output 6 (1 cols)
```
  Instance Id: Text
```

### Process for When an employee is terminated Process Table (90 cols)
[Inherits all 93 columns from Table: Process for CreateWeeklyEmployee Process Table]
+ Modified/Added Columns:
  - RemovefromSchedule: Ref
  - RemoveFleetAssignment: Ref
  - RemoveRelatedRoster: Ref
  - RemoveWeeklyMessage: Ref

### RemovefromSchedule Output (86 cols)
[Inherits all 93 columns from Table: Process for CreateWeeklyEmployee Process Table]

### RemoveFleetAssignment Output (86 cols)
[Inherits all 93 columns from Table: Process for CreateWeeklyEmployee Process Table]

### RemoveRelatedRoster Output (86 cols)
[Inherits all 93 columns from Table: Process for CreateWeeklyEmployee Process Table]

### RemoveWeeklyMessage Output (86 cols)
[Inherits all 93 columns from Table: Process for CreateWeeklyEmployee Process Table]

### Process for UpdateEmployeeStatus - 1 Process Table (18 cols)
[Inherits all 17 columns from Table: Schedule]
+ Modified/Added Columns:
  - Instance Id: Text
  - New step: Ref

### New step Output 7 (17 cols)
[Inherits all 18 columns from Table: Process for UpdateEmployeeStatus - 1 Process Table]

### Process for AddToEverdayforTraining Process Table (87 cols)
[Inherits all 93 columns from Table: Process for CreateWeeklyEmployee Process Table]
+ Modified/Added Columns:
  - New step: Ref

### New step Output 8 (86 cols)
[Inherits all 93 columns from Table: Process for CreateWeeklyEmployee Process Table]

### Process for UpdateHoursPreviousPayroll Process Table (88 cols)
[Inherits all 93 columns from Table: Process for CreateWeeklyEmployee Process Table]
+ Modified/Added Columns:
  - DeleteCurrentHours: Ref
  - CreateLastPayrollHours: Ref

### DeleteCurrentHours Output (86 cols)
[Inherits all 93 columns from Table: Process for CreateWeeklyEmployee Process Table]

### CreateLastPayrollHours Output (86 cols)
[Inherits all 93 columns from Table: Process for CreateWeeklyEmployee Process Table]

### Process for UpdateWeeklyEmployee Process Table (20 cols)
[Inherits all 18 columns from Table: Process for UpdateEmployeeStatus - 1 Process Table]
+ Modified/Added Columns:
  - CheckforemployeeweeklyRow: Ref
  - AddNewRow: Ref
  - Update Existing Rows: Ref

### CheckforemployeeweeklyRow Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### AddNewRow Output (17 cols)
[Inherits all 18 columns from Table: Process for UpdateEmployeeStatus - 1 Process Table]

### Update Existing Rows Output (17 cols)
[Inherits all 18 columns from Table: Process for UpdateEmployeeStatus - 1 Process Table]

### Process for StartTermination Process Table (89 cols)
[Inherits all 93 columns from Table: Process for CreateWeeklyEmployee Process Table]
+ Modified/Added Columns:
  - TurnOFFTheSchedule: Ref
  - RemoveWeeklyText: Ref
  - create the Separation Entry for the Employee: Ref

### TurnOFFTheSchedule Output (86 cols)
[Inherits all 93 columns from Table: Process for CreateWeeklyEmployee Process Table]

### RemoveWeeklyText Output (86 cols)
[Inherits all 93 columns from Table: Process for CreateWeeklyEmployee Process Table]

### create the Separation Entry for the Employee Output (86 cols)
[Inherits all 93 columns from Table: Process for CreateWeeklyEmployee Process Table]

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

### Process for UpdateEMployeeinPerformance Process Table (87 cols)
[Inherits all 93 columns from Table: Process for CreateWeeklyEmployee Process Table]
+ Modified/Added Columns:
  - UpdatePerformance: Ref

### UpdatePerformance Output (86 cols)
[Inherits all 93 columns from Table: Process for CreateWeeklyEmployee Process Table]

### Process for UpdateHealthBenefitEnrollment Process Table (62 cols)
[Inherits all 63 columns from Table: Process for AddEmployeeandCreateTasks Process Table]

### New step Output 9 (61 cols)
[Inherits all 63 columns from Table: Process for AddEmployeeandCreateTasks Process Table]

### Process for PRCSentCreateTasksforDispatch Process Table (63 cols)
[Inherits all 63 columns from Table: Process for AddEmployeeandCreateTasks Process Table]
+ Modified/Added Columns:
  - CreateTaskforDispatch: Ref
  - AddTransporterID: Ref

### CreateTaskforDispatch Output (61 cols)
[Inherits all 63 columns from Table: Process for AddEmployeeandCreateTasks Process Table]

### AddTransporterID Output (61 cols)
[Inherits all 63 columns from Table: Process for AddEmployeeandCreateTasks Process Table]

### Process for WhenADPDataisimported Process Table (20 cols)
[Inherits all 18 columns from Table: ADP]
+ Modified/Added Columns:
  - Instance Id: Text
  - DeletePayCal: Ref
  - AddRowsToPayCal: Ref

### DeletePayCal Output (18 cols)
[Inherits all 20 columns from Table: Process for WhenADPDataisimported Process Table]

### AddRowsToPayCal Output (18 cols)
[Inherits all 20 columns from Table: Process for WhenADPDataisimported Process Table]

### Process for DeleteReports Process Table (92 cols)
[Inherits all 93 columns from Table: Process for CreateWeeklyEmployee Process Table]
+ Modified/Added Columns:
  - DeleteADPData: Ref
  - DeleteTenured: Ref
  - DeleteCDF: Ref
  - DeletePOD: Ref
  - DeleteScorecard: Ref
  - DeletePaycal: Ref

### DeleteADPData Output (86 cols)
[Inherits all 93 columns from Table: Process for CreateWeeklyEmployee Process Table]

### DeleteTenured Output (86 cols)
[Inherits all 93 columns from Table: Process for CreateWeeklyEmployee Process Table]

### DeleteCDF Output (86 cols)
[Inherits all 93 columns from Table: Process for CreateWeeklyEmployee Process Table]

### DeletePOD Output (86 cols)
[Inherits all 93 columns from Table: Process for CreateWeeklyEmployee Process Table]

### DeleteScorecard Output (86 cols)
[Inherits all 93 columns from Table: Process for CreateWeeklyEmployee Process Table]

### DeletePaycal Output 2 (86 cols)
[Inherits all 93 columns from Table: Process for CreateWeeklyEmployee Process Table]

### Process for WhenPODIsimportedAddtoPerformance Process Table (18 cols)
[Inherits all 17 columns from Table: POD]
+ Modified/Added Columns:
  - Instance Id: Text
  - AddRowsPerformance: Ref

### AddRowsPerformance Output 2 (17 cols)
[Inherits all 18 columns from Table: Process for WhenPODIsimportedAddtoPerformance Process Table]

### Process for WhenPODIsimportedAddtoPerformance 2 Process Table (25 cols)
[Inherits all 24 columns from Table: CDF]
+ Modified/Added Columns:
  - Instance Id: Text
  - New step: Ref

### New step Output 10 (24 cols)
[Inherits all 25 columns from Table: Process for WhenPODIsimportedAddtoPerformance 2 Process Table]

### Process for UpdatePayCal Process Table (20 cols)
[Inherits all 19 columns from Table: Hours]
+ Modified/Added Columns:
  - Instance Id: Text
  - New step: Ref

### New step Output 11 (19 cols)
[Inherits all 20 columns from Table: Process for UpdatePayCal Process Table]

### Process for New Bot 5 - 1 Process Table (18 cols)
[Inherits all 17 columns from Table: Tenured]
+ Modified/Added Columns:
  - Instance Id: Text
  - New step: Ref

### New step Output 12 (17 cols)
[Inherits all 18 columns from Table: Process for New Bot 5 - 1 Process Table]

### Process for CreateWeeklyEmployee Process Table (93 cols)
[Inherits all 92 columns from Table: Process for DeleteReports Process Table]
+ Modified/Added Columns:
  - DeleteWeeklyEmployee: Ref
  - Delete unwanted Weekly Employee Entry: Ref
  - Check if employee is scheduled: Ref
  - CreateThisWeek: Ref
  - CreateThisWeekPlusOne: Ref
  - CreateThisWeekPlusTwo: Ref
  - CreateThisWeekPlusThree: Ref

### DeleteWeeklyEmployee Output (86 cols)
[Inherits all 93 columns from Table: Process for CreateWeeklyEmployee Process Table]

### Delete unwanted Weekly Employee Entry Output (86 cols)
[Inherits all 93 columns from Table: Process for CreateWeeklyEmployee Process Table]

### Check if employee is scheduled Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### CreateThisWeek Output (86 cols)
[Inherits all 93 columns from Table: Process for CreateWeeklyEmployee Process Table]

### CreateThisWeekPlusOne Output (86 cols)
[Inherits all 93 columns from Table: Process for CreateWeeklyEmployee Process Table]

### CreateThisWeekPlusTwo Output (86 cols)
[Inherits all 93 columns from Table: Process for CreateWeeklyEmployee Process Table]

### CreateThisWeekPlusThree Output (86 cols)
[Inherits all 93 columns from Table: Process for CreateWeeklyEmployee Process Table]

### Process for ScorecardPDF Process Table (57 cols)
[Inherits all 57 columns from Table: Performance]
+ Modified/Added Columns:
  - Instance Id: Text

### Process for AllScorecard Process Table (31 cols)
[Inherits all 31 columns from Table: Week]
+ Modified/Added Columns:
  - Instance Id: Text

### Process for UpdateHoursCurrentPayroll Process Table (89 cols)
[Inherits all 93 columns from Table: Process for CreateWeeklyEmployee Process Table]
+ Modified/Added Columns:
  - Update Employee Write Up count: Ref
  - DeleteCurrentHours: Ref
  - CreateCurrentHours: Ref

### Update Employee Write Up count Output (86 cols)
[Inherits all 93 columns from Table: Process for CreateWeeklyEmployee Process Table]

### DeleteCurrentHours Output 2 (86 cols)
[Inherits all 93 columns from Table: Process for CreateWeeklyEmployee Process Table]

### CreateCurrentHours Output (86 cols)
[Inherits all 93 columns from Table: Process for CreateWeeklyEmployee Process Table]

### Process for WHC_Calculation Process Table (82 cols)
[Inherits all 78 columns from Table: Process for DailyAttendanceWriteUps Process Table]
+ Modified/Added Columns:
  - [Attendance]="Present": Ref
  - Check if ID is there in WHC already or Not: Ref
  - Action for Update the WHC: Ref
  - Add this to WHC Action - 1: Ref
  - update roster entry: Ref
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

### Action for Update the WHC Output (76 cols)
[Inherits all 82 columns from Table: Process for WHC_Calculation Process Table]

### Add this to WHC Action - 1 Output (76 cols)
[Inherits all 82 columns from Table: Process for WHC_Calculation Process Table]

### update roster entry Output (76 cols)
[Inherits all 82 columns from Table: Process for WHC_Calculation Process Table]

### Delete the WHC if not Present Output (76 cols)
[Inherits all 82 columns from Table: Process for WHC_Calculation Process Table]

### Process for Scheduled_Updates_WHC Process Table (24 cols)
[Inherits all 23 columns from Table: WHC]
+ Modified/Added Columns:
  - Instance Id: Text
  - not needed rows: Ref

### not needed rows Output (23 cols)
[Inherits all 24 columns from Table: Process for Scheduled_Updates_WHC Process Table]

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
  - if status is changed to Emailed: Ref

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

### if status is changed to Emailed Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Process for HourlyWHCUpdate Process Table (77 cols)
[Inherits all 82 columns from Table: Process for WHC_Calculation Process Table]
+ Modified/Added Columns:
  - WHC Update: Ref

### WHC Update Output (1 cols)
```
  Instance Id: Text
```

### Process for IncidentReportingBot Process Table (43 cols)
[Inherits all 38 columns from Table: IncidentForm]
+ Modified/Added Columns:
  - Instance Id: Text
  - Vehicle Claim: Ref
  - Create Vehicle Claim: Ref
  - Employee Claim: Ref
  - Create Injury Claim: Ref
  - Update the Incident: Ref

### Vehicle Claim Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Create Vehicle Claim Output (38 cols)
[Inherits all 38 columns from Table: IncidentForm]
+ Modified/Added Columns:
  - Instance Id: Text

### Employee Claim Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Create Injury Claim Output (38 cols)
[Inherits all 38 columns from Table: IncidentForm]
+ Modified/Added Columns:
  - Instance Id: Text

### Update the Incident Output (38 cols)
[Inherits all 38 columns from Table: IncidentForm]
+ Modified/Added Columns:
  - Instance Id: Text

### Process for IncidentCreatedUpdated Process Table (93 cols)
[Inherits all 90 columns from Table: Incident]
+ Modified/Added Columns:
  - Instance Id: Text
  - Vehicle Report: Ref
  - Worker compensation: Ref
  - any check to generate incident overview: Ref

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

### Process for TriggerForIncidentForm Process Table (14 cols)
[Inherits all 13 columns from Table: AppTriggers]
+ Modified/Added Columns:
  - Instance Id: Text
  - Update LastEditOn in Incident forms where incidentID is blank: Ref

### Update LastEditOn in Incident forms where incidentID is blank Output (13 cols)
[Inherits all 14 columns from Table: Process for TriggerForIncidentForm Process Table]

### Process for DailyAttendanceWriteUps Process Table (78 cols)
[Inherits all 82 columns from Table: Process for WHC_Calculation Process Table]
+ Modified/Added Columns:
  - Check if the Attendnace Writeup is already created: Ref
  - Create WriteUp for attendance: Ref

### Check if the Attendnace Writeup is already created Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Create WriteUp for attendance Output (76 cols)
[Inherits all 82 columns from Table: Process for WHC_Calculation Process Table]

### Process for TriggerHourlyActions - 1 Process Table (17 cols)
[Inherits all 14 columns from Table: Process for TriggerForIncidentForm Process Table]
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

### Update Hourly hours rows Output (13 cols)
[Inherits all 14 columns from Table: Process for TriggerForIncidentForm Process Table]

### Some Condition for WHC Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Delete old whc Output (13 cols)
[Inherits all 14 columns from Table: Process for TriggerForIncidentForm Process Table]

### Process for TriggerDailyActions - 1 Process Table (28 cols)
[Inherits all 14 columns from Table: Process for TriggerForIncidentForm Process Table]
+ Modified/Added Columns:
  - any condition check: Ref
  - create all the repairs for today: Ref
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
  - Add a new Planning Row: Ref
  - any conditions to be checked: Ref
  - Update all fleet: Ref

### any condition check Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### create all the repairs for today Output (13 cols)
[Inherits all 14 columns from Table: Process for TriggerForIncidentForm Process Table]

### Create Missing Efficiency row if any Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Create Efficiency Row missing for past 14 days Output (13 cols)
[Inherits all 14 columns from Table: Process for TriggerForIncidentForm Process Table]

### Check any condition if required Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Trigger Efficiency Update for SecondLast Week Output (13 cols)
[Inherits all 14 columns from Table: Process for TriggerForIncidentForm Process Table]

### Trigger Efficiency Update for Last Week Output (13 cols)
[Inherits all 14 columns from Table: Process for TriggerForIncidentForm Process Table]

### Trigger Efficiency Update for This Week Output (13 cols)
[Inherits all 14 columns from Table: Process for TriggerForIncidentForm Process Table]

### Check any condition if required 2 Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Create Trigger for updating Last week whc Output (13 cols)
[Inherits all 14 columns from Table: Process for TriggerForIncidentForm Process Table]

### Create Trigger for updating this week WHC Output (13 cols)
[Inherits all 14 columns from Table: Process for TriggerForIncidentForm Process Table]

### Check if there is planning for 7th day Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Add a new Planning Row Output (13 cols)
[Inherits all 14 columns from Table: Process for TriggerForIncidentForm Process Table]

### any conditions to be checked Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Update all fleet Output (13 cols)
[Inherits all 14 columns from Table: Process for TriggerForIncidentForm Process Table]

### Process for TriggerCalledFromTheApp Process Table (47 cols)
[Inherits all 14 columns from Table: Process for TriggerForIncidentForm Process Table]
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
  - Delete WeeklyEmployee Entry for the past weeks: Ref
  - Delete Unwanted WeeklyEmployee Entry for this week: Ref
  - Set WeekYearID for all scheduled employee in this week: Ref
  - Create WeeklyEmployee for this week: Ref
  - App Trigger for Email Notice for Absent AE_AbsentNotice: Ref
  - update status to Email Sent: Ref
  - Trigger is to clear the PayCal table: Ref
  - Delete all PayCal Rows: Ref
  - Trigger is called to Recalculate PayCal: Ref
  - Delete the PaycalRows in based on ADP: Ref
  - Create PayCal for all rows in ADP: Ref
  - Trigger is called to Process DA Daily Import PayCal: Ref
  - Run Script - Update Everyday from DA Daily: Ref
  - Trigger is called to Process ADP Daily: Ref
  - Run script - ADP Import Daily: Ref
  - Trigger is called to Process Daily API Report: Ref
  - RunDailyAPIReport Script: Ref
  - Trigger is called to process Routes Daily Report: Ref
  - Run script to import Routes Daily: Ref

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

### Delete All WHC Rows for that week Output (13 cols)
[Inherits all 14 columns from Table: Process for TriggerForIncidentForm Process Table]

### Recreate All WHC Rows for the Week Day1 Output (13 cols)
[Inherits all 14 columns from Table: Process for TriggerForIncidentForm Process Table]

### Recreate All WHC Rows for the Week Day2 Output (13 cols)
[Inherits all 14 columns from Table: Process for TriggerForIncidentForm Process Table]

### Recreate All WHC Rows for the Week Day3 Output (13 cols)
[Inherits all 14 columns from Table: Process for TriggerForIncidentForm Process Table]

### Recreate All WHC rows for the Week Day4 Output (13 cols)
[Inherits all 14 columns from Table: Process for TriggerForIncidentForm Process Table]

### Recreate All WHC rows for the Week Day5 Output (13 cols)
[Inherits all 14 columns from Table: Process for TriggerForIncidentForm Process Table]

### Recreate All WHC rows for the Week Day6 Output (13 cols)
[Inherits all 14 columns from Table: Process for TriggerForIncidentForm Process Table]

### Recreate All WHC rows for the Week Day7 Output (13 cols)
[Inherits all 14 columns from Table: Process for TriggerForIncidentForm Process Table]

### If The Trigger is AppTrigger for Recalculating Weekly Efficiency Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Update the Efficiency Rows for the Week Output (13 cols)
[Inherits all 14 columns from Table: Process for TriggerForIncidentForm Process Table]

### Check if the trigger is for Weekly Planning Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Add Planning for the selected week Day1 Output (13 cols)
[Inherits all 14 columns from Table: Process for TriggerForIncidentForm Process Table]

### AppTrigger for Updating weekly Employee Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Delete WeeklyEmployee Entry for the past weeks Output (13 cols)
[Inherits all 14 columns from Table: Process for TriggerForIncidentForm Process Table]

### Delete Unwanted WeeklyEmployee Entry for this week Output (13 cols)
[Inherits all 14 columns from Table: Process for TriggerForIncidentForm Process Table]

### Set WeekYearID for all scheduled employee in this week Output (13 cols)
[Inherits all 14 columns from Table: Process for TriggerForIncidentForm Process Table]

### Create WeeklyEmployee for this week Output (13 cols)
[Inherits all 14 columns from Table: Process for TriggerForIncidentForm Process Table]

### App Trigger for Email Notice for Absent AE_AbsentNotice Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### update status to Email Sent Output (13 cols)
[Inherits all 14 columns from Table: Process for TriggerForIncidentForm Process Table]

### Trigger is to clear the PayCal table Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Delete all PayCal Rows Output (13 cols)
[Inherits all 14 columns from Table: Process for TriggerForIncidentForm Process Table]

### Trigger is called to Recalculate PayCal Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Delete the PaycalRows in based on ADP Output (13 cols)
[Inherits all 14 columns from Table: Process for TriggerForIncidentForm Process Table]

### Create PayCal for all rows in ADP Output (13 cols)
[Inherits all 14 columns from Table: Process for TriggerForIncidentForm Process Table]

### Trigger is called to Process DA Daily Import PayCal Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Run Script - Update Everyday from DA Daily Output (1 cols)
```
  Instance Id: Text
```

### Trigger is called to Process ADP Daily Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Run script - ADP Import Daily Output (1 cols)
```
  Instance Id: Text
```

### Trigger is called to Process Daily API Report Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### RunDailyAPIReport Script Output (1 cols)
```
  Instance Id: Text
```

### Trigger is called to process Routes Daily Report Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Run script to import Routes Daily Output (1 cols)
```
  Instance Id: Text
```

### Process for TriggerWeeklyActionsMon5am - 1 Process Table (16 cols)
[Inherits all 14 columns from Table: Process for TriggerForIncidentForm Process Table]
+ Modified/Added Columns:
  - check any condition: Ref
  - Create new Invoice row: Ref
  - Any Condition to be verified: Ref

### check any condition Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Create new Invoice row Output (13 cols)
[Inherits all 14 columns from Table: Process for TriggerForIncidentForm Process Table]

### Any Condition to be verified Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

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

### Process for SendAbsentEmail Process Table (78 cols)
[Inherits all 82 columns from Table: Process for WHC_Calculation Process Table]
+ Modified/Added Columns:
  - trigger is set: Ref
  - Call Send Email Trigger: Ref

### trigger is set Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Call Send Email Trigger Output (76 cols)
[Inherits all 82 columns from Table: Process for WHC_Calculation Process Table]

### Process for Separation Process Table (96 cols)
[Inherits all 78 columns from Table: Separation]
+ Modified/Added Columns:
  - Instance Id: Text
  - Create the PayCheck: Ref
  - Create the Change Notice: Ref
  - If reason is VR, NCNS, JA: Ref
  - If reason is TERM, LO: Ref
  - Create Email Preview: Ref
  - If Voluntary Resignation: Ref
  - If Voluntary Resignation Early Acceptance: Ref
  - If Job Abandonment: Ref
  - If No Call No Show: Ref
  - If LO, TERM: Ref
  - Send Email: Ref
  - If VR: Ref
  - IF VREA: Ref
  - If Sep_NCNS: Ref
  - If Sep_JA: Ref
  - If Sep_LO, Sep_TERM: Ref
  - Change Email Status to Sent: Ref
  - Employee Status terminated: Ref

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

### If reason is VR, NCNS, JA Output (2 cols)
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

### If LO, TERM Output (2 cols)
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

### If Sep_LO, Sep_TERM Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Change Email Status to Sent Output (78 cols)
[Inherits all 78 columns from Table: Separation]
+ Modified/Added Columns:
  - Instance Id: Text

### Employee Status terminated Output (78 cols)
[Inherits all 78 columns from Table: Separation]
+ Modified/Added Columns:
  - Instance Id: Text

### Process for TriggerDailyActions02am Process Table (20 cols)
[Inherits all 14 columns from Table: Process for TriggerForIncidentForm Process Table]
+ Modified/Added Columns:
  - any condition on UDP creation: Ref
  - Create Entry in UDP: Ref
  - WeeklyEmployee Creation: Ref
  - Launch Trigger for Current Week WeeklyEmployee: Ref
  - Launch Trigger for Next Week WeeklyEmployee: Ref
  - Launch Trigger for 3rd week WeeklyEmployee: Ref
  - Launch Trigger for 4th week WeeklyEmployee: Ref

### any condition on UDP creation Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Create Entry in UDP Output (13 cols)
[Inherits all 14 columns from Table: Process for TriggerForIncidentForm Process Table]

### WeeklyEmployee Creation Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Launch Trigger for Current Week WeeklyEmployee Output (13 cols)
[Inherits all 14 columns from Table: Process for TriggerForIncidentForm Process Table]

### Launch Trigger for Next Week WeeklyEmployee Output (13 cols)
[Inherits all 14 columns from Table: Process for TriggerForIncidentForm Process Table]

### Launch Trigger for 3rd week WeeklyEmployee Output (13 cols)
[Inherits all 14 columns from Table: Process for TriggerForIncidentForm Process Table]

### Launch Trigger for 4th week WeeklyEmployee Output (13 cols)
[Inherits all 14 columns from Table: Process for TriggerForIncidentForm Process Table]

### Process for DocumentRenaming Process Table (23 cols)
[Inherits all 18 columns from Table: EmployeeDocs]
+ Modified/Added Columns:
  - Instance Id: Text
  - any condition to be checked: Ref
  - MoveAndRenameFile: Ref
  - Update File URL: Ref
  - Update Employee: Ref
  - Completed Employee I9Status: Ref

### any condition to be checked Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### MoveAndRenameFile Output (4 cols)
```
  Instance Id: Text
  fileURL: Url
  fileName: Text
  fileThumbnail: Thumbnail
```

### Update File URL Output (18 cols)
[Inherits all 18 columns from Table: EmployeeDocs]
+ Modified/Added Columns:
  - Instance Id: Text

### Update Employee Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Completed Employee I9Status Output (18 cols)
[Inherits all 18 columns from Table: EmployeeDocs]
+ Modified/Added Columns:
  - Instance Id: Text

### Process for WSTVerification - 1 Process Table (23 cols)
[Inherits all 21 columns from Table: WSTServiceDetails]
+ Modified/Added Columns:
  - Instance Id: Text
  - test verification any: Ref
  - add to WST Verificaiton: Ref

### test verification any Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### add to WST Verificaiton Output (21 cols)
[Inherits all 23 columns from Table: Process for WSTVerification - 1 Process Table]

## Slices
- **ScheduledEmployee** (Employee): `=or([EmployeeStatus]="Scheduled", [EmployeeStatus]="Training")`
- **CurrentTo3WeekSlice** (Week): `=AND([EndDate]>=today(),[StartDate]`
- **NewCandidate** (Candidate): `=or(AND([Date] >= NOW()-7,[Decision]<>"Not Interested",[Decision]<>"Selected",[Decision]<>"Never Responded",[Decision]<>"Rejected"),[Interview Date]>today())`
- **CurrentOnboarding** (Onboarding): `=AND([OnboardingStatus] <> "Training Scheduled", [OnboardingStatus] <> "Background Failed",[OnboardingStatus] <> "Drug Test Failed", [OnboardingStatus]<>"Not Moving Forward", [OnboardingStatus]<>"No Response",[OnboardingStatus]<>"Declined to Join"
,[Position]<>"DOT Driver")`
- **NewHire** (Onboarding): `=AND([NewHireStatus]<>"All Completed",[NewHireStatus]<>"Declined to Join",isnotblank([TrainingDate]))`
- **CurrentEmployees** (Employee): `=not(in([EmployeeStatus],{"Terminated","Zip"}))`
- **RosterPlanning** (Planning): `=[Date]=INDEX(select(Roster[Date],[Date]>=today()),1)`
- **Safety** (Everyday): ``
- **Today** (Everyday): `=AND([Date]=today(),[Attendance]="Present")`
- **Loadout** (Everyday): `[Date] = TODAY()`
- **TodayClosing** (Everyday): `=AND([Date]=today(),[Attendance]="Present",isblank([Clockout]))`
- **PlanningDetail** (Planning): `=[Date]>=today()`
- **TodayInterview** (Candidate): `=Date([Interview Date]) = today()`
- **WeeklyEfficiency** (Week): `=AND([StartDate]<=today(),[StartDate]>today()-72)`
- **Absent** (Everyday): `=or([Attendance] = "Absent",[Attendance] = "Employee Canceled",[Late]="Yes")`
- **Training** (Everyday): `=OR([Type]="Training",[Type]="CDV Training")`
- **Attendance** (Everyday): `=AND([Attendance]="Present",[EmployeeID].[JobType]<>"Salaried")`
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
- **EfficiencyToday** (Efficiency): `=[Date]<=today()`
- **PayrollBiweekly** (Hours): `=[Payroll]=INDEX(select(Week[Payroll],AND([EndDate]>=today()-7,[StartDate]<=today()-7)),1)`
- **SafetyViolations** (Performance): ``
- **PhotoQuality** (Performance): ``
- **CustomerFeedback** (Performance): ``
- **DAEfficiency** (Performance): ``
- **Ranking** (Performance): ``
- **EmployeeRanking** (Employee): `=[EmployeeStatus]="Scheduled"`
- **EfficiencyFor7days** (Efficiency): `=AND([Date]>today()-8, [Date]`
- **ScheduledEmployees** (Performance): `=IN([TransporterID],Select(Employee[TransporterID],AND([EmployeeStatus]<>"Terminated",[EmployeeStatus]<>"Start Termination")))`
- **Route** (Everyday): ``
- **Login** (Employee): `=[EmployeeStatus]="Scheduled"`
- **WorkingToday** (Employee): `=IN([EmployeeID],select(Everyday[EmployeeID],AND([Attendance]="Present",[Date]=today())))`
- **PrintScorecard** (Week): `=AND([StartDate]<=today(),[StartDate]>today()-50)`
- **CreatedPrintedReview** (DAReview): `=in([Status],{"Created","Printed"})`
- **AdminView** (AppViews): `=[Type]="Admin"`
- **PayrollView** (AppViews): `=And([Type]="Payroll",in(Any(Me[Role]),[AllowRoles]))`
- **DispatchView** (AppViews): `=And([Type]="Dispatch",in(Any(Me[Role]),[AllowRoles]))`
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
 not(in([Status],{"Returned"})),
 in([Group],{"OWNED","Amazon Branded"})
)`
- **OpenRepairs** (Repairs): `[Status] <> "Closed"`
- **FleetView** (AppViews): `=And([Type]="Fleet",in(Any(Me[Role]),[AllowRoles]))`
- **CurrentOnboardingDOT** (Onboarding): `=AND([OnboardingStatus] <> "Training Scheduled", [OnboardingStatus] <> "Background Failed",[OnboardingStatus] <> "Drug Test Failed", [OnboardingStatus]<>"Not Moving Forward", [OnboardingStatus]<>"No Response",[OnboardingStatus]<>"Declined to Join"
,[Position]="DOT Driver")`
- **PendingSeparation** (Separation): `=[SeparationStatus]<>"All Completed"`
- **PickUp** (Separation): `=OR([ManualCheck]="2. Check Printed"
,[ManualCheck]="1. Ready to Print")`
- **RecruitmentView** (AppViews): `=And([Type]="Recruitment",in(Any(Me[Role]),[AllowRoles]))`
- **ActiveFleet** (Fleet): `=AND([Status] <> "Excluded",[Status] <> "Returned")`
- **VisibleWeeklyEmployee** (WeeklyEmployee): `=in([WeekID],CurrentTo3WeekSlice[WeekYearID])`
- **OpenRepairsInsp** (Repairs): `[Status] <> "Closed"`
- **Pending_EmployeeDocs** (EmployeeDocs): `=OR(in([Status],{"Pending","Expired"}),IN([Employee],CurrentEmployees[EmployeeID]))`
- **PendingEmployeeDocs** (Employee): `=AND(
  in([EmployeeID],CurrentEmployees[EmployeeID]),
  in([I9Status],{"Need Verification","Expired","Expiring"})
)`
- **Current_EmployeeDocs** (Employee): `=AND(
  in([EmployeeID],CurrentEmployees[EmployeeID]),
  1=1
)`
- **WeeklyMapping** (Week): `=IN([Year],{2024,2025,2026})`
- **PendingEdits** (Everyday): `=AND([Attendance]="Present",[EmployeeID].[JobType]<>"Salaried",
    [ADPEditRequired] = "Need Edit",
  IN([WeekYearID], CurrentTo3WeekPast[WeekYearID])
)`
- **PendingReviews** (Everyday): `=AND([Attendance]="Present",[EmployeeID].[JobType]<>"Salaried",
  [ADPEditRequired] <> "HR Reviewed",
    IN([WeekYearID], CurrentTo3WeekPast[WeekYearID])
)`
- **CurrentTo3WeekPast** (Week): `=AND(
  [EndDate] >= TODAY() - 19,
  [StartDate] <= TODAY()
)`

## Views
### Custom Views
- **Dashboard**: dashboard → ? pos=center
- **Tasks**: dashboard → ? pos=left
- **TasksManager**: dashboard → ? pos=right
- **RecruitmentView**: gallery → ? pos=menu
- **Dispatch**: gallery → ? pos=menu
- **Employee**: card → ? pos=menu
- **Fleet**: gallery → ? pos=menu
- **Everyday**: dashboard → ? pos=menu
- **Payroll**: gallery → ? pos=menu
- **Management**: gallery → ? pos=menu
- **ClaimsView**: card → ? pos=menu
- **AdminView**: card → ? pos=menu
- **Settings**: form → ? pos=menu
- **Absent**: table → ? pos=ref
- **Actions**: detail → ? pos=ref
- **ActiveFleet**: table → ? pos=ref
- **ADP**: table → ? pos=ref
- **ADPReport**: table → ? pos=ref
- **Ads**: dashboard → ? pos=ref
- **AllEmployee**: card → ? pos=ref
- **AllIncidents**: table → ? pos=ref
- **AllNotices**: table → ? pos=ref
- **AllPickUps**: dashboard → ? pos=ref
- **AllRepairs**: table → ? pos=ref
- **AllSeparation**: table → ? pos=ref
- **AppSettings**: table → ? pos=ref
- **AppVariables**: table → ? pos=ref
- **AppViews**: table → ? pos=ref
- **Archive**: dashboard → ? pos=ref
- **Candidate**: table → ? pos=ref
- **Candidate_Inline**: table → ? pos=ref
- **CandidateAll**: table → ? pos=ref
- **CandidateReview**: dashboard → ? pos=ref
- **CDF**: table → ? pos=ref
- **CDFDisputes**: table → ? pos=ref
- **CDFDisputes_Inline**: deck → ? pos=ref
- **ClaimsIncurred**: table → ? pos=ref
- **Closing**: card → ? pos=ref
- **ContactAssignment_Inline**: table → ? pos=ref
- **Contacts**: table → ? pos=ref
- **CustomerFeedback**: detail → ? pos=ref
- **DADaily**: table → ? pos=ref
- **DailyAPIReport**: table → ? pos=ref
- **DailyEfficiency**: table → ? pos=ref
- **DailyReport**: dashboard → ? pos=ref
- **DailyRoutesView**: table → ? pos=ref
- **DAPerformance**: dashboard → ? pos=ref
- **DAPerformanceReview**: table → ? pos=ref
- **DAReview_Inline**: deck → ? pos=ref
- **DeliveryQuality**: detail → ? pos=ref
- **EditPickUp**: form → ? pos=ref
- **Efficiency**: dashboard → ? pos=ref
- **Efficiency_Inline**: table → ? pos=ref
- **EfficiencyPreview**: card → ? pos=ref
- **Employee_Inline**: table → ? pos=ref
- **EmployeeDocs_Inline**: card → ? pos=ref
- **EmployeeDocsForm**: form → ? pos=ref
- **EmployeeDocuments**: table → ? pos=ref
- **Everyday_Inline**: table → ? pos=ref
- **EverydaySafety**: table → ? pos=ref
- **ExpiryTrackerForm**: form → ? pos=ref
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
- **I9-Document**: table → ? pos=ref
- **i9Tracking_Inline**: table → ? pos=ref
- **I9Verification**: table → ? pos=ref
- **Incident**: dashboard → ? pos=ref
- **Incident_Inline**: table → ? pos=ref
- **IncidentDocuments_Inline**: table → ? pos=ref
- **IncidentNotes_Inline**: card → ? pos=ref
- **Incidents**: table → ? pos=ref
- **Injury_Inline**: table → ? pos=ref
- **Inspection**: card → ? pos=ref
- **Inspection_Inline**: deck → ? pos=ref
- **Insurance**: dashboard → ? pos=ref
- **Inventory**: table → ? pos=ref
- **Invoices**: table → ? pos=ref
- **Loadout**: dashboard → ? pos=ref
- **LoadoutDetail**: table → ? pos=ref
- **LoadoutSummary**: detail → ? pos=ref
- **Login**: table → ? pos=ref
- **Mentor**: table → ? pos=ref
- **MyProfile**: card → ? pos=ref
- **MyTasks**: deck → ? pos=ref
- **MyTeam**: card → ? pos=ref
- **New View**: card → ? pos=ref
- **NewHire**: table → ? pos=ref
- **NewProcess**: table → ? pos=ref
- **Notes_Inline**: table → ? pos=ref
- **Onboarding**: table → ? pos=ref
- **OnboardingAll**: table → ? pos=ref
- **OnboardingDashboard**: dashboard → ? pos=ref
- **OnboardingDOTDriver**: table → ? pos=ref
- **OpenAuto**: table → ? pos=ref
- **Opening**: table → ? pos=ref
- **OpenNotices**: table → ? pos=ref
- **OpenOtherClaims**: table → ? pos=ref
- **OpenPropeertyClaims**: table → ? pos=ref
- **Overview**: detail → ? pos=ref
- **Paycal**: table → ? pos=ref
- **PayCal_Inline**: table → ? pos=ref
- **PayCheck**: table → ? pos=ref
- **PayrollBiweekly**: table → ? pos=ref
- **PayrollDashboard**: dashboard → ? pos=ref
- **PendingEdits**: table → ? pos=ref
- **Performance_Inline**: table → ? pos=ref
- **PhotoQuality**: detail → ? pos=ref
- **PickUp**: table → ? pos=ref
- **Planning_Inline**: table → ? pos=ref
- **PlanningDetail**: table → ? pos=ref
- **POD**: table → ? pos=ref
- **Policy**: table → ? pos=ref
- **PostingAds**: table → ? pos=ref
- **Premium**: table → ? pos=ref
- **Premium_Inline**: table → ? pos=ref
- **Punch Ins**: table → ? pos=ref
- **PunchInsForEveryday**: table → ? pos=ref
- **PunchInsPendingReview**: table → ? pos=ref
- **Ranking**: table → ? pos=ref
- **Recruitment**: dashboard → ? pos=ref
- **RecruitmentSummary**: detail → ? pos=ref
- **Rentals**: table → ? pos=ref
- **Rentals_Inline**: table → ? pos=ref
- **Repairs**: table → ? pos=ref
- **Repairs_Inline**: table → ? pos=ref
- **RepairsDispatch**: table → ? pos=ref
- **RepairsInInspection**: deck → ? pos=ref
- **Review**: table → ? pos=ref
- **Roster**: dashboard → ? pos=ref
- **Roster_Inline**: table → ? pos=ref
- **RosterAssignment**: table → ? pos=ref
- **RosterPlanning**: detail → ? pos=ref
- **Route**: table → ? pos=ref
- **Schedule**: dashboard → ? pos=ref
- **Schedule_Inline**: table → ? pos=ref
- **ScheduleExpandView**: card → ? pos=ref
- **ScheduleLarge**: dashboard → ? pos=ref
- **SchedulePlanningDetail**: card → ? pos=ref
- **Scorecard**: table → ? pos=ref
- **ScorecardImport**: table → ? pos=ref
- **Separation**: table → ? pos=ref
- **Separation_Inline**: table → ? pos=ref
- **Setup**: table → ? pos=ref
- **Tasks_Inline**: table → ? pos=ref
- **TasksAssignedByMe**: deck → ? pos=ref
- **Tenured**: table → ? pos=ref
- **TodayInterview**: table → ? pos=ref
- **Training**: table → ? pos=ref
- **Treatment_Inline**: table → ? pos=ref
- **Uniform**: table → ? pos=ref
- **Uniform_Inline**: table → ? pos=ref
- **UPD**: table → ? pos=ref
- **UPD_Inline**: table → ? pos=ref
- **UploadPerformance**: dashboard → ? pos=ref
- **Users**: table → ? pos=ref
- **Users_Inline**: deck → ? pos=ref
- **UserTasks**: deck → ? pos=ref
- **Volume**: table → ? pos=ref
- **Week**: card → ? pos=ref
- **Week_Inline**: table → ? pos=ref
- **WeeklyEfficiency**: table → ? pos=ref
- **WeeklyEmployee_Inline**: table → ? pos=ref
- **WeeklyPerformance**: card → ? pos=ref
- **WeeklySafety**: detail → ? pos=ref
- **WeeklySchedule**: table → ? pos=ref
- **WHC**: table → ? pos=ref
- **WHC_Inline**: table → ? pos=ref
- **WorkDetails**: table → ? pos=ref
- **Workers Compensation**: table → ? pos=ref
- **WorkHistory_Inline**: table → ? pos=ref
- **WorkSummaryToolView**: dashboard → ? pos=ref
- **Write Ups**: table → ? pos=ref
- **WSTDeliveredPackagesView**: table → ? pos=ref
- **WSTServiceDetailsView**: table → ? pos=ref
- **WSTVerification_Inline**: table → ? pos=ref
- **WSTVerificationView**: table → ? pos=ref
- **WSTWeeklyReportView**: table → ? pos=ref
### Auto-generated (188)
  ActionsCalling_Detail, ActionsCalling_Form, AdminView_Detail, AdminView_Form, ADP_Detail, ADP_Form, ADPReport_Detail, ADPReport_Form, Ads_Detail, Ads_Form, AppSettings_Detail, AppSettings_Form, AppTriggers_Detail, AppTriggers_Form, AppVariables_Detail, AppVariables_Form, AppViews_Detail, AppViews_Form, AssignedByMe_Detail, AssignedByMe_Form, AssignedToMe_Detail, AssignedToMe_Form, Candidate_Detail, Candidate_Form, CDF_Detail, CDF_Form, CDFDisputes_Detail, CDFDisputes_Form, ClaimsView_Detail, ClosingToday_Detail, ClosingToday_Form, Contact_Detail, Contact_Form, ContactAssignment_Detail, ContactAssignment_Form, Criterion_Detail, CurrentEmployees_Detail, CurrentEmployees_Form, DA_Review_Detail, DA_Review_Form, DADaily_Detail, DADaily_Form, DAEfficiency_Detail, DAEfficiency_Form, DailyAPIReport_Detail, DailyAPIReport_Form, DAReviewMetric_Detail, DAReviewMetric_Form, DeliveryQuality_Detail, DeliveryQuality_Form, DispatchView_Detail, DispatchView_Form, Efficiency_Detail, Efficiency_Form, EfficiencyFor7days_Detail, EfficiencyFor7days_Form, Employee_Detail, Employee_Form, EmployeeDocs_Detail, EmployeeDocs_Form, Everyday_Detail, Everyday_Form, ExtraMiles_Detail, ExtraMiles_Form, Fleet_Detail, Fleet_Form, FleetAssignment_Detail, FleetAssignment_Form, FleetDocs_Detail, FleetDocs_Form, FleetView_Detail, FleetView_Form, Followup_Detail, Followup_Form, Hours_Detail, Hours_Form, i9Tracking_Detail, i9Tracking_Form, Incident_Detail, Incident_Form, IncidentDocuments_Detail, IncidentDocuments_Form, IncidentForm_Detail, IncidentForm_Form, IncidentNotes_Detail, IncidentNotes_Form, Injury_Detail, Injury_Form, Inspection_Detail, Inspection_Form, Inventory_Detail, Inventory_Form, Invoice_Detail, Invoice_Form, LoadoutSummary_Detail, LoadoutSummary_Form, ManagementView_Detail, ManagementView_Form, Me_Detail, Notes_Detail, Notes_Form, Notice_Detail, Notice_Form, Onboarding_Detail, Onboarding_Form, PayCal_Detail, PayCal_Form, PayCheck_Detail, PayCheck_Form, PayrollView_Detail, PayrollView_Form, PendingEdits_Detail, PendingEdits_Form, Performance_Detail, Performance_Form, PerformanceGuidelines_Detail, PhotoQuality_Detail, PhotoQuality_Form, Planning_Detail, Planning_Form, POD_Detail, POD_Form, Policy_Detail, Policy_Form, Premium_Detail, Premium_Form, RecruitmentView_Detail, RecruitmentView_Form, Rentals_Detail, Rentals_Form, Repairs_Detail, Repairs_Form, Review_Detail, Review_Form, Roster_Detail, Roster_Form, RosterSMS_Detail, RosterSMS_Form, RoutesDaily_Detail, RoutesDaily_Form, SafetyViolations_Detail, SafetyViolations_Form, Schedule_Detail, Schedule_Form, ScheduleSMS_Detail, ScheduleSMS_Form, Scorecard_Detail, Scorecard_Form, Separation_Detail, Separation_Form, Setup_Detail, Setup_Form, Summary_Detail, Summary_Form, Tasks_Detail, Tasks_Form, Tenured_Detail, Tenured_Form, Treatment_Detail, Treatment_Form, Uniform_Detail, Uniform_Form, UPD_Detail, UPD_Form, Users_Detail, Users_Form, Volume_Detail, Volume_Form, Week_Detail, Week_Form, WeeklyEfficiency_Detail, WeeklyEfficiency_Form, WeeklyEmployee_Detail, WeeklyEmployee_Form, WHC_Detail, WHC_Form, WorkHistory_Detail, WorkHistory_Form, WSTDeliveredPackages_Detail, WSTDeliveredPackages_Form, WSTServiceDetails_Detail, WSTServiceDetails_Form, WSTUnplannedDelays_Detail, WSTUnplannedDelays_Form, WSTVerification_Detail, WSTVerification_Form, WSTWeeklyReport_Detail, WSTWeeklyReport_Form

## Actions
### Candidate
  _Auto (230): ADD_RECORD, DELETE_RECORD, EDIT_RECORD, NAVIGATE_APP_
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
  - **FirstDayDocusign (→"Send New Hire Docusign")**: NAVIGATE_URL IF `=AND( OR(
    [NewHireStatus] = "Joined",
    [NewHireStatus] = "Joining Soon"
 `
  - **EditOnboarding (→"Edit")**: NAVIGATE_APP IF `true`
  - **EditEmployeeFromOnboarding (→"Employee Details")**: NAVIGATE_APP IF `=AND(
  [NewHireStatus]="Joined",
  CONTEXT("View")="NewHire"
)`

### Schedule
  _Auto (4): NAVIGATE_APP_
  - **Route**: SET_COLUMN_VALUE IF `true`
  - **Employee Canceled**: SET_COLUMN_VALUE IF `=true`
  - **Day OFF**: SET_COLUMN_VALUE IF `true`
  - **PTO**: SET_COLUMN_VALUE IF `true`
  - **CopyScheduleToRoster**: ADD_RECORD_TO IF `=count(FILTER("ROSTER", ([EmployeeID] = [_THISROW].[EmployeeID])))=0`
  - **Ride Along**: SET_COLUMN_VALUE IF `true`
  - **IfNoAssignScheduleinSchedule**: REF_ACTION IF `=AND(COUNT(FILTER("Schedule", AND([Status] = "Assign Schedule",[EmployeeID]=[_TH`
  - **Training**: SET_COLUMN_VALUE IF `true`
  - **Dispatch Canceled**: SET_COLUMN_VALUE IF `true`
  - **Action for AddNewRow**: ADD_RECORD_TO IF `true`
  - **Action for Update Existing Rows**: REF_ACTION IF `true`
  - **UpdateEverydayForNotAvailable**: ADD_RECORD_TO IF `true`
  - **Reduce Day**: SET_COLUMN_VALUE IF `true`
  - **EditShift**: SET_COLUMN_VALUE IF `true`

### Planning
  _Auto (1): NAVIGATE_APP_

### ActionsCalling
  - **DeleteCurrentWeekSchedules**: REF_ACTION IF `=WEEKDAY(TODAY())=1`
  - **DeleteCurrentRoster**: REF_ACTION IF `true`
  - **CopyScheduletoRoaster_1**: REF_ACTION IF `true`
  - **RoasterCreator (→"Create Roster")**: COMPOSITE
  - **FleetDuplicateRemover**: REF_ACTION IF `true`
  - **RemoveFleetID_Group (→"Remove Duplicates")**: REF_ACTION IF `true`
  - **New step Action - 2**: SET_COLUMN_VALUE IF `true`
  - **Create Roster (→""Create Rosters"")**: SET_COLUMN_VALUE IF `[Action Name] <> "Create Rosters"`

### FleetAssignment
  _Auto (1): NAVIGATE_APP_

### Roster
  _Auto (16): EDIT_RECORD, NAVIGATE_APP_
  - **AssignFleetToRoster**: SET_COLUMN_VALUE IF `=[FleetDuplicate]>0`
  - **RemoveFleetId_IfDuplicated**: SET_COLUMN_VALUE IF `true`
  - **UpdateEverydayForPresent**: ADD_RECORD_TO IF `=ISNOTBLANK([EmployeeID])`
  - **UpdateEverydayForAbsent (→"Absent")**: ADD_RECORD_TO IF `=ISNOTBLANK([EmployeeID])`
  - **Present_old**: COMPOSITE IF `=AND(isnotblank([EmployeeID]),OR([WorkType] <> "Standby",
count(SELECT(ROSTER[Em`
  - **Absent**: COMPOSITE IF `=isnotblank([EmployeeID])`
  - **UnassignFleet**: SET_COLUMN_VALUE IF `true`
  - **Re-AssignRoute**: REF_ACTION
  - **Re-Assign-Rosters (→"Assign to Standby")**: SET_COLUMN_VALUE IF `=or(ISNOTBLANK([_THISROW].[Next Standby]),isblank([EmployeeID]))`
  - **DeleteAndReassign**: COMPOSITE IF `true`
  - **Download**: EXPORT_VIEW
  - **Update_Roster**: SET_COLUMN_VALUE IF `true`
  - **Confirmed**: SET_COLUMN_VALUE

### Everyday
  _Auto (2): NAVIGATE_APP_
  - **RouteCompleted (→"Route Completed")**: SET_COLUMN_VALUE IF `=CONTEXT("View")<>"Route"`
  - **Action for DeleteExistingHours**: REF_ACTION IF `true`
  - **AddPayrollHours Action - 1**: ADD_RECORD_TO IF `true`
  - **DeleteExistingHours Action - 2**: REF_ACTION IF `true`
  - **DownloadEveryday (→"Download")**: EXPORT_VIEW
  - **Action for Update the WHC**: REF_ACTION IF `true`
  - **Delete the WHC if not Present Action - 1**: REF_ACTION IF `true`
  - **Add this to WHC Action - 1 Action - 1**: ADD_RECORD_TO IF `true`
  - **Action for update roster entry**: REF_ACTION IF `true`
  - **Late**: SET_COLUMN_VALUE
  - **Create WriteUp for attendance Action - 1**: ADD_RECORD_TO IF `true`
  - **AddEntryToWHC**: ADD_RECORD_TO IF `true`
  - **SendEmail_AbsentNotice (→"Send Email for Absent")**: SET_COLUMN_VALUE IF `=and(
 in(Context("view"),{"Absent","Late"}),
 not(in([AbsentAction],{"Added PTO`
  - **Call Send Email Trigger Action - 1**: ADD_RECORD_TO IF `true`
  - **UpdateAbsentAction**: SET_COLUMN_VALUE IF `true`
  - **EditEveryday (→"Edit")**: NAVIGATE_APP IF `true`
  - **AddEntryToUPD**: ADD_RECORD_TO IF `true`
  - **ViewEveryday (→"View")**: NAVIGATE_APP IF `true`
  - **Update_Everyday**: SET_COLUMN_VALUE IF `true`
  - **RouteCompletedinRoute (→"Route Completed")**: SET_COLUMN_VALUE IF `=CONTEXT("View")="Route"`
  - **PendingEdits**: SET_COLUMN_VALUE IF `true`
  - **PendingEdits_PunchIn**: SET_COLUMN_VALUE IF `=AND(
  CONTEXT("View") = "Everyday_Detail",
  NOT(CONTAINS([PendingEditsFor], "`
  - **PendingEdits_PunchOut**: SET_COLUMN_VALUE IF `=AND(
  CONTEXT("View") = "Everyday_Detail",
  NOT(CONTAINS([PendingEditsFor], "`
  - **PendingEdits_MealOut**: SET_COLUMN_VALUE IF `=AND(
  CONTEXT("View") = "Everyday_Detail",
  NOT(CONTAINS([PendingEditsFor], "`
  - **PendingEdits_MealIn**: SET_COLUMN_VALUE IF `=AND(
  CONTEXT("View") = "Everyday_Detail",
  NOT(CONTAINS([PendingEditsFor], "`

### Inspection
  _Auto (5): NAVIGATE_APP_
  - **AddRepairFromInspection**: ADD_RECORD_TO IF `true`

### Unknown
  - **Set [Termination Status] to Terminated Action - 1**: SET_COLUMN_VALUE IF `true`
  - **Set [Termination Status] to Terminated Action - 2**: SET_COLUMN_VALUE IF `true`
  - **DeleteExistingHours Action - 1**: SET_COLUMN_VALUE IF `true`

### Employee
  _Auto (11): NAVIGATE_APP_
  - **DeleteRelatedSchedule**: REF_ACTION IF `true`
  - **DeleteRelatedFleet**: REF_ACTION IF `true`
  - **DeleteRelatedRoster**: REF_ACTION IF `true`
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
  - **UpdateRoutesCompleted**: SET_COLUMN_VALUE IF `true`
  - **Action for DeleteWeeklyEmployee**: REF_ACTION IF `true`
  - **CreateThisWeek Action - 1**: ADD_RECORD_TO IF `true`
  - **CreateThisWeekPlusOne Action - 1**: ADD_RECORD_TO IF `true`
  - **CreateThisWeekPlusTwo Action - 1**: ADD_RECORD_TO IF `true`
  - **CreateThisWeekPlusThree Action - 1**: ADD_RECORD_TO IF `true`
  - **DeleteADPData Action - 1**: REF_ACTION IF `true`
  - **DeleteTenured Action - 1**: REF_ACTION IF `true`
  - **DeleteCDF Action - 1**: REF_ACTION IF `true`
  - **DeletePOD Action - 1**: REF_ACTION IF `true`
  - **DeleteScorecard Action - 1**: REF_ACTION IF `true`
  - **Retaining**: SET_COLUMN_VALUE IF `true`
  - **Action for DeleteCurrentHours 2**: REF_ACTION IF `true`
  - **CreateCurrentHours Action - 2**: ADD_RECORD_TO IF `true`
  - **DeletePaycal Action - 1**: REF_ACTION IF `true`
  - **Update Employee Write Up count Action - 1**: SET_COLUMN_VALUE IF `true`
  - **EmployeeLevel**: SET_COLUMN_VALUE IF `true`
  - **CreateWeeklyEmployeeEntry**: ADD_RECORD_TO IF `true`
  - **SetWeekYearIDwithInput**: SET_COLUMN_VALUE IF `true`
  - **create the Separation Entry for the Employee Action - 1**: ADD_RECORD_TO IF `true`
  - **InputValuesEmployee**: SET_COLUMN_VALUE IF `true`
  - **EditEmployeeDays (→"Employee Work Profile")**: SET_COLUMN_VALUE IF `true`
  - **Delete unwanted Weekly Employee Entry Action - 1**: REF_ACTION IF `true`
  - **EditEmployeeExpiry (→"Employee Documents")**: NAVIGATE_APP IF `=TRUE`
  - **EditEmployeeDocs (→"Employee Documents")**: NAVIGATE_APP IF `=TRUE`
  - **AddEmployeeDocs (→"Employee Documents")**: NAVIGATE_APP IF `=TRUE`
  - **Edit_I9Type**: SET_COLUMN_VALUE IF `=in(CONTEXT("View"),{"EmployeeDocuments","I9Verification"})`
  - **UpdateEmployee**: SET_COLUMN_VALUE IF `true`
  - **Input_FuzzyMatchNames**: SET_COLUMN_VALUE IF `true`

### Week
  _Auto (3): NAVIGATE_APP, OPEN_FILE_
  - **ScheduleCard (→"Switch View")**: NAVIGATE_APP IF `=context("view")="Schedule"`
  - **Create Scorecard**: SET_COLUMN_VALUE IF `true`
  - **UpdateWeeklyEfficiency (→"Update")**: SET_COLUMN_VALUE IF `true`
  - **New Action (→"=Any(Me[AppTags])")**: REF_ACTION IF `true`
  - **ScheduleLarge (→"Switch View")**: NAVIGATE_APP IF `=context("view")="ScheduleLarge"`

### Efficiency
  - **UpdateEfficiency (→"Update")**: SET_COLUMN_VALUE IF `true`

### Hours
  - **ExportHours (→"Download")**: EXPORT_VIEW
  - **UpdateHours (→"Update")**: REF_ACTION IF `true`
  - **HoursUpdate (→"Update")**: SET_COLUMN_VALUE IF `true`

### WeeklyEmployee
  _Auto (1): NAVIGATE_APP_
  - **UpdateWeeklyEmployee**: SET_COLUMN_VALUE IF `true`
  - **DownloadWeekly (→"Download")**: EXPORT_VIEW
  - **TriggerCreateWeeklyEmployee (→"Update")**: NAVIGATE_APP IF `true`
  - **EditSunday (→"Edit Sunday Schedule")**: REF_ACTION IF `true`
  - **EditFriday (→"Edit Friday Schedule")**: REF_ACTION IF `true`
  - **EditMonday (→"Edit Monday Schedule")**: REF_ACTION IF `true`
  - **EditThursday (→"Edit Thursday Schedule")**: REF_ACTION IF `true`
  - **EditWednesday (→"Edit Wednesday Schedule")**: REF_ACTION IF `true`
  - **EditTuesday (→"Edit Tuesday Schedule")**: REF_ACTION IF `true`
  - **EditSaturday (→"Edit Saturday Schedule")**: REF_ACTION IF `true`
  - **EditEmployee (→"Edit Employee")**: REF_ACTION IF `true`

### Tasks
  _Auto (1): NAVIGATE_APP_
  - **Completed**: SET_COLUMN_VALUE IF `=[Status]<>"Completed"`
  - **CreateRepeatTask**: ADD_RECORD_TO IF `true`

### Users
  _Auto (2): NAVIGATE_APP_
  - **UpdateAppTags**: SET_COLUMN_VALUE IF `true`

### Scorecard
  - **ImportScorecard (→"Upload")**: IMPORT_FILE IF `true`
  - **Action for AddRowsPerformance**: ADD_RECORD_TO IF `true`
  - **Action for AddRowsPerformance 2**: ADD_RECORD_TO IF `true`
  - **Action for AddRowsPerformance 3**: ADD_RECORD_TO IF `true`

### Performance
  _Auto (2): NAVIGATE_APP, OPEN_FILE_
  - **UpdateEmployeeID**: SET_COLUMN_VALUE IF `true`
  - **UpdatePOD**: SET_COLUMN_VALUE IF `true`
  - **UpdateCDF**: SET_COLUMN_VALUE IF `true`
  - **Reviewed**: SET_COLUMN_VALUE IF `true`
  - **CreateScorecard (→"Create Scorecard")**: SET_COLUMN_VALUE IF `true`
  - **CreateRetraining Action - 1**: ADD_RECORD_TO IF `true`

### ADP
  - **ImportEmployeeSummary (→"Upload Employee Summary")**: IMPORT_FILE IF `true`
  - **AddRowsToPayCal Action - 1**: ADD_RECORD_TO IF `true`
  - **Action for DeletePayCal**: REF_ACTION IF `true`
  - **Action for DeleteADPData**: REF_ACTION IF `true`
  - **Update_ADP**: SET_COLUMN_VALUE IF `true`
  - **Add_To_PayCal**: ADD_RECORD_TO IF `true`

### PayCal
  - **ExportPayCal (→"Download")**: EXPORT_VIEW
  - **UpdatePayCal**: SET_COLUMN_VALUE IF `true`
  - **TriggerClearPayCal (→"Clear")**: NAVIGATE_APP IF `true`
  - **Trigger_RecalculatePayCal (→"Recalculate")**: NAVIGATE_APP IF `true`

### POD
  - **AddRowsPerformance Action - 1**: REF_ACTION IF `true`
  - **ImportPOD (→"Upload")**: IMPORT_FILE IF `true`
  - **AddRowsPerformance Action - 2**: REF_ACTION IF `true`

### CDF
  - **ImportCDF (→"Upload")**: IMPORT_FILE IF `true`
  - **New step Action - 4**: REF_ACTION IF `true`

### Coaching
  - **AddTaskforCoaching Action - 1**: ADD_RECORD_TO IF `true`

### Tenured
  - **ImportTenured (→"Upload")**: IMPORT_FILE IF `true`
  - **New step Action - 6**: REF_ACTION IF `true`

### Fleet
  - **ExportFleet (→"Download")**: EXPORT_VIEW
  - **Update**: SET_COLUMN_VALUE IF `true`

### WHC
  _Auto (6): DELETE_RECORD, NAVIGATE_APP_
  - **Update_WHC**: SET_COLUMN_VALUE IF `true`
  - **SetWHCStatus (→"Status")**: SET_COLUMN_VALUE IF `true`
  - **TriggerWeeklyUpdateWHC (→"Update WHC")**: NAVIGATE_APP IF `=IN(CONTEXT("View"),LIST("WHC"))`
  - **DownloadWHC (→"Download")**: EXPORT_VIEW
  - **LastWHC (→"Last WHC")**: NAVIGATE_APP IF `true`

### DAReview
  _Auto (4): NAVIGATE_APP, OPEN_FILE_
  - **Open File (Uploaded Signed Files) (→""Signed PDF"")**: OPEN_FILE IF `NOT(ISBLANK([Uploaded Signed Files]))`
  - **SetPrintedStatus**: SET_COLUMN_VALUE IF `true`
  - **Print**: COMPOSITE IF `true`
  - **AddDAReview (→"Add")**: NAVIGATE_APP IF `true`
  - **ViewDAReview (→"View")**: NAVIGATE_APP IF `true`
  - **SendViaEmail (→"Email")**: SET_COLUMN_VALUE IF `=IN([ID],CreatedPrintedReview[ID])`

### ContactAssignment
  _Auto (1): NAVIGATE_APP_

### IncidentNotes
  _Auto (1): NAVIGATE_APP_

### Incident
  _Auto (6): EMAIL, NAVIGATE_APP, NAVIGATE_URL_
  - **Open File (IncidentPDF) (→"Incident Report")**: OPEN_FILE IF `NOT(ISBLANK([IncidentPDF]))`
  - **TriggerFetchIncidentForm (→"Update")**: NAVIGATE_APP IF `true`
  - **AddIncident (→"Add")**: NAVIGATE_APP IF `=in(context("view"),{"Incident"})`
  - **Call Phone (Employee Phone) (→"Phone call")**: CALL IF `NOT(ISBLANK([Employee Phone]))`
  - **Send SMS (Employee Phone) (→"Text message")**: SMS IF `NOT(ISBLANK([Employee Phone]))`
  - **Open File (IncidentFilePDF) (→"Incident Photo")**: OPEN_FILE IF `NOT(ISBLANK([IncidentFilePDF]))`
  - **TriggerSendIncidentForm (→"Send")**: NAVIGATE_APP IF `true`
  - **Open File (IncidentDetailsPDF) (→"Download")**: OPEN_FILE IF `NOT(ISBLANK([IncidentDetailsPDF]))`

### IncidentForm
  _Auto (6): EMAIL, NAVIGATE_APP_
  - **Action for Create Vehicle Claim**: ADD_RECORD_TO IF `true`
  - **Action for Create Injury Claim**: ADD_RECORD_TO IF `true`
  - **Action for Create Vehicle Claim 2**: ADD_RECORD_TO IF `true`
  - **Action for Create Injury Claim 2**: ADD_RECORD_TO IF `true`
  - **UpdateIncidentForm**: SET_COLUMN_VALUE IF `true`
  - **Update the Incident Action - 1**: SET_COLUMN_VALUE IF `true`

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
  - **Add a new Planning Row Action - 1**: ADD_RECORD_TO IF `true`
  - **Action for Create WeeklyEmployee for this week**: REF_ACTION IF `true`
  - **Action for Set WeekYearID for all scheduled employee in this week**: REF_ACTION IF `true`
  - **Update all fleet Action - 1**: REF_ACTION IF `true`
  - **Action for update status to Email Sent**: REF_ACTION IF `true`
  - **Action for Create Entry in UDP**: REF_ACTION IF `true`
  - **Delete all PayCal Rows Action - 1**: REF_ACTION IF `true`
  - **Delete WeeklyEmployee Entry for the past weeks Action - 1**: REF_ACTION IF `true`
  - **Delete Unwanted WeeklyEmployee Entry for this week Action - 1**: REF_ACTION IF `true`
  - **Launch Trigger for Current Week WeeklyEmployee Action - 1**: ADD_RECORD_TO IF `true`
  - **Launch Trigger for Next Week WeeklyEmployee Action - 1**: ADD_RECORD_TO IF `true`
  - **Launch Trigger for 3rd week WeeklyEmployee Action - 1**: ADD_RECORD_TO IF `true`
  - **Launch Trigger for 4th week WeeklyEmployee Action - 1**: ADD_RECORD_TO IF `true`
  - **create all the repairs for today Action - 1**: REF_ACTION IF `true`
  - **Update Efficiency for Last 21 days Action - 1**: REF_ACTION IF `true`
  - **Delete the PaycalRows in based on ADP Action - 1**: REF_ACTION IF `true`
  - **Create PayCal for all rows in ADP Action - 1**: REF_ACTION IF `true`

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
  _Auto (1): NAVIGATE_URL_

### Policy
  _Auto (2): OPEN_FILE_
  - **UpdatePolicy (→"Recalculate")**: SET_COLUMN_VALUE IF `true`

### Premium
  _Auto (2): NAVIGATE_APP_
  - **Recalculate policy info Action - 2**: REF_ACTION IF `true`

### Notice
  _Auto (1): NAVIGATE_APP_
  - **AddNotice (→"Add")**: NAVIGATE_APP IF `=in(context("view"),{"Incident"})`

### Repairs
  _Auto (3): NAVIGATE_APP, OPEN_FILE_
  - **Add_Repair (→"Add")**: NAVIGATE_APP IF `true`
  - **Repair_Status (→"Update Status")**: SET_COLUMN_VALUE IF `true`

### Notes
  _Auto (1): NAVIGATE_APP_

### Injury
  _Auto (7): NAVIGATE_APP_

### Separation
  _Auto (14): OPEN_FILE_
  - **Edit_Separation (→"Edit")**: NAVIGATE_APP IF `true`
  - **View_Separation (→"Detail")**: NAVIGATE_APP IF `true`
  - **Add_Separation (→"Add")**: NAVIGATE_APP IF `=not(in(context("view"),{"Separation_Form","Separation_Detail"}))`
  - **SendSeparationEmail (→"Send Separation Email")**: SET_COLUMN_VALUE IF `true`
  - **Edit_PickUp (→"Edit")**: NAVIGATE_APP IF `true`
  - **Change Email Status to Sent Action - 1**: SET_COLUMN_VALUE IF `true`
  - **Employee Status terminated Action - 1**: REF_ACTION IF `true`

### Rentals
  _Auto (1): OPEN_FILE_

### PayCheck
  _Auto (3): EMAIL, OPEN_FILE_

### UPD
  _Auto (1): NAVIGATE_APP_

### EmployeeDocs
  - **Update File URL Action - 1**: SET_COLUMN_VALUE IF `true`
  - **Completed Employee I9Status Action - 1**: REF_ACTION IF `true`

### Volume
  - **DownloadVolume (→"Download")**: EXPORT_VIEW

### DADaily
  - **Import_DADaily (→""Upload"")**: IMPORT_FILE IF `true`
  - **ProcessDADaily (→"Process")**: ADD_RECORD_TO IF `true`

### ADPReport
  - **UploadADPDaily (→"Upload")**: IMPORT_FILE IF `true`
  - **ProcessADPDaily**: ADD_RECORD_TO IF `true`

### RoutesDaily
  - **ImportDailyRoutes (→"Upload")**: IMPORT_FILE IF `true`
  - **ProcessDailyRoutes (→"Process")**: ADD_RECORD_TO IF `true`

### DailyAPIReport
  - **ProcessDailyAPIReport (→"Process")**: ADD_RECORD_TO IF `true`
  - **ImportDailyReport (→"Upload")**: IMPORT_FILE IF `true`

### i9Tracking
  _Auto (3): NAVIGATE_APP, NAVIGATE_URL_

### WSTServiceDetails
  - **Import_WSTServiceDetails (→"Import")**: IMPORT_FILE IF `true`
  - **add to WST Verificaiton Action - 1**: ADD_RECORD_TO IF `true`

### WSTWeeklyReport
  - **Import_WSTWeeklyReport (→"Import")**: IMPORT_FILE IF `true`

### WSTDeliveredPackages
  - **Import_WSTDeliveredPackages (→"Import")**: IMPORT_FILE IF `true`

### WSTVerification
  _Auto (1): NAVIGATE_APP_
  - **Input_FuzzyMatchName**: REF_ACTION IF `=NOT(
  IN(
    [WSTServiceDetails].[Delivery Associate],
    [EmployeeID].[Fuzz`

### RosterSMS
  - **Call Phone (EmployeePhoneNumber) (→"Phone call")**: CALL IF `NOT(ISBLANK([EmployeePhoneNumber]))`
  - **Send SMS (EmployeePhoneNumber) (→"Text message")**: SMS IF `NOT(ISBLANK([EmployeePhoneNumber]))`

## Observations
- ℹ️ **Candidate** has no Label column
- ℹ️ **Onboarding** has no Label column
- ℹ️ **Employee** has no Label column
- ℹ️ **Users** has no Label column
- ℹ️ **Review** has no Label column
- ℹ️ **Fleet** has no Label column
- ℹ️ **Roster** has no Label column
- ℹ️ **Everyday** has no Label column
- ℹ️ **Week** has no Label column
- ℹ️ **Planning** has no Label column
- ℹ️ **Schedule** has no Label column
- ℹ️ **ActionsCalling** has no Label column
- ℹ️ **FleetAssignment** has no Label column
- ℹ️ **Inspection** has no Label column
- ℹ️ **Performance** has no Label column
- ℹ️ **Setup** has no Label column
- ℹ️ **Summary** has no Label column
- ℹ️ **Hours** has no Label column
- ℹ️ **Efficiency** has no Label column
- ℹ️ **WeeklyEmployee** has no Label column
- ℹ️ **ExtraMiles** has no Label column
- ℹ️ **LoadoutSummary** has no Label column
- ℹ️ **Tasks** has no Label column
- ℹ️ **Scorecard** has no Label column
- ℹ️ **POD** has no Label column
- ℹ️ **Tenured** has no Label column
- ℹ️ **CDF** has no Label column
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
- ℹ️ **Policy** has no Label column
- ℹ️ **Premium** has no Label column
- ℹ️ **Notice** has no Label column
- ℹ️ **Repairs** has no Label column
- ℹ️ **Notes** has no Label column
- ℹ️ **Separation** has no Label column
- ℹ️ **Rentals** has no Label column
- ℹ️ **PayCheck** has no Label column
- ℹ️ **Volume** has no Label column
- ℹ️ **UPD** has no Label column
- ℹ️ **EmployeeDocs** has no Label column
- ℹ️ **WSTWeeklyReport** has no Label column
- ℹ️ **WSTDeliveredPackages** has no Label column
- ℹ️ **WSTUnplannedDelays** has no Label column
- ℹ️ **WSTServiceDetails** has no Label column
- ℹ️ **DAReviewMetric** has no Label column
- ℹ️ **DADaily** has no Label column
- ℹ️ **ADPReport** has no Label column
- ℹ️ **DailyAPIReport** has no Label column
- ℹ️ **RoutesDaily** has no Label column
- ℹ️ **i9Tracking** has no Label column
- ℹ️ **CDFDisputes** has no Label column
- ℹ️ **WSTVerification** has no Label column
- ℹ️ **RosterSMS** has no Label column
- ℹ️ **ScheduleSMS** has no Label column
