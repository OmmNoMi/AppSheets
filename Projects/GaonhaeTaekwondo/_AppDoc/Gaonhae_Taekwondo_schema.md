# Gaonhae Taekwondo — AppSheet Schema (v1.003769)
> Parsed: 6/12/2026, 8:03:24 PM | 144T / 2919C / 45S / 180V / 297A / 25FR
> Deployable: Yes | Runnable: Yes

## Tables
```
  _Per User Settings        src=native   sheet=?                    mode=UPDATES_ONLY
  Product                   src=google   sheet=Product              mode=ALL_CHANGES
  Sales                     src=google   sheet=Sales                mode=ADDS_AND_UPDATES
  Lesson                    src=google   sheet=Lesson               mode=ALL_CHANGES
  Attendance                src=google   sheet=Attendance           mode=ALL_CHANGES
  Certificate               src=google   sheet=Certificate          mode=ADDS_AND_UPDATES
  Level                     src=google   sheet=Level                mode=READ_ONLY
  SalesItem                 src=google   sheet=SalesItem            mode=ALL_CHANGES
  Branch                    src=google   sheet=Branch               mode=UPDATES_ONLY
  Controls                  src=google   sheet=Controls             mode=ALL_CHANGES
  Week                      src=google   sheet=Week                 mode=READ_ONLY
  WorkDay                   src=google   sheet=WorkDay              mode=UPDATES_ONLY
  WorkWeek                  src=google   sheet=WorkWeek             mode=UPDATES_ONLY
  Class                     src=google   sheet=Class                mode=ALL_CHANGES
  Schedule                  src=google   sheet=Schedule             mode=ALL_CHANGES
  BranchProduct             src=google   sheet=BranchProduct        mode=ALL_CHANGES
  AppView                   src=google   sheet=AppView              mode=READ_ONLY
  Day                       src=google   sheet=Day                  mode=READ_ONLY
  Category                  src=google   sheet=Category             mode=READ_ONLY
  MonthYear                 src=google   sheet=MonthYear            mode=READ_ONLY
  Info                      src=google   sheet=Info                 mode=ALL_CHANGES
  InfoItm                   src=google   sheet=InfoItm              mode=ALL_CHANGES
  BranchParty               src=google   sheet=BranchParty          mode=ADDS_AND_DELETES
  InvAc                     src=google   sheet=InvAc                mode=READ_ONLY
  Party                     src=google   sheet=Party                mode=ALL_CHANGES
  WorkMonth                 src=google   sheet=WorkMonth            mode=UPDATES_ONLY
  Task                      src=google   sheet=Task                 mode=ADDS_AND_UPDATES
  AppSettings               src=google   sheet=AppSettings          mode=ADDS_AND_UPDATES
  AppVariables              src=google   sheet=AppVariables         mode=ADDS_AND_UPDATES
  AppTriggers               src=google   sheet=AppTriggers          mode=ADDS_ONLY
  F_Grading                 src=google   sheet=?                    mode=READ_ONLY
  StudentInfo               src=google   sheet=StudentInfo          mode=ALL_CHANGES
  Grading                   src=google   sheet=Grading              mode=ALL_CHANGES
  Terms                     src=google   sheet=Terms                mode=ADDS_AND_UPDATES
  Process for Create_Fee_Receipt Process Table src=native   sheet=?                    mode=READ_ONLY
  Update the sales voucher number Output src=native   sheet=?                    mode=READ_ONLY
  Update Receipt Number Output src=native   sheet=?                    mode=READ_ONLY
  Create Fee Receipt Output src=native   sheet=?                    mode=READ_ONLY
  Click action Generate Fee Receipt Output src=native   sheet=?                    mode=READ_ONLY
  set the student status as Active Output src=native   sheet=?                    mode=READ_ONLY
  Process for Update_Sales_Record Process Table src=native   sheet=?                    mode=READ_ONLY
  Update the Parent Sale Output src=native   sheet=?                    mode=READ_ONLY
  Process for Update Booking Process Table src=native   sheet=?                    mode=READ_ONLY
  Update Booking Status Output src=native   sheet=?                    mode=READ_ONLY
  Check if the Attendance is against Fee Advice Output src=native   sheet=?                    mode=READ_ONLY
  Mark the Sales as PostPay Output src=native   sheet=?                    mode=READ_ONLY
  Process for Update Attendance Status Process Table src=native   sheet=?                    mode=READ_ONLY
  If the Lesson Cancelled Output src=native   sheet=?                    mode=READ_ONLY
  Cancel All Related Attendance for this Lesson. Output src=native   sheet=?                    mode=READ_ONLY
  Is the Lesson Scheduled Output src=native   sheet=?                    mode=READ_ONLY
  Update Status of Booking to Absent Output src=native   sheet=?                    mode=READ_ONLY
  Update Status of Booking to Present Output src=native   sheet=?                    mode=READ_ONLY
  Process for Lesson Complete Automation Process Table src=native   sheet=?                    mode=READ_ONLY
  Set Lesson Status Complete Output src=native   sheet=?                    mode=READ_ONLY
  Process for BranchPartyAccess Process Table src=native   sheet=?                    mode=READ_ONLY
  Remove Branch Party for Old Branch Output src=native   sheet=?                    mode=READ_ONLY
  Check before creating the row Output src=native   sheet=?                    mode=READ_ONLY
  Create new BranchParty row for Updated Branch Output src=native   sheet=?                    mode=READ_ONLY
  Process for RepeatingTaskAssignment Process Table src=native   sheet=?                    mode=READ_ONLY
  Create a New Task Output  src=native   sheet=?                    mode=READ_ONLY
  Update the DueDate and NextDate Output src=native   sheet=?                    mode=READ_ONLY
  Process for ProcessPartyStatus Process Table src=native   sheet=?                    mode=READ_ONLY
  Students on Holiday, Medical Leaves or Exams Output src=native   sheet=?                    mode=READ_ONLY
  Set Status and SubStatus as Active Output src=native   sheet=?                    mode=READ_ONLY
  Process for New Bot 9 - 1 Process Table src=native   sheet=?                    mode=READ_ONLY
  Update WorkDay Stat for 50 Days in Past Output src=native   sheet=?                    mode=READ_ONLY
  Update WorkDay Stat for 50 Days in Future Output src=native   sheet=?                    mode=READ_ONLY
  Process for TriggerCalledFromApp - 1 Process Table src=native   sheet=?                    mode=READ_ONLY
  AppTrigger for Create WorkDay Lesson Output src=native   sheet=?                    mode=READ_ONLY
  Add WorkDay to the Schedule Output src=native   sheet=?                    mode=READ_ONLY
  Delete the Lesson if the schedule is inactive Output src=native   sheet=?                    mode=READ_ONLY
  Create Lesson against the WorkDay Output src=native   sheet=?                    mode=READ_ONLY
  Reset the WorkDay in the Schedule Output src=native   sheet=?                    mode=READ_ONLY
  Reset AppTrigger for WorkDay Output src=native   sheet=?                    mode=READ_ONLY
  AppTrigger for Create Lesson Booking Output src=native   sheet=?                    mode=READ_ONLY
  Add Lesson to the Sales Item Output src=native   sheet=?                    mode=READ_ONLY
  Create Booking against the Lesson Output src=native   sheet=?                    mode=READ_ONLY
  Set the automation trigger to blank Output src=native   sheet=?                    mode=READ_ONLY
  Recalculate stats for SalesItem Output src=native   sheet=?                    mode=READ_ONLY
  Create Booking agains Preferences Output src=native   sheet=?                    mode=READ_ONLY
  add the salesitem to the lessons Output src=native   sheet=?                    mode=READ_ONLY
  Create the Attendance against salesitem Output src=native   sheet=?                    mode=READ_ONLY
  update the stat for Booking preference Output src=native   sheet=?                    mode=READ_ONLY
  Process for TriggerDailyActions05am - 1 Process Table src=native   sheet=?                    mode=READ_ONLY
  Lesson Cretion for Next 3 Days Output src=native   sheet=?                    mode=READ_ONLY
  Set Trigger for Lesson Cration to WorkDays Output src=native   sheet=?                    mode=READ_ONLY
  AddTrigger for all workdays Output src=native   sheet=?                    mode=READ_ONLY
  Create Lesson for Next 8,11,15,21,31 Days Output src=native   sheet=?                    mode=READ_ONLY
  Setup Input AppTrigger for Workday to create lessons Output src=native   sheet=?                    mode=READ_ONLY
  Launch WorkDay Trigger to create lessons Output src=native   sheet=?                    mode=READ_ONLY
  Any Conditions needs to be verified Output src=native   sheet=?                    mode=READ_ONLY
  Set Trigger for the Lessons Output src=native   sheet=?                    mode=READ_ONLY
  Launch Trigger for the lessons Output src=native   sheet=?                    mode=READ_ONLY
  Process for TriggerDailyActions11pm Process Table src=native   sheet=?                    mode=READ_ONLY
  Any condition before changing the booking status Output src=native   sheet=?                    mode=READ_ONLY
  Mark as Upcomming Output  src=native   sheet=?                    mode=READ_ONLY
  Mark as Active Output     src=native   sheet=?                    mode=READ_ONLY
  Mark as MakeUp Output     src=native   sheet=?                    mode=READ_ONLY
  Mark as Expired Output    src=native   sheet=?                    mode=READ_ONLY
  Mark as Cancelled Output  src=native   sheet=?                    mode=READ_ONLY
  Process for TriggerTemporaryActions Process Table src=native   sheet=?                    mode=READ_ONLY
  Any condition Output      src=native   sheet=?                    mode=READ_ONLY
  Mark Scheduled Lessons as Completed Output src=native   sheet=?                    mode=READ_ONLY
  Update Completed Lesson Output src=native   sheet=?                    mode=READ_ONLY
  create booking Output     src=native   sheet=?                    mode=READ_ONLY
  set trigger Output        src=native   sheet=?                    mode=READ_ONLY
  launch trigger Output     src=native   sheet=?                    mode=READ_ONLY
  Process for TriggerDailyActions47min Process Table src=native   sheet=?                    mode=READ_ONLY
  Any check Output          src=native   sheet=?                    mode=READ_ONLY
  Mark Lessons Completed for less then 3 days Output src=native   sheet=?                    mode=READ_ONLY
  Process for AutomaticSales - 1 Process Table src=native   sheet=?                    mode=READ_ONLY
  Some Other Conditions to be met Output src=native   sheet=?                    mode=READ_ONLY
  Set SalesTemplate to SalesRef in SalesItems Output src=native   sheet=?                    mode=READ_ONLY
  Create same SalesItems Output src=native   sheet=?                    mode=READ_ONLY
  Set the SalesRef value to blank for the SalesItem Output src=native   sheet=?                    mode=READ_ONLY
  Process for TriggerDailyActions23min Process Table src=native   sheet=?                    mode=READ_ONLY
  Create Booking for Today Output src=native   sheet=?                    mode=READ_ONLY
  Set Trigger for the Lessons Output 2 src=native   sheet=?                    mode=READ_ONLY
  Launch Trigger for the lessons Output 2 src=native   sheet=?                    mode=READ_ONLY
  Create Lesson Booking for tomorrow Output src=native   sheet=?                    mode=READ_ONLY
  set the trigger on the Lessons Output src=native   sheet=?                    mode=READ_ONLY
  Launch Trigger on the Lesson Output src=native   sheet=?                    mode=READ_ONLY
  Process for StudentInfo Process Table src=native   sheet=?                    mode=READ_ONLY
  Update Existing Student Output src=native   sheet=?                    mode=READ_ONLY
  Update Student Information Output src=native   sheet=?                    mode=READ_ONLY
  Create New Student Output src=native   sheet=?                    mode=READ_ONLY
  Create New Party as student Output src=native   sheet=?                    mode=READ_ONLY
  Update PartyRef Output    src=native   sheet=?                    mode=READ_ONLY
  Process for TriggerWeekly02amM - 1 Process Table src=native   sheet=?                    mode=READ_ONLY
  Any Condition Output 2    src=native   sheet=?                    mode=READ_ONLY
  update the sales status Output src=native   sheet=?                    mode=READ_ONLY
  Process for Certificate Process Table src=native   sheet=?                    mode=READ_ONLY
  Any Condition Output 3    src=native   sheet=?                    mode=READ_ONLY
  create new certificate Output src=native   sheet=?                    mode=READ_ONLY
  New step Output           src=native   sheet=?                    mode=READ_ONLY
  Process for UpdateInSalesItem - 1 Process Table src=native   sheet=?                    mode=READ_ONLY
  check any condition for student update Output src=native   sheet=?                    mode=READ_ONLY
  Update the current belt of student Output src=native   sheet=?                    mode=READ_ONLY
  Check it substatus is pass or Double for grading Output src=native   sheet=?                    mode=READ_ONLY
  Create the Certificate Output src=native   sheet=?                    mode=READ_ONLY
  if double then create one more Output src=native   sheet=?                    mode=READ_ONLY
  create Double certificate Output src=native   sheet=?                    mode=READ_ONLY
  Update Current certificate Output src=native   sheet=?                    mode=READ_ONLY
  update the current certificate Output src=native   sheet=?                    mode=READ_ONLY
```

