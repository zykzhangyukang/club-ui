import http from '../utils/request'

/**
 * 已读消息
 */
export const markNotificationAsRead = (id) => {
    return http({
        url: `/api/notification/read?notificationId=${id}`,
        method: 'get',
    })
}

/**
 * 获取帖子详情
 */
export const getNotificationByType = (data) => {
    return http({
        url: `/api/notification/page`,
        method: 'post',
        data
    })
}