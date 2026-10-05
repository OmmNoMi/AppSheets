"""
Client Authentication and Password Gate Module for Master Analytics Dashboard.
Provides secure login overlay, session persistence, and instant dashboard reveal.
Strictly adheres to <= 300 lines per file policy, pure ASCII only (Rule A5).
"""

DEFAULT_ACCESS_PASS = "cmf2026"


def get_auth_styles() -> str:
    """Returns CSS styles for the client access login overlay."""
    return """
    #loginOverlay {
      position: fixed; inset: 0; background: #f0f2f5;
      display: flex; align-items: center; justify-content: center;
      z-index: 999999; padding: 20px; font-family: 'Roboto Serif', Georgia, serif;
    }
    .auth-card {
      width: 100%; max-width: 400px; background: #ffffff;
      border-radius: 8px; box-shadow: 0 12px 36px rgba(0,0,0,0.12);
      overflow: hidden; border: 1px solid #dadce0; text-align: center;
    }
    .auth-stripe {
      height: 5px;
      background: linear-gradient(to right, #4285F4 25%, #34A853 25% 50%, #EA4335 50% 75%, #FBBC05 75%);
    }
    .auth-body { padding: 28px 24px 22px; }
    .auth-logo { height: 28px; width: auto; margin-bottom: 14px; }
    .auth-title {
      font-family: 'Roboto', sans-serif; font-size: 16px; font-weight: 700;
      color: #202124; margin-bottom: 4px;
    }
    .auth-sub { font-size: 11px; color: #5f6368; margin-bottom: 16px; line-height: 1.4; }
    .auth-badge {
      display: inline-block; font-family: 'Roboto', sans-serif; font-size: 8.5px;
      font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;
      padding: 3px 8px; border-radius: 4px; background: #e8f0fe; color: #1a73e8;
      margin-bottom: 18px;
    }
    .auth-field { text-align: left; margin-bottom: 14px; position: relative; }
    .auth-lbl {
      display: block; font-family: 'Roboto', sans-serif; font-size: 9.5px;
      font-weight: 700; text-transform: uppercase; color: #3c4043; margin-bottom: 5px;
    }
    .auth-input-wrapper { display: flex; border: 1.5px solid #dadce0; border-radius: 6px; overflow: hidden; background: #fff; }
    .auth-input {
      flex: 1; border: none; padding: 9px 12px; font-size: 13px; outline: none;
      font-family: inherit; color: #202124;
    }
    .btn-toggle-pass {
      background: #f8f9fa; border: none; border-left: 1px solid #dadce0;
      padding: 0 12px; font-family: 'Roboto', sans-serif; font-size: 9.5px;
      font-weight: 600; color: #5f6368; cursor: pointer;
    }
    .auth-opt {
      display: flex; align-items: center; justify-content: space-between;
      font-size: 10px; color: #5f6368; margin-bottom: 18px;
    }
    .btn-auth-submit {
      width: 100%; padding: 10px; background: #1a73e8; border: none;
      border-radius: 6px; font-family: 'Roboto', sans-serif; font-size: 12px;
      font-weight: 700; color: #ffffff; cursor: pointer; transition: background 0.2s;
    }
    .btn-auth-submit:hover { background: #1557b0; }
    .auth-err {
      color: #d93025; font-size: 10.5px; margin-top: 10px; min-height: 16px;
      font-weight: 600; font-family: 'Roboto', sans-serif;
    }
    .auth-foot {
      font-family: 'Roboto', sans-serif; font-size: 8.5px; color: #80868b;
      margin-top: 14px; border-top: 1px solid #f1f3f4; padding-top: 10px;
    }
    .btn-logout {
      font-family: 'Roboto', sans-serif; font-size: 8px; font-weight: 700;
      color: #5f6368; background: #f1f3f4; border: 1px solid #dadce0;
      padding: 2px 6px; border-radius: 3px; cursor: pointer; margin-left: 6px;
    }
    .btn-logout:hover { background: #fee2e2; color: #dc2626; border-color: #fca5a5; }
    """


