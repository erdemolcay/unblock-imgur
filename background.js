chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    var targetUrl = new URL(tab.url);
    if (targetUrl.hostname === 'i.imgur.com') {
        var updateProperties = {
            url: 'https://images.duckduckgo.com/iu/?u=' + targetUrl.href
        };
        chrome.tabs.update(tabId, updateProperties);
    }
});