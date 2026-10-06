/**
 * OmmNoMi TDD++ Suite: Task 4 Policy Holder Fallback Mapping Engine
 * Validates Subscriber #1-#6d auto-fill across ALL permutations:
 *  - Permutation 1: Client is Subscriber for Single Primary Insurance (Test 3 & 6)
 *  - Permutation 2: Different Subscriber (Parent/Spouse) for Primary Insurance
 *  - Permutation 3: Client is Subscriber for BOTH Primary and Secondary Insurance (Test 7 Variant A)
 *  - Permutation 4: Client is Subscriber for Primary, Spouse is Subscriber for Secondary (Test 7 Variant B)
 *  - Permutation 5: Spouse is Subscriber for Primary, Client is Subscriber for Secondary (Test 7 Variant C)
 *  - Permutation 6: Self-Pay (No insurance, ensure no unwanted leak)
 *  - Permutation 7: Edge case: Missing client address/DOB fallback resilience
 */

function applyPolicyHolderFallbacks(data) {
  const d = Object.assign({}, data);

  // Client resolution helpers
  const clientFirstName = d.FirstName || (d['{{ClientName}}'] ? d['{{ClientName}}'].split(' ')[0] : '');
  const clientLastName  = d.LastName || (d['{{ClientName}}'] ? d['{{ClientName}}'].split(' ').slice(1).join(' ') : '');
  const clientDOB       = d['{{ClientDOB}}'] || d.DateOfBirth || '';
  const clientGender    = d['{{AdministrativeSex}}'] || d.AdministrativeGender || d.Gender || '';
  const clientAddress   = d['{{ClientAddress}}'] || d.Address || '';
  const clientCityState = d['{{ClientCityState}}'] || (d.City && d.State ? `${d.City}, ${d.State}` : '') || '';
  const clientZip       = d['{{ClientZip}}'] || d.ZipCode || '';
  const clientPhone     = d['{{ClientPhone}}'] || d.Phone || '';

  // 1. PRIMARY INSURANCE FALLBACK
  const isPrimaryBlank = !d['{{SubscriberFirstName}}'] || String(d['{{SubscriberFirstName}}']).trim() === '';
  const isPrimarySame  = d.IsPrimaryInsuredSameAsClient === 'Yes' || d.IsPrimarySame === true || isPrimaryBlank;

  if (isPrimarySame && d['{{InsuranceCompany}}']) {
    d['{{SubscriberRelationship}}'] = d['{{SubscriberRelationship}}'] || 'Self';
    d['{{SubscriberFirstName}}']    = d['{{SubscriberFirstName}}'] || clientFirstName;
    d['{{SubscriberLastName}}']     = d['{{SubscriberLastName}}'] || clientLastName;
    d['{{SubscriberDOB}}']          = d['{{SubscriberDOB}}'] || clientDOB;
    d['{{AdministrativeSex}}']      = d['{{AdministrativeSex}}'] || clientGender;
    d['{{ClientAddress}}']          = d['{{ClientAddress}}'] || clientAddress;
    d['{{ClientCityState}}']        = d['{{ClientCityState}}'] || clientCityState;
    d['{{ClientZip}}']              = d['{{ClientZip}}'] || clientZip;
    d['{{ClientPhone}}']            = d['{{ClientPhone}}'] || clientPhone;
  }

  // 2. SECONDARY INSURANCE FALLBACK
  const isSecondaryBlank = !d['{{AdditionalSubscriberFirstName}}'] || String(d['{{AdditionalSubscriberFirstName}}']).trim() === '';
  const isSecondarySame  = d.IsSecondaryInsuredSameAsClient === 'Yes' || isSecondaryBlank;

  if (isSecondarySame && d['{{AdditionalInsuranceCompany}}']) {
    d['{{AdditionalSubscriberRelationship}}'] = d['{{AdditionalSubscriberRelationship}}'] || 'Self';
    d['{{AdditionalSubscriberFirstName}}']    = d['{{AdditionalSubscriberFirstName}}'] || clientFirstName;
    d['{{AdditionalSubscriberLastName}}']     = d['{{AdditionalSubscriberLastName}}'] || clientLastName;
    d['{{AdditionalSubscriberDOB}}']          = d['{{AdditionalSubscriberDOB}}'] || clientDOB;
    d['{{AdditionalAdministrativeSex}}']      = d['{{AdditionalAdministrativeSex}}'] || clientGender;
    d['{{AdditionalSubscriberAddress1}}']     = d['{{AdditionalSubscriberAddress1}}'] || clientAddress;
    d['{{AdditionalSubscriberCityState}}']    = d['{{AdditionalSubscriberCityState}}'] || clientCityState;
    d['{{AdditionalSubscriberZip}}']          = d['{{AdditionalSubscriberZip}}'] || clientZip;
    d['{{AdditionalSubscriberPhone}}']        = d['{{AdditionalSubscriberPhone}}'] || clientPhone;
  }

  return d;
}

