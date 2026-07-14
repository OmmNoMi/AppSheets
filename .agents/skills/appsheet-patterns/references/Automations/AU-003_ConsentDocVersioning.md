# AU-003: Consent-Driven Document Versioning

**Problem**: Document has conditional sections based on client preferences. Free-text in e-sign is confusing.

**Solution**: Capture consent as Yes/No at intake. App Script includes/excludes the correct pre-written paragraph.

```javascript
// App Script template logic
if (consentEmail === 'Yes') {
  body.replaceText('{{EMAIL_CONSENT_SECTION}}', EMAIL_CONSENT_YES_TEXT);
} else {
  body.replaceText('{{EMAIL_CONSENT_SECTION}}', EMAIL_CONSENT_NO_TEXT);
}
```

**AppSheet**: `Client.ConsentEmail` (Enum: Yes/No), `Client.ConsentTelehealth` (Enum: Yes/No)

**Source**: Transcend_IntakeSystem | 2026-05-31
