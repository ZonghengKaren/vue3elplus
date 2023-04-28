import axios from "axios";
console.log(process.env);
const service = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    timeout: 3000,
})


// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在请求之前做些什么(获取并设置token)
    config.headers['token'] = localStorage.getItem('token')|| 'token';
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default service;