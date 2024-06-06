import axios from 'axios'
import {Message} from 'view-ui-plus'
import store from "@/store";
import router from "@/router";

const http = axios.create({
    baseURL: process.env.VUE_APP_API,
    timeout: 20000,
    headers: {
        post: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    }
})

const http2 = axios.create({
    baseURL: process.env.VUE_APP_API,
    timeout: 20000,
    headers: {
        post: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    }
})

async function queryRefreshToken(config, refreshToken) {
    try {
        const {data: res} = await http2.get(`/api/user/refresh/token?refreshToken=${refreshToken}`);
        store.commit('user/setToken', res.result.token);
        store.commit('user/setRefreshToken', res.result.refreshToken);
        store.commit('user/setExpireTime', res.result.expiresIn);
        if (res.code === 200) {
            config.headers['Authorization'] = getToken();
        }
        return config;
    } catch (error) {
        console.error('Failed to refresh token:', error);
        return Promise.reject(error);
    }
}

function getToken() {
    return localStorage.getItem('token') || '';
}

function getRefreshToken() {
    return localStorage.getItem('refreshToken') || '';
}

function getExpireTime() {
    return localStorage.getItem('expireTime') || '';
}

http.interceptors.request.use(
    async config => {
        let token = getToken();
        let refreshToken = getRefreshToken();
        let expireTime = getExpireTime();

        if (expireTime) {
            const left = expireTime - new Date().getTime();

            if (left < 5 * 1000 && refreshToken) {
                config = await queryRefreshToken(config, refreshToken);
            } else {
                if (token) {
                    config.headers['Authorization'] = token;
                }
            }
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

http.interceptors.response.use(
    response => {
        return Promise.resolve(response.data);
    },
    error => {
        if (!error.response) {
            console.log("请检查您的网络连接！");
        } else {
            switch (error.response.status) {
                case 400:
                    Message.warning('请求参数错误！');
                    break;
                case 401:
                    store.commit('user/logout');
                    router.push('/login').then(() => {
                        Message.warning('会话过期！');
                    });
                    break;
                case 403:
                    Message.error('您没有访问该资源的权限！');
                    break;
                case 404:
                    Message.error('您访问的资源不存在！');
                    break;
                case 429:
                    Message.error('请求过于频繁！');
                    break;
                case 503:
                    Message.error('网关转发异常，请稍后再试！');
                    break;
                case 500:
                    Message.error('系统繁忙，请稍后再试！');
                    break;
                default:
                    Message.error('未知错误！');
            }
        }
        return Promise.reject(error);
    }
);

export default http;
