// background.js

// Function to inject content script if not already injected
function ensureContentScriptInjected(tabId) {
    browser.tabs.executeScript(tabId, { code: 'typeof clickButton === "function";' })
        .then((results) => {
            if (!results[0]) {
                return browser.tabs.executeScript(tabId, { file: 'content.js' });
            }
        })
        .catch((error) => {
            console.error('Error checking/injecting content script:', error);
        });
}

browser.browserAction.onClicked.addListener((tab) => {
    ensureContentScriptInjected(tab.id).then(() => {
        browser.tabs.sendMessage(tab.id, { action: 'clickButton' });
    }).catch((error) => {
        console.error('Error sending clickButton message:', error);
    });
});



