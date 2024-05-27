// content.js

"main.mage-AppShell-main div.mage-Card-root.mage-Paper-root div.mage-ScrollArea-root div.mage-ScrollArea-viewport div div div div div.mage-Stack-root div div.mage-Grid-root div.mage-Grid-inner div.mage-Grid-col.__m__-r47 div.mage-Stack-root div.mage-Stack-root div.mage-Card-root.mage-Paper-root div div.mage-Stack-root div.mage-Stack-root button.mage-UnstyledButton-root"

const storedElements = {};
/**
 * Find specific elements
 * @param {string} element 
 * @param {function} callback 
 * @returns 
 */
function findElement(element, callback) {
    if (element === 'selectModelButton') {
        if (storedElements['selectModelButton']) return storedElements['selectModelButton'];
        const spanElements = document.querySelectorAll('div.mage-Card-root div.mage-Stack-root span.mage-Button-inner span.mage-Button-label');
        console.log('Searching for "Select Model" button...');

        for (let span of spanElements) {
            if (span.textContent.includes("Select Model")) {
                console.log('"Select Model" span found:', span);
                const parentSpan = span.parentElement;
                if (parentSpan && parentSpan.tagName.toLowerCase() === 'span') {
                    const button = parentSpan.parentElement;
                    if (button && button.tagName.toLowerCase() === 'button' && button.classList.contains('mage-Button-root')) {
                        console.log('Found "Select Model" button');
                        storedElements['selectModelButton'] = button;
                        if (callback) callback(button);
                        return button;  // Return the found button
                    }
                }
            }
        }
    } else if (element === 'selectModelMainButton') {
        if (storedElements['selectModelMainButton']) {
            if (callback) callback(storedElements['selectModelMainButton']);
            return storedElements['selectModelMainButton'];
        }

        const button = document.querySelector('main.mage-AppShell-main div.mage-Card-root.mage-Paper-root div.mage-ScrollArea-root div.mage-ScrollArea-viewport div div div div div.mage-Stack-root div div.mage-Grid-root div.mage-Grid-inner div.mage-Grid-col div.mage-Stack-root div.mage-Stack-root div.mage-Card-root.mage-Paper-root div div.mage-Stack-root div.mage-Stack-root button.mage-UnstyledButton-root');
        if (button) {
            console.log('Found "Select Model Main" button');
            storedElements['selectModelMainButton'] = button;
            if (callback) callback(button);
            return button;  // Return the found button
        }
    }
    return undefined;  // Return undefined if the element was not found
}

// Function to find multiple elements and execute a callback when found
/**
 * 
 * @param {function} callback 
 * @returns [] or undefined
 */
function findAllNeededElements(callback) {
    const elements = {};

    // Find selectModelButton
    const spanElements = document.querySelectorAll('div.mage-Card-root div.mage-Stack-root span.mage-Button-inner span.mage-Button-label');
    console.log('Searching for "Select Model" button...');

    for (let span of spanElements) {
        if (span.textContent.includes("Select Model")) {
            console.log('"Select Model" span found:', span);
            const parentSpan = span.parentElement;
            if (parentSpan && parentSpan.tagName.toLowerCase() === 'span') {
                const button = parentSpan.parentElement;
                if (button && button.tagName.toLowerCase() === 'button' && button.classList.contains('mage-Button-root')) {
                    console.log('Found "Select Model" button');
                    elements['selectModelButton'] = button;
                    break;
                }
            }
        }
    }

    // Find selectModelMainButton
    const mainButton = document.querySelector('main.mage-AppShell-main div.mage-Card-root.mage-Paper-root div.mage-ScrollArea-root div.mage-ScrollArea-viewport div div div div div.mage-Stack-root div div.mage-Grid-root div.mage-Grid-inner div.mage-Grid-col div.mage-Stack-root div.mage-Stack-root div.mage-Card-root.mage-Paper-root div div.mage-Stack-root div.mage-Stack-root button.mage-UnstyledButton-root');
    if (mainButton) {
        console.log('Found "Select Model Main" button');
        elements['selectModelMainButton'] = mainButton;
        overlayDiv = mainButton.querySelector('div.mage-Overlay-root');
        if (overlayDiv) {
            elements['overlayDiv'] = overlayDiv;
        }
    }

    // Store the found elements in storedElements
    Object.assign(storedElements, elements);

    // If all elements are found, invoke the callback
    if (Object.keys(elements).length === 3) {
        if (callback) callback(elements);
        return elements;
    }

    return undefined;  // Return undefined if not all elements were found
}

