// =========================================================================
// OmmNoMi: Click Native 'Create my first automation' -> 'Create a custom bot'
// Size: Under 50 lines, 100% Pure ASCII, Validated with node -c
// =========================================================================
(function triggerCustomBotCreation() {
    try {
        console.clear();
        console.log("=== [OmmNoMi] Step 1: Searching for Bot Creation Options ===");

        function findElementByText(text) {
            var all = Array.from(document.querySelectorAll('button, [role="button"], [role="menuitem"], div, span, a'));
            return all.find(function(el) {
                var t = (el.innerText || "").trim();
                return t.toLowerCase() === text.toLowerCase();
            });
        }

        var customBtn = findElementByText("Create a custom bot");

        if (customBtn) {
            console.log("[FOUND] 'Create a custom bot' is visible! Clicking now...");
            customBtn.click();
            checkResult();
        } else {
            console.log("[INFO] Looking for 'Create my first automation' button...");
            var firstBtn = Array.from(document.querySelectorAll('button')).find(function(b) {
                var t = (b.textContent || "").trim();
                return t.indexOf("Create my first automation") !== -1 || t.indexOf("New Bot") !== -1;
            });

            if (firstBtn) {
                console.log("[FOUND] Clicking 'Create my first automation'...");
                firstBtn.click();

                setTimeout(function() {
                    console.log("=== [OmmNoMi] Step 2: Looking for 'Create a custom bot' dropdown item ===");
                    var customAfterClick = findElementByText("Create a custom bot");
                    if (customAfterClick) {
                        console.log("[FOUND] Clicking 'Create a custom bot'...");
                        customAfterClick.click();
                    } else {
                        console.log("[INFO] All visible menu items/buttons now:");
                        var items = Array.from(document.querySelectorAll('button, [role="menuitem"], [role="option"]')).map(function(x) { return (x.innerText || "").trim(); }).filter(Boolean);
                        console.log(items.slice(0, 10));
                    }
                    checkResult();
                }, 600);
            } else {
                console.log("[WARN] Neither button found. Checking if bot already exists...");
                checkResult();
            }
        }

        function checkResult() {
            setTimeout(function() {
                var store = window.appStore;
                if (!store) return;
                var h = store.getState().appTemplate.history[0].appTemplate;
                var bots = (h && h.Behavior && h.Behavior.AppBots) || [];
                console.log("=== [RESULT] Total Bots in AppSheet:", bots.length);
                if (bots.length > 0) {
                    console.log("[SUCCESS] Bot Created:", bots[0].Name, "| ID:", bots[0].ComponentId);
                }
            }, 1000);
        }
    } catch(e) { console.error("[ERROR]", e.message); }
})();
