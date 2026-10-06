/**
 * OmmNoMi TDD++ MEGA TEST SUITE (1,000+ Permutations & Stress Tests)
 * End-to-End System Integration:
 * FormIntake -> AppSheet Actions -> Insurance Table -> Webhook JSON Generator -> Apps Script Docs Engine -> Output Integrity
 */

// 1. Precise AppSheet Action Simulators
function simulatePrimaryAction(formRow) {
  const formIntake = formRow;
  if (!formIntake) return null;

  // OmmNoMi Strict Rule B9 Normalized Equality
  const rawUse = formIntake['Do you have insurance you would like to use?'];
  let useInsurance = '';
  if (rawUse != null) {
    const trimmed = String(rawUse).trim();
    if (trimmed === 'Yes') {
      useInsurance = 'Primary';
    } else {
      useInsurance = trimmed;
    }
  }

  // Task 9 PlanName Fallback
  const rawProvider = formIntake['Name of Insurance Company'] || '';
  const rawPlan = formIntake['Insurance Plan Name / Name on Card'] || '';
  const planName = (rawPlan.trim() !== '') ? rawPlan.trim() : rawProvider.trim();

  return {
    Client: formIntake['Client_ID'] || 'CL-001',
    UseInsurance: useInsurance,
    ProviderName: rawProvider.trim(),
    PlanName: planName,
    PolicyNumber: formIntake['Member/Beneficiary ID'] || '',
    GroupNumber: formIntake['Policy Group Number'] || '',
    SubscriberName: formIntake['Policy Holder Name'] || '',
    SubscriberDOB: formIntake['Policy Holder DOB'] || '',
    SubscriberRelationship: formIntake['Relationship to Client'] || 'Self',
    IsMedicare: formIntake['Is your insurance a Medicare Plan?'] || '',
    IsOnlyPlan: formIntake["Is this client's only insurance plan?"] || 'Yes',
    FrontCard: formIntake['Front of Insurance Card'] || '',
    BackCard: formIntake['Back of Insurance Card'] || ''
  };
}

function simulateSecondaryAction(formRow) {
  const formIntake = formRow;
  if (!formIntake) return null;

  // Action Condition: Run only if secondary insurance is present
  const isOnlyPlan = String(formIntake["Is this client's only insurance plan?"] || '').trim();
  const secCompany = String(formIntake['Secondary Insurance Company'] || formIntake['Additional Insurance Company'] || '').trim();
  
  // If only plan is Yes and no secondary company, Action does not run!
  if (isOnlyPlan === 'Yes' && !secCompany) {
    return null;
  }

  // Task 9 PlanName Fallback for Secondary
  const secPlanRaw = String(formIntake['Secondary Insurance Plan Name'] || '').trim();
  const planName = (secPlanRaw !== '') ? secPlanRaw : secCompany;

  return {
    Client: formIntake['Client_ID'] || 'CL-001',
    UseInsurance: 'Secondary',
    ProviderName: secCompany,
    PlanName: planName,
    PolicyNumber: formIntake['Secondary Member ID'] || '',
    GroupNumber: formIntake['Secondary Policy Group Number'] || '',
    SubscriberName: formIntake['Secondary Policy Holder Name'] || '',
    SubscriberDOB: formIntake['Secondary Policy Holder DOB'] || '',
    SubscriberRelationship: formIntake['Secondary Relationship to Client'] || 'Self',
    SubscriberAddress: formIntake['Secondary Policy Holder Address'] || '',
    SubscriberCityState: formIntake['Secondary Policy Holder City State'] || '',
    SubscriberZip: formIntake['Secondary Policy Holder Zip'] || '',
    SubscriberPhone: formIntake['Secondary Policy Holder Phone'] || '',
    IsMedicare: formIntake['Is secondary insurance a Medicare Plan?'] || 'No',
    IsOnlyPlan: 'No'
  };
}

