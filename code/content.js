// content.js
let isProcessing = false; // Flag to ensure single execution
function clickButton() {
    if (isProcessing) {
        console.log('Already processing a clickButton message, ignoring duplicate.');
        return;
    }
    isProcessing = true;

    browser.storage.local.remove('titles').then(() => {
        console.log('"titles" item removed from local storage');
    }).catch((error) => {
        console.error('Error removing item from local storage:', error);
    });

    const spanElements = document.querySelectorAll('div.mage-Card-root div.mage-Stack-root span.mage-Button-inner span.mage-Button-label');
    console.log('Searching for "Select Model" button...');

    done = false;
    for (let span of spanElements) {
        if (span.textContent.includes("Select Model")) {
            console.log('"Select Model" span found:', span);
            const parentSpan = span.parentElement;
            if (parentSpan && parentSpan.tagName.toLowerCase() === 'span') {
                const button = parentSpan.parentElement;
                if (! done && button && button.tagName.toLowerCase() === 'button' && button.classList.contains('mage-Button-root')) {
                    button.click();
                    done = true;
                    console.log('Select Model button clicked');
                    setTimeout(clickRecommendedButton, 2000); // Wait for the DOM to update after clicking the button
                    return;
                }
            }
        }
    }

    console.log('Button not found');
    isProcessing = false;
}

function clickRecommendedButton() {
    console.log('clickRecommendedButton...');
    // Select all buttons with the class 'mage-Button-root'
    const buttons = document.querySelectorAll('button.mage-Button-root');
    
    // Iterate through each button
    for (let button of buttons) {
        // Select all span elements that are nested as specified
        const labelSpans = button.querySelectorAll('span.mage-Button-inner > span.mage-Button-label > div > span');
        
        // Check each span to see if its text content is "RECOMMENDED"
        for (let span of labelSpans) {
            if (span.textContent.trim() === "RECOMMENDED") {
                console.log('Recommended button found:', button);
                button.click();
                console.log('Recommended button clicked');
                setTimeout(gatherTitles, 2500); // Wait for the DOM to update after clicking the button
                return;
            }
        }
    }
    
    console.log('Recommended button not found');
}

function gatherTitles() {
    console.log('Gathering titles...');
    const titles = [];
    const spanElements = document.querySelectorAll('section.mage-Modal-content span.mage-Button-label');

    for (let span of spanElements) {
        if (span.textContent.includes("Select Model")) {
            let rootButton = span.closest('button:not(.mage-Button-root)');
            if (rootButton) {
                // console.log('Root button found:', rootButton);
                let h6 = rootButton.querySelector('h6');
                if (h6) {
                    console.log('Title found:', h6.textContent.trim());
                    titles.push(h6.textContent.trim());
                }
            } else {
                console.log('root button not found');
            }
        }
    }

    console.log('Titles gathered:', titles);

    // Store the titles in local storage for the popup to access
    browser.storage.local.set({ titles: titles }).then(() => {
        console.log('Titles stored in local storage');
        isProcessing = false;
        setTimeout(xCloseModal, 1000);
        // Send a message to the popup to update the titles
        browser.runtime.sendMessage({ action: 'updateTitles' });
    }).catch((error) => {
        console.error('Error storing titles in local storage:', error);
        isProcessing = false;
        setTimeout(xCloseModal, 1000);
    });
}

function xCloseModal() {
    // Use querySelector to find the element with the specified selector
    const element = document.querySelector('div.mage-Modal-inner section.mage-Modal-content header button.mage-CloseButton-root');

    // Check if the element is found
    if (element) {
        console.log('Close Modal button found:', element);
        // Example interaction: clicking the button
        element.click();
        console.log('Close Modal button clicked');
    } else {
        console.log('Close Modal button not found');
    }
}


// Listen for messages from the popup script
browser.runtime.onMessage.addListener((message) => {
    console.log("Content script received message:", message);
    if (message.action === 'clickButton') {
        clickButton();
    }
});