## Columns
### _Per User Settings (15 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  _EMAIL: Email [HIDDEN]
  _NAME: Name [HIDDEN]
  _LOCATION: LatLong [HIDDEN]
  Me: Show [RO]
  AccessKey: Text
  Branch: Enum [HIDDEN]
  Country Option: Enum [HIDDEN] [Values: 'Australia', 'Brazil', 'Canada']
  Language Option: Enum [HIDDEN] [Values: 'English', 'French', 'Tamil']
  StartDate: Date [HIDDEN]
  EndDate: Date [HIDDEN]
  DateControl: Enum [Values: 'Last 3 Months', 'Last 6 Months', 'Last 1 Year', 'All Date Range']
  Option 8: Text [HIDDEN]
  Option 9: Text [HIDDEN]
  _THISUSER: Text [HIDDEN] = onlyvalue
```

### Product (27 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
  Category: Ref
  Name: Enum
  Brand: Enum [Values: 'Adidas', '-', 'KPNP']
  Type: Enum
  Varient: Enum
  LevelOld: Enum { EditIf: `=[Category].[LevelOld]` }
  LevelNew: Enum { EditIf: `=[Category].[LevelNew]` }
  BookingMax: Number { ShowIf: `=and(
  [Category].[BookingMax],
  [Type]="Term"
)` }
  BookingWeekly: Number { ShowIf: `=[Category].[BookingWeekly]` }
  BookingType: Enum [Values: 'Weekday', 'Weekend', 'Week'] { ShowIf: `=[Category].[BookingType]` }
  BillingFreq: Enum { ShowIf: `=[Category].[BillingFreq]` }
  BillingRestriction: Enum [Values: 'Only One Class Category Product Each Month']
  Description: LongText
  Price: Price
  Tax: Enum
  Delivery: Yes/No
  Status: Enum [Values: 'Active', 'Inactive', 'Closed']
  ItemCode: Text
  LastEditBy: Text = =useremail() { EditIf: `=isblank([LastEditBy])` }
  LastEditOn: DateTime = =now() { EditIf: `=isblank([LastEditOn])` }
  Related SalesItems: List [RO,VC]
  Label: Text [RO]
  Related BranchProducts: List [RO,VC]
  AllowedClasses: List [RO]
  BranchProduct: Number [RO]
```

### Sales (56 cols)
[Inherits all 61 columns from Table: Process for Create_Fee_Receipt Process Table]
+ Modified/Added Columns:
  - _RowNumber: Number

### Lesson (19 cols)
[Inherits all 20 columns from Table: Process for Lesson Complete Automation Process Table]
+ Modified/Added Columns:
  - _RowNumber: Number

### Attendance (17 cols)
[Inherits all 17 columns from Table: Update Booking Status Output]
+ Modified/Added Columns:
  - _RowNumber: Number

### Certificate (18 cols)
[Inherits all 18 columns from Table: New step Output]
+ Modified/Added Columns:
  - _RowNumber: Number

### Level (8 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
  Type: Enum [Values: 'STF', 'KKW']
  Name: Name
  Rank: Yes/No
  Label: Text [RO]
  Related AppSettings: List [RO,VC]
  Related SalesItems: List [RO,VC]
```

### SalesItem (67 cols)
[Inherits all 68 columns from Table: Process for Update_Sales_Record Process Table]
+ Modified/Added Columns:
  - _RowNumber: Number

### Branch (14 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
  Code: Text [RO]
  Name: Name
  Mobile: Phone
  Address: Address
  LatLong: LatLong
  BankName: Text
  BankAccount: Text
  Payment_Mode: EnumList
  QR_Code: Image
  Related InvAcs: List [RO,VC]
  Related WorkMonths: List [RO,VC]
  Related Gradings: List [RO,VC]
```

### Controls (9 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = =UPPER(LEFT(UNIQUEID(),3)) { EditIf: `=ISBLANK([_THIS])` }
  Type: Enum [Values: 'Discount', 'Tax', 'Surcharge', 'Grading Test'] { EditIf: `=isblank([Type])` }
  Name: Name = =IFS(
   [Type]="Grading Test",
   TEXT(DATETIME([Date]&" "&[Time]),
  "DD MMM HH:MM AM/PM")
)
  Description: Text
  Percent: Percent { ShowIf: `=[Type]<>"Grading Test"` | EditIf: `=isblank([Percent])` }
  Date: Date { ShowIf: `=[Type]="Grading Test"` }
  Time: Time { ShowIf: `=[Type]="Grading Test"` }
  Active: Yes/No
```

### Week (6 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = =[Year]&"~"&if([Week]<10,"0","")&[Week] { EditIf: `=isblank([ID])` }
  Year: Number
  Week: Number
  StartDate: Date = TODAY()
  EndDate: Date = TODAY()
```

### WorkDay (25 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = =year([Date])&"-"&if(
  month([Date])<10,
  "0",
  ""
)&month([Date])&"-"&if(
  day([Date])<10,
  "0",
  ""
)&Day([Date])&"-"&[Branch].[Code] { EditIf: `=isblank([ID])` }
  WorkMonth: Enum
  MonthYear: Enum
  WorkWeek: Ref
  Week: Enum
  Branch: Enum { EditIf: `=isblank([Branch])` }
  Date: Date { EditIf: `=isblank([Date])` }
  WeekDay: Enum
  Holiday: Yes/No
  Lesson: Yes/No
  AppTrigger: Enum [Values: 'AT_WDayLesson']
  CountLesson: Number
  Booking: Enum
  FeeAdvice: Price
  Bookings: Number
  FeeReceipt: Decimal
  Payment: Decimal
  Attended: Number
  Absent: Number
  PendingOrder: Number
  Trial: Number
  LastSyncOn: DateTime = NOW()
  LastEditOn: DateTime = NOW() { EditIf: `=isblank([LastEditOn])` }
  Label: Text [RO]
```

### WorkWeek (20 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = =[Week]&"-"&[Branch].[Code]
  Branch: Enum [RO]
  Week: Enum [RO]
  Lessons: Text
  Scheduled: Text [HIDDEN]
  Booking: Enum = ="123"
  Pending: Number = =[Booking].[WeeklyLesson]- Count(Select(
  Attendance[ID],
  and(
    [Booking]=[_THISROW].[Booking],
    [Lesson].[Date]>=[_THISROW].[Week].[StartDate],
    [Date]<=[_THISROW].[Week].[EndDate]
  )
))
  FeeAdvice: Price
  Bookings: Number
  FeeReceipt: Price
  Payment: Price
  Attended: Number
  Absent: Number
  PendingOrder: Number
  Trial: Number
  LastEditOn: DateTime = =now()
  DateRange: Text [RO]
  Label: Text [RO]
  Related WorkDays: List [RO,VC]
```

### Class (8 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
  Type: Enum
  Name: Name
  Duration: Duration
  RefProduct: EnumList { ValidIf: `=select(Product[ID],[Category]="CL")` }
  LastEditBy: Text = =useremail() { EditIf: `=isblank([LastEditBy])` }
  LastEditOn: DateTime = =now() { EditIf: `=isblank([LastEditOn])` }
```

### Schedule (15 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID() { EditIf: `=isblank([ID])` }
  Branch: Enum { EditIf: `=isblank([Branch])` }
  WeekDay: Enum { EditIf: `=isblank([WeekDay])` }
  Class: Enum { EditIf: `=isblank([Class])` }
  StartTime: Time = TIMENOW()
  EndTime: Time = =[StartTime]+[Class].[Duration]
  Status: Enum [Values: 'Active', 'Inactive']
  ActiveFrom: Date { EditIf: `=[Status]="Active"` }
  InactiveFrom: Date { ShowIf: `=[Status]="Inactive"` }
  CreatedBy: Enum = =Any(Me[ID]) { EditIf: `=isblank([CreatedBy])` } { Slices Cross-Ref: Me -> Party }
  WorkDay: Enum
  LastEditBy: Enum = =Any(Me[ID]) { EditIf: `=isblank([LastEditBy])` } { Slices Cross-Ref: Me -> Party }
  LastEditOn: DateTime = =now() { EditIf: `=isblank([LastEditOn])` }
  Label: Text [RO]
```

### BranchProduct (19 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = =[Branch].[Code]&"-"&[Product] { EditIf: `=isblank([ID])` }
  Branch: Enum { EditIf: `=isblank([Branch])` }
  Product: Ref { EditIf: `=isblank([Product])` }
  MinStock: Number
  MaxStock: Number
  ActualStock: Number
  NeededStock: Number
  MinPrice: Price [HIDDEN]
  MaxPrice: Price [HIDDEN]
  DefaultPrice: Price = =[Product].[Price]
  Inv_Ac: EnumList = =if(
  [Category].[Inv_Track]=true,
  index(
    Select(
      InvAc[ID],
      and(
        [Fiscal]=[_THISROW].[Category].[Fiscal],
        OR(
          [Branch]=[_THISROW].[Branch],
          isblank([Branch])
        ),
        [Status]="Active"
      )
    ),
    1
  ),
  ""
) { ValidIf: `=[Category].[Inv_Track]=true` | EditIf: `=[Category].[Inv_Track]=true` }
  Status: Enum [Values: 'Active', 'Inactive', 'Closed'] = ="Active"
  LastEditBy: Enum = =any(Me[ID]) { EditIf: `=isblank([LastEditBy])` } { Slices Cross-Ref: Me -> Party }
  LastEditOn: DateTime = =now() { EditIf: `=isblank([LastEditOn])` }
  Category: Enum [RO]
  ProductStatus: Enum [RO]
  Undelivered: Decimal [RO]
  ERPNext_Item: Text [RO]
```

### AppView (20 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
  Type: Enum
  View: Enum
  Group: Enum
  Category: Enum
  Name: Name
  Description: LongText
  Icon: Image
  Link: Url
  AllowOnly: Text
  AllowValues: EnumList
  AllowMultiple: Text
  AllowBranch: EnumList
  AllowRoles: EnumList [Values: 'Owner', 'Admin', 'User']
  MinQty: Number
  MaxQty: Number
  MinAmount: Number
  MaxAmount: Number
  AppLink: App [RO]
```

