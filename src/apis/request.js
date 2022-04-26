import qs from 'qs'
import axios from 'axios'
import { message } from 'antd'

//配置过滤器请求响应
axios.interceptors.response.use(
  response => response,
  (error) => {
    console.log(new Error(error))
    return { success: false }
  },
)

/**
 * @param {String} method: POST or GET
 * @param {String} url : api
 * @param {Object} params: post参数
 */
export async function httpUtils(url, method = 'GET', params = {}, options = {}) {
    let headers = {}
    const token = localStorage.getItem('token')
    const isForm = options?.postType === 'formData'
    token && (headers = {
        Authorization: 'Bearer ' + token
    })
    const { data } = await axios({
        method,
        url: '/api' + url,
        headers: {
            ...headers,
            'Content-Type': isForm
                ? 'application/x-www-form-urlencoded'
                : 'application/json',
        },
        data: isForm ? qs.stringify(params) : params
    })
    if(!data){
        message.error('请求失败')
        return { success: false, message: '请求失败' }
    }
    return data
}

export const http = httpUtils
