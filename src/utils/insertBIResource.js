/**
 * 单个资源插入操作
 * @param {String} src 单个资源对象
 * @param {Object} parentEl
 * @returns {Promise<unknown>}
 */
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

/**
 * 动态加载多条js
 * @param {Array} urls 资源数据集合
 * @param {Object} parentEl 父节点（资源插入到指定的节点内部）
 * @returns {Promise<Awaited<unknown>[]>}
 */
export const loadAllResource = function (urls, parentEl = null) {
    return Promise.all(urls.map((url) => dynamicLoadScript(url, parentEl)));
}
