import http from '../utils/request'

/**
 * 获取用户信息
 */
export const userInfo = () => {
    return http({
        url: `/api/user/info`,
        method: 'get',
    })
}

/**
 * 修改用户信息初始化
 */
export const userUpdateInit = () => {
    return http({
        url: `/api/user/update/init`,
        method: 'get',
    })
}


/**
 * 修改用户信息
 */
export const userUpdateInfo = (data) => {
    return http({
        url: `/api/user/update/info`,
        method: 'put',
        data
    })
}

/**
 * 用户登录
 */
export const userLogin = data => {
    return http({
        url: `/api/user/login`,
        method: 'post',
        data: data
    })
}

/**
 * 用户退出登录
 */
export const userLogout = (token) => {
    return http({
        url: `/api/user/logout?token=${token}`,
        method: 'post',
    })
}

/**
 * 用户注册
 */
export const userRegister = data => {
    return http({
        url: `/api/user/register`,
        method: 'post',
        data: data
    })
}

/**
 * 用户登录验证码
 */
export const loginCaptcha = key => {
    return http({
        url: `/api/user/captcha?k=${key}&t=login`,
        method: 'get'
    })
}

/**
 * 用户注册验证码
 */
export const registerCaptcha = key => {
    return http({
        url: `/api/user/captcha?k=${key}&t=register`,
        method: 'get'
    })
}





