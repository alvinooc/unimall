export default class Request {
  config = {
    baseURL: '',
    header: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    method: 'GET',
    dataType: 'json',
    responseType: 'text',
    success() {},
    fail() {},
    complete() {}
  }

  static posUrl(url) { /* 判断url是否为绝对路径 */
    return /(http|https):\/\/([\w.]+\/?)\S*/.test(url)
  }

  interceptors = {
    request: (func) => {
      if (func) {
        Request.requestBefore = func
      } else {
        Request.requestBefore = (request) => request
      }
      
    },
    response: (func) => {
      if (func) {
        Request.requestAfter = func
      } else {
        Request.requestAfter = (response) => response
      }
    }
  }

  static requestBefore(config) {
    return config
  }

  static requestAfter(response) {
    return response
  }

  setConfig(f) {
    this.config = f(this.config)
  }

  request(options = {}) {
    options.baseUrl = options.baseUrl || this.config.baseUrl
    options.dataType = options.dataType || this.config.dataType
    options.url = Request.posUrl(options.url) ? options.url : (options.baseUrl + options.url)
    options.data = options.data || {}
    options.header = options.header || this.config.header
    options.method = options.method || this.config.method

    options = {...options, ...Request.requestBefore(options)}

    return new Promise((resolve, reject) => {
      options.success = function (res) {
        resolve(Request.requestBefore(res))
      }
      options.fail= function (err) {
        reject(Request.requestAfter(err))
      }
      uni.request(options)
    })
  }

  get(url, data, options = {}) {
    options.url = url
    options.data = data
    options.method = 'GET'
    return this.request(options)
  }

  post(url, data, options = {}) {
    options.url = url
    options.data = data
    options.method = 'POST'
    return this.request(options)
  }
}