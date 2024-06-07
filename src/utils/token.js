import axios from "axios";
import store from "@/store";

const TOKEN_KEY = 'access_token';
const REFRESH_TOKEN_KEY = 'refresh_token';
const EXPIRE_TIME_KEY = 'expire_time';

const service = axios.create({
    baseURL: process.env.VUE_APP_API,
    timeout: 20000,
    headers: {
        post: {
            'Content-Type': 'application/json;charset=utf-8'
        }
    }
});

// 刷新令牌的函数
export async function queryRefreshToken(refreshToken) {
    try {
        // 发起刷新令牌的请求
        const {data: res} = await service.get(`/api/user/refresh/token?refreshToken=${refreshToken}`);
        if (res.code === 200) {
            // 刷新成功，更新令牌信息
            setToken(res.result.token);
            setRefreshToken(res.result.refreshToken);
            setExpireTime(res.result.expiresIn);
            return res.result.token;
        } else {
            // 刷新失败，登出用户
            store.commit('user/logout');
            return null;
        }
    } catch (error) {
        // 捕获错误，登出用户
        console.error('Failed to refresh token:', error);
        store.commit('user/logout');
        return null;
    }
}

export function setToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
}

export function getToken() {
    return localStorage.getItem(TOKEN_KEY) || '';
}

export function setRefreshToken(refreshToken) {
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

export function getRefreshToken() {
    return localStorage.getItem(REFRESH_TOKEN_KEY) || '';
}

export function setExpireTime(expiresIn) {
    const current = new Date()
    const expireTime = current.setTime(current.getTime() + 1000 * expiresIn);
    localStorage.setItem(EXPIRE_TIME_KEY, expireTime.toString());
}

export function getExpireTime() {
    return localStorage.getItem(EXPIRE_TIME_KEY) || '';
}

export function clearTokens() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(EXPIRE_TIME_KEY);
}
