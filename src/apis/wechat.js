import http from '../utils/request'

/**
 * 获取微信公众号事件码
 */
export const getEventCode = (deviceId) => {
    return http({
        url: `/api/wechat/code?deviceId=${deviceId}`,
        method: 'get',
    })
}

/**
 * 获取微信公众号事件码
 */
export const subEventCode = (deviceId) => {
    return http({
        url: `/api/wechat/subscribe?deviceId=${deviceId}`,
        method: 'get',
    })
}