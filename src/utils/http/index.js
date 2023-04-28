/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios';
import QS from 'qs';
import { ElMessage } from 'element-plus';
// import store from '../store/index'

// 环境的切换
const service = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    timeout: 3000,
})

// post请求头
service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截器
service.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')|| 'token';
        token && (config.headers.Authorization = token);
        return config;
    },
    error => {
        return Promise.error(error);
    })

// 响应拦截器
service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            console.log(response);
            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    // 服务器状态码不是200的情况    
    error => {
        if (error.response.status) {
            switch (error.response.status) {
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
                // 其他错误，直接抛出错误提示                
                default:
                    // Toast({
                    //     message: error.response.data.message,
                    //     duration: 1500,
                    //     forbidClick: true
                    // });
            }
            return Promise.reject(error.response);
        }
    }
);

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
const get = function (url, params){
    return new Promise((resolve, reject) =>{
        service.get(url, {params: params})
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
const post = function (url, params) {
    return new Promise((resolve, reject) => {
        service.post(url, QS.stringify(params))
            .then(res => {
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}


export default {get, post};