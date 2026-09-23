// =========================================================================
// OmmNoMi: Deep Scanner for Automation Canvas DOM & SVG Structure
// Size: Under 50 lines, 100% Pure ASCII, Validated with node -c
// =========================================================================
(function deepScanAutomationCanvas() {
    try {
        console.clear();
        console.log("=== [OmmNoMi] Deep Scanning Automation Canvas ===");

        // 1. Search for any element mentioning 'YES' (case-insensitive)
        var all = document.querySelectorAll('*');
        var yesMatches = [];
        var checkMatches = [];

        for (var i = 0; i < all.length; i++) {
            var el = all[i];
            var txt = (el.innerText || el.textContent || "").trim();
            if (txt.toUpperCase() === "YES" || txt.indexOf("YES") >= 0) {
                // Only take lowest level elements (no children or children don't have YES)
                var hasChildWithYes = Array.from(el.children).some(function(c) { return (c.innerText || c.textContent || "").indexOf("YES") >= 0; });
                if (!hasChildWithYes) {
                    yesMatches.push({ tag: el.tagName, text: txt, cls: el.className, id: el.id, parent: el.parentElement ? el.parentElement.tagName : null });
                }
            }
            if (txt.indexOf("Check_Zero") >= 0) {
                var hasChild = Array.from(el.children).some(function(c) { return (c.innerText || c.textContent || "").indexOf("Check_Zero") >= 0; });
                if (!hasChild) {
                    checkMatches.push({ tag: el.tagName, text: txt, cls: el.className });
                }
            }
        }

        console.log("Found 'Check_Zero' elements:", checkMatches);
        console.log("Found 'YES' elements:", yesMatches);

        // 2. Search for all plus/add icon buttons in the canvas
        var plusIcons = [];
        var svgs = document.querySelectorAll('svg, [role="button"], button, circle, path');
        svgs.forEach(function(s) {
            var aria = s.getAttribute('aria-label') || '';
            var title = s.getAttribute('title') || '';
            var name = s.getAttribute('name') || '';
            var dataTest = s.getAttribute('data-testid') || '';
            if (aria || title || dataTest) {
                plusIcons.push({ tag: s.tagName, aria: aria, title: title, dataTest: dataTest, text: s.textContent.trim() });
            }
        });
        console.log("Identified Interactive Elements (Sample 15):", plusIcons.slice(0, 15));

    } catch(e) { console.error("[ERROR]", e.message); }
})();
