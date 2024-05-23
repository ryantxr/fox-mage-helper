// background.js
browser.runtime.onInstalled.addListener(() => {
    browser.tabs.query({ url: ["https://mage.space/*", "https://www.mage.space/*"] }).then((tabs) => {
        for (let tab of tabs) {
            browser.tabs.executeScript(tab.id, { file: 'content.js' }).catch((error) => {
                console.error('Error injecting content script:', error);
            });
        }
    });
});


