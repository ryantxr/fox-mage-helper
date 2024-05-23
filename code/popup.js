// popup.js
document.addEventListener('DOMContentLoaded', () => {
    function updateTitles() {
        browser.storage.local.get('titles').then((result) => {
            const titles = result.titles || [];
            const titlesList = document.getElementById('titles');
            titlesList.innerHTML = '';
            titles.forEach(title => {
                const li = document.createElement('li');
                li.textContent = title;
                titlesList.appendChild(li);
            });
        }).catch((error) => {
            console.error('Error retrieving titles from local storage:', error);
        });
    }

    document.getElementById('clickButton').addEventListener('click', () => {
        browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
            return browser.tabs.sendMessage(tabs[0].id, { action: 'clickButton' });
        }).then(() => {
            setTimeout(updateTitles, 2500); // Update titles after a delay to give time for the content script to gather them
        }).catch((error) => {
            console.error('Error sending message to content script:', error);
        });
    });

    // Initial update in case titles are already available
    updateTitles();
});
