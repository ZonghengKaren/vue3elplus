/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios';
import QS from 'qs';
import { ElMessage } from 'element-plus';
const router = useRouter();

// 取消请求业务
let pending = [];
let cancelToken = axios.CancelToken;
let removePending = (config) => {
    for (let i = 0, len = pending.length; i < len; i++) {
        if(pending[i].url === axios.defaults.baseURL + config.url) {
            pending[i].f();
            pending.splice(i, 1);
        }
    }
}

/**
 * 错误提示函数
 * @param {Object} config 请求参数
 * @param {Object} err 错误对象
 */
const noTipCodes = [500218, 'ERR_CANCELED'];
const handleTip = function(err, noTip) {
    if (noTip || noTipCodes.includes(err && err.code)) return
    ElMessage.closeAll();
    ElMessage({
        message: err && err.message ? err.message : '请求异常',
        type: 'warning',
        duration: 0
    })
}

// 环境的切换
const service = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    timeout: 10000,
})

// 请求拦截器
service.interceptors.request.use(
    config => {

        // 中途取消业务
        removePending(config);
        config.cancelToken = new cancelToken(function executor(c){
            pending.push({
                url: axios.defaults.baseURL + config.url,
                f:c
            });
        });

        // 添加token参数
        const token = localStorage.getItem('token') || '-';
        token && (config.headers.Authorization = token);
        return Promise.resolve(config);
    },
    error => {
        return Promise.reject(error);
    })

// 响应拦截器
service.interceptors.response.use(
    response => {
        switch (response.status) {
            // 401: 未登录
            // 未登录则跳转登录页面，并携带当前页面的路径
            // 在登录成功后返回当前页面，这一步需要在登录页操作。
            case 401:
                // router.replace({
                //     path: '/login',
                //     query: { redirect: router.currentRoute.fullPath }
                // });
                break;
            // 403 token过期
            // 登录过期对用户进行提示
            // 清除本地token和清空vuex中token对象
            // 跳转登录页面
            case 403:
                // Toast({
                //     message: '登录过期，请重新登录',
                //     duration: 1000,
                //     forbidClick: true
                // });
                // 清除token
                localStorage.removeItem('token');
                // store.commit('loginSuccess', null);
                // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
                setTimeout(() => {
                    // router.replace({
                    //     path: '/login',
                    //     query: {
                    //         redirect: router.currentRoute.fullPath
                    //     }
                    // });
                }, 1000);
                break;
            // 404请求不存在
            case 404:
                ElMessage({
                    message: '网络请求不存在',
                    duration: 1500,
                    type: 'error'
                });
                break;
        }
        return Promise.resolve(response);
    },
    // 服务器状态码不是200的情况    
    error => {
        return Promise.reject(error);
    }
);

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {Boolean} noTip [是否抛出错误提示]
 */
const apiGet = function (url, params, noTip = false){
    return new Promise((resolve, reject) =>{
        service.get(url, {params: params})
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                handleTip(err, noTip);
                reject(err.data)
            })
    });
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {Boolean} noTip [是否抛出错误提示]
 */
const apiPost = function (url, params, noTip = false) {
    return new Promise((resolve, reject) => {
        service.post(url, QS.stringify(params))
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                handleTip(err, noTip);
                reject(err.data)
            })
    });
}

export default { apiGet, apiPost };