### Day (4 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Number
  Name: Name
  Code: Text
```

### Category (28 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
  Code: Text
  Name: Name
  Description: LongText
  Booking: Yes/No
  Certificate: Yes/No
  Delivery: Yes/No
  Fiscal: Yes/No [HIDDEN,RO]
  Inv_Track: Yes/No
  Image: Yes/No
  Remark: Yes/No
  Edit_Flow: Yes/No
  Sales_Flow: Price
  Discount: Yes/No
  Surcharge: Yes/No
  Tax: Yes/No
  Dated: Yes/No
  Timed: Yes/No
  SubStatus: Yes/No
  BookingMax: Yes/No
  BookingWeekly: Yes/No
  BookingType: Yes/No
  BillingFreq: Yes/No
  LevelOld: Yes/No
  LevelNew: Yes/No
  Related Products: List [RO,VC]
  Label: Text [RO]
```

### MonthYear (10 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
  Year: Enum
  Month: Number
  Code: Text
  Title: Text
  StartDate: Date = TODAY()
  EndDate: Date = TODAY()
  Related Sales: List [RO,VC]
  Related WorkMonths: List [RO,VC]
```

### Info (9 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text [HIDDEN] = UNIQUEID()
  Type: Enum
  SubType: Enum
  Title: Name
  SubTitle: Name
  Image: Image
  Description: LongText
  Related InfoItms: List [RO,VC]
```

### InfoItm (10 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text [HIDDEN] = UNIQUEID()
  Info: Ref
  Image: Image
  Title: Text
  SubTitle: Text
  Description: LongText
  Link_1: Url
  Link_2: Url
  Index: Decimal
```

### BranchParty (7 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID() { EditIf: `=isblank([ID])` }
  Party: Ref
  Branch: Enum
  LastEditBy: Enum = =Any(Me[ID]) { EditIf: `=isblank([LastEditBy])` } { Slices Cross-Ref: Me -> Party }
  LastEditOn: DateTime = =now() { EditIf: `=isblank([LastEditOn])` }
  Label: Text [RO]
```

### InvAc (10 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
  Code: Text
  Name: Name
  Location: Enum [Values: 'BMP', 'JW', 'KEM', 'YSN', 'EXT']
  Branch: Ref
  Fiscal: Yes/No
  Status: Text
  LastEditBy: Enum = =Any(Me[ID]) { EditIf: `=isblank([LastEditBy])` } { Slices Cross-Ref: Me -> Party }
  LastEditOn: DateTime = =now() { EditIf: `=isblank([LastEditOn])` }
```

### Party (47 cols)
[Inherits all 50 columns from Table: Process for BranchPartyAccess Process Table]
+ Modified/Added Columns:
  - _RowNumber: Number

### WorkMonth (18 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text
  Branch: Ref
  Month: Ref
  Lessons: Text
  Scheduled: Text
  Booking: Enum
  Pending: Text
  FeeAdvice: Price
  Bookings: Number
  FeeReceipt: Price
  Payment: Price
  Attended: Number
  Absent: Number
  PendingOrder: Number
  Trial: Number
  LastEditBy: Enum = =Any(Me[ID]) { EditIf: `=isblank([LastEditBy])` } { Slices Cross-Ref: Me -> Party }
  LastEditOn: DateTime = =now() { EditIf: `=isblank([LastEditOn])` }
```

### Task (19 cols)
[Inherits all 19 columns from Table: Create a New Task Output]
+ Modified/Added Columns:
  - _RowNumber: Number

### AppSettings (17 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
  Level: Ref
  Table: Text
  Trigger: Text
  View: Text
  Column: Text
  Title: Text
  Description: LongText
  Roles: EnumList
  Email: Email
  User: Text
  Decimal: Decimal
  Date: Date = TODAY()
  AllowedValues: EnumList
  LastEditBy: Name
  LastEditOn: Name
```

### AppVariables (14 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
  Type: Text
  SubType: Text
  Title: Text
  SetValues: EnumList [Values: 'DecimalValue', 'DateValue', 'EnumValue', 'MultiValues', 'UrlValue', 'ImgValue']
  DecimalValue: Price
  DateValue: Date = TODAY()
  EnumValue: Text
  MultiValues: Text
  UrlValue: Url
  Description: Text
  LastEditBy: Enum = =Any(Me[ID]) { EditIf: `=isblank([LastEditBy])` } { Slices Cross-Ref: Me -> Party }
  LastEditOn: DateTime = =now() { EditIf: `=isblank([LastEditOn])` }
```

### AppTriggers (14 cols)
[Inherits all 14 columns from Table: Add WorkDay to the Schedule Output]
+ Modified/Added Columns:
  - _RowNumber: Number

### F_Grading (14 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  Response ID: Text [HIDDEN,RO] = UNIQUEID()
  Email Address: Email [RO]
  Timestamp: DateTime [RO] = NOW()
  Student Name: Text
  Current Belt: Enum [Values: '(Adults Grading Test)', 'Foundation 1 (No Star)', 'Foundation 2 (Yellow Star)', 'Foundation 3 (Blue Star)', 'White', 'Yellow Tip', 'Yellow', 'Green Tip', ... +10 more]
  Grade & Time Slot: Enum [Values: 'White >> Yellow Tip ($70.85) - Sunday, 28th July 2024 | Bukit Merah Branch | 10:00AM', 'Yellow Tip >> Yellow ($70.85) - Sunday, 28th July 2024 | Bukit Merah Branch | 10:10AM', 'Yellow >> Green Tip ($81.75) - Sunday, 28th July 2024 | Bukit Merah Branch | 10:30AM', 'Green Tip >> Green ($81.75) - Sunday, 28th July 2024 | Bukit Merah Branch | 10:50AM', 'Green >> Blue Tip ($92.65) - Sunday, 28th July 2024 | Bukit Merah Branch | 11:05AM', 'Blue Tip >> Blue ($92.65) - Sunday, 28th July 2024 | Bukit Merah Branch | 11:20AM', 'Blue >> Red Tip ($103.55) - Sunday, 28th July 2024 | Bukit Merah Branch | 11:40AM', 'Red Tip >> Red ($103.55) - Sunday, 28th July 2024 | Bukit Merah Branch | 12:00PM', ... +1 more]
  Please Paynow UEN T18LL1687K or Scan the Paynow QR below. Please enter your Student Name as the Paynow Reference.

*Payment made includes 9% GST.: EnumList [Values: 'I have noted the timeslot and made payment for the grading test.']
  Grade & Time Slot_9: Enum [Values: 'Provisional Pass Confirmation ($76.30) - Sunday, 28th July 2024 | Balmoral Plaza | 9:00AM', 'Black Tip >> 1st Poom ($457.80) - Sunday, 28th July 2024 | Balmoral Plaza | 9:10AM', '1st Poom >> 2nd Poom ($512.30) - Sunday, 28th July 2024 | Balmoral Plaza | 9:30AM', 'Stage 1 - Stage 3 ($59.95) - Sunday, 28th July 2024 |Bukit Merah Branch | 9:00AM', 'Stage 4 - Stage 26 ($59.95) - Sunday, 28th July 2024 | Bukit Merah Branch | 9:30AM'] (→"="Grade & Time Slot"")
  Please Paynow UEN T18LL1687K or Scan the Paynow QR below. Please enter your Student Name as the Paynow Reference.

*Payment made includes 9% GST._10: EnumList [Values: 'I have noted the timeslot and made payment for the grading test.'] (→"="Please Paynow UEN T18LL1687K or Scan the Paynow QR below. Please enter your Student Name as the Paynow Reference.

*Payment made includes 9% GST."")
  Grade & Time Slot_11: Enum [Values: 'White >> Yellow Tip ($70.85) - Sunday, 28th July 2024 |Bukit Merah Branch | 12:30PM', 'Yellow Tip >> Yellow ($70.85) - Sunday, 28th July 2024 |Bukit Merah Branch | 12:30PM', 'Yellow >> Green Tip ($81.75) - Sunday, 28th July 2024 |Bukit Merah Branch | 12:30PM', 'Green Tip >> Green ($81.75) - Sunday, 28th July 2024 |Bukit Merah Branch | 12:30PM', 'Green >> Blue Tip ($92.65) - Sunday, 28th July 2024 |Bukit Merah Branch | 1:00PM', 'Blue Tip >> Blue ($92.65) - Sunday, 28th July 2024 |Bukit Merah Branch | 1:00PM', 'Blue >> Red Tip ($103.55) - Sunday, 28th July 2024 |Bukit Merah Branch | 1:00PM', 'Red Tip >> Red ($103.55) - Sunday, 28th July 2024 |Bukit Merah Branch | 1:00PM', ... +1 more] (→"="Grade & Time Slot"")
  Please Paynow UEN T18LL1687K or Scan the Paynow QR below. Please enter your Student Name as the Paynow Reference.

*Payment made includes 9% GST._12: EnumList [Values: 'I have noted the timeslot and made payment for the grading test.'] (→"="Please Paynow UEN T18LL1687K or Scan the Paynow QR below. Please enter your Student Name as the Paynow Reference.

*Payment made includes 9% GST."")
  Grade & Time Slot_13: Enum [Values: 'Foundation 1 >> Foundation 2 ($49.05)', 'Foundation 2 >> Foundation 3 ($49.05)', 'Foundation 3 >> White Belt ($49.05)', 'Foundation 1 & 2 >> Foundation 3 ($98.10)', 'Foundation 2 & 3 >> White ($98.10)', 'Foundation 1, 2 & 3 >> White ($147.15)'] (→"="Grade & Time Slot"")
  Please Paynow UEN T18LL1687K or Scan the Paynow QR below. Please enter your Student Name as the Paynow Reference.

*Payment made includes 9% GST._14: EnumList [Values: 'I have noted the timeslot and made payment for the grading test.'] (→"="Please Paynow UEN T18LL1687K or Scan the Paynow QR below. Please enter your Student Name as the Paynow Reference.

*Payment made includes 9% GST."")
```

### StudentInfo (17 cols)
[Inherits all 17 columns from Table: Update Student Information Output]
+ Modified/Added Columns:
  - _RowNumber: Number

### Grading (13 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID() { EditIf: `=ISBLANK([_THIS])` }
  Name: Name = =TEXT(DATETIME([Date]&" "&[Time]),"DD MMM HH:MM AM/PM")
  Date: Date = TODAY()
  Time: Time = TIMENOW()
  Branch: Ref
  GradingProducts: EnumList
  MinAge: Number = =0
  MaxAge: Number = =99
  Status: Enum [Values: 'Active', 'Completed', 'Cancelled'] = ="Active"
  Related SalesItems: List [RO,VC]
  Label: Text [RO]
  MonthYear: Enum [RO]
```

### Terms (8 cols)
```
  _RowNumber: Number [SYSTEM,HIDDEN,RO]
  ID: Text = UNIQUEID()
  Name: Name
  StartDate: Date = TODAY()
  EndDate: Date = TODAY()
  Weeks: Number
  Status: Text
  Related SalesItems: List [RO,VC]
```

### Process for Create_Fee_Receipt Process Table (61 cols)
[Inherits all 60 columns from Table: Process for AutomaticSales - 1 Process Table]
+ Modified/Added Columns:
  - Update the sales voucher number: Ref
  - Update Receipt Number: Ref
  - Create Fee Receipt: Ref
  - Click action Generate Fee Receipt: Ref
  - set the student status as Active: Ref

### Update the sales voucher number Output (56 cols)
[Inherits all 61 columns from Table: Process for Create_Fee_Receipt Process Table]

### Update Receipt Number Output (56 cols)
[Inherits all 61 columns from Table: Process for Create_Fee_Receipt Process Table]

