import {notificationUnReadCount} from "@/apis";

export default {
    namespaced: true,
    state: {
        noRead: 0,
        messageList: []
    },
    getters: {
    },
    mutations: {
        ADD_MSG(state, msg) {
            state.messageList.unshift(msg)
            state.noRead += 1
            if (state.messageList.length > 10) {
                state.messageList = state.messageList.slice(0, 10)
            }
        },
    },
    actions: {
        // 获取未读信息
        async getMessage({ state }, params) {
            const [res] = await Promise.all([ notificationUnReadCount()])
            state.noRead = res.result.totalUnReadCount;
        },
    }
}
