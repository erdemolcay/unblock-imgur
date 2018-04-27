// Redirect imgur.com requests to Duckduckgo proxy
chrome.webRequest.onBeforeRequest.addListener(function (details) {
    return {redirectUrl: "https://proxy.duckduckgo.com/iu/?u=" + details.url};
}, {
    urls: ["*://*.imgur.com/*"]
}, ["blocking"]);

// Modify valid JS sources when imgur page loads from Duckduckgo proxy
chrome.webRequest.onHeadersReceived.addListener(function (details) {
    $.each(details.responseHeaders, function (index, item) {
        if (item.name === "content-security-policy" && item.value.indexOf("script-src") >= 0) {
            details.responseHeaders[index].value = "script-src self http: https: about: 'unsafe-inline' 'unsafe-eval'";
        }
    });
    return {responseHeaders: details.responseHeaders};
}, {
    urls: [
        "*://proxy.duckduckgo.com/iu/?u=http://imgur.com*",
        "*://proxy.duckduckgo.com/iu/?u=https://imgur.com*",
        "*://proxy.duckduckgo.com/iu/?u=http://*.imgur.com*",
        "*://proxy.duckduckgo.com/iu/?u=https://*.imgur.com*",
    ]
}, ["responseHeaders", "blocking"]);