/**
 * Finds mage app elements on side bar
 * @returns []
 */
function findMageElements(callback) {
    const elements = [];
    const navbar = document.querySelector('nav.mage-AppShell-navbar');
    let found = false;
    if (navbar) {
        const scrollArea = navbar.querySelector('div.mage-ScrollArea-root');
        if (scrollArea) {
            const simpleGrids = scrollArea.querySelectorAll('div.mage-SimpleGrid-root');
            simpleGrids.forEach(grid => {
                elements.push(grid);
                found = true;
            });
        }
    }

    if (found) {
        if (callback) callback(elements);
        return elements;
    }
    return undefined;
}

// Function to hide specific elements
function hideMageElements() {
    console.log("hideMageElements");
    const navbar = document.querySelector('nav.mage-AppShell-navbar');
    if (navbar) {
        const scrollArea = navbar.querySelector('div.mage-ScrollArea-root');
        if (scrollArea) {
            const simpleGrids = scrollArea.querySelectorAll('div.mage-SimpleGrid-root');
            simpleGrids.forEach(grid => {
                console.log("set element.style.display = 'none'");
                grid.style.display = 'none';
            });
        }
    }
    const button = findElement('selectModelButton');
    if (button) {
        let parent = button.parentElement;
        if (parent) {
            parent = parent.parentSpan;
            if (parent) {
                const div = parent.parentSpan;
                if (div) {
                    div.style.opacity = 0;
                    console.log('Opacity set to 0');
                }
            }
        }
    }
    // let opacity = 0;
    // const overlay = document.querySelectorAll('div.mage-Overlay-root');
    // overlay.forEach(div => {
    //     if (div.style.includes("--overlay-bg")) {
    //         div.style.setProperty('--overlay-bg', `rgba(0, 0, 0, ${opacity})`);
    //     }
    // });

    // <div style="--overlay-bg: rgba(0, 0, 0, 0); --overlay-radius: calc(0.25rem * var(--mantine-scale)); --overlay-z-index: 200; opacity: 1;" class="m-9814e45f mage-Overlay-root"><div style="height: 100%;" class="m-4451eb3a mage-Center-root"><div style="--stack-gap: var(--mantine-spacing-md); --stack-align: center; --stack-justify: flex-start;" class="m-6d731127 mage-Stack-root"><button style="--button-bg: var(--mantine-color-white); --button-hover: rgba(252, 252, 252, 1); --button-color: black; --button-bd: calc(0.0625rem * var(--mantine-scale)) solid transparent;" class="mantine-focus-auto mantine-active m-77c9d27d mage-Button-root m-87cf2631 mage-UnstyledButton-root" data-variant="white" type="button"><span class="m-80f1301b mage-Button-inner"><span class="m-811560b9 mage-Button-label">Select Model</span></span></button></div></div></div>
}


function showMageElements() {
    const navbar = document.querySelector('nav.mage-AppShell-navbar');
    if (navbar) {
        const scrollArea = navbar.querySelector('div.mage-ScrollArea-root');
        if (scrollArea) {
            const simpleGrids = scrollArea.querySelectorAll('div.mage-SimpleGrid-root');
            simpleGrids.forEach(grid => {
                grid.style.display = '';
            });
        }
    }
}
// Function to initialize and execute after page load
function initializeExtension() {
    // Check the stored setting and act accordingly
    browser.storage.sync.get('hideSidebarApps').then(data => {
        if (data.hideSidebarApps !== false) { // default to true if not set
            console.log("hide elements");
            hideMageElements();
        } else {
            console.log("show elements");
            showMageElements();
        }
    });
    // Find and store all elements after the elements are hidden or shown
    // findAllNeededElements((elements) => {
    //     console.log('All required elements are ready to be used:', elements);
        // Perform actions with the elements here
        // Example: elements['selectModelMainButton'].click();
    // });
}
// Hide elements once the content script is loaded
// hideMageElements();

let isProcessing = false; // Flag to ensure single execution
function clickButton() {
    if (isProcessing) {
        console.log('Already processing a clickButton message, ignoring duplicate.');
        return;
    }
    isProcessing = true;

    // Remove all the models from local storage.
    browser.storage.local.remove('titles').then(() => {
        console.log('"titles" item removed from local storage');
    }).catch((error) => {
        console.error('Error removing item from local storage:', error);
    });

    if (!onModelSelectionModal()) {
        setTimeout(process(true), 1000);
    } else {
        process(false);
    }

}
/**
 * 
 * @param {boolean} mustClickSelectModelButton 
 * @returns 
 */
