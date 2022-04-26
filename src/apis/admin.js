import { http } from './request'

// 登录
export async function login(body) {
    return await http("/admin/login", 'POST', body)
}

// 获取列表
export async function getList(body) {
    return await http("/admin/list", 'GET', body)
}
  
