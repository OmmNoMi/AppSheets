/**
 * NaviConfig.gs — Central Configuration for ONDT / White-Label AppSheets
 * Allows easy cloning to client apps (e.g. Studio 0172, OUIK) with zero code changes.
 */

const NAVI_CONFIG = {
  // Spreadsheet IDs
  SPREADSHEETS: {
    NAVI_OPS: "1i-uiuU9JI7RwXgdI-IrwZQoZN1VjXMPboDNjN4FUN9o",
    NAVI_FLEET_ID: "1ASHzLeuFiByKMqisTXCh3QdgCb2zUCZm1c_DxDIlcY4",
    EMPLOYEE_SPREADSHEET_ID: "1DmHlAzrVXYWO9L8dnsLTSVF9opcepWz7lPPARfhO0Do",
    APP_VARIABLES_ID: "14GWZ56BT17fvD1l0QiOndQEo107buyp2C3kSMKMH4_M"
  },

  // Default Location for Single-Location Tenants
  DEFAULT_LOCATION: "Fremont",

  // Default RingCentral Profile Key
  DEFAULT_PROFILE: "fremont",

  // Location to RingCentral Profile Mapping
  LOCATION_PROFILE_MAP: {
    "fremont": "fremont",
    "tracy": "tracy",
    "recruitment": "recruitment",
    "default": "fremont"
  }
};

// Global Shortcuts for Backward Compatibility
var NAVI_OPS = NAVI_CONFIG.SPREADSHEETS.NAVI_OPS;
var NAVI_FLEET_ID = NAVI_CONFIG.SPREADSHEETS.NAVI_FLEET_ID;

/**
 * Returns the matching RingCentral profile key for a location name.
 * @param {string} location
 * @return {string} profileKey
 */
function getProfileForLocation(location) {
  if (!location) return NAVI_CONFIG.DEFAULT_PROFILE;
  var key = String(location).trim().toLowerCase();
  return NAVI_CONFIG.LOCATION_PROFILE_MAP[key] || NAVI_CONFIG.DEFAULT_PROFILE;
}