def render_auth_overlay_html(rel_logo: str) -> str:
    """Renders HTML markup for the executive portal authentication overlay."""
    return f"""
<div id="loginOverlay">
  <div class="auth-card">
    <div class="auth-stripe"></div>
    <div class="auth-body">
      <img src="{rel_logo}" alt="OmmNoMi Automation LLP" class="auth-logo">
      <div class="auth-title">CmF / RAJEEVIKA Analytics Portal</div>
      <div class="auth-sub">Field Assessment &amp; Impact Analytics &middot; Rajasthan State Study</div>
      <div class="auth-badge">SECURE CLIENT ACCESS</div>
      <div class="auth-field">
        <label class="auth-lbl" for="txtAuthKey">Access Password</label>
        <div class="auth-input-wrapper">
          <input type="password" id="txtAuthKey" class="auth-input" placeholder="Enter access password" onkeydown="handleAuthKey(event)">
          <button type="button" class="btn-toggle-pass" onclick="togglePassVisibility()">Show</button>
        </div>
      </div>
      <div class="auth-opt">
        <label style="cursor:pointer;display:flex;align-items:center;gap:5px;">
          <input type="checkbox" id="chkRemember" checked> Remember this device
        </label>
      </div>
      <button type="button" class="btn-auth-submit" onclick="verifyAccessKey()">Unlock Dashboard &rarr;</button>
      <div id="authErrorMsg" class="auth-err"></div>
      <div class="auth-foot">Confidential Deliverable &middot; OmmNoMi Automation LLP</div>
    </div>
  </div>
</div>
"""


def get_auth_client_script() -> str:
    """Returns pure JavaScript verification and unlock transition logic."""
    return 'const AUTH_EXPECTED_KEY = "' + DEFAULT_ACCESS_PASS + '";\n' + """
    function checkExistingAuth() {
      const stored = localStorage.getItem('cmf_portal_session') || sessionStorage.getItem('cmf_portal_session');
      if (stored === 'AUTH_OK_2026') {
        revealDashboard();
      } else {
        const inp = document.getElementById('txtAuthKey');
        if (inp) setTimeout(() => inp.focus(), 100);
      }
    }

    function verifyAccessKey() {
      const inp = document.getElementById('txtAuthKey');
      const err = document.getElementById('authErrorMsg');
      const val = inp ? inp.value.trim().toLowerCase() : '';

      if (val === AUTH_EXPECTED_KEY) {
        err.innerText = '';
        const chk = document.getElementById('chkRemember');
        if (chk && chk.checked) {
          localStorage.setItem('cmf_portal_session', 'AUTH_OK_2026');
        } else {
          sessionStorage.setItem('cmf_portal_session', 'AUTH_OK_2026');
        }
        revealDashboard();
      } else {
        err.innerText = 'Invalid access credentials. Please try again.';
        if (inp) {
          inp.focus();
          inp.select();
        }
      }
    }

    function handleAuthKey(e) {
      if (e.key === 'Enter') {
        verifyAccessKey();
      }
    }

    function togglePassVisibility() {
      const inp = document.getElementById('txtAuthKey');
      const btn = document.querySelector('.btn-toggle-pass');
      if (!inp || !btn) return;
      if (inp.type === 'password') {
        inp.type = 'text';
        btn.innerText = 'Hide';
      } else {
        inp.type = 'password';
        btn.innerText = 'Show';
      }
    }

    function revealDashboard() {
      const ov = document.getElementById('loginOverlay');
      if (ov) {
        ov.style.transition = 'opacity 0.25s ease';
        ov.style.opacity = '0';
        setTimeout(() => {
          ov.style.display = 'none';
        }, 260);
      }
      const page = document.querySelector('.page');
      if (page) page.style.display = 'block';
      if (typeof initFilters === 'function') {
        initFilters();
      }
    }

    function signoutPortal() {
      localStorage.removeItem('cmf_portal_session');
      sessionStorage.removeItem('cmf_portal_session');
      window.location.reload();
    }
    """
