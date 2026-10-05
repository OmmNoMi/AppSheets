"""
OmmNoMi Dynamic Survey Analysis Engine
Modular architecture for multi-district survey analysis.
All modules strictly adhere to the <= 300 lines per file policy.
"""

from .file_resolver import resolve_all_files, sync_and_clean_downloads
from .schema_loader import SchemaRegistry
from .data_evaluator import matches_activity, compute_frequency, compute_district_bundle, extract_respondent_records
from .html_components import render_progress_bar, render_kpi_card, render_sector_card
from .excel_styler import render_table_block, autofit_columns, FMT_CURRENCY, FMT_PERCENT, FMT_INT
from .finance_builder import build_finance_sheet
from .matrix_builder import build_social_matrix_sheet, build_agency_sourcing_sheet
from .indicators_builder import build_indicators_sheet
from .html_report_builder import build_district_html_report
from .dashboard_builder import build_master_dashboard_html
from .dashboard_questions import render_all_question_cards_html
from .dashboard_script import get_master_client_script
from .dashboard_provenance import get_provenance_registry

# Aliases for backwards compatibility
build_agency_sheet = build_agency_sourcing_sheet
build_html_report = build_district_html_report
FMT_PCT = FMT_PERCENT

__all__ = [
    "resolve_all_files",
    "sync_and_clean_downloads",
    "SchemaRegistry",
    "matches_activity",
    "compute_frequency",
    "compute_district_bundle",
    "render_progress_bar",
    "render_kpi_card",
    "render_sector_card",
    "render_table_block",
    "autofit_columns",
    "FMT_CURRENCY",
    "FMT_PERCENT",
    "FMT_PCT",
    "FMT_INT",
    "build_finance_sheet",
    "build_social_matrix_sheet",
    "build_agency_sourcing_sheet",
    "build_agency_sheet",
    "build_indicators_sheet",
    "build_district_html_report",
    "build_html_report",
    "build_master_dashboard_html",
]
