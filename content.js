window.onload = function() {
    var getDataUri = function (targetUrl, callback) {
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            var reader = new FileReader();
            reader.onloadend = function () {
                callback(reader.result);
            };
            reader.readAsDataURL(xhr.response);
        };
        xhr.open('GET', 'https://cors-anywhere.herokuapp.com/' + targetUrl);
        xhr.setRequestHeader('x-requested-with', 'XMLHTTPREQUEST');
        xhr.responseType = 'blob';
        xhr.send();
    };

    $('img').each(function() {
        var img = $(this);
        var src = img.attr('src');
        if (/^(.*\/\/i\.imgur\.com\/.*)$/.test(src)) {
            getDataUri(src, function (base64) {
                img.attr('src', base64);
            });
        }
    });
};