### Create Fee Receipt Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Click action Generate Fee Receipt Output (56 cols)
[Inherits all 61 columns from Table: Process for Create_Fee_Receipt Process Table]

### set the student status as Active Output (56 cols)
[Inherits all 61 columns from Table: Process for Create_Fee_Receipt Process Table]

### Process for Update_Sales_Record Process Table (68 cols)
[Inherits all 67 columns from Table: SalesItem]
+ Modified/Added Columns:
  - Instance Id: Text
  - Update the Parent Sale: Ref

### Update the Parent Sale Output (67 cols)
[Inherits all 68 columns from Table: Process for Update_Sales_Record Process Table]

### Process for Update Booking Process Table (20 cols)
[Inherits all 17 columns from Table: Attendance]
+ Modified/Added Columns:
  - Instance Id: Text
  - Update Booking Status: Ref
  - Check if the Attendance is against Fee Advice: Ref
  - Mark the Sales as PostPay: Ref

### Update Booking Status Output (17 cols)
[Inherits all 17 columns from Table: Attendance]
+ Modified/Added Columns:
  - Instance Id: Text

### Check if the Attendance is against Fee Advice Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Mark the Sales as PostPay Output (17 cols)
[Inherits all 17 columns from Table: Attendance]
+ Modified/Added Columns:
  - Instance Id: Text

### Process for Update Attendance Status Process Table (24 cols)
[Inherits all 20 columns from Table: Process for Lesson Complete Automation Process Table]
+ Modified/Added Columns:
  - If the Lesson Cancelled?: Ref
  - Cancel All Related Attendance for this Lesson.: Ref
  - Is the Lesson Scheduled?: Ref
  - Update Status of Booking to Absent: Ref
  - Update Status of Booking to Present: Ref

### If the Lesson Cancelled Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Cancel All Related Attendance for this Lesson. Output (19 cols)
[Inherits all 20 columns from Table: Process for Lesson Complete Automation Process Table]

### Is the Lesson Scheduled Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Update Status of Booking to Absent Output (19 cols)
[Inherits all 20 columns from Table: Process for Lesson Complete Automation Process Table]

### Update Status of Booking to Present Output (19 cols)
[Inherits all 20 columns from Table: Process for Lesson Complete Automation Process Table]

### Process for Lesson Complete Automation Process Table (20 cols)
[Inherits all 19 columns from Table: Lesson]
+ Modified/Added Columns:
  - Instance Id: Text
  - Set Lesson Status Complete: Ref

### Set Lesson Status Complete Output (19 cols)
[Inherits all 20 columns from Table: Process for Lesson Complete Automation Process Table]

### Process for BranchPartyAccess Process Table (50 cols)
[Inherits all 49 columns from Table: Process for ProcessPartyStatus Process Table]
+ Modified/Added Columns:
  - Remove Branch Party for Old Branch: Ref
  - Check before creating the row: Ref
  - Create new BranchParty row for Updated Branch: Ref

### Remove Branch Party for Old Branch Output (47 cols)
[Inherits all 50 columns from Table: Process for BranchPartyAccess Process Table]

### Check before creating the row Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Create new BranchParty row for Updated Branch Output (47 cols)
[Inherits all 50 columns from Table: Process for BranchPartyAccess Process Table]

### Process for RepeatingTaskAssignment Process Table (21 cols)
[Inherits all 21 columns from Table: Process for New Bot 9 - 1 Process Table]
+ Modified/Added Columns:
  - Create a New Task: Ref
  - Update the DueDate and NextDate: Ref

### Create a New Task Output (19 cols)
[Inherits all 21 columns from Table: Process for RepeatingTaskAssignment Process Table]

### Update the DueDate and NextDate Output (19 cols)
[Inherits all 21 columns from Table: Process for RepeatingTaskAssignment Process Table]

### Process for ProcessPartyStatus Process Table (49 cols)
[Inherits all 50 columns from Table: Process for BranchPartyAccess Process Table]
+ Modified/Added Columns:
  - Students on Holiday, Medical Leaves or Exams: Ref
  - Set Status and SubStatus as Active: Ref

### Students on Holiday, Medical Leaves or Exams Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Set Status and SubStatus as Active Output (47 cols)
[Inherits all 50 columns from Table: Process for BranchPartyAccess Process Table]

### Process for New Bot 9 - 1 Process Table (21 cols)
[Inherits all 21 columns from Table: Process for RepeatingTaskAssignment Process Table]
+ Modified/Added Columns:
  - Update WorkDay Stat for 50 Days in Past: Ref
  - Update WorkDay Stat for 50 Days in Future: Ref

### Update WorkDay Stat for 50 Days in Past Output (19 cols)
[Inherits all 21 columns from Table: Process for RepeatingTaskAssignment Process Table]

### Update WorkDay Stat for 50 Days in Future Output (19 cols)
[Inherits all 21 columns from Table: Process for RepeatingTaskAssignment Process Table]

### Process for TriggerCalledFromApp - 1 Process Table (29 cols)
[Inherits all 14 columns from Table: AppTriggers]
+ Modified/Added Columns:
  - Instance Id: Text
  - AppTrigger for Create WorkDay Lesson: Ref
  - Add WorkDay to the Schedule: Ref
  - Delete the Lesson if the schedule is inactive: Ref
  - Create Lesson against the WorkDay: Ref
  - Reset the WorkDay in the Schedule: Ref
  - Reset AppTrigger for WorkDay: Ref
  - AppTrigger for Create Lesson Booking: Ref
  - Add Lesson to the Sales Item: Ref
  - Create Booking against the Lesson: Ref
  - Set the automation trigger to blank: Ref
  - Recalculate stats for SalesItem: Ref
  - Create Booking agains Preferences: Ref
  - add the salesitem to the lessons: Ref
  - Create the Attendance against salesitem: Ref
  - update the stat for Booking preference: Ref

### AppTrigger for Create WorkDay Lesson Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Add WorkDay to the Schedule Output (14 cols)
[Inherits all 14 columns from Table: AppTriggers]
+ Modified/Added Columns:
  - Instance Id: Text

### Delete the Lesson if the schedule is inactive Output (14 cols)
[Inherits all 14 columns from Table: AppTriggers]
+ Modified/Added Columns:
  - Instance Id: Text

### Create Lesson against the WorkDay Output (14 cols)
[Inherits all 14 columns from Table: AppTriggers]
+ Modified/Added Columns:
  - Instance Id: Text

### Reset the WorkDay in the Schedule Output (14 cols)
[Inherits all 14 columns from Table: AppTriggers]
+ Modified/Added Columns:
  - Instance Id: Text

### Reset AppTrigger for WorkDay Output (14 cols)
[Inherits all 14 columns from Table: AppTriggers]
+ Modified/Added Columns:
  - Instance Id: Text

### AppTrigger for Create Lesson Booking Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Add Lesson to the Sales Item Output (14 cols)
[Inherits all 14 columns from Table: AppTriggers]
+ Modified/Added Columns:
  - Instance Id: Text

### Create Booking against the Lesson Output (14 cols)
[Inherits all 14 columns from Table: AppTriggers]
+ Modified/Added Columns:
  - Instance Id: Text

### Set the automation trigger to blank Output (14 cols)
[Inherits all 14 columns from Table: AppTriggers]
+ Modified/Added Columns:
  - Instance Id: Text

### Recalculate stats for SalesItem Output (14 cols)
[Inherits all 14 columns from Table: AppTriggers]
+ Modified/Added Columns:
  - Instance Id: Text

### Create Booking agains Preferences Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### add the salesitem to the lessons Output (14 cols)
[Inherits all 14 columns from Table: AppTriggers]
+ Modified/Added Columns:
  - Instance Id: Text

### Create the Attendance against salesitem Output (14 cols)
[Inherits all 14 columns from Table: AppTriggers]
+ Modified/Added Columns:
  - Instance Id: Text

### update the stat for Booking preference Output (14 cols)
[Inherits all 14 columns from Table: AppTriggers]
+ Modified/Added Columns:
  - Instance Id: Text

### Process for TriggerDailyActions05am - 1 Process Table (23 cols)
[Inherits all 14 columns from Table: AppTriggers]
+ Modified/Added Columns:
  - Instance Id: Text
  - Lesson Cretion for Next 3 Days: Ref
  - Set Trigger for Lesson Cration to WorkDays: Ref
  - AddTrigger for all workdays: Ref
  - Create Lesson for Next 8,11,15,21,31 Days: Ref
  - Setup Input AppTrigger for Workday to create lessons: Ref
  - Launch WorkDay Trigger to create lessons: Ref
  - Any Conditions needs to be verified: Ref
  - Set Trigger for the Lessons: Ref
  - Launch Trigger for the lessons: Ref

### Lesson Cretion for Next 3 Days Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Set Trigger for Lesson Cration to WorkDays Output (14 cols)
[Inherits all 14 columns from Table: AppTriggers]
+ Modified/Added Columns:
  - Instance Id: Text

### AddTrigger for all workdays Output (14 cols)
[Inherits all 14 columns from Table: AppTriggers]
+ Modified/Added Columns:
  - Instance Id: Text

### Create Lesson for Next 8,11,15,21,31 Days Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Setup Input AppTrigger for Workday to create lessons Output (14 cols)
[Inherits all 14 columns from Table: AppTriggers]
+ Modified/Added Columns:
  - Instance Id: Text

### Launch WorkDay Trigger to create lessons Output (14 cols)
[Inherits all 14 columns from Table: AppTriggers]
+ Modified/Added Columns:
  - Instance Id: Text

### Any Conditions needs to be verified Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Set Trigger for the Lessons Output (14 cols)
[Inherits all 14 columns from Table: AppTriggers]
+ Modified/Added Columns:
  - Instance Id: Text

### Launch Trigger for the lessons Output (14 cols)
[Inherits all 14 columns from Table: AppTriggers]
+ Modified/Added Columns:
  - Instance Id: Text

### Process for TriggerDailyActions11pm Process Table (20 cols)
[Inherits all 14 columns from Table: AppTriggers]
+ Modified/Added Columns:
  - Instance Id: Text
  - Any condition before changing the booking status: Ref
  - Mark as Upcomming: Ref
  - Mark as Active: Ref
  - Mark as MakeUp: Ref
  - Mark as Expired: Ref
  - Mark as Cancelled: Ref

### Any condition before changing the booking status Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Mark as Upcomming Output (14 cols)
[Inherits all 14 columns from Table: AppTriggers]
+ Modified/Added Columns:
  - Instance Id: Text

### Mark as Active Output (14 cols)
[Inherits all 14 columns from Table: AppTriggers]
+ Modified/Added Columns:
  - Instance Id: Text

### Mark as MakeUp Output (14 cols)
[Inherits all 14 columns from Table: AppTriggers]
+ Modified/Added Columns:
  - Instance Id: Text

### Mark as Expired Output (14 cols)
[Inherits all 14 columns from Table: AppTriggers]
+ Modified/Added Columns:
  - Instance Id: Text

### Mark as Cancelled Output (14 cols)
[Inherits all 14 columns from Table: AppTriggers]
+ Modified/Added Columns:
  - Instance Id: Text

### Process for TriggerTemporaryActions Process Table (20 cols)
[Inherits all 14 columns from Table: AppTriggers]
+ Modified/Added Columns:
  - Instance Id: Text
  - Any condition: Ref
  - Mark Scheduled Lessons as Completed: Ref
  - Update Completed Lesson: Ref
  - create booking: Ref
  - set trigger: Ref
  - launch trigger: Ref

### Any condition Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Mark Scheduled Lessons as Completed Output (14 cols)
[Inherits all 14 columns from Table: AppTriggers]
+ Modified/Added Columns:
  - Instance Id: Text

