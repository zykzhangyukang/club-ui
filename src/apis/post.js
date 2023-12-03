import http from '../utils/request'

/**
 * 获取创建帖子token
 */
export const getPostToken = () => {
    return http({
        url: `/api/post/token`,
        method: 'post',
    })
}


/**
 * 创建帖子
 */
export const postPublish = (data) => {
    return http({
        url: `/api/post/publish`,
        method: 'post',
        data
    })
}