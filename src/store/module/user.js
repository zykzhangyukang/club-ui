export default {
    namespaced: true,
    state: {
        isOnline: true,
        isLogin: false,
        token: '',
        refreshToken: '',
        expireTime: '',
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
        setToken(state, token){
            state.token = token || "";
            localStorage.setItem("token", token)
        },
        setRefreshToken(state, refreshToken){
            state.refreshToken = refreshToken || "";
            localStorage.setItem("refreshToken", refreshToken)
        },
        setExpireTime(state, expiresIn){
            const current = new Date()
            const expireTime = current.setTime(current.getTime() + 1000 * expiresIn);
            state.expireTime = expireTime;
            localStorage.setItem('expireTime', expireTime.toString());
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
            state.refreshToken = '';
            state.expireTime = '';
            state.info = '';
            state.isLogin = false;
            state.isOnline = false;
            localStorage.clear();
        }
    },
    actions: {

    }
}
