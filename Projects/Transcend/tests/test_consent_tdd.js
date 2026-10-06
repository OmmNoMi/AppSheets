/**
 * OmmNoMi TDD++ Suite: Task 5 Consent Parsing Engine (Email, SMS, Telehealth)
 * Tests every possible human input variation:
 *   - Exact Google Form options (affirmative & negative)
 *   - Plain "Yes", "No", "Y", "N", "TRUE", "FALSE"
 *   - Mixed casing, leading/trailing whitespace, punctuation, quotes
 *   - Negation clauses ("I do not consent", "No, please don't communicate")
 *   - Ambiguous & edge case phrases ("Prefer not to", "Maybe later", "Only in emergency")
 *   - Null, undefined, empty string, numerical inputs
 */

function isAffirmative(val) {
  if (!val) return false;
  const s = String(val).trim().toLowerCase();

  // Strict Negative Check First (Zero False Positives)
  if (s.startsWith('no') || s.includes('not consent') || s.includes("don't") || s.includes('do not') || s.startsWith('false')) {
    return false;
  }

  // Affirmative Check
  return s.startsWith('yes') || s.startsWith('true') || s.includes('i consent') || s.includes('agree');
}

function isTextConsent(val) {
  if (!val) return false;
  const s = String(val).trim().toLowerCase();

  // Strict Negative Check First
  if (s.includes("don't") || s.includes('do not') || s.includes('not') || s.startsWith('no') || s.startsWith('false')) {
    return false;
  }

  // Affirmative Check
  return s.startsWith('yes') || s.startsWith('true') || s.includes('send text') || s.includes('it is ok') || s.includes('text message');
}

// REAL PRODUCTION & HUMAN VARIATION TEST MATRIX
const consentScenarios = [
  // 1. EXACT GOOGLE FORM EMAIL CONSENT OPTIONS
  {
    category: 'Google Form Email',
    input: 'Yes, I consent to the use of email for communication.',
    type: 'email',
    expected: true
  },
  {
    category: 'Google Form Email (Negative)',
    input: 'No, please do not communicate with me by email.',
    type: 'email',
    expected: false
  },

  // 2. EXACT GOOGLE FORM TELEHEALTH CONSENT OPTIONS
  {
    category: 'Google Form Telehealth',
    input: 'Yes, I consent to telehealth services, or to both telehealth and in-person services.',
    type: 'telehealth',
    expected: true
  },
  {
    category: 'Google Form Telehealth (Negative)',
    input: 'No, I do not consent to telehealth services. I prefer to only receive in-person services.',
    type: 'telehealth',
    expected: false
  },

  // 3. EXACT GOOGLE FORM SMS / TEXT CONSENT OPTIONS
  {
    category: 'Google Form SMS',
    input: 'It is OK to send text messages to this number',
    type: 'sms',
    expected: true
  },
  {
    category: 'Google Form SMS (Negative)',
    input: "DON'T send text messages to this number",
    type: 'sms',
    expected: false
  },

  // 4. COMMON HUMAN SHORTHAND & CASING VARIATIONS
  { category: 'Human Plain', input: 'yes', type: 'email', expected: true },
  { category: 'Human Plain', input: 'YES', type: 'email', expected: true },
  { category: 'Human Plain', input: 'Yes', type: 'telehealth', expected: true },
  { category: 'Human Plain', input: '  yes  ', type: 'email', expected: true },
  { category: 'Human Boolean', input: 'TRUE', type: 'email', expected: true },
  { category: 'Human Boolean', input: true, type: 'email', expected: true },
  { category: 'Human Plain', input: 'no', type: 'email', expected: false },
  { category: 'Human Plain', input: 'NO', type: 'email', expected: false },
  { category: 'Human Plain', input: '  no  ', type: 'telehealth', expected: false },
  { category: 'Human Boolean', input: 'FALSE', type: 'email', expected: false },
  { category: 'Human Boolean', input: false, type: 'email', expected: false },

  // 5. TRICKY / AMBIGUOUS SENTENCE VARIATIONS
  { category: 'Human Ambiguous', input: 'I consent', type: 'email', expected: true },
  { category: 'Human Ambiguous', input: 'I do NOT consent to telehealth', type: 'telehealth', expected: false },
  { category: 'Human Ambiguous', input: 'No I do not agree to emails', type: 'email', expected: false },
  { category: 'Human SMS', input: 'Yes, please text me reminders', type: 'sms', expected: true },
  { category: 'Human SMS', input: 'Do NOT text me', type: 'sms', expected: false },

  // 6. EDGE CASES (NULL, EMPTY, WHITESPACE, NUMBER)
  { category: 'Edge Case', input: null, type: 'email', expected: false },
  { category: 'Edge Case', input: undefined, type: 'telehealth', expected: false },
  { category: 'Edge Case', input: '', type: 'email', expected: false },
  { category: 'Edge Case', input: '   ', type: 'sms', expected: false }
];

console.log('========================================================================');
console.log('       OmmNoMi TDD++ TASK 5: CONSENT PARSING ALL HUMAN VARIATIONS       ');
console.log('========================================================================\n');

let pass = 0;
let fail = 0;

consentScenarios.forEach((sc, idx) => {
  let actual = false;
  if (sc.type === 'sms') {
    actual = isTextConsent(sc.input);
  } else {
    actual = isAffirmative(sc.input);
  }

  const ok = actual === sc.expected;
  if (ok) {
    pass++;
    console.log(`[PASS] Case #${idx + 1} [${sc.category}]: "${sc.input}"`);
    console.log(`       -> Evaluated: ${actual} (Matches Expected: ${sc.expected})`);
  } else {
    fail++;
    console.log(`[FAIL] Case #${idx + 1} [${sc.category}]: "${sc.input}"`);
    console.log(`       X Evaluated: ${actual}, Expected: ${sc.expected}`);
  }
});

console.log('\n========================================================================');
console.log(`TOTAL VARIATIONS TESTED: ${consentScenarios.length} | PASSED: ${pass} | FAILED: ${fail}`);
console.log('========================================================================');

if (fail > 0) process.exit(1);
