import http from '../utils/request'

/**
 * 评论分页
 */
export const postCommentPage = (data) => {
    return http({
        url: `/api/post/comment/page`,
        method: 'post',
        data
    })
}

/**
 * 回复分页
 */
export const postReplyPage = (data) => {
    return http({
        url: `/api/post/reply/page`,
        method: 'post',
        data
    })
}

/**
 * 删除帖子评论
 */
export const postCommentDelete = (commentId) => {
    return http({
        url: `/api/post/comment/delete/${commentId}`,
        method: 'delete',
    })
}


/**
 * 评论帖子
 */
export const postComment = (data) => {
    return http({
        url: `/api/post/comment`,
        method: 'post',
        data
    })
}


/**
 * 收藏帖子
 */
export const postCollect = (postId) => {
    return http({
        url: `/api/post/collect/${postId}`,
        method: 'post',
    })
}


/**
 * 取消收藏帖子
 */
export const postUnCollect = (postId) => {
    return http({
        url: `/api/post/uncollect/${postId}`,
        method: 'post',
    })
}


/**
 * 点赞帖子
 */
export const postLike = (postId) => {
    return http({
        url: `/api/post/like/${postId}`,
        method: 'post',
    })
}


/**
 * 取消用户
 */
export const postUnLike = (postId) => {
    return http({
        url: `/api/post/unlike/${postId}`,
        method: 'post',
    })
}


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