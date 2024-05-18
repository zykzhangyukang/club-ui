export default {
    namespaced: true,
    state: {
        isLogin: false,
        token: '',
        info: ''
    },
    getters: {},
    mutations: {
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
