/**
 * @Description  : 公共请求文件
 * @Author       : 尾巴钓鱼的喵 1308242265@qq.com
 * @LastEditors  : 尾巴钓鱼的喵 1308242265@qq.com
 * @LastEditTime : 2024-09-05 15:33:41
 **/
import axios from 'axios'
import { getCookie, removeCookie } from '@/utils/auth'

export const baseURL = '/api'
const service = axios.create({
  baseURL,
  timeout: 60000 * 5,
});
const CancelToken = axios.CancelToken
// Request interceptors
service.interceptors.request.use(
  (config) => {
    const token = getCookie('token')
    if (token) {
      config.headers.token = token
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  },
)

// Response interceptors
service.interceptors.response.use(
  (response) => {
    const data = response.data
    return data
  },
  (error) => {
    return Promise.reject(error)
  },
);


export const post = (url, data = {}, cancelReq) => {
  return service({
    url,
    method: 'post',
    data,
    cancelToken: new CancelToken(function (cancel) {
      cancelReq && cancelReq(cancel)
    })
  })
}

export const get = (url, params = {}) => {
  return service({
    url,
    method: 'get',
    params
  })
}


export const put = (url, data = {}) => {
  return service({
    url,
    method: 'put',
    data
  })
}


export const del = (url, params = {}) => {
  return service({
    url,
    method: 'delete',
    params
  })
}

export default {
  service,
  post,
  get,
  put,
  del
};
