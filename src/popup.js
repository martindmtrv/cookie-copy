document.addEventListener('DOMContentLoaded', async () => {
    const matchingSiteDiv = document.getElementById('matching-site');
    const noMatchDiv = document.getElementById('no-match');
    const detectedDomain = document.getElementById('detected-domain');
    const renderedPreview = document.getElementById('rendered-preview');
    const copyBtn = document.getElementById('copy-btn');
    const copyStatus = document.getElementById('copy-status');
    const settingsLink = document.getElementById('settings-link');
    const openOptionsBtn = document.getElementById('open-options-btn');

    // Get current tab URL
    const tabs = await browser.tabs.query({ active: true, currentWindow: true });
    const currentTab = tabs[0];

    if (currentTab && currentTab.url) {
        // Request rendered cookies from background script
        const response = await browser.runtime.sendMessage({
            type: 'GET_RENDERED_COOKIES',
            url: currentTab.url
        });

        if (response && response.renderedText) {
            detectedDomain.textContent = response.domain;
            renderedPreview.textContent = response.renderedText;
            matchingSiteDiv.classList.remove('hidden');
            
            // Handle Copy
            copyBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(response.renderedText).then(() => {
                    copyStatus.classList.remove('hidden');
                    setTimeout(() => {
                        copyStatus.classList.add('hidden');
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy:', err);
                    // Fallback for some environments
                    const el = document.createElement('textarea');
                    el.value = response.renderedText;
                    document.body.appendChild(el);
                    el.select();
                    document.execCommand('copy');
                    document.body.removeChild(el);
                    copyStatus.classList.remove('hidden');
                    setTimeout(() => {
                        copyStatus.classList.add('hidden');
                    }, 2000);
                });
            });
        } else {
            noMatchDiv.classList.remove('hidden');
        }
    } else {
        noMatchDiv.classList.remove('hidden');
    }

    // Settings Navigation
    const openOptions = () => {
        if (browser.runtime.openOptionsPage) {
            browser.runtime.openOptionsPage();
        } else {
            window.open(browser.runtime.getURL('options.html'));
        }
    };

    settingsLink.addEventListener('click', openOptions);
    openOptionsBtn.addEventListener('click', openOptions);
});