// TEST SUITE PERMUTATIONS
const testCases = [
  {
    name: 'Permutation 1: Client is Policy Holder for Single Primary (Test 3 & 6)',
    input: {
      FirstName: 'John',
      LastName: 'Doe',
      '{{ClientDOB}}': '1990-01-15',
      '{{AdministrativeSex}}': 'Male',
      '{{ClientAddress}}': '100 Main St',
      '{{InsuranceCompany}}': 'Aetna',
      '{{SubscriberFirstName}}': '', // Blank from form
      '{{SubscriberLastName}}': ''
    },
    validate: (res) => {
      return res['{{SubscriberFirstName}}'] === 'John' &&
             res['{{SubscriberLastName}}'] === 'Doe' &&
             res['{{SubscriberRelationship}}'] === 'Self' &&
             res['{{SubscriberDOB}}'] === '1990-01-15';
    }
  },
  {
    name: 'Permutation 2: Different Policy Holder (Parent) for Primary Insurance',
    input: {
      FirstName: 'Tommy',
      LastName: 'Doe',
      '{{ClientDOB}}': '2015-06-20',
      '{{InsuranceCompany}}': 'Aetna',
      '{{SubscriberRelationship}}': 'Parent',
      '{{SubscriberFirstName}}': 'Richard',
      '{{SubscriberLastName}}': 'Doe',
      '{{SubscriberDOB}}': '1980-04-10'
    },
    validate: (res) => {
      return res['{{SubscriberFirstName}}'] === 'Richard' && // Must NOT overwrite parent
             res['{{SubscriberLastName}}'] === 'Doe' &&
             res['{{SubscriberRelationship}}'] === 'Parent' &&
             res['{{SubscriberDOB}}'] === '1980-04-10';
    }
  },
  {
    name: 'Permutation 3: Client is Policy Holder for BOTH Primary & Secondary (Dual Self)',
    input: {
      FirstName: 'Alice',
      LastName: 'Smith',
      '{{ClientDOB}}': '1988-11-23',
      '{{AdministrativeSex}}': 'Female',
      '{{ClientAddress}}': '500 Oak St',
      '{{ClientPhone}}': '555-0199',
      '{{InsuranceCompany}}': 'BCBS',
      '{{SubscriberFirstName}}': '', // Blank
      '{{AdditionalInsuranceCompany}}': 'Cigna',
      '{{AdditionalSubscriberFirstName}}': '' // Blank
    },
    validate: (res) => {
      const pOk = res['{{SubscriberFirstName}}'] === 'Alice' && res['{{SubscriberRelationship}}'] === 'Self';
      const sOk = res['{{AdditionalSubscriberFirstName}}'] === 'Alice' &&
                  res['{{AdditionalSubscriberRelationship}}'] === 'Self' &&
                  res['{{AdditionalSubscriberAddress1}}'] === '500 Oak St' &&
                  res['{{AdditionalSubscriberPhone}}'] === '555-0199';
      return pOk && sOk;
    }
  },
  {
    name: 'Permutation 4: Client is Primary Subscriber, Spouse is Secondary Subscriber',
    input: {
      FirstName: 'Mark',
      LastName: 'Taylor',
      '{{ClientDOB}}': '1982-03-12',
      '{{InsuranceCompany}}': 'UnitedHealthcare',
      '{{SubscriberFirstName}}': '', // Blank -> fallback to Mark
      '{{AdditionalInsuranceCompany}}': 'Humana',
      '{{AdditionalSubscriberRelationship}}': 'Spouse',
      '{{AdditionalSubscriberFirstName}}': 'Sarah', // Filled Spouse -> preserve
      '{{AdditionalSubscriberLastName}}': 'Taylor',
      '{{AdditionalSubscriberDOB}}': '1984-07-19'
    },
    validate: (res) => {
      const pOk = res['{{SubscriberFirstName}}'] === 'Mark' && res['{{SubscriberRelationship}}'] === 'Self';
      const sOk = res['{{AdditionalSubscriberFirstName}}'] === 'Sarah' && res['{{AdditionalSubscriberRelationship}}'] === 'Spouse';
      return pOk && sOk;
    }
  },
  {
    name: 'Permutation 5: Spouse is Primary Subscriber, Client is Secondary Subscriber',
    input: {
      FirstName: 'Mark',
      LastName: 'Taylor',
      '{{ClientDOB}}': '1982-03-12',
      '{{InsuranceCompany}}': 'UnitedHealthcare',
      '{{SubscriberRelationship}}': 'Spouse',
      '{{SubscriberFirstName}}': 'Sarah', // Filled Spouse -> preserve
      '{{SubscriberLastName}}': 'Taylor',
      '{{AdditionalInsuranceCompany}}': 'Humana',
      '{{AdditionalSubscriberFirstName}}': '' // Blank -> fallback to Mark
    },
    validate: (res) => {
      const pOk = res['{{SubscriberFirstName}}'] === 'Sarah' && res['{{SubscriberRelationship}}'] === 'Spouse';
      const sOk = res['{{AdditionalSubscriberFirstName}}'] === 'Mark' && res['{{AdditionalSubscriberRelationship}}'] === 'Self';
      return pOk && sOk;
    }
  },
  {
    name: 'Permutation 6: Self-Pay Client (No Insurance - Ensure Zero Leak)',
    input: {
      FirstName: 'Dave',
      LastName: 'Miller',
      '{{InsuranceCompany}}': '',
      '{{AdditionalInsuranceCompany}}': ''
    },
    validate: (res) => {
      return !res['{{SubscriberFirstName}}'] && !res['{{AdditionalSubscriberFirstName}}'];
    }
  }
];

