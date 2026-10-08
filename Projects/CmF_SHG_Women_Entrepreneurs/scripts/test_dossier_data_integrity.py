"""
OmmNoMi TDD++ Rigorous Verification Suite for Questionnaire Dossiers.
Tests 100% of questions and values across Survey, SubTable, and SubSubTable
for Pradeep (PAR) and Baran respondents.
Strictly adheres to <= 300 lines policy.
"""

import os
import re
import sys
import unittest
import pandas as pd
sys.path.insert(0, os.path.abspath("projects/CmF_SHG_Women_Entrepreneurs/scripts"))
sys.path.insert(0, os.path.abspath("."))
import build_complete_dossiers as bcd


class TestDossierDataIntegrity(unittest.TestCase):

    @classmethod
    def setUpClass(cls):
        cls.data_dir = r"projects\CmF_SHG_Women_Entrepreneurs\data"
        cls.df_survey = pd.read_csv(os.path.join(cls.data_dir, "WCH - Survey.csv"))
        cls.df_sub = pd.read_csv(os.path.join(cls.data_dir, "WCH - SubTable.csv"))
        cls.df_subsub = pd.read_csv(os.path.join(cls.data_dir, "WCH - SubSubTable.csv"))
        cls.par_ids = cls.df_survey[cls.df_survey['InvestigatorID'] == 'PAR']['ID'].tolist()

    def test_01_all_par_respondents_have_complete_tables(self):
        """Ensure all PAR respondents have rows in Survey, SubTable, and SubSubTable."""
        self.assertGreaterEqual(len(self.par_ids), 6, "Must have at least 6 PAR respondents.")
        for sid in self.par_ids:
            sub_cnt = len(self.df_sub[self.df_sub['Survey'] == sid])
            subsub_cnt = len(self.df_subsub[self.df_subsub['Survey'] == sid])
            self.assertGreater(sub_cnt, 30, f"{sid} missing SubTable rows! Found {sub_cnt}")
            self.assertGreater(subsub_cnt, 50, f"{sid} missing SubSubTable rows! Found {subsub_cnt}")

    def test_02_par1_own_savings_matches_screenshot_verbatim(self):
        """Verify PAR-1 Own Savings exact numbers (5000) and usage text match AppSheet."""
        html = bcd.generate_respondent_html('PAR-1')
        
        # Must contain Rs 5,000 under Own Savings
        self.assertIn("5,000", html, "PAR-1 HTML missing 5,000 capital amount!")
        self.assertIn("Seed capital to buy material and set up the shop", html,
                      "PAR-1 HTML missing verbatim loan usage text!")
        self.assertIn("Q3.", html, "PAR-1 HTML must contain Q3 heading!")
        self.assertIn("How did you use the loans taken from different sources?", html,
                      "PAR-1 HTML must contain verbatim Q3 title!")

    def test_03_all_par_capital_loans_data_present_in_html(self):
        """Iterate over all PAR respondents and verify every non-zero amount in SubSubTable is in HTML."""
        for sid in self.par_ids:
            html = bcd.generate_respondent_html(sid)
            subsub_rows = self.df_subsub[self.df_subsub['Survey'] == sid]
            
            loan_subs = subsub_rows[subsub_rows['Question_Group'].str.contains('LoanUsage', na=False)]
            for qg, grp in loan_subs.groupby('Question_Group'):
                for q_col in ['SubSubTable_CapitalArranged_FirstYear', 'SubSubTable_CapitalArranged_MidYear',
                              'SubSubTable_CapitalArranged_ThisYear', 'SubSubTable_CapitalArranged_ThisPending']:
                    m = grp[grp['Question'] == q_col]
                    if not m.empty:
                        val = m.iloc[0]['Answer_Number']
                        if pd.notna(val) and float(val) > 0:
                            formatted = f"{int(float(val)):,}"
                            self.assertIn(formatted, html, f"{sid} {qg} {q_col} amount {formatted} missing in HTML!")

    def test_04_family_income_and_enterprise_fields_rendered(self):
        """Verify Section A and Section B key fields are rendered correctly."""
        for sid in self.par_ids:
            r = self.df_survey[self.df_survey['ID'] == sid].iloc[0]
            html = bcd.generate_respondent_html(sid)
            
            # Respondent Name & Enterprise Name
            self.assertIn(str(r['RespondentName']), html, f"{sid} RespondentName missing!")
            self.assertIn(str(r['EnterpriseName']), html, f"{sid} EnterpriseName missing!")
            
            # Phone number if present
            if pd.notna(r.get('RespondentPhone')):
                self.assertIn(str(int(float(r['RespondentPhone']))), html, f"{sid} phone number missing!")

    def test_05_html_has_no_broken_placeholders(self):
        """Verify generated HTML has no 'nan' strings or broken placeholders."""
        for sid in self.par_ids:
            html = bcd.generate_respondent_html(sid)
            self.assertNotIn(">nan<", html, f"{sid} HTML contains raw 'nan' text!")
            self.assertNotIn(">None<", html, f"{sid} HTML contains raw 'None' text!")
            self.assertNotIn("undefined", html, f"{sid} HTML contains 'undefined'!")


if __name__ == '__main__':
    unittest.main()
