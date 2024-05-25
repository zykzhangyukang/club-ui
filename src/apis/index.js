import http from '../utils/request'

/**
 * 获取首页资源
 */
export const getResource = () => {
    return http({
        url: `/api/index`,
        method: 'get',
    })
}


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

/**
 * 获取首页用户信息导航
 */
export const indexUserInfo = () => {
    return http({
        url: `/api/index/user`,
        method: 'get',
    })
}






