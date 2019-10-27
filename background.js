chrome.webRequest.onBeforeRequest.addListener(function (details) {
	if(details.url.indexOf('imgur.com')>-1)
	{
    return {redirectUrl: details.url.replace("imgur.com", "imgur.icu")}
	}
}, {
    urls: ["<all_urls>"],
	types : ["main_frame", "sub_frame", "stylesheet", "script", "image", "font", "object", "xmlhttprequest", "ping", "csp_report", "media", "websocket", "other"]
}, ["blocking"]);
