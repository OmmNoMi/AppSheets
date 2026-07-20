# BF-009 — Blank Email Body / Wrong Recipient in Automation Email

## Symptoms

- Email arrives at the wrong address (e.g., HR instead of employee)
- Email body shows AppSheet's default generic template: *"We're excited to share some important updates..."*
- Email preview shows a completely blank body despite the Google Doc having content
- Email shows "Dear ," with no name resolved

---

## Root Causes & Fixes

### 1. Wrong `To:` Field
**Symptom**: Email goes to a hardcoded address (e.g., an admin or department email) instead of the intended recipient.
**Fix**: In the automation email step, change `To:` from the hardcoded email to the appropriate expression, e.g. `[RecipientRef].[Email]`.

> **Real-World Example (Navi ONDT)**: `To:` was hardcoded to `hr@ondotlogistics.us`. Fixed to `[Employee].[Email]`.

### 2. Generic AppSheet Template Still Active
**Symptom**: Body shows *"We're excited to share some important updates and information regarding your app experience..."*
**Cause**: The **Email Body Template** (Google Doc) field is empty or not set. AppSheet falls back to its default template.
**Fix**: Set the **Email Body Template** field to the correct Google Doc ID. The Email Body text field alone does NOT override the default if a template slot exists.

> Note: The **Email Body** text field and **Email Body Template** Doc field are separate settings. Setting the text field does NOT disable the Google Doc template slot.

### 3. Google Doc Template is Blank
**Symptom**: Email preview shows a blank body. Doc ID is set in AppSheet.
**Cause**: The Google Doc exists but has no content, OR has invalid merge tag syntax (e.g., `USERSETTINGS()`).
**Fix**:
- Open the Doc via the **View** button in AppSheet editor and verify it has content
- Replace `<<USERSETTINGS("key")>>` with `<<LOOKUP("VarID","AppVariables","ID","EnumValue")>>`

### 4. Google Doc in a Shared Drive (Access Issue)
**Symptom**: Doc has content, Doc ID is correct, but body still blank.
**Cause**: AppSheet cannot access Google Docs stored in Shared Drives.
**Fix**: Copy the Doc to the app owner's personal Google Drive. Update the Doc ID in AppSheet to the new copy.
> Keep the Shared Drive version as the "master template" for editing reference only.

### 5. Wrong AppVariables Column Name
**Symptom**: Automation Monitor error: *"Can't find column 'Value' in table 'AppVariables'. Did you mean 'File'?"* or similar.
**Cause**: Using the wrong column name in LOOKUP for AppVariables.
**Fix**: The correct column for text AppVariables is `"EnumValue"`:
```
<<LOOKUP("SenderName","AppVariables","ID","EnumValue")>>
```
> AppSheet's Automation Monitor error message will suggest the correct column name — always read it carefully.

> **Real-World Example (Navi ONDT)**: Error said *"Can't find column 'Value'. Did you mean 'File'?"* — actual correct column was `"EnumValue"`. Working fix: `<<LOOKUP("HR_Manager","AppVariables","ID","EnumValue")>>`

### 6. Blank Recipient Name in Greeting
**Symptom**: Email renders but a `<<[Ref].[Name]>>` expression shows blank (e.g., `"Dear ,"`).
**Cause A**: The test record used in Preview Email has no Ref column linked.
**Cause B**: The Ref column is not properly configured (invalid dereference).
**Fix**: Test on a real production record with a valid linked row. If still blank, verify the Ref column points to the correct table and the key exists.

---

## Diagnostic Checklist

```
[ ] To: field → is it a dynamic expression or a hardcoded address?
[ ] Email Body Template → is a Google Doc ID set?
[ ] Google Doc → open it, does it have content?
[ ] Google Doc → is it in personal Drive or Shared Drive?
[ ] Merge tags → any USERSETTINGS() that should be LOOKUP()?
[ ] AppVariables LOOKUP → using "EnumValue" as column name?
[ ] Test record → does it have all required Ref columns linked?
[ ] Automation Monitor → any error message with column suggestion?
```

---

## Related
- `AU-013_EmailBodyTemplate.md` — Full email body template pattern
- SOP Automations § Zero-Touch Configuration via AppVariables
