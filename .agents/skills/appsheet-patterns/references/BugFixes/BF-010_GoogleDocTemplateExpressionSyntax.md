# BF-010: Google Doc Template Formatting, Quotes & Conditional Block Errors

## Symptoms
- Entire sections or paragraphs are completely blank/missing in generated PDF or email previews.
- Conditional text (e.g. `<<IF: ([CheckAmount]>0)>>`) fails silently with no output even when the condition evaluates to TRUE.
- General company policies or notices (like returning equipment) disappear for certain records.
- Large, unwanted vertical gaps or empty line breaks appear between paragraphs in exported PDFs.
- Clicking the AppSheet file preview action keeps opening the old/stale PDF instead of reflecting latest changes.

---

## Root Causes & Solutions

### 1. Expression Concatenation & Smart/Curly Quotes (`“ ”`)
**Problem**: Wrapping multi-line paragraphs in formula string concatenation inside Google Docs templates:
```text
<<IF: ([Amount]>0)>><<"Your payment of "&[Amount]&" is ready.">><<EndIf>>
```
Google Docs automatically converts standard double quotes `"` into typographic smart quotes `“` / `”`. When AppSheet's template parser encounters smart quotes or string syntax errors inside expressions, it fails silently and returns **empty/blank**.

**Fix**: Do **NOT** wrap text in formula quotes and concatenation. Use standard plain text with embedded `<<[Column]>>` merge tags directly inside the `<<IF>>...<<EndIf>>` block:
```text
<<IF: ([Amount] > 0)>>Your payment of <<[Amount]>> is ready.<<EndIf>>
```

---

### 2. Trailing/Leading Whitespace in Bracket References
**Problem**: Typo in column tags with spaces inside brackets (e.g. `[PickPhoneNumber ]` or `[ CheckAmount]`).
**Fix**: Ensure column names inside brackets match the schema exactly with no internal spaces: `<<[PickPhoneNumber]>>`.

---

### 3. Misplaced `<<EndIf>>` Scope (Hiding Universal Notices)
**Problem**: Putting universal sentences (e.g., "Please return company uniforms and devices") *inside* a mutually exclusive `<<IF: ([CheckAmount]=0)>>` block. When `[CheckAmount] > 0`, the $0 condition evaluates to FALSE and inadvertently hides the property return notice.

**Fix**: Place universal text **outside / after** both `<<EndIf>>` blocks so it evaluates and renders unconditionally for all records:
```text
<<IF: ([CheckAmount] > 0)>>Otherwise, your final paycheck is available at <<[PickUpLocation]>>.<<EndIf>><<IF: ([CheckAmount] = 0)>>Otherwise, your final payment has already been direct deposited.<<EndIf>>

Please immediately return all Company property now in your possession.
```

---

### 4. Template Newline Spacing vs AppSheet PDF Gaps
**Problem**: Placing `<<IF>>` and `<<EndIf>>` on their own separate blank lines causes AppSheet to preserve the empty lines in the rendered PDF, creating huge vertical gaps.

**Fix**: Keep conditional `<<IF: ...>>` and `<<EndIf>>` tags **inline** with the text. Only add explicit line breaks between actual paragraphs.

---

### 5. AppSheet File Caching vs Automation Bot Triggering
**Problem**: Clicking the file icon for `EmailPreview` opens the previously generated PDF file stored on Drive, leading users to believe the template edit didn't work.

**Fix**:
1. AppSheet only generates new files when an automation Bot is triggered (e.g. row update/save). Open the form, click **Save**, and wait 5–10 seconds for the backend bot to write the new PDF to Google Drive.
2. Force-refresh the browser tab with `Cmd + Shift + R` (Mac) or `Ctrl + Shift + R` (Windows) to bypass cached PDF URLs.

---

## Real-World Case Study (Navi ONDT — Separation NCNS Template)
- **Table**: `Separation`
- **Template**: `Separation Email NCNS`
- **Issue**: Brandon Cruz ($242.02 paycheck) PDF preview was completely missing the pickup location and the company property return sentence.
- **Resolution**: Removed `<<"..."&...>>` formula wrappers and curly quotes, moved the company property sentence outside `<<EndIf>>`, and removed trailing space in `[PickPhoneNumber]`.

---

## Related Patterns
- `BF-009_BlankEmailBody.md` — Diagnostic checklist for email body templates & AppVariables
- `AU-013_EmailBodyTemplate.md` — Google Doc email body templates pattern
