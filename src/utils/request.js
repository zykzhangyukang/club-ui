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

http.interceptors.request.use(
    config => {
        let token = localStorage.getItem('token') || '';
        if(token){
            config.headers['Authorization'] = token;
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

http.interceptors.response.use(
    (response) => {

        return Promise.resolve(response.data);
    },
    (error) => {

        if (!error.response) {

            console.log("请检查您的网络连接！")

        } else {

            if (error.response.status === 400) {

                Message.warning('请求参数错误！');

            }else if (error.response.status === 401) {

                store.commit('user/logout');
                router.push('/').then(r => {
                    Message.warning('会话已失效！');
                })

            } else if (error.response.status === 403) {
                Message.error('您没有访问该资源的权限！');

            } else if (error.response.status === 404) {
                Message.error(' 您访问的资源不存在！');

            } else if (error.response.status === 429) {
                Message.error(' 请求过于频繁！');

            } else if (error.response.status === 503) {
                Message.error(' 网关转发异常，请稍后再试！');

            } else if (error.response.status === 500) {
                Message.error('系统繁忙，请稍后再试！');

            } else {
                Message.error('unknown error！');
            }
        }

        return Promise.reject(error)
    }
)
export default http