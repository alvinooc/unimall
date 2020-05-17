import Request from './request'
import Config from './config'

const http = new Request()

http.setConfig((config) => {
	config.baseUrl = Config.server
	config.responseType = "json"
	return config
})

// 请求拦截器
http.interceptors.request((request) => { 
	// console.log(request)
	request.header['Xshop-Token'] = uni.getStorageSync('token')
	return request;
})

// 响应拦截器
http.interceptors.response((response) => {
	// console.log('response')
	return response.data
})

export default http