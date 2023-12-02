import {notificationCount} from "@/apis";

export default {
    namespaced: true,
    state: {
        totalCount: 0,
        atCount: 0,
        replyCount: 0,
        zanCount: 0,
        sysCount: 0,
        myMsgCount: 0,
    },
    getters: {
    },
    mutations: {
        ADD_MSG(state, msg) {
            if(msg.type === 'register_welcome' || msg.type === 'following_user'){
                state.sysCount += 1
            }
            state.totalCount += 1
        },
    },
    actions: {
        // 获取未读信息
        async getNotificationCount({ state }, params) {
            const [res] = await Promise.all([ notificationCount()])
            state.totalCount = res.result.totalCount;
            state.atCount = res.result.atCount;
            state.replyCount = res.result.replyCount;
            state.zanCount = res.result.zanCount;
            state.sysCount = res.result.sysCount;
            state.followCount = res.result.followCount;
            state.myMsgCount = res.result.myMsgCount;
        },
    }
}