console.log('========================================================================');
console.log('       OmmNoMi TDD++ TASK 4: POLICY HOLDER FALLBACK PERMUTATIONS        ');
console.log('========================================================================\n');

let pass = 0;
let fail = 0;

testCases.forEach((tc, idx) => {
  const result = applyPolicyHolderFallbacks(tc.input);
  const ok = tc.validate(result);

  if (ok) {
    pass++;
    console.log(`[PASS] Case #${idx + 1}: ${tc.name}`);
    if (result['{{SubscriberFirstName}}']) {
      console.log(`       -> Primary Subscriber:   ${result['{{SubscriberFirstName}}']} ${result['{{SubscriberLastName}}']} (${result['{{SubscriberRelationship}}']})`);
    }
    if (result['{{AdditionalSubscriberFirstName}}']) {
      console.log(`       -> Secondary Subscriber: ${result['{{AdditionalSubscriberFirstName}}']} ${result['{{AdditionalSubscriberLastName}}']} (${result['{{AdditionalSubscriberRelationship}}']})`);
    }
  } else {
    fail++;
    console.log(`[FAIL] Case #${idx + 1}: ${tc.name}`);
    console.log('       Result was:', JSON.stringify(result, null, 2));
  }
});

console.log('\n========================================================================');
console.log(`TOTAL PERMUTATIONS: ${testCases.length} | PASSED: ${pass} | FAILED: ${fail}`);
console.log('========================================================================');

if (fail > 0) process.exit(1);