function process(mustClickSelectModelButton) {
    if (mustClickSelectModelButton) {
        /*
        // Find the button to open the model selection modal
        const spanElements = document.querySelectorAll('div.mage-Card-root div.mage-Stack-root span.mage-Button-inner span.mage-Button-label');
        console.log('Searching for "Select Model" button...');

        done = false;
        for (let span of spanElements) {
            if (span.textContent.includes("Select Model")) {
                console.log('"Select Model" span found:', span);
                const parentSpan = span.parentElement;
                if (parentSpan && parentSpan.tagName.toLowerCase() === 'span') {
                    const button = parentSpan.parentElement;
                    if (!done && button && button.tagName.toLowerCase() === 'button' && button.classList.contains('mage-Button-root')) {
                        button.click();
                        done = true;
                        console.log('Select Model button clicked');
                        setTimeout(clickRecommendedButton, 2000); // Wait for the DOM to update after clicking the button
                        return;
                    }
                }
            }
        }
        */
        done = false;
        button = findElement('selectModelButton');
        if (!done) {
            button.click();
            done = true;
            console.log('Select Model button clicked');
            setTimeout(clickRecommendedButton, 2000); // Wait for the DOM to update after clicking the button
            return;
        }
    } else {
        setTimeout(clickRecommendedButton, 100); // Wait for the DOM to update after clicking the button
    }
    console.log('Button not found');
    isProcessing = false;
}

/**
 * Are we on /build model select modal?
 * return true if we have to click the Select Model button on the build page.
 * 
 * @returns {boolean}
 */
function onModelSelectionModal() {
    if (navigateToBuildPage()) {
        // we had to navigate to /build
        // click the "Select Model" button
        return false;
    }
    // We are already on /build
    // See if the modal is active
    const element = document.querySelector('div.mage-Modal-inner section.mage-Modal-content header button.mage-CloseButton-root');
    if (element) {
        // but the modal is active
        // No need to click the model selection button
        return true;
    }
    // click the "Select Model" button
    return false;
}

/**
 * Function to navigate to the target URL
 * 
 * @returns {boolean}
 */
function navigateToBuildPage() {
    const buildUrl = '/build';
    // Check if the current URL does not end with the buildUrl
    if (!window.location.href.endsWith(buildUrl)) {
        console.log("Navigate to the target URL");
        window.location.href = buildUrl;
        return true;
    }
    // console.log('Already on the build page');
    return false;
}

/**
 * Clicks the "RECOMMENDED" button on the model selection modal
 * @returns 
 */
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
                const variant = button.getAttribute('data-variant');
                if (variant === 'white') {
                    button.click();
                    console.log('Recommended button clicked');
                    setTimeout(gatherTitles, 2500); // Wait for the DOM to update after clicking the button
                } else {
                    setTimeout(gatherTitles, 100); // Wait for the DOM to update after clicking the button
                }
                return;
            }
        }
    }

    console.log('Recommended button not found');
}

/**
 * 
 */
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

/**
 * Closes the select model modal
 */
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

// Function to observe and act on dynamic content loading
function observeMutations() {
    let done = false;
    const observer = new MutationObserver(() => {
        // Try to find and store all elements
        const modelSelectionElements = findAllNeededElements((elements) => {
            console.log('All model selection elements are ready to be used:', elements);
            // Perform actions with the elements here
            // Example: elements['selectModelMainButton'].click();
            elements['overlayDiv'].style.opacity = 0;
        });
        appSidebarElements = findMageElements((elements) => {
            console.log('All app sidebar elements are ready to be used:', elements);
            elements.forEach(grid => {
                console.log("set element.style.display = 'none'");
                grid.style.display = 'none';
            });
        });
        done = Array.isArray(appSidebarElements) && Array.isArray(modelSelectionElements);

        if (done) {
            // Disconnect the observer once all elements are found
            observer.disconnect();
            console.log('All elements found and observer disconnected.');
        }
    });

    // Start observing the document body for changes
    observer.observe(document.body, { childList: true, subtree: true });
}


// Listen for messages from the popup script
browser.runtime.onMessage.addListener((message) => {
    console.log("Content script received message:", message);
    if (message.action === 'clickButton') {
        clickButton();
    } else if (message.action === 'toggleElements') {
        if (message.hide) {
            hideMageElements();
        } else {
            showMageElements();
        }
    }
});
// Run the initialization after the page is fully loaded
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    observeMutations();
    initializeExtension();
} else {
    window.addEventListener('DOMContentLoaded', () => {
        observeMutations();
        initializeExtension();
    });
}
