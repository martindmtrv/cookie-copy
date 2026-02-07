const STORAGE_KEY = 'cookie_copy_configs';

// Listen for tab updates to detect matching sites
browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        checkUrlMatch(tab.url, tabId);
    }
});

// Listen for tab activation
browser.tabs.onActivated.addListener(async (activeInfo) => {
    const tab = await browser.tabs.get(activeInfo.tabId);
    if (tab.url) {
        checkUrlMatch(tab.url, activeInfo.tabId);
    }
});

// Check if the current URL matches any configured domain
async function checkUrlMatch(url, tabId) {
    const data = await browser.storage.local.get(STORAGE_KEY);
    const configs = data[STORAGE_KEY] || [];
    
    const match = configs.find(config => {
        try {
            // Support simple string match or regex
            if (config.domain.startsWith('/') && config.domain.endsWith('/')) {
                const regex = new RegExp(config.domain.slice(1, -1));
                return regex.test(url);
            }
            return url.includes(config.domain);
        } catch (e) {
            console.error('Invalid domain pattern:', config.domain);
            return false;
        }
    });

    if (match) {
        // Set a badge or change icon to indicate match
        browser.action.setBadgeText({ text: '!', tabId: tabId });
        browser.action.setBadgeBackgroundColor({ color: '#38bdf8', tabId: tabId });
    } else {
        browser.action.setBadgeText({ text: '', tabId: tabId });
    }
}

// Function to get cookies and render template (requested by popup)
async function getRenderedCookies(url) {
    const data = await browser.storage.local.get(STORAGE_KEY);
    const configs = data[STORAGE_KEY] || [];
    
    const config = configs.find(c => {
        if (c.domain.startsWith('/') && c.domain.endsWith('/')) {
            const regex = new RegExp(c.domain.slice(1, -1));
            return regex.test(url);
        }
        return url.includes(c.domain);
    });

    if (!config) return null;

    const cookieKeys = config.cookies.split(',').map(k => k.trim());
    const domain = new URL(url).hostname;
    
    const cookiePromises = cookieKeys.map(key => 
        browser.cookies.get({ url: url, name: key })
    );

    const cookies = await Promise.all(cookiePromises);
    
    let renderedText = config.template;
    cookieKeys.forEach((key, index) => {
        const cookieValue = cookies[index] ? cookies[index].value : '';
        renderedText = renderedText.replace(new RegExp(`{{${key}}}`, 'g'), cookieValue);
    });

    return {
        renderedText,
        domain: config.domain
    };
}

// Expose internal functions for popup
browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === 'GET_RENDERED_COOKIES') {
        getRenderedCookies(message.url).then(sendResponse);
        return true; // Keep message channel open for async response
    }
});
