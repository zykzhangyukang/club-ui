import http from '../utils/request'

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