### Update Completed Lesson Output (14 cols)
[Inherits all 14 columns from Table: AppTriggers]
+ Modified/Added Columns:
  - Instance Id: Text

### create booking Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### set trigger Output (14 cols)
[Inherits all 14 columns from Table: AppTriggers]
+ Modified/Added Columns:
  - Instance Id: Text

### launch trigger Output (14 cols)
[Inherits all 14 columns from Table: AppTriggers]
+ Modified/Added Columns:
  - Instance Id: Text

### Process for TriggerDailyActions47min Process Table (16 cols)
[Inherits all 14 columns from Table: AppTriggers]
+ Modified/Added Columns:
  - Instance Id: Text
  - Any check: Ref
  - Mark Lessons Completed for less then 3 days: Ref

### Any check Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Mark Lessons Completed for less then 3 days Output (14 cols)
[Inherits all 14 columns from Table: AppTriggers]
+ Modified/Added Columns:
  - Instance Id: Text

### Process for AutomaticSales - 1 Process Table (60 cols)
[Inherits all 61 columns from Table: Process for Create_Fee_Receipt Process Table]
+ Modified/Added Columns:
  - Some Other Conditions to be met: Ref
  - Set SalesTemplate to SalesRef in SalesItems: Ref
  - Create same SalesItems: Ref
  - Set the SalesRef value to blank for the SalesItem: Ref

### Some Other Conditions to be met Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Set SalesTemplate to SalesRef in SalesItems Output (56 cols)
[Inherits all 61 columns from Table: Process for Create_Fee_Receipt Process Table]

### Create same SalesItems Output (56 cols)
[Inherits all 61 columns from Table: Process for Create_Fee_Receipt Process Table]

### Set the SalesRef value to blank for the SalesItem Output (56 cols)
[Inherits all 61 columns from Table: Process for Create_Fee_Receipt Process Table]

### Process for TriggerDailyActions23min Process Table (20 cols)
[Inherits all 14 columns from Table: AppTriggers]
+ Modified/Added Columns:
  - Instance Id: Text
  - Create Booking for Today: Ref
  - Set Trigger for the Lessons: Ref
  - Launch Trigger for the lessons: Ref
  - Create Lesson Booking for tomorrow: Ref
  - set the trigger on the Lessons: Ref
  - Launch Trigger on the Lesson: Ref

### Create Booking for Today Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Set Trigger for the Lessons Output 2 (14 cols)
[Inherits all 14 columns from Table: AppTriggers]
+ Modified/Added Columns:
  - Instance Id: Text

### Launch Trigger for the lessons Output 2 (14 cols)
[Inherits all 14 columns from Table: AppTriggers]
+ Modified/Added Columns:
  - Instance Id: Text

### Create Lesson Booking for tomorrow Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### set the trigger on the Lessons Output (14 cols)
[Inherits all 14 columns from Table: AppTriggers]
+ Modified/Added Columns:
  - Instance Id: Text

### Launch Trigger on the Lesson Output (14 cols)
[Inherits all 14 columns from Table: AppTriggers]
+ Modified/Added Columns:
  - Instance Id: Text

### Process for StudentInfo Process Table (22 cols)
[Inherits all 17 columns from Table: StudentInfo]
+ Modified/Added Columns:
  - Instance Id: Text
  - Update Existing Student: Ref
  - Update Student Information: Ref
  - Create New Student: Ref
  - Create New Party as student: Ref
  - Update PartyRef: Ref

### Update Existing Student Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Update Student Information Output (17 cols)
[Inherits all 17 columns from Table: StudentInfo]
+ Modified/Added Columns:
  - Instance Id: Text

### Create New Student Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Create New Party as student Output (17 cols)
[Inherits all 17 columns from Table: StudentInfo]
+ Modified/Added Columns:
  - Instance Id: Text

### Update PartyRef Output (17 cols)
[Inherits all 17 columns from Table: StudentInfo]
+ Modified/Added Columns:
  - Instance Id: Text

### Process for TriggerWeekly02amM - 1 Process Table (16 cols)
[Inherits all 14 columns from Table: AppTriggers]
+ Modified/Added Columns:
  - Instance Id: Text
  - Any Condition: Ref
  - update the sales status: Ref

### Any Condition Output 2 (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### update the sales status Output (14 cols)
[Inherits all 14 columns from Table: AppTriggers]
+ Modified/Added Columns:
  - Instance Id: Text

### Process for Certificate Process Table (21 cols)
[Inherits all 18 columns from Table: Certificate]
+ Modified/Added Columns:
  - Instance Id: Text
  - Any Condition: Ref
  - create new certificate: Ref
  - New step: Ref

### Any Condition Output 3 (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### create new certificate Output (2 cols)
```
  Instance Id: Text
  DriveFile: Text
```

### New step Output (18 cols)
[Inherits all 18 columns from Table: Certificate]
+ Modified/Added Columns:
  - Instance Id: Text

### Process for UpdateInSalesItem - 1 Process Table (75 cols)
[Inherits all 68 columns from Table: Process for Update_Sales_Record Process Table]
+ Modified/Added Columns:
  - check any condition for student update: Ref
  - Update the current belt of student: Ref
  - Check it substatus is pass or Double for grading: Ref
  - Create the Certificate: Ref
  - if double then create one more: Ref
  - create Double certificate: Ref
  - Update Current certificate: Ref
  - update the current certificate: Ref

### check any condition for student update Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Update the current belt of student Output (67 cols)
[Inherits all 68 columns from Table: Process for Update_Sales_Record Process Table]

### Check it substatus is pass or Double for grading Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### Create the Certificate Output (67 cols)
[Inherits all 68 columns from Table: Process for Update_Sales_Record Process Table]

### if double then create one more Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### create Double certificate Output (67 cols)
[Inherits all 68 columns from Table: Process for Update_Sales_Record Process Table]

### Update Current certificate Output (2 cols)
```
  Instance Id: Text
  Result: Yes/No
```

### update the current certificate Output (67 cols)
[Inherits all 68 columns from Table: Process for Update_Sales_Record Process Table]

## Slices
- **Me** (Party): `=OR(
  AND(
    IN(
      USEREMAIL(),
      { "management@gaonhaetaekwondo.com", "hello@gaonhaetaekwondo.com"}
    ),
    [AccessKey] = USERSETTINGS("AccessKey"),
    ISNOTBLANK(USERSETTINGS("AccessKey"))
  ),
  AND([Type] = "User", [Email] = USEREMAIL())
)`
- **My_Students** (Party): `=and(
 [Type]="Student",
 not(In([Status],{"Deleted","Withdrawn"})),
 not(isblank(intersect([AccessBranch],Any(Me[AccessBranch]))))
)`
- **Not_Delivered_Sales** (SalesItem): `=and([Product].[Delivery]=true,isblank([DeliveredOn]),[Sales].[Status]="Fee Receipt",[Sales].[SubStatus]<>"Cancelled",in([Product].[Category],{"UN","TS","PG","BT","OT"}),in([Branch],any(Me[AccessBranch])))`
- **SalesView** (AppView): `=[Type]="Sales"`
- **ProductView** (AppView): `=[Type]="Product"`
- **AdminView** (AppView): `=[Type]="Admin"`
- **AttendanceView** (AppView): `=and([Type]="Attendance",In(Any(Me[Role]),[AllowRoles]),if(isblank([AllowBranch]),true,not(isblank(intersect(Any(Me[AccessBranch]),[AllowBranch])))))`
- **ManageView** (AppView): `=[Type]="Management"`
- **Visible_Sales** (SalesItem): `=and(
 In([Sales].[Branch],Select(BranchParty[Branch],[Party]=any(Me[ID]))),
 [Product].[Category]<>"CR"
)`
- **GradingView** (AppView): `=[Type]="Grading"`
- **Visible_Certificate** (Certificate): `=And(
 or(isblank([Status]),isblank([DeliveredOn])),
 In([Student].[Branch],Select(BranchParty[Branch],[Party]=any(Me[ID])))
)`
- **StudentView** (AppView): `=[Type]="Student"`
- **Payments** (SalesItem): `=[Category]="CR"`
- **NoBookings** (SalesItem): `=and(
 [Sales].[Status]="Fee Receipt",
 [Sales].[SubStatus]<>"Cancelled",
 [Product].[Category]="CL",
 [Date]>=Date("04/01/2024"),
 isblank([Schedule]),
 In([Sales].[Branch],Select(BranchParty[Branch],[Party]=any(Me[ID])))
)`
- **InvTxn** (SalesItem): `=and(
 in([Sales].[Status],{"Fee Receipt"}),
 [Product].[Category].[Inv_Track]=true,
 isblank([DeliveredOn])
)`
- **WeekStat** (WorkWeek): `=and([Week].[StartDate]>=today()-28,[Week].[StartDate]<=today())`
- **PartyView** (AppView): `=and([Type]="Party", in(Any(Me[Role]),[AllowRoles]))`
- **MyTask** (Task): `=and(
 not(In([Status],{"Completed","Rejected","Cancelled","Repeating","Stopped"})),
 IN(Any(Me[ID]),[AssignedTo])
)`
- **TemplateTask** (Task): `=[Status]="Repeating"`
- **DeveloperView** (AppView): `=[Type]="Developer"`
- **RecentLessons** (Lesson): `=and([Date]<=today(),[Date]>=today()-14,[Status]<>"Cancelled",in([Branch],any(Me[AccessBranch])))`
- **CurrentLesson** (Lesson): `=and([Date]=today(),[Start_Time]<=timenow(),[End_Time]>=timenow(),[Status]<>"Cancelled",in([Branch],any(Me[AccessBranch])))`
- **PendingSalesPayment** (Sales): `=and(
 [SubStatus]<>"Cancelled",
 [SubStatus]<>"Bad Debt",
 [Due Amount]<>0,[Status]="Fee Advice",
 In([Branch],Select(BranchParty[Branch],[Party]=any(Me[ID])))
)`
- **PendingInvoicesToIssueThisMonth** (Party): `=And(
 [Type]="Student",
 [SubStatus]="Active",
 not(in([ID],CurrentMonthClassInvoices[Party])),
 not(isblank(intersect([AccessBranch],Any(Me[AccessBranch]))))
)`
- **CurrentMonthClassInvoices** (SalesItem): `=and(
Month([Dated])=month(today()),
Year([Dated])=Year(today()),
[Product].[Category]="CL",
[Product]<>"46c56722",
[Sales].[SubStatus]<>"Cancelled",
not(isblank(intersect(list([Branch]),Any(Me[AccessBranch]))))
)`
- **UnwantedLessons** (Lesson): `=OR(
 or([WorkDay].[Lesson]=false,and([Schedule].[Status]="Inactivee",[Date]>=date("03/03/2024"))),
 1=2
)`
- **EditSalesItemDated** (SalesItem): `=and([Product].[Category]="CL",[Date]>=date("04/01/2024"),[Status]<>"Cancelled",isblank([Dated]))`
- **UnwantedAttendance** (Attendance): `=Or(
 isblank([Lesson].[Date]),
 [Booking].[Sales].[SubStatus]="Cancelled"
)`
- **NextMonthClassInvoices** (SalesItem): `=and(
Month([Dated])=month(eomonth(today(),0)+1),
Year([Dated])=Year(eomonth(today(),0)+1),
[Product].[Category]="CL",
[Product]<>"46c56722",
[Sales].[SubStatus]<>"Cancelled",
not(isblank(intersect(list([Branch]),Any(Me[AccessBranch]))))
)`
- **PendingInvoicesToIssueNextMonth** (Party): `=And(
 [Type]="Student",
 [SubStatus]="Active",
 not(in([ID],NextMonthClassInvoices[Party])),
 not(isblank(intersect([AccessBranch],Any(Me[AccessBranch]))))
)`
- **NoBookingsPreference** (SalesItem): `=and(
 [Sales].[Status]="Fee Receipt",
 [Sales].[SubStatus]<>"Cancelled",
 [Product].[Category]="CL",
 [Product]<>"46c56722",
 [Dated]>=eomonth(today(),-1)+1,
 [Dated]<=eomonth(today(),1)+0,
 Or(
 and(count([Schedule])<[Product].[BookingWeekly],[Product].[BookingWeekly]>0),
 not(isblank(intersect([Schedule],select(Schedule[ID],[Status]="Inactive"))))
 ),
 In([Sales].[Branch],Select(BranchParty[Branch],[Party]=any(Me[ID])))
)`
- **SplitClassSalesItem** (SalesItem): `=and([Product].[Category]="CL",[Date]>=date("04/01/2023"),[Status]<>"Cancelled",[Quantity]>1,[Product].[Varient]<>"Per Lesson")`
- **PendingAllSalesPayment** (Sales): `=and(
 [SubStatus]<>"Cancelled",
 [SubStatus]<>"Bad Debt",
 [Due Amount]<>0,[Status]<>"Fee Advice",
 In([Branch],Select(BranchParty[Branch],[Party]=any(Me[ID])))
)`
- **My_StudentsDuePayment** (Party): `=and(
 [Type]="Student",
 not(In([Status],{"Deleted","Withdrawn"})),
 not(isblank(intersect([AccessBranch],Any(Me[AccessBranch])))),
 [Balance]<>0
)`
- **Trial_Sales** (SalesItem): `=and(
 in([Product],{"46c56722"}),
 [Party].[Status]<>"Deleted",
 not(isblank(intersect(list([Branch]),Any(Me[AccessBranch]))))
)`
- **My_ActiveStudents** (Party): `=and(
 [Type]="Student",
 In([Status],{"Active","Inactive","Trial"}),
 not(isblank(intersect([AccessBranch],Any(Me[AccessBranch]))))
)`
- **Classes_Sales** (SalesItem): `=and(
 [Product].[Category]="CL",
 [Product]<>"46c56722",
 [Sales].[Status]="Fee Receipt",
 [Sales].[SubStatus]<>"Cancelled",
 not(isblank(intersect(list([Branch]),Any(Me[AccessBranch]))))
)`
- **BookingPreferences** (SalesItem): `=and(
 [Sales].[Status]="Fee Receipt",
 [Sales].[SubStatus]<>"Cancelled",
 [Product].[Category]="CL",
 [Product]<>"46c56722",
 [Dated]>date("01/01/2025"),
 [Product].[BookingMax]>[MaxLesson]
)`
- **ValidBookingPreferences** (SalesItem): `=and(
 [Product].[Category]="CL",
 [Product]<>"46c56722"
)`
- **IncompeleteLessons** (Lesson): `=and(
 [Date]`
- **EditDateOfSales** (SalesItem): `=Eomonth([Dated],-1)`
- **CreateBookings** (SalesItem): `=and(
 [Dated]<=today(),
 eomonth([Dated],0)>=today(),
 in("LessonBooking",[AppDataTags]),
 [Sales].[Status]="Fee Receipt",
 [Sales].[SubStatus]="Paid",
 count([Schedule])=[WeeklyLesson],
 [WeeklyLesson]>0,
 (decimal([BilledLesson])/decimal([MaxLesson]))<0.8
)`
- **Grading_Sales** (SalesItem): `=and(
 In([Product].[Category],{"GC"}),
 [Product]<>"46c56722",
 in([Sales].[Status],{"Fee Advice","Fee Receipt"}),
 [Sales].[SubStatus]<>"Cancelled",
 or([Grading].[Date]>=TODAY()-120,[Dated]>=TODAY()-120,[DateOfSale]>=TODAY()-120),
 not(isblank(intersect(list([Branch]),Any(Me[AccessBranch]))))
)`
- **AllSales** (Sales): `=TRUE`
- **Inventory** (BranchProduct): `=AND([Status]="Active",[ProductStatus]="Active",[Product].[Delivery]=TRUE,in([Category],{"PG","TS","UN"}))`

## Views
### Custom Views
- **Sales_View**: card → ? pos=center
- **Attendance_View**: card → ? pos=center
- **User_Dashboard**: dashboard → ? pos=left
- **Add_Sales**: form → ? pos=left
- **AllTask**: table → ? pos=menu
- **Grading**: table → ? pos=menu
- **Owner_Dashboard**: dashboard → ? pos=menu
- **Dev_Dashboard**: dashboard → ? pos=menu
- **Student Response**: table → ? pos=menu
- **Party_View**: card → ? pos=menu
- **Student_View**: card → ? pos=menu
- **Product_View**: card → ? pos=menu
- **Inventory**: table → ? pos=menu
- **Information**: card → ? pos=menu
- **TaskTemplate**: table → ? pos=menu
- **Manage_View**: card → ? pos=menu
- **Admin_View**: card → ? pos=menu
- **Developer_View**: card → ? pos=menu
- **Settings**: form → ? pos=menu
- **Active_Student**: table → ? pos=ref
- **AllSales**: table → ? pos=ref
- **AllSalesItem**: table → ? pos=ref
- **Analysis_View**: dashboard → ? pos=ref
- **AppSettings**: table → ? pos=ref
- **AppSettings_Inline**: table → ? pos=ref
- **AppTriggers**: table → ? pos=ref
- **AppVariables**: table → ? pos=ref
- **Attendance_Inline**: table → ? pos=ref
- **BookingPreferences**: table → ? pos=ref
- **Branches**: card → ? pos=ref
- **BranchParty**: table → ? pos=ref
- **BranchParty_Inline**: table → ? pos=ref
- **BranchProduct_Inline**: table → ? pos=ref
- **BulkAttendance**: table → ? pos=ref
- **Certificate_Inline**: table → ? pos=ref
- **Class**: card → ? pos=ref
- **Classes_Sales**: table → ? pos=ref
- **Controls**: table → ? pos=ref
- **CreateBooking**: table → ? pos=ref
- **CurrentLesson**: detail → ? pos=ref
- **Delivery**: table → ? pos=ref
- **EditDateOfSales**: table → ? pos=ref
- **EditSalesItemDated**: table → ? pos=ref
- **F_Grading**: table → ? pos=ref
- **Grading_Inline**: table → ? pos=ref
- **Grading_View**: card → ? pos=ref
- **GradingSlots**: table → ? pos=ref
- **IncompeleteLessons**: table → ? pos=ref
- **InfoItm_Inline**: card → ? pos=ref
- **InvAc_Inline**: table → ? pos=ref
- **Lesson**: table → ? pos=ref
- **Lesson_Calendar**: calendar → ? pos=ref
- **Lesson_Dashboard**: dashboard → ? pos=ref
- **Lesson_Schedule**: calendar → ? pos=ref
- **ModifyBookingPreferences**: table → ? pos=ref
- **MonthYear**: table → ? pos=ref
- **MyTask**: table → ? pos=ref
- **New_Booking**: form → ? pos=ref
- **NoBooking**: table → ? pos=ref
- **NoBookingsPreference**: table → ? pos=ref
- **Party**: table → ? pos=ref
- **Party_Inline**: table → ? pos=ref
- **Payment**: detail → ? pos=ref
- **PendingAllSalesPayment**: table → ? pos=ref
- **PendingInvoicesToIssueNextMonth**: table → ? pos=ref
- **PendingInvoicesToIssueThisMonth**: table → ? pos=ref
- **PendingPayment**: table → ? pos=ref
- **PendingSalesPayment**: table → ? pos=ref
- **Pricing**: table → ? pos=ref
- **Product**: table → ? pos=ref
- **Product_Inline**: table → ? pos=ref
- **Sales**: table → ? pos=ref
- **Sales_Inline**: table → ? pos=ref
- **SalesItem_Inline**: table → ? pos=ref
- **Schedule**: table → ? pos=ref
- **SplitClassSalesItem**: table → ? pos=ref
- **StockEntry**: table → ? pos=ref
- **Student**: table → ? pos=ref
- **Student_Deshboard**: dashboard → ? pos=ref
- **Student_Schedule**: calendar → ? pos=ref
- **Terms**: table → ? pos=ref
- **Trial_Sales**: table → ? pos=ref
- **UnwantedAttendance**: table → ? pos=ref
- **UnwantedLessons**: table → ? pos=ref
- **ValidBookingPreferences**: table → ? pos=ref
- **Visible_Certificate**: table → ? pos=ref
- **Visible_Student**: table → ? pos=ref
- **Week**: table → ? pos=ref
- **WorkDay**: table → ? pos=ref
- **WorkDay_Inline**: table → ? pos=ref
- **WorkMonth**: table → ? pos=ref
- **WorkMonth_Inline**: table → ? pos=ref
- **WorkWeek**: table → ? pos=ref
### Auto-generated (87)
  AdminView_Detail, AppSettings_Detail, AppSettings_Form, AppTriggers_Detail, AppTriggers_Form, AppVariables_Detail, AppVariables_Form, AppView_Detail, Attendance_Detail, Attendance_Form, AttendanceView_Detail, BookingPreferences_Detail, BookingPreferences_Form, Branch_Detail, Branch_Form, BranchParty_Detail, BranchParty_Form, BranchProduct_Detail, BranchProduct_Form, Category_Detail, Certificate_Detail, Certificate_Form, Class_Detail, Class_Form, Controls_Detail, Controls_Form, Day_Detail, DeveloperView_Detail, F_Grading_Detail, Grading_Detail, Grading_Form, Grading_Sales_Detail, Grading_Sales_Form, GradingView_Detail, Info_Detail, Info_Form, InfoItm_Detail, InfoItm_Form, InvAc_Detail, Inventory_Detail, Inventory_Form, InvTxn_Detail, Lesson_Detail, Lesson_Form, Level_Detail, Login_Detail, ManageView_Detail, MonthYear_Detail, My_Students_Detail, My_StudentsDuePayment_Detail, MyTask_Detail, MyTask_Form, NoBookings_Detail, Party_Detail, Party_Form, PartyView_Detail, Payments_Detail, Payments_Form, PendingAllSalesPayment_Detail, Product_Detail, Product_Form, ProductView_Detail, Sales_Detail, Sales_Form, SalesItem_Detail, SalesItem_Form, SalesView_Detail, Schedule_Detail, Schedule_Form, StudentInfo_Detail, StudentInfo_Form, StudentView_Detail, Task_Detail, Task_Form, TemplateTask_Detail, TemplateTask_Form, Terms_Form, Visible_Certificate_Detail, Visible_Certificate_Form, Week_Detail, WeekStat_Detail, WorkDay_Detail, WorkDay_Form, WorkMonth_Detail, WorkMonth_Form, WorkWeek_Detail, WorkWeek_Form

## Actions
### Party
  _Auto (10): EMAIL, NAVIGATE_APP, NAVIGATE_URL_
  - **Update_Student**: SET_COLUMN_VALUE IF `true`
  - **Action for Remove Branch Party for Old Branch**: REF_ACTION IF `true`
  - **Action for Create new BranchParty row for new Branch**: ADD_RECORD_TO IF `true`
  - **Call Phone (WhatsApp) (→"Phone call")**: CALL IF `NOT(ISBLANK([WhatsApp]))`
  - **Send SMS (WhatsApp) (→"Text message")**: SMS IF `NOT(ISBLANK([WhatsApp]))`
  - **Party_Edit (→"Edit")**: NAVIGATE_APP IF `true`
  - **Party_Trial (→"Trial")**: NAVIGATE_APP IF `=[Status]="Trial"`
  - **Party_Sales (→"="+Sales"")**: NAVIGATE_APP
  - **Add_Student (→"Add Student")**: NAVIGATE_APP IF `=in(Context("view"),{"User_Dashboard","Active_Student"})`
  - **Set Status and SubStatus as Active Action - 1**: SET_COLUMN_VALUE IF `true`
  - **Set_Status_Inline (→"Status")**: SET_COLUMN_VALUE IF `=or(1=1,Context("view")="User_Dashboard")`
  - **Party_Detail (→"Details")**: NAVIGATE_APP IF `=context("view")<>"Party_Detail"`
  - **Party_Detail_Inline (→"Details")**: NAVIGATE_APP IF `true`
  - **Call Phone (Mobile) (→"Phone call")**: CALL IF `NOT(ISBLANK([Mobile]))`
  - **Send SMS (Mobile) (→"Text message")**: SMS IF `NOT(ISBLANK([Mobile]))`
  - **Student_Schedule (→"Schedule")**: NAVIGATE_APP IF `=[Type]="Student"`
  - **Export_Party (→"Export")**: EXPORT_VIEW IF `=context("view")="Party"`
  - **InputData_Party (→"Status")**: SET_COLUMN_VALUE IF `=or(1=1,Context("view")="User_Dashboard")`
  - **Party_Balance (→"Receivable")**: NAVIGATE_APP IF `=AND(
  in(Context("view"),{"User_Dashboard","Active_Student","Visible_Student"}`

### Product
  _Auto (45): ADD_RECORD, EDIT_RECORD, NAVIGATE_APP_
  - **Duplicate_Product (→"Duplicate")**: COPY_EDIT_ROW IF `true`
  - **Export_product (→"Export")**: EXPORT_VIEW IF `=context("view")="Product"`

### Attendance
  _Auto (4): NAVIGATE_APP_
  - **Update_Attendance**: SET_COLUMN_VALUE IF `true`
  - **Re-Schedule_Old**: SET_COLUMN_VALUE IF `=true`
  - **View Ref (Booking) (→"Booking")**: NAVIGATE_APP IF `NOT(ISBLANK([Booking]))`
  - **Re-Schedule_Group (→"="Re-Schedule"")**: COMPOSITE IF `=And(
 in([Status],{"Booked","Absent"}),
 in([Booking].[SubStatus],{"Active","Ma`
  - **Set_Attendance_Status (→"Set Status")**: SET_COLUMN_VALUE IF `true`
  - **Action for Update Booking Status**: REF_ACTION IF `true`
  - **Evaluate_Attendance_Status (→"Set Status")**: SET_COLUMN_VALUE IF `true`
  - **View Ref (Student) Inline (→""Student"")**: NAVIGATE_APP IF `NOT(ISBLANK([Student]))`
  - **marke makeup booking Action - 1**: SET_COLUMN_VALUE IF `true`
  - **Mark the Sales as PostPay Action - 1**: REF_ACTION IF `true`
  - **View_Booking (→"Booking")**: NAVIGATE_APP IF `true`
  - **Update Booking Pref (→"Preference")**: REF_ACTION IF `=[Date]>=TODAY()`

### Lesson
  - **Add_Booking (→"Add Booking")**: NAVIGATE_APP IF `=and([Status]="Scheduled",context("view")<>"User_Dashboard")`
  - **Input_WorkDay_Booking**: SET_COLUMN_VALUE IF `true`
  - **Set_Status_Lesson (→"Lesson Status")**: SET_COLUMN_VALUE IF `=if(in(Any(Me[Role]),{"Owner"}),true,Or(in([Status],{"Scheduled","Completed"}),[`
  - **Update_Lesson (→"Update Lesson")**: SET_COLUMN_VALUE IF `=and(In(Any(Me[Role]),{"Owner"}),context("view")<>"User_Dashboard")`
  - **Lesson_Input_Booking**: SET_COLUMN_VALUE IF `true`
  - **Add_Attendance_Booking**: ADD_RECORD_TO IF `true`
  - **Action for Update Status of Booking to Absent**: REF_ACTION IF `true`
  - **Action for Update Status of Booking to Present**: REF_ACTION IF `true`
  - **Cancel All Related Attendance for this Lesson. Action - 1**: REF_ACTION IF `true`
  - **Set Lesson Status Complete Action - 1**: SET_COLUMN_VALUE IF `true`
  - **Add_NewBooking (→"Add Booking")**: NAVIGATE_APP IF `=and([Status]="Scheduled",context("view")="User_Dashboard")`
  - **SetInputAppTriggerForLesson (→"Set Trigger")**: SET_COLUMN_VALUE IF `=context("view")<>"User_Dashboard"`
  - **LaunchAppTriggerForLesson (→"Launch Trigger")**: ADD_RECORD_TO IF `=context("view")<>"User_Dashboard"`
  - **AllowedBookingsForLesson (→"Allowed Booking")**: NAVIGATE_APP IF `=context("view")<>"User_Dashboard"`
  - **InputDataForLesson**: SET_COLUMN_VALUE IF `true`
  - **ScheduledBookingsForLesson (→"Scheduled Booking")**: NAVIGATE_APP IF `=context("view")<>"User_Dashboard"`

### SalesItem
  _Auto (22): DELETE_RECORD, NAVIGATE_APP_
  - **Delivered**: SET_COLUMN_VALUE IF `=and(
  [Product].[Delivery]=true,
  isblank([DeliveredOn]),
  [Sales].[Status]=`
  - **Update the Parent Sale Action - 1**: REF_ACTION IF `true`
  - **Create Certificate**: ADD_RECORD_TO IF `=AND(
  [Product].[Category]="GC",
  [Sales].[SubStatus]<>"Cancelled",
  count([`
  - **Update_SalesItem**: SET_COLUMN_VALUE IF `true`
  - **UpdateTrialStatus (→"Update Trial")**: SET_COLUMN_VALUE IF `=and(
 in([Product],{"46c56722"}),
 1=1
)`
  - **Update_BookingPreference (→"Preference")**: SET_COLUMN_VALUE IF `=and(
 in([ID],ValidBookingPreferences[ID]),
 today()>=eomonth([Dated],-2),
 tod`
  - **SetInputAppTriggerForSalesItem (→"Set Trigger")**: SET_COLUMN_VALUE IF `=and(
  ANY(Me[Role])="Owner",
  NOT(IN(CONTEXT("View"),{"Grading"}))
)`
  - **LaunchAppTriggerForSalesItem (→"Launch Trigger")**: ADD_RECORD_TO IF `=and(
  ANY(Me[Role])="Owner",
  NOT(IN(CONTEXT("View"),{"Grading"}))
)`
  - **CreateBookingForLesson (→"Create Attendance")**: ADD_RECORD_TO IF `true`
  - **InputActionSalesItem**: SET_COLUMN_VALUE IF `true`
  - **Export_SalesItems (→"Export")**: EXPORT_VIEW IF `=IN(context("view"),{"AllSalesItem","Sales"})`
  - **Booking_Schedule (→"Schedule")**: NAVIGATE_APP IF `=in([ID],ValidBookingPreferences[ID])`
  - **View_Sales (→"View Sales")**: NAVIGATE_APP IF `true`
  - **Inline_Update_BookingPreference**: COMPOSITE IF `=in(context("view"),{"BookingPreferences","NoBookingsPreference","User_Dashboard`
  - **Update_BookingPreference 2 (→"Preference")**: SET_COLUMN_VALUE IF `=and(
 in([ID],ValidBookingPreferences[ID]),
 today()>=eomonth([Dated],-2),
 tod`
  - **CreateNewSalesItemLikeThis**: ADD_RECORD_TO IF `true`
  - **InputActionSalesItemAny**: SET_COLUMN_VALUE IF `true`
  - **Upload Certificate (→"Edit Certificate")**: NAVIGATE_APP IF `=AND(
  [Product].[Category]="GC",
  [Sales].[Status]="Fee Receipt",
  count([Re`
  - **Export_Gradings (→"Export")**: EXPORT_VIEW IF `=context("view")="Grading"`
  - **Update_Grading (→"=if([Grading].[Date]>=TODAY(),"Update Result","Update Grading")")**: SET_COLUMN_VALUE IF `=AND(
  [Product].[Category]="GC",
  [Sales].[SubStatus]<>"Cancelled",
  count([`
  - **View_Certificate (→"View Certificate")**: NAVIGATE_APP IF `=AND(
  [Product].[Category]="GC",
  [Sales].[SubStatus]<>"Cancelled",
  count([`
  - **Create the Certificate Action - 1**: ADD_RECORD_TO IF `true`
  - **Update the current belt of student Action - 1**: REF_ACTION IF `true`
  - **Action for update the current certificate**: REF_ACTION IF `true`
  - **create Double certificate Action - 1**: ADD_RECORD_TO IF `true`
  - **View_Certificate 2 (→"View Certificate")**: NAVIGATE_APP IF `=AND(
  [Product].[Category]="GC",
  [Sales].[SubStatus]<>"Cancelled",
  count([`
  - **Refund**: SET_COLUMN_VALUE IF `=and(CONTEXT("View")="Payments_Detail",[SubStatus]<>"Refunded")`
  - **View_Payment (→"View Payments")**: NAVIGATE_APP IF `=AND(
  [Product].[Category]="CR",
  [Sales].[SubStatus]<>"Cancelled."
)`
  - **Temp_UpdateTermDescription**: SET_COLUMN_VALUE IF `=USEREMAIL()="gaonhae.taekwondo.associate.nomi@gmail.com"`

### Schedule
  _Auto (1): NAVIGATE_APP_
  - **Assign_Schedule_to_WorkDay**: SET_COLUMN_VALUE IF `true`
  - **Create_Lesson_for_WorkDay**: ADD_RECORD_TO IF `true`
  - **Scheduled_LessonsStartEnd**: SET_COLUMN_VALUE IF `true`

### Sales
  _Auto (2): NAVIGATE_APP_
  - **Create_Fee_Receipt**: SET_COLUMN_VALUE IF `=isblank([Fee_Receipt])`
  - **Update_Sales (→"Update")**: SET_COLUMN_VALUE IF `true`
  - **Cancel_Sale (→"Cancel")**: SET_COLUMN_VALUE IF `=and(
  or(isblank([Fee_Receipt_Date]),[Fee_Receipt_Date]>=today()-1),
  [SubSta`
  - **Add Payment (→"Payment")**: NAVIGATE_APP IF `=and(
 not([SubStatus]="Cancelled"),
 [Due Amount]<>0
 )`
  - **Revise_Sale (→"Revise")**: SET_COLUMN_VALUE IF `=and([Date]>=today()-if(Any(Me[Role])="Owner",360,180),not(in([SubStatus],{"Revi`
  - **Open File (PDF_File) (→""Open PDF"")**: OPEN_FILE IF `NOT(ISBLANK([PDF_File]))`
  - **Export**: EXPORT_VIEW IF `true`
  - **AddPaymentInline (→"Payment")**: COMPOSITE IF `=and(
 not([SubStatus]="Cancelled"),
 [Due Amount]<>0
 )`
  - **SalesDetails (→"=[Status]&" Details"")**: NAVIGATE_APP IF `true`
  - **OpenPDFInline (→"Open PDF")**: COMPOSITE IF `=NOT(ISBLANK([PDF_File]))`
  - **Add_NewSales (→"Add Sales")**: NAVIGATE_APP IF `=context("view")="User_Dashboard"`
  - **Update the sales voucher number Action - 1**: SET_COLUMN_VALUE IF `true`
  - **Action for Update Receipt Number**: SET_COLUMN_VALUE IF `true`
  - **Update_Sales_Status**: SET_COLUMN_VALUE IF `=useremail()="gaonhae.taekwondo.associate.nomi@gmail.com"`
  - **RoundOff**: SET_COLUMN_VALUE IF `true`
  - **CreateNewSalesLikeThis (→"Duplicate Sales")**: ADD_RECORD_TO IF `=in(USEREMAIL(),{"gaonhae.taekwondo.associate.nomi@gmail.com","alhk10@gmail.com"`
  - **Set SalesTemplate to SalesRef in SalesItems Action - 1**: REF_ACTION IF `true`
  - **Create same SalesItems Action - 1**: REF_ACTION IF `true`
  - **Set the SalesRef value to blank for the SalesItem Action - 1**: REF_ACTION IF `true`
  - **set the student status as Active Action - 1**: REF_ACTION IF `true`
  - **BadDebt (→"Bad Debt")**: SET_COLUMN_VALUE IF `=AND(
   IN(CONTEXT("View"),{"PendingSalesPayment","User_Dashboard"}),
   ANY(Me`
  - **Update_ERP_InvoiceID (→"BackTracking")**: SET_COLUMN_VALUE IF `=useremail()="gaonhae.taekwondo.associate.nomi@gmail.com"`
  - **Open_ERP_InvoiceID (→"ERPNext")**: NAVIGATE_URL IF `=useremail()="gaonhae.taekwondo.associate.nomi@gmail.com"`

