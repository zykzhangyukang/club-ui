import http from '../utils/request'


/**
 * 获取板块列表
 */
export const sectionList = () => {
    return http({
        url: `/api/index/sections`,
        method: 'get',
    })
}

/**
 * 获取未读消息数量
 */
export const notificationCount = () => {
    return http({
        url: `/api/notification/count`,
        method: 'get',
    })
}





