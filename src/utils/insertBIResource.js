export const dynamicLoadScript = function (src, parentEl) {
    return new Promise((resolve, reject) => {
        if(src.type === 'js'){
            const script = document.createElement('script');
            script.src = src.url;
            script.async = 'async';
            script.onload = function () {
                resolve(src.url);
            };
            script.onerror = function () {
                reject(new Error('Failed to load ' + src.url), script);
            };
            parentEl ? parentEl.appendChild(script) : document.body.appendChild(script);
        }else if(src.type === 'css'){
            const link = document.createElement('link')
            link.rel = 'stylesheet';
            link.href = src.url;
            link.onload = function () {
                resolve(src.url);
            };
            link.onerror = function () {
                reject(new Error('Failed to load ' + src.url), link);
            };
            document.head.appendChild(link);
        }
    });
}

// 动态加载多条js
export const loadAllResource = function (urls, parentEl = null) {
    return Promise.all(urls.map((url) => dynamicLoadScript(url, parentEl)));
}
