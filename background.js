var reloadCount = 0;

// Redirect imgur.com requests to Duckduckgo proxy
chrome.webRequest.onBeforeRequest.addListener(function (details) {
    var redirectUrl = "https://proxy.duckduckgo.com/iu/?u=" + details.url;
    redirectUrl = redirectUrl.replace(/ref=.*&|ref=.*$/, "");
    return {redirectUrl: redirectUrl};
}, {
    urls: ["*://*.imgur.com/*"]
}, ["blocking"]);

chrome.webRequest.onHeadersReceived.addListener(function (details) {
    // If HTTP status is not OK, try again
    if (details.frameId === 0 && details.statusCode !== 200 && reloadCount < 2) {
        chrome.tabs.reload(details.tabId);
        reloadCount++;
    }

    var contentType = '';
    var lastIndex = 0;
    $.each(details.responseHeaders, function (index, item) {
        // Modify valid JS sources when imgur page loads from Duckduckgo proxy
        if (item.name === "content-security-policy" && item.value.indexOf("script-src") >= 0) {
            details.responseHeaders[index].value = "script-src self http: https: about: 'unsafe-inline' 'unsafe-eval'";
        }

        // Get content type
        if (item.name === "content-type") {
            contentType = item.value;
        }

        lastIndex = index;
    });

    // if this is an image or video, set a proper filename
    if (contentType.startsWith("image/") || contentType.startsWith("video/")) {
        details.responseHeaders[lastIndex + 1] = {
            name: "content-disposition",
            value: "filename=" + details.url.split('/').pop()
        };
    }

    return {responseHeaders: details.responseHeaders};

}, {
    urls: [
        "*://proxy.duckduckgo.com/iu/?u=http://imgur.com*",
        "*://proxy.duckduckgo.com/iu/?u=https://imgur.com*",
        "*://proxy.duckduckgo.com/iu/?u=http://*.imgur.com*",
        "*://proxy.duckduckgo.com/iu/?u=https://*.imgur.com*",
    ]
}, ["responseHeaders", "blocking"]);