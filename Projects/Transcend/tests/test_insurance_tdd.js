/**
 * TDD++ Suite: Transcend Insurance Form Conditional Logic & Edge Cases
 * Validates Show-If evaluation across Test 1 to Test 7 + Edge Scenarios.
 */

function evaluateInsuranceCondition(data) {
  // OmmNoMi Multi-Signal Affirmative Match
  const useIns = data.UseInsurance ? String(data.UseInsurance).trim().toLowerCase() : '';
  const hasCompany = Boolean(data.PrimaryInsuranceCompany && String(data.PrimaryInsuranceCompany).trim() !== '');
  const explicitShow = data.ShowInsuranceForm === true || data.ShowInsuranceForm === 'true';

  // Condition is true if explicitShow OR if UseInsurance starts with yes/primary OR has PrimaryInsuranceCompany while not explicitly self-pay
  const isSelfPay = useIns.includes('self-pay') || useIns.includes('self pay') || useIns.includes('referral');

  if (explicitShow) return true;
  if (isSelfPay && !hasCompany) return false;
  if (useIns.startsWith('yes') || useIns.includes('insurance')) return true;
  if (hasCompany) return true;

  return false;
}

function evaluateCOBCondition(data) {
  return Boolean(
    data.AdditionalInsuranceCompany ||
    data['{{AdditionalInsuranceCompany}}'] ||
    data.ShowCOBForm === true ||
    data.ShowCOBForm === 'true' ||
    (data.OnlyInsurancePlan && String(data.OnlyInsurancePlan).trim().toLowerCase().startsWith('no')) ||
    (data.UseInsurance && String(data.UseInsurance).toLowerCase().includes('secondary'))
  );
}

// Production Test Cases (David's Email Tests 1-7 + 3 Edge Cases)
const testCases = [
  {
    name: 'Test 1: Client self-pay, no insurance',
    data: { UseInsurance: 'No (self-pay)', PrimaryInsuranceCompany: '' },
    expectedInsurance: false,
    expectedCOB: false
  },
  {
    name: 'Test 2: Out of network, client chose referral',
    data: { UseInsurance: 'No, I prefer a referral to an in-network provider', PrimaryInsuranceCompany: '' },
    expectedInsurance: false,
    expectedCOB: false
  },
  {
    name: 'Test 3: In-network Aetna, single policy',
    data: { UseInsurance: 'Yes', PrimaryInsuranceCompany: 'Aetna', OnlyInsurancePlan: 'Yes' },
    expectedInsurance: true,
    expectedCOB: false
  },
  {
    name: 'Test 4: Medicare client chose referral',
    data: { UseInsurance: 'No, I prefer a referral to a Medicare provider', PrimaryInsuranceCompany: '' },
    expectedInsurance: false,
    expectedCOB: false
  },
  {
    name: 'Test 5: Self-pay client',
    data: { UseInsurance: 'No (self-pay)', PrimaryInsuranceCompany: '' },
    expectedInsurance: false,
    expectedCOB: false
  },
  {
    name: 'Test 6: In-network UHC, client same as subscriber',
    data: { UseInsurance: 'Yes', PrimaryInsuranceCompany: 'UnitedHealthcare', OnlyInsurancePlan: 'Yes' },
    expectedInsurance: true,
    expectedCOB: false
  },
  {
    name: 'Test 7: Primary BCBS + Secondary Cigna (COB)',
    data: { UseInsurance: 'Yes', PrimaryInsuranceCompany: 'Blue Cross Blue Shield', AdditionalInsuranceCompany: 'Cigna', OnlyInsurancePlan: 'No' },
    expectedInsurance: true,
    expectedCOB: true
  },
  // Edge Case 8: Whitespace & case variations
  {
    name: 'Edge Case 8: "yes (use my insurance)" mixed case with spaces',
    data: { UseInsurance: '  YES (use insurance)  ', PrimaryInsuranceCompany: 'Cigna' },
    expectedInsurance: true,
    expectedCOB: false
  },
  // Edge Case 9: Empty fields
  {
    name: 'Edge Case 9: Null / undefined / empty strings',
    data: { UseInsurance: null, PrimaryInsuranceCompany: undefined },
    expectedInsurance: false,
    expectedCOB: false
  },
  // Edge Case 10: Explicit AppSheet override
  {
    name: 'Edge Case 10: Explicit ShowInsuranceForm override flag',
    data: { UseInsurance: 'No (self-pay)', ShowInsuranceForm: 'true' },
    expectedInsurance: true,
    expectedCOB: false
  }
];

console.log('====================================================');
console.log('       OmmNoMi TDD++ INSURANCE FORM TEST SUITE       ');
console.log('====================================================\n');

let passed = 0;
let failed = 0;

testCases.forEach((tc, idx) => {
  const actualIns = evaluateInsuranceCondition(tc.data);
  const actualCOB = evaluateCOBCondition(tc.data);

  const insPass = actualIns === tc.expectedInsurance;
  const cobPass = actualCOB === tc.expectedCOB;

  if (insPass && cobPass) {
    passed++;
    console.log(`[PASS] Case #${idx + 1}: ${tc.name}`);
    console.log(`       -> INSURANCE_FORM: ${actualIns} (Expected: ${tc.expectedInsurance})`);
    console.log(`       -> COB_FORM:       ${actualCOB} (Expected: ${tc.expectedCOB})`);
  } else {
    failed++;
    console.log(`[FAIL] Case #${idx + 1}: ${tc.name}`);
    if (!insPass) console.log(`       X INSURANCE_FORM: got ${actualIns}, expected ${tc.expectedInsurance}`);
    if (!cobPass) console.log(`       X COB_FORM: got ${actualCOB}, expected ${tc.expectedCOB}`);
  }
});

console.log('\n====================================================');
console.log(`TOTAL: ${testCases.length} | PASSED: ${passed} | FAILED: ${failed}`);
console.log('====================================================');

if (failed > 0) process.exit(1);
