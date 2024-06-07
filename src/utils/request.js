import axios from 'axios';
import { Message } from 'view-ui-plus';
import store from "@/store";
import router from "@/router";
import {getExpireTime, getRefreshToken, getToken, queryRefreshToken} from "@/utils/token";

// 创建 axios 实例
const http = axios.create({
    baseURL: process.env.VUE_APP_API,
    timeout: 20000,
    headers: {
        post: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    }
});

// 标志是否正在刷新令牌
let isRefreshing = false;
// 请求队列，保存需要等到令牌刷新的请求
let requestsQueue = [];


// 请求拦截器
http.interceptors.request.use(
    async config => {
        let token = getToken();
        let refreshToken = getRefreshToken();
        let expireTime = getExpireTime();

        if (expireTime) {
            const left = expireTime - new Date().getTime();

            // 如果令牌快过期且有刷新令牌 (5分钟)
            if (left < 5 * 60 * 1000 && refreshToken) {
                if (!isRefreshing) {
                    // 没有刷新请求正在进行，开始刷新令牌
                    isRefreshing = true;
                    const newToken = await queryRefreshToken(refreshToken);
                    isRefreshing = false;

                    if (newToken) {
                        // 刷新成功，设置新令牌到请求头
                        config.headers['Authorization'] = `Bearer ${newToken}`;
                        requestsQueue.forEach(cb => cb(newToken));
                        requestsQueue = [];
                    } else {
                        // 刷新失败，重定向到登录页面
                        store.commit('user/logout');
                    }
                } else {
                    // 如果正在刷新，将当前请求加入队列
                    return new Promise(resolve => {
                        requestsQueue.push((newToken) => {
                            config.headers['Authorization'] = `Bearer ${newToken}`;
                            resolve(config);
                        });
                    });
                }
            } else {
                // 令牌未过期，直接使用现有令牌
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
            }
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 响应拦截器
http.interceptors.response.use(
    response => {
        return Promise.resolve(response.data);
    },
    error => {
        if (!error.response) {
            console.log("请检查您的网络连接！");
        } else {
            // 根据响应状态码处理不同的错误
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
