function createBiWeeklyTrigger() {
  // Trigger every other Monday at 06:00.
  ScriptApp.newTrigger('autoGenerateTimesheetForTracy')
      .timeBased()
      .everyWeeks(2)
      .onWeekDay(ScriptApp.WeekDay.SATURDAY)
      .atHour(5)
      .create();
  ScriptApp.newTrigger('autoGenerateTimesheetForFremont')
      .timeBased()
      .everyWeeks(2)
      .onWeekDay(ScriptApp.WeekDay.SATURDAY)
      .atHour(6)
      .create();
}