// 2. Webhook ParamObj Generator (mimicking AppSheet paramObj CONCATENATE expression)
function generateWebhookParamObj(clientRow, insuranceRows) {
  // Strict OmmNoMi filtering
  const primaryIns = insuranceRows.find(i => i.Client === clientRow.ID && i.UseInsurance === 'Primary') || {};
  const secondaryIns = insuranceRows.find(i => i.Client === clientRow.ID && i.UseInsurance === 'Secondary') || {};

  const clientName = `${clientRow.FirstName || ''} ${clientRow.LastName || ''}`.trim();

  return {
    UseInsurance: clientRow.UseInsurance || '',
    ConsentEmail: clientRow.ConsentEmail || '',
    ConsentMobileSMS: clientRow.ConsentMobileSMS || '',
    ConsentTelehealth: clientRow.ConsentTelehealth || '',
    ProviderPreference: clientRow.ProviderPreference || '',
    '{{ClientName}}': clientName,
    '{{Date}}': '10/06/2026',
    '{{ClientDOB}}': clientRow.DateOfBirth || '',
    '{{ClientAddress}}': clientRow.Address || '',
    '{{ClientCityState}}': `${clientRow.City || ''}, ${clientRow.State || ''}`.replace(/^, |, $/g, ''),
    '{{ClientZip}}': clientRow.ZipCode || '',
    '{{ClientPhone}}': clientRow.Phone || '',
    '{{AdministrativeSex}}': clientRow.Gender || '',

    // Primary
    '{{InsuranceCompany}}': primaryIns.ProviderName || '',
    '{{PlanName}}': primaryIns.PlanName || '',
    '{{MemberID}}': primaryIns.PolicyNumber || '',
    '{{GroupNumber}}': primaryIns.GroupNumber || '',
    '{{InsurancePriority}}': 'Primary',
    '{{SubscriberRelationship}}': primaryIns.SubscriberRelationship || '',
    '{{SubscriberFirstName}}': primaryIns.SubscriberName ? primaryIns.SubscriberName.split(' ')[0] : '',
    '{{SubscriberLastName}}': primaryIns.SubscriberName ? primaryIns.SubscriberName.split(' ').slice(1).join(' ') : '',
    '{{SubscriberDOB}}': primaryIns.SubscriberDOB || '',

    // Secondary
    '{{AdditionalInsuranceCompany}}': secondaryIns.ProviderName || '',
    '{{AdditionalPlanName}}': secondaryIns.PlanName || '',
    '{{AdditionalMemberID}}': secondaryIns.PolicyNumber || '',
    '{{AdditionalGroupNumber}}': secondaryIns.GroupNumber || '',
    '{{AdditionalSubscriberRelationship}}': secondaryIns.SubscriberRelationship || '',
    '{{AdditionalSubscriberFirstName}}': secondaryIns.SubscriberName ? secondaryIns.SubscriberName.split(' ')[0] : '',
    '{{AdditionalSubscriberLastName}}': secondaryIns.SubscriberName ? secondaryIns.SubscriberName.split(' ').slice(1).join(' ') : '',
    '{{AdditionalSubscriberDOB}}': secondaryIns.SubscriberDOB || '',
    '{{AdditionalSubscriberAddress1}}': secondaryIns.SubscriberAddress || '',
    '{{AdditionalSubscriberCityState}}': secondaryIns.SubscriberCityState || '',
    '{{AdditionalSubscriberZip}}': secondaryIns.SubscriberZip || '',
    '{{AdditionalSubscriberPhone}}': secondaryIns.SubscriberPhone || '',
    
    // Form flags
    OnlyInsurancePlan: secondaryIns.ProviderName ? 'No' : 'Yes',
    PrimaryInsuranceCompany: primaryIns.ProviderName || '',
    AdditionalInsuranceCompany: secondaryIns.ProviderName || ''
  };
}

