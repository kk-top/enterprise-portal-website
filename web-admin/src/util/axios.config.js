import axios from 'axios'

// 配置信息
axios.defaults.baseURL = 'http://localhost:3000'

// 请求拦截器
axios.interceptors.request.use(function (config) {
    // 给每一个请求的请求头上添加token
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${ token }`

    return config
}, function (error) {
    return Promise.reject(error)
})

// 相应拦截器
axios.interceptors.response.use(function (response) {
    // 将最新的token保存到浏览器
    const { authorization } = response.headers
    authorization && localStorage.setItem("token", authorization)
    return response
}, function (error) {
    const { status } = error.response
    // 验证token过期
    if (status === 401) {
        localStorage.removeItem('token')
        window.location.href = '/login'
    }
    return Promise.reject(error)
})
