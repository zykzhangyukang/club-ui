import {notificationCount} from "@/apis";

export default {
    namespaced: true,
    state: {
        totalCount: 0,
        replyCount: 0,
        zanCount: 0,
        sysCount: 0,
        chatCount: 0,
    },
    getters: {},
    mutations: {
        ADD_MSG(state, msg) {
            const type = msg.type;
            if (type === 'register_welcome' || type === 'following_user' || type === 'register_init_pwd') {
                state.sysCount += 1
            }
            if (type === 'like_post') {
                state.zanCount += 1;
            }
            if (type === 'reply' || type === 'comment' || type === 'reply_at') {
                state.replyCount += 1;
            }
            state.totalCount += 1
        },
    },
    actions: {
        // 获取未读信息
        async getNotificationCount({state}, params) {
            const [res] = await Promise.all([notificationCount()])
            state.totalCount = res.result.totalCount;
            state.atCount = res.result.atCount;
            state.replyCount = res.result.replyCount;
            state.zanCount = res.result.zanCount;
            state.sysCount = res.result.sysCount;
            state.followCount = res.result.followCount;
            state.chatCount = res.result.chatCount;
        },
    }
}
