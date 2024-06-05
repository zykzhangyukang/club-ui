export default {
    namespaced: true,
    state: {
        isOnline: true,
        isLogin: false,
        token: '',
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
            if(info){
                state.info = info;
            }else{
                state.info = {}
            }
            state.isLogin = true;
        },
        setUserToken(state, token){
            if(token){
                state.token = token;
            }else{
                state.token = ''
            }
            localStorage.setItem("token", token)
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
            state.token = '';
            state.info = '';
            state.isLogin = false;
            localStorage.clear();
        }
    },
    actions: {

    }
}
