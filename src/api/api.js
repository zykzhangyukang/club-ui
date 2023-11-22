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
 * 用户登录验证码
 */
export const loginCaptcha = key => {
    return http({
        url: `/api/user/login/captcha?k=${key}`,
        method: 'get'
    })
}




