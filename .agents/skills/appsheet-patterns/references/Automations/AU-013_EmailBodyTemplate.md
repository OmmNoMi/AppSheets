# AU-013 — Email Body Template (Google Doc) Pattern

## Pattern: Using a Google Doc as an AppSheet Email Body Template

AppSheet automation email steps support two body modes:
- **Email Body** (text field): Plain/rich text typed directly in AppSheet editor
- **Email Body Template** (Google Doc): A Google Doc whose content is rendered as the email body

These are **separate and independent fields**. Changing the Google Doc ID only affects the template body rendering — it does not affect the plain text Email Body field.

---

## When to Use a Google Doc Template

Use a Google Doc template for email bodies when:
- The email requires rich formatting or company logo
- The same template is shared across multiple app instances or client deployments
- The template content is maintained by non-developers in Google Docs

---

## Supported Merge Tag Syntax in Google Doc Templates

| Use Case | Syntax | Works? |
|----------|--------|--------|
| Column value | `<<[ColumnName]>>` | ✅ |
| Related column | `<<[Ref].[ColumnName]>>` | ✅ |
| AppSheet formula | `<<IF([Condition], "A", "B")>>` | ✅ |
| Date formatting | `<<TEXT([Date], "MMM DD, YYYY")>>` | ✅ |
| AppVariable lookup | `<<LOOKUP("VarID","AppVariables","ID","EnumValue")>>` | ✅ |
| App name (Subject only) | `<<_APPNAME>>` | ✅ |
| USERSETTINGS() | `<<USERSETTINGS("key")>>` | ❌ Not supported in Doc templates |

---

## Standard Email Closing Pattern (Dynamic per Deployment)

Use AppVariables for any values that differ per client or deployment (e.g., sender name, company/brand name) so the template is reusable without editing the Google Doc:

```
Thank you,

<<LOOKUP("SenderName","AppVariables","ID","EnumValue")>>
<<LOOKUP("OrganizationName","AppVariables","ID","EnumValue")>>
```

> **Critical**: AppVariables column for text values is `"EnumValue"` — NOT `"Value"`, NOT `"File"`.

**Real-World Example (Navi ONDT — Write Up Notification):**
```
<<LOOKUP("HR_Manager","AppVariables","ID","EnumValue")>>
<<LOOKUP("FromNameInNotice","AppVariables","ID","EnumValue")>>
```
`HR_Manager` stores the HR contact name. `FromNameInNotice` stores the company/dept label (e.g., `OnDot HR`). Both are set differently per Navi instance (ONDT, QUIK, Evoura, Studio 0172).

---

## Google Doc Template — Access Requirements

- The Google Doc **must** be accessible by the AppSheet app owner's Google account
- Documents stored in **Shared Drives** may cause a blank email body even if the Doc has content
- **Solution**: Keep the master template in the Shared Drive for reference/editing, but each app instance should point to a **copy in the app owner's personal Google Drive**

---

## Email Subject — Dynamic App Name

Use `<<_APPNAME>>` in the Subject field to make the subject dynamic per deployment:

```
<<_APPNAME>> - <Notification Type>
```

**Real-World Example (Navi ONDT):**
```
<<_APPNAME>> - Write Up Notification
```
Resolves to `Navi ONDT - Write Up Notification`, `Navi QUIK - Write Up Notification`, etc. automatically.

---

## Debugging: Blank Email Body

If the email preview shows a blank body but the Google Doc has content:

1. **Check Doc location** — Is it in a Shared Drive? Move/copy to personal Drive and re-test
2. **Check Doc ID** — Confirm the ID in AppSheet matches the actual Google Doc URL (`/document/d/<ID>/`)
3. **Check formula syntax** — `USERSETTINGS()` in the Doc will cause blank or error output
4. **Check AppVariable column** — Use `"EnumValue"` not `"Value"` or `"File"`
5. **Check Automation Monitor** — Error messages will show the exact invalid expression and suggest the correct column name

---

## Example: Generic Notification Template

```
Dear <<[RecipientRef].[Name]>>,

This is to notify you regarding <<[Subject]>> on <<TEXT([EventDate],"MMM DD, YYYY")>>.

<<[BodyDetails]>>

Thank you,

<<LOOKUP("SenderName","AppVariables","ID","EnumValue")>>
<<LOOKUP("OrganizationName","AppVariables","ID","EnumValue")>>
```

**Real-World Example (Navi ONDT — Write Up Notification, July 2026):**
```
Dear <<[Employee].[Name]>>,

We discussed the performance issue regarding your <<[Metric]>> metric on <<TEXT([ReviewDate],"MMM DD, YYYY")>>.

Attached is your written warning (<<[Corrective Action]>>). You were given the opportunity to review and acknowledge receipt but declined to sign.

Thank you,

<<LOOKUP("HR_Manager","AppVariables","ID","EnumValue")>>
<<LOOKUP("FromNameInNotice","AppVariables","ID","EnumValue")>>
```
Deployed across: Navi ONDT, Navi QUIK, Evoura, Studio 0172.

---

## Related
- `BF-009_BlankEmailBody.md` — Debugging blank email bodies
- SOP Automations § Zero-Touch Configuration via AppVariables
