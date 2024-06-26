// popup.js
document.addEventListener('DOMContentLoaded', () => {

    const checkbox = document.getElementById('hideSidebarApps');

    // Load the saved state of the checkbox
    browser.storage.sync.get('hideSidebarApps').then(data => {
      checkbox.checked = data.hideSidebarApps !== false; // default to true if not set
    });
  
    // Save the state of the checkbox when it changes
    checkbox.addEventListener('change', () => {
      browser.storage.sync.set({ hideSidebarApps: checkbox.checked });
      browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, { action: 'toggleElements', hide: checkbox.checked });
      });
    });

    function updateTitles() {
        browser.storage.local.get('titles').then((result) => {
            const titles = result.titles || [];
            const titlesList = document.getElementById('titles');
            titlesList.innerHTML = '';
            i = 0;
            titles.forEach(title => {
                i++;
                const li = document.createElement('li');
                li.textContent = i + " " + title;
                titlesList.appendChild(li);
            });
        }).catch((error) => {
            console.error('Error retrieving titles from local storage:', error);
        });
    }

    document.getElementById('clickButton').addEventListener('click', () => {
        browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
            console.log("Send clickButton message");
            return browser.tabs.sendMessage(tabs[0].id, { action: 'clickButton' });
        }).then(() => {
            setTimeout(updateTitles, 2500); // Update titles after a delay to give time for the content script to gather them
        }).catch((error) => {
            console.error('Error sending message to content script:', error);
        });
    });

    // Initial update in case titles are already available
    updateTitles();

    browser.runtime.onMessage.addListener((message) => {
        if (message.action === 'updateTitles') {
            updateTitles();
        }
    });
});
