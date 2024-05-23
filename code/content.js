// content.js
function clickButton() {
    const spanElements = document.querySelectorAll('span.mage-Button-label');
    console.log('Searching for "Select Model" button...');

    for (let span of spanElements) {
        if (span.textContent.includes("Select Model")) {
            console.log('"Select Model" span found:', span);
            const parentSpan = span.parentElement;
            if (parentSpan && parentSpan.tagName.toLowerCase() === 'span') {
                const button = parentSpan.parentElement;
                if (button && button.tagName.toLowerCase() === 'button' && button.classList.contains('mage-Button-root')) {
                    button.click();
                    console.log('Button clicked');
                    setTimeout(gatherTitles, 2000); // Wait for the DOM to update after clicking the button
                    return;
                }
            }
        }
    }

    console.log('Button not found');
}

function gatherTitles() {
    console.log('Gathering titles...');
    const titles = [];
    const spanElements = document.querySelectorAll('span.mage-Button-label');

    for (let span of spanElements) {
        if (span.textContent.includes("Select Model")) {
            let rootButton = span.closest('button:not(.mage-Button-root)');
            if (rootButton) {
                console.log('Root button found:', rootButton);
                let h6 = rootButton.querySelector('h6');
                if (h6) {
                    console.log('Title found:', h6.textContent.trim());
                    titles.push(h6.textContent.trim());
                }
            }
        }
    }

    console.log('Titles gathered:', titles);

    // Store the titles in local storage for the popup to access
    browser.storage.local.set({ titles: titles }).then(() => {
        console.log('Titles stored in local storage');
    }).catch((error) => {
        console.error('Error storing titles in local storage:', error);
    });
}

// Listen for messages from the popup script
browser.runtime.onMessage.addListener((message) => {
    console.log("Content script received message:", message);
    if (message.action === 'clickButton') {
        clickButton();
    }
});