// 3. Apps Script Evaluator (Direct replica of code.gs logic)
function evaluateAppsScript(data) {
  // Strict helper predicates
  const isAff = (v) => {
    if (!v) return false;
    const s = String(v).trim().toLowerCase();
    return s.startsWith('yes') || s.startsWith('true') || (s.includes('consent') && !s.includes('not') && !s.includes("don't") && !s.startsWith('no'));
  };

  const isTxt = (v) => {
    if (!v) return false;
    const s = String(v).trim().toLowerCase();
    if (s.includes("don't") || s.includes('not') || s.startsWith('no')) return false;
    return s.startsWith('yes') || s.includes('send text') || s.includes('it is ok');
  };

  // Fallbacks
  const clientFirstName = data.FirstName || (data['{{ClientName}}'] ? data['{{ClientName}}'].split(' ')[0] : '');
  const clientLastName  = data.LastName || (data['{{ClientName}}'] ? data['{{ClientName}}'].split(' ').slice(1).join(' ') : '');
  const clientDOB       = data['{{ClientDOB}}'] || data.DateOfBirth || '';
  const clientGender    = data['{{AdministrativeSex}}'] || data.AdministrativeGender || data.Gender || '';
  const clientAddress   = data['{{ClientAddress}}'] || data.Address || '';
  const clientCityState = data['{{ClientCityState}}'] || '';
  const clientZip       = data['{{ClientZip}}'] || data.ZipCode || '';
  const clientPhone     = data['{{ClientPhone}}'] || data.Phone || '';

  const processedData = Object.assign({}, data);

  // Primary fallback when subscriber is blank
  const hasPrimaryIns = Boolean(processedData.PrimaryInsuranceCompany || processedData['{{InsuranceCompany}}']);
  if (hasPrimaryIns && (!processedData['{{SubscriberFirstName}}'] || String(processedData['{{SubscriberFirstName}}']).trim() === '')) {
    processedData['{{SubscriberRelationship}}'] = processedData['{{SubscriberRelationship}}'] || 'Self';
    processedData['{{SubscriberFirstName}}']    = clientFirstName;
    processedData['{{SubscriberLastName}}']     = clientLastName;
    processedData['{{SubscriberDOB}}']          = clientDOB;
    processedData['{{AdministrativeSex}}']      = clientGender;
    processedData['{{ClientAddress}}']          = clientAddress;
    processedData['{{ClientCityState}}']        = clientCityState;
    processedData['{{ClientZip}}']              = clientZip;
    processedData['{{ClientPhone}}']            = clientPhone;
  }

  // Secondary fallback when subscriber is blank
  const hasSecondaryIns = Boolean(processedData.AdditionalInsuranceCompany || processedData['{{AdditionalInsuranceCompany}}']);
  if (hasSecondaryIns && (!processedData['{{AdditionalSubscriberFirstName}}'] || String(processedData['{{AdditionalSubscriberFirstName}}']).trim() === '')) {
    processedData['{{AdditionalSubscriberRelationship}}'] = processedData['{{AdditionalSubscriberRelationship}}'] || 'Self';
    processedData['{{AdditionalSubscriberFirstName}}']    = clientFirstName;
    processedData['{{AdditionalSubscriberLastName}}']     = clientLastName;
    processedData['{{AdditionalSubscriberDOB}}']          = clientDOB;
    processedData['{{AdditionalAdministrativeSex}}']      = clientGender;
    processedData['{{AdditionalSubscriberAddress1}}']     = clientAddress;
    processedData['{{AdditionalSubscriberCityState}}']    = clientCityState;
    processedData['{{AdditionalSubscriberZip}}']          = clientZip;
    processedData['{{AdditionalSubscriberPhone}}']        = clientPhone;
  }

  // Conditions
  const conditions = {
    EMAIL_CONSENT: isAff(processedData.ConsentEmail),
    TEXT_CONSENT: isTxt(processedData.ConsentMobileSMS),
    TELEHEALTH_CONSENT: isAff(processedData.ConsentTelehealth),
    INSURANCE_FORM: Boolean(
      !(String(processedData.UseInsurance || '').toLowerCase().includes('self-pay') ||
        String(processedData.UseInsurance || '').toLowerCase().includes('out-of-pocket') ||
        String(processedData.UseInsurance || '').toLowerCase().includes('referral')) &&
      (String(processedData.UseInsurance || '').trim().toLowerCase().startsWith('yes') ||
       Boolean((processedData.PrimaryInsuranceCompany || processedData['{{InsuranceCompany}}']) && 
               String(processedData.PrimaryInsuranceCompany || processedData['{{InsuranceCompany}}']).trim() !== ''))
    ),
    SECONDARY_INSURANCE_FORM: Boolean(
      processedData.AdditionalInsuranceCompany ||
      processedData['{{AdditionalInsuranceCompany}}'] ||
      (processedData.OnlyInsurancePlan && String(processedData.OnlyInsurancePlan).trim().toLowerCase().startsWith('no')) ||
      (processedData.UseInsurance && String(processedData.UseInsurance).toLowerCase().includes('secondary'))
    ),
    COB_FORM: Boolean(
      processedData.AdditionalInsuranceCompany ||
      processedData['{{AdditionalInsuranceCompany}}'] ||
      (processedData.OnlyInsurancePlan && String(processedData.OnlyInsurancePlan).trim().toLowerCase().startsWith('no')) ||
      (processedData.UseInsurance && String(processedData.UseInsurance).toLowerCase().includes('secondary'))
    )
  };

  return { processedData, conditions };
}

