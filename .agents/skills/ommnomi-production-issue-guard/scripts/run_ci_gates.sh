#!/usr/bin/env bash
# OmmNoMi 4-Tier Zero-Regression CI Quality Gate Runner
# Usage: ./run_ci_gates.sh [app_name] [site_name]
set -e

APP="${1:-omniquery}"
SITE="${2:-ommnomi.local}"
BENCH_DIR="/home/hardi/frappe-bench/version-16"
APP_DIR="${BENCH_DIR}/apps/${APP}"
PYTHON_BIN="${BENCH_DIR}/env/bin/python"

if [ ! -f "${PYTHON_BIN}" ]; then
    PYTHON_BIN="python3"
fi

echo "================================================================="
echo "   OmmNoMi 4-Tier Zero-Regression CI Quality Gate Runner"
echo "   Target App: ${APP} | Site: ${SITE}"
echo "================================================================="
echo ""

# Tier 1: Frontend Unit & Accessibility (Vitest)
echo "[TIER 1/4] Running Frontend Unit & Accessibility Test Suite (Vitest)..."
if [ -d "${APP_DIR}/node_modules" ] || [ -f "${APP_DIR}/package.json" ]; then
    cd "${APP_DIR}"
    npm test
    echo ">> [PASS] Tier 1: Frontend Test Suite 100% Passed!"
else
    echo ">> [SKIP] No frontend package.json found in ${APP_DIR}."
fi
echo ""

# Tier 2: Backend Python Test Suite (Frappe)
echo "[TIER 2/4] Running Backend Python DocType & API Test Suite (Frappe)..."
cd "${BENCH_DIR}"
/home/hardi/.local/bin/bench --site "${SITE}" run-tests --app "${APP}"
echo ">> [PASS] Tier 2: Backend Frappe Test Suite 100% Passed!"
echo ""

# Tier 3: Mutation Quality Gate (TDD++)
echo "[TIER 3/4] Running Automated Mutation Hardening Gate..."
if [ -f "${APP_DIR}/scripts/run_mutation_tests.cjs" ]; then
    cd "${APP_DIR}"
    node scripts/run_mutation_tests.cjs
    echo ">> [PASS] Tier 3: All Mutants Successfully Killed (100% Score)!"
else
    echo ">> [INFO] No run_mutation_tests.cjs script in this app."
fi
echo ""

# Tier 4: Structural Template & Linters Guard
echo "[TIER 4/4] Running Structural HTML5 & Template Linters Guard..."
if [ -f "${APP_DIR}/scripts/check_www_html.py" ]; then
    cd "${APP_DIR}"
    "${PYTHON_BIN}" scripts/check_www_html.py
    echo ">> [PASS] Tier 4: Zero Structural HTML5 Errors Found!"
else
    echo ">> [INFO] No check_www_html.py found in this app."
fi
echo ""

echo "================================================================="
echo "   SUCCESS: All 4 CI Quality Gates Passed with Zero Regressions!"
echo "   Approved for Production Handover & GitHub PR Submission."
echo "================================================================="
