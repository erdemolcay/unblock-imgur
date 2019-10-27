chrome.webRequest.onBeforeRequest.addListener(function (details) {
    return {redirectUrl: details.url.replace("imgur.com", "imgur.icu")}
}, {
    urls: ["*://*.imgur.com/*"],
	types : ["main_frame", "sub_frame", "stylesheet", "script", "image", "font", "object", "xmlhttprequest", "ping", "csp_report", "media", "websocket", "other"]
}, ["blocking"]);
