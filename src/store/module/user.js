import {userInfo} from "@/apis/user";

export default {
    namespaced: true,
    state: {
        user: '' || JSON.parse( window.localStorage.getItem('user')),
        token: '' || window.localStorage.getItem('token'),
        refreshToken: '' || window.localStorage.getItem('refreshToken')
    },
    getters: {
    },
    mutations: {
        setToken(state, token) {
            state.token = token;
            window.localStorage.setItem('token', token);
        },
        setRefreshToken(state,refreshToken){
            state.refreshToken = refreshToken;
            window.localStorage.setItem('refreshToken', refreshToken);
        },
        setUser(state, user) {
            state.user = user;
            window.localStorage.setItem('user', JSON.stringify(user));
        },
        logout(state){
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('refreshToken');
            window.localStorage.removeItem('user');
            state.token = '';
            state.refreshToken = '';
            state.user = '';
        }
    },
    actions: {
        async loadUserInfo({ state }){
            const [res] = await Promise.all([ userInfo()]);
            state.user = res.result;
            window.localStorage.setItem('user', JSON.stringify(res.result));
        }
    }
}