### AppView
  _Auto (1): NAVIGATE_APP_
  - **OpenLink**: COMPOSITE IF `true`

### WorkWeek
  _Auto (1): NAVIGATE_APP_
  - **Input_Booking**: SET_COLUMN_VALUE IF `true`
  - **ReCalculate_WorkWeek**: SET_COLUMN_VALUE IF `true`
  - **Set_WorkDay_Booking**: REF_ACTION IF `true`
  - **Action for Set_Booking for WorkDay 2**: COMPOSITE IF `true`
  - **WorkWeek_Input_Booking**: SET_COLUMN_VALUE IF `true`

### WorkDay
  _Auto (1): NAVIGATE_APP_
  - **ReCalculate_WorkDay**: SET_COLUMN_VALUE IF `true`
  - **Get_Input_Booking**: SET_COLUMN_VALUE IF `true`
  - **WorkDay_Input_Booking**: SET_COLUMN_VALUE IF `true`
  - **SetInputAppTriggerForWorkDay**: SET_COLUMN_VALUE IF `true`
  - **LaunchAppTriggerForWorkDay**: ADD_RECORD_TO IF `=ISNOTBLANK([AppTrigger])`

### Reconciliation
  - **Action for Update Passbook Entry for Reco_Amt**: REF_ACTION IF `true`
  - **Action for Update Passbook**: REF_ACTION IF `true`
  - **Update Payment Action - 1**: REF_ACTION IF `true`

### InfoItm
  _Auto (3): NAVIGATE_APP, NAVIGATE_URL_

### WorkMonth
  _Auto (4): NAVIGATE_APP_
  - **ReCalculate_WorkMonth**: SET_COLUMN_VALUE IF `true`

### Task
  _Auto (6): NAVIGATE_URL, OPEN_FILE_
  - **Set_TaskStatus (→"Set Status")**: SET_COLUMN_VALUE IF `=not(in([Status],{"Cancelled","Rejected","Completed","Repeating","Stopped"}))`
  - **Done_TaskStatus (→"Completed")**: SET_COLUMN_VALUE IF `=not(in([Status],{"Cancelled","Rejected","Completed","Repeating","Stopped"}))`
  - **Action for Create a New Task**: ADD_RECORD_TO IF `true`
  - **Update the DueDate and NextDate Action - 1**: SET_COLUMN_VALUE IF `true`
  - **Action for Update WorkDay Stat for 50 Days in Past**: REF_ACTION IF `true`
  - **Update WorkDay Stat for 50 Days in Future Action - 1**: REF_ACTION IF `true`

### AppSettings
  _Auto (1): NAVIGATE_APP_

### AppTriggers
  - **Action for Add WorkDay to the Schedule**: REF_ACTION IF `true`
  - **Reset the WorkDay in the Schedule Action - 1**: REF_ACTION IF `true`
  - **Delete the Lesson if the schedule is inactive Action - 1**: REF_ACTION IF `true`
  - **Create Lesson against the WorkDay Action - 1**: REF_ACTION IF `true`
  - **Add Lesson to the Sales Item Action - 1**: REF_ACTION IF `true`
  - **Action for Create Booking against the Lesson**: REF_ACTION IF `true`
  - **Recalculate stats for SalesItem Action - 1**: REF_ACTION IF `true`
  - **Action for Set Trigger for the Lessons**: REF_ACTION IF `true`
  - **Action for Launch Trigger for the lessons**: REF_ACTION IF `true`
  - **Set Trigger for Lesson Cration to WorkDays Action - 1**: REF_ACTION IF `true`
  - **AddTrigger for all workdays Action - 1**: REF_ACTION IF `true`
  - **Action for Mark as Upcomming**: REF_ACTION IF `true`
  - **Action for Mark as Expired**: REF_ACTION IF `true`
  - **Mark as MakeUp Action - 1**: REF_ACTION IF `true`
  - **Mark as Active Action - 1**: REF_ACTION IF `true`
  - **Mark as Cancelled Action - 1**: REF_ACTION IF `true`
  - **Action for Mark Scheduled Lessons as Completed**: REF_ACTION IF `true`
  - **Action for Update Completed Lesson**: REF_ACTION IF `true`
  - **add the salesitem to the lessons Action - 1**: REF_ACTION IF `true`
  - **Create the Attendance against salesitem Action - 1**: REF_ACTION IF `true`
  - **update the stat for Booking preference Action - 1**: REF_ACTION IF `true`
  - **Action for set trigger**: REF_ACTION IF `true`
  - **launch trigger Action - 1**: REF_ACTION IF `true`
  - **Mark Lessons Completed for less then 3 days Action - 1**: REF_ACTION IF `true`
  - **Setup Input AppTrigger for Workday to create lessons Action - 1**: REF_ACTION IF `true`
  - **Launch WorkDay Trigger to create lessons Action - 1**: REF_ACTION IF `true`
  - **Action for Set Trigger for the Lessons 2**: REF_ACTION IF `true`
  - **Action for Launch Trigger for the lessons 2**: REF_ACTION IF `true`
  - **Action for set the trigger on the Lessons**: REF_ACTION IF `true`
  - **Launch Trigger on the Lesson Action - 1**: REF_ACTION IF `true`
  - **Set the automation trigger to blank Action - 1**: REF_ACTION IF `true`
  - **update the sales status Action - 1**: REF_ACTION IF `true`
  - **Set Trigger for Lesson Cration to WorkDays Action - 2**: REF_ACTION IF `true`
  - **AddTrigger for all workdays Action - 2**: REF_ACTION IF `true`
  - **Setup Input AppTrigger for Workday to create lessons Action - 2**: REF_ACTION IF `true`
  - **Launch WorkDay Trigger to create lessons Action - 2**: REF_ACTION IF `true`
  - **Action for Set Trigger for the Lessons 3**: REF_ACTION IF `true`
  - **Action for Launch Trigger for the lessons 3**: REF_ACTION IF `true`
  - **Set Trigger for Lesson Cration to WorkDays Action - 3**: REF_ACTION IF `true`
  - **AddTrigger for all workdays Action - 3**: REF_ACTION IF `true`
  - **Setup Input AppTrigger for Workday to create lessons Action - 3**: REF_ACTION IF `true`
  - **Launch WorkDay Trigger to create lessons Action - 3**: REF_ACTION IF `true`
  - **Action for Set Trigger for the Lessons 4**: REF_ACTION IF `true`
  - **Action for Launch Trigger for the lessons 4**: REF_ACTION IF `true`
  - **Mark Lessons Completed for less then 3 days Action - 2**: REF_ACTION IF `true`
  - **Action for Reset AppTrigger for WorkDay**: REF_ACTION IF `true`

### BranchProduct
  _Auto (2): NAVIGATE_APP_
  - **Duplicate_BranchProduct (→"Duplicate")**: COPY_EDIT_ROW IF `true`
  - **StockUpdate**: SET_COLUMN_VALUE IF `true`
  - **StockControl**: SET_COLUMN_VALUE IF `=ANY(Me[Role])="Owner"`
  - **Export_BranchProduct (→"Export")**: EXPORT_VIEW IF `=context("view")="Pricing"`

### Certificate
  _Auto (1): NAVIGATE_APP_
  - **New step Action - 1**: SET_COLUMN_VALUE IF `true`
  - **CertificatePDF (→"PDF")**: OPEN_FILE IF `=AND(NOT(ISBLANK([File])),[SalesItemID].[Paid]=TRUE)`
  - **CertificatePDF 2 (→"PDF")**: OPEN_FILE IF `=AND(NOT(ISBLANK([File])),[SalesItemID].[Paid]=FALSE)`

### AppVariables
  _Auto (1): NAVIGATE_URL_

### F_Grading
  _Auto (1): EMAIL_

### StudentInfo
  _Auto (2): EMAIL, NAVIGATE_URL_
  - **CallAction**: SET_COLUMN_VALUE IF `true`
  - **Create New Party as student Action - 1**: ADD_RECORD_TO IF `true`
  - **Action for Update Student Information**: REF_ACTION IF `true`
  - **Call Phone (Mobile Number) (→"Phone call")**: CALL IF `NOT(ISBLANK([Mobile Number]))`
  - **Send SMS (Mobile Number) (→"Text message")**: SMS IF `NOT(ISBLANK([Mobile Number]))`
  - **Call Phone (What's App Number) (→"Phone call")**: CALL IF `NOT(ISBLANK([What's App Number]))`
  - **Send SMS (What's App Number) (→"Text message")**: SMS IF `NOT(ISBLANK([What's App Number]))`
  - **Update PartyRef Action - 1**: SET_COLUMN_VALUE IF `true`
  - **View_StudentProfile (→"Student")**: NAVIGATE_APP IF `=ISNOTBLANK([PartyRef])`

## Observations
- ℹ️ **Product** has no Label column
- ℹ️ **Sales** has no Label column
- ℹ️ **Lesson** has no Label column
- ℹ️ **Attendance** has no Label column
- ℹ️ **Certificate** has no Label column
- ℹ️ **Level** has no Label column
- ℹ️ **SalesItem** has no Label column
- ℹ️ **Branch** has no Label column
- ℹ️ **Controls** has no Label column
- ℹ️ **Week** has no Label column
- ℹ️ **WorkDay** has no Label column
- ℹ️ **WorkWeek** has no Label column
- ℹ️ **Class** has no Label column
- ℹ️ **Schedule** has no Label column
- ℹ️ **BranchProduct** has no Label column
- ℹ️ **AppView** has no Label column
- ℹ️ **Day** has no Label column
- ℹ️ **Category** has no Label column
- ℹ️ **MonthYear** has no Label column
- ℹ️ **Info** has no Label column
- ℹ️ **InfoItm** has no Label column
- ℹ️ **BranchParty** has no Label column
- ℹ️ **InvAc** has no Label column
- ℹ️ **Party** has no Label column
- ℹ️ **WorkMonth** has no Label column
- ℹ️ **Task** has no Label column
- ℹ️ **AppSettings** has no Label column
- ℹ️ **AppVariables** has no Label column
- ℹ️ **AppTriggers** has no Label column
- ℹ️ **F_Grading** has no Label column
- ℹ️ **StudentInfo** has no Label column
- ℹ️ **Grading** has no Label column
- ℹ️ **Terms** has no Label column
