import {clearTokens} from "@/utils/token";

export default {
    namespaced: true,
    state: {
        isOnline: true,
        isLogin: false,
        info: ''
    },
    getters: {},
    mutations: {
        setAvatar(state, avatar){
            if(state.info){
                state.info.avatar =avatar;
            }
        },
        setIsOnline(state, isOnline){
            state.isOnline = isOnline;
        },
        setUserInfo(state, info) {
            state.info = info || {}
            state.isLogin = true;
        },
        incFollowCount(state, num){
          if(state.info){
              state.info.followCount +=num;
          }
        },
        incCollectCount(state, num){
          if(state.info){
              state.info.collectCount +=num;
          }
        },
        logout(state){
            state.info = '';
            state.isLogin = false;
            state.isOnline = false;
            clearTokens()
        }
    },
    actions: {

    }
}
