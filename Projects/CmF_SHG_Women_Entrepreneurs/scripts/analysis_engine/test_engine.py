"""
Automated Test Suite for OmmNoMi Dynamic Survey Analysis Engine.
Verifies file line count limits (<= 300 lines), schema loading,
shared mathematical evaluation, and Master Web Dashboard integrity.
"""

import os
import sys
import glob
import unittest
import openpyxl

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from analysis_engine import (
    resolve_all_files,
    SchemaRegistry,
    matches_activity,
    compute_frequency
)
from generate_survey_analysis_dynamic import run_full_pipeline


class TestSurveyAnalysisEngine(unittest.TestCase):
    """Test suite ensuring strict compliance with all engineering rules."""

    def test_01_line_count_strict_limit(self):
        """Rule: Not one single file may exceed 300 lines."""
        engine_files = glob.glob("projects/CmF_SHG_Women_Entrepreneurs/scripts/analysis_engine/*.py")
        root_scripts = [
            "projects/CmF_SHG_Women_Entrepreneurs/scripts/generate_survey_analysis_dynamic.py"
        ]
        all_target_files = engine_files + root_scripts

        self.assertGreater(len(all_target_files), 0, "No Python files found to audit.")
        for fpath in all_target_files:
            with open(fpath, "r", encoding="utf-8") as f:
                line_count = len(f.readlines())
            print(f"Audit line count: {os.path.basename(fpath):35} -> {line_count:3} lines")
            self.assertLessEqual(
                line_count, 300,
                f"VIOLATION: {fpath} has {line_count} lines, which exceeds the strict 300-line limit!"
            )

    def test_02_data_evaluator_primitives(self):
        """Test shared mathematical evaluation and activity matching."""
        self.assertTrue(matches_activity("ACT_GROCERY , ACT_TAILORING", ["ACT_GROCERY"]))
        self.assertFalse(matches_activity("ACT_GROCERY", ["ACT_EMITRA"]))
        self.assertFalse(matches_activity(None, ["ACT_GROCERY"]))

    def test_03_file_resolver_and_schema(self):
        """Test discovery and dynamic schema loading."""
        files = resolve_all_files()
        for k in ['survey', 'sub', 'subsub', 'appvars']:
            self.assertIn(k, files)
            self.assertTrue(os.path.exists(files[k]), f"Missing file: {files[k]}")

        schema = SchemaRegistry(files['appvars'])
        self.assertEqual(len(schema.get_business_activities()), 29)
        self.assertEqual(len(schema.get_capital_sources()), 14)
        self.assertEqual(len(schema.get_loan_usages()), 11)

    def test_04_full_pipeline_and_master_dashboard(self):
        """Test complete pipeline execution generating the Master Web Dashboard and State Workbook."""
        res = run_full_pipeline(target_district="all")

        # Verify Master Interactive Web Dashboard
        master_path = res['master_dashboard']
        self.assertTrue(os.path.exists(master_path), "Master dashboard HTML missing.")
        self.assertGreater(os.path.getsize(master_path), 25000)

        # Verify Consolidated State Master Workbook
        self.assertTrue(os.path.exists(res['state_master']), "State master workbook missing.")

        # Verify Dausa & Baran District Deliverables
        dausa_res = res['districts']['Dausa']
        self.assertEqual(dausa_res['respondents'], 50)
        self.assertTrue(os.path.exists(dausa_res['excel_path']))
        self.assertTrue(os.path.exists(dausa_res['html_path']))
        
        baran_res = res['districts']['Baran']
        self.assertEqual(baran_res['respondents'], 16)
        self.assertTrue(os.path.exists(baran_res['excel_path']))
        self.assertTrue(os.path.exists(baran_res['html_path']))

        # Verify Excel Sheets & Integrity
        wb = openpyxl.load_workbook(dausa_res['excel_path'])
        expected_sheets = [
            "Finance & Capital",
            "Social Category Matrix",
            "Agency & Sourcing",
            "Demographics & Indicators"
        ]
        for sname in expected_sheets:
            self.assertIn(sname, wb.sheetnames, f"Missing sheet: {sname}")

    def test_05_provenance_registry_coverage(self):
        """Verify provenance registry has entries for all questions with complete metadata."""
        from analysis_engine.dashboard_provenance import get_provenance_registry
        reg = get_provenance_registry()
        self.assertGreaterEqual(len(reg), 28, "Provenance registry must cover at least 28 indicators.")
        for qid, meta in reg.items():
            for req_key in ['table_no', 'title', 'source_col', 'sheet_name']:
                self.assertIn(req_key, meta, f"Indicator {qid} missing required metadata key: {req_key}")
                self.assertTrue(bool(meta[req_key]), f"Indicator {qid} has empty metadata for {req_key}")


if __name__ == "__main__":
    unittest.main()
