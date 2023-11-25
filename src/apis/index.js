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





