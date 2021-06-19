import axios from 'axios'
import config from '@/config'
import { Message } from 'element-ui'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
/**
 * 1. 创建实例
 * 2. 请求拦截和响应拦截
 * 3. 状态码处理
 */
const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? config.baseURL.dev : config.baseURL.pro,
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  timeout: 10000
})

instance.interceptors.request.use(
  // 两个函数 cofig和err
  config => {
    Nprogress.start()
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token
    }
    return config
  },
  err => {
    Message.error(err)
    Promise.reject(err)
  }
)
instance.interceptors.response.use(
  res => {
    if (res.status === 200) {
      Nprogress.done()
      // 此项目需要做额外处理，code码为meta.status
      const msg = res.data.meta.msg
      const code = res.data.meta.status
      if (code !== 200 || code !== 201) {
        switch (code) {
          case 400:
            Message.warning(msg || '请求参数异常')
            break
          case 401:
          // Vuex更新用户状态，系统跳转登录页面，去除缓存token
            Message.warning(msg || '请先登录')
            break
          case 403:
            Message.error('权限不足')
            break
          case 500:
            Message.error(msg || '服务器开小差啦')
            break
          default:
            break
        }
      }
      // token失效
      if (msg === '无效token') {
        Message.error('token已过期，请重新登录')
        localStorage.clear()
        location.reload()
      }
      return Promise.resolve(res.data)
    } else {
      Message.warning(res.statusText || 'Response error')
      Promise.reject(res)
    }
  },
  err => {
    if (err.response) {
      const statusCode = err.response.status
      switch (statusCode) {
        case 301:
          // Vuex更新用户状态，系统跳转登录页面,去除缓存token
          Message.warning('请先登录')
          break
        case 400:
          Message.warning(err.response.meta.msg || '请求参数异常')
          break
        case 401:
          // Vuex更新用户状态，系统跳转登录页面，去除缓存token
          Message.warning(err.response.meta.msg || '请先登录')
          break
        case 403:
          Message.error('权限不足')
          break
        case 500:
          Message.error(err.response.meta.msg || '服务器开小差啦')
          break
        default:
          Message.error(err.response.meta.msg || err.response.statusText)
      }
    } else {
      Message.error('请检查网络问题')
    }
    return Promise.reject(err.response)
  }
)

export default instance
