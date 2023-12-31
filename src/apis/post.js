import http from '../utils/request'

/**
 * 获取帖子详情
 */
export const getPostDetail = (id) => {
    return http({
        url: `/api/post/detail?id=${id}`,
        method: 'get',
    })
}

/**
 * 获取帖子列表
 */
export const getPostPage = (data) => {
    return http({
        url: `/api/post/page`,
        method: 'post',
        data
    })
}

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