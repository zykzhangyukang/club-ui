import http from '../utils/request'


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