// 4. GENERATE 1,000+ PERMUTATIONS & STRESS TESTS
console.log('========================================================================');
console.log('       OmmNoMi TDD++ MEGA TEST SUITE (1,000+ PERMUTATIONS)              ');
console.log('========================================================================\n');

const firstNames = ['John', 'Jane', 'Michael', 'Sarah', 'David', 'Emily', 'Robert', 'Lisa'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Miller', 'Davis', 'Wilson'];
const insuranceAnswers = ['Yes', 'No (self-pay)', 'No, I prefer a referral to an in-network provider', 'No, I prefer a referral to a Medicare provider'];
const primaryCarriers = ['Blue Cross Blue Shield', 'Aetna', 'UnitedHealthcare', 'Cigna', 'Medicare', ''];
const planNames = ['Gold PPO', 'Silver Choice', 'Select Plus', ''];
const secondaryCarriers = ['', 'Cigna', 'Aetna', 'Humana', 'Mutual of Omaha'];
const isOnlyPlans = ['Yes', 'No', ''];
const subscriberRelations = ['Self', 'Spouse', 'Child', ''];

let totalRun = 0;
let totalPassed = 0;
let totalFailed = 0;

// Test Matrix Generation
for (let f = 0; f < firstNames.length; f++) {
  for (let l = 0; l < lastNames.length; l++) {
    for (let insAnsIdx = 0; insAnsIdx < insuranceAnswers.length; insAnsIdx++) {
      for (let pCarIdx = 0; pCarIdx < primaryCarriers.length; pCarIdx++) {
        const insAns = insuranceAnswers[insAnsIdx];
        const pCar = primaryCarriers[pCarIdx];
        
        // Logical constraint: if self-pay or referral, company is usually blank
        if (insAns.startsWith('No') && pCar !== '') continue;
        if (insAns === 'Yes' && pCar === '') continue;

        for (let sCarIdx = 0; sCarIdx < secondaryCarriers.length; sCarIdx++) {
          const sCar = secondaryCarriers[sCarIdx];
          const isOnly = sCar === '' ? 'Yes' : 'No';
          
          for (let pPlanIdx = 0; pPlanIdx < planNames.length; pPlanIdx++) {
            const pPlan = planNames[pPlanIdx];

            const formRow = {
              'Client_ID': `CL-${f}-${l}`,
              'Do you have insurance you would like to use?': insAns,
              'Name of Insurance Company': pCar,
              'Insurance Plan Name / Name on Card': pPlan,
              'Member/Beneficiary ID': pCar ? `MEM-${f}${l}99` : '',
              'Policy Group Number': pCar ? `GRP-${f}00` : '',
              'Policy Holder Name': (f % 2 === 0 && pCar) ? `${firstNames[f]} ${lastNames[l]}` : '',
              'Relationship to Client': (f % 2 === 0 && pCar) ? 'Self' : '',
              "Is this client's only insurance plan?": isOnly,
              'Secondary Insurance Company': sCar,
              'Secondary Insurance Plan Name': sCar ? 'Secondary Care' : '',
              'Secondary Member ID': sCar ? `SEC-${l}${f}` : '',
              'Secondary Policy Group Number': sCar ? 'SGRP-1' : '',
              'Secondary Policy Holder Name': (sCar && l % 2 === 0) ? `${firstNames[f]} ${lastNames[l]}` : '',
              'Secondary Relationship to Client': (sCar && l % 2 === 0) ? 'Self' : ''
            };

            const clientRow = {
              ID: `CL-${f}-${l}`,
              FirstName: firstNames[f],
              LastName: lastNames[l],
              UseInsurance: insAns,
              ConsentEmail: 'Yes, I consent',
              ConsentMobileSMS: 'Yes, please send text',
              ConsentTelehealth: 'Yes, I agree',
              Gender: 'Female',
              Address: '123 Pine St',
              City: 'Mandi',
              State: 'HP',
              ZipCode: '175011',
              Phone: '9876543210'
            };

            // 1. AppSheet Primary & Secondary Actions
            const primaryActionRow = simulatePrimaryAction(formRow);
            const secondaryActionRow = simulateSecondaryAction(formRow);

            const insuranceTable = [];
            if (primaryActionRow && primaryActionRow.ProviderName) {
              insuranceTable.push(primaryActionRow);
            }
            if (secondaryActionRow && secondaryActionRow.ProviderName) {
              insuranceTable.push(secondaryActionRow);
            }

            // 2. Webhook paramObj
            const paramObj = generateWebhookParamObj(clientRow, insuranceTable);

            // 3. Apps Script Processor
            const { processedData, conditions } = evaluateAppsScript(paramObj);

            // VALIDATION ASSERTIONS
            totalRun++;
            let testOk = true;

            // Check 1: Primary Action UseInsurance mapping
            if (insAns === 'Yes' && primaryActionRow.UseInsurance !== 'Primary') {
              testOk = false;
            }
            if (insAns.startsWith('No') && primaryActionRow.UseInsurance !== insAns) {
              testOk = false;
            }

            // Check 2: Task 9 PlanName Fallback
            if (pCar !== '') {
              const expectedPlan = (pPlan.trim() !== '') ? pPlan.trim() : pCar.trim();
              if (primaryActionRow.PlanName !== expectedPlan) {
                testOk = false;
              }
            }

            // Check 3: Secondary Action creation & isolation
            if (sCar !== '') {
              if (!secondaryActionRow) {
                testOk = false;
              } else {
                if (secondaryActionRow.UseInsurance !== 'Secondary') testOk = false;
                if (secondaryActionRow.ProviderName !== sCar) testOk = false;
              }
            } else {
              if (secondaryActionRow !== null) {
                testOk = false;
              }
            }

            // Check 4: Apps Script INSURANCE_FORM condition
            const expectInsuranceForm = (insAns === 'Yes' && pCar !== '');
            if (conditions.INSURANCE_FORM !== expectInsuranceForm) {
              testOk = false;
            }

            // Check 5: Apps Script SECONDARY_INSURANCE_FORM & COB_FORM condition
            const expectSecondary = (sCar !== '');
            if (conditions.SECONDARY_INSURANCE_FORM !== expectSecondary) {
              testOk = false;
            }
            if (conditions.COB_FORM !== expectSecondary) {
              testOk = false;
            }

            // Check 6: Policy Holder Self-Fallback
            if (expectInsuranceForm && !formRow['Policy Holder Name']) {
              if (processedData['{{SubscriberFirstName}}'] !== clientRow.FirstName) testOk = false;
              if (processedData['{{SubscriberLastName}}'] !== clientRow.LastName) testOk = false;
            }
            if (expectSecondary && !formRow['Secondary Policy Holder Name']) {
              if (processedData['{{AdditionalSubscriberFirstName}}'] !== clientRow.FirstName) testOk = false;
              if (processedData['{{AdditionalSubscriberLastName}}'] !== clientRow.LastName) testOk = false;
            }

            if (testOk) {
              totalPassed++;
            } else {
              totalFailed++;
              if (totalFailed <= 5) {
                console.error(`[FAIL] Scenario: ${clientRow.FirstName} ${clientRow.LastName} | Ins: ${insAns} | Carrier: ${pCar} | Sec: ${sCar}`);
              }
            }
          }
        }
      }
    }
  }
}

console.log(`TOTAL PERMUTATIONS TESTED : ${totalRun}`);
console.log(`PASSED TESTS               : ${totalPassed}`);
console.log(`FAILED TESTS               : ${totalFailed}`);
console.log(`SUCCESS RATE               : ${((totalPassed / totalRun) * 100).toFixed(2)}%\n`);

if (totalFailed === 0) {
  console.log('========================================================================');
  console.log('       [SUCCESS] ALL 1,000+ PERMUTATIONS PASSED WITH ZERO ERRORS!        ');
  console.log('========================================================================');
  process.exit(0);
} else {
  console.error(`[FATAL] ${totalFailed} permutations failed verification!`);
  process.exit(1);
}
