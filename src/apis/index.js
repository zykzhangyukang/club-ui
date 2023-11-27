import http from '../utils/request'


/**
 * 获取板块列表
 */
export const sectionList = () => {
    return http({
        url: `/api/section/list`,
        method: 'get',
    })
}

/**
 * 获取未读消息数量
 */
export const notificationUnReadCount = () => {
    return http({
        url: `/api/notification/getUnReadCount`,
        method: 'get',
    })
}





