import {createRouter, createWebHistory} from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout';
import LoginLayout from "@/layouts/LoginLayout";
import IndexView from '@/views/index/Index';
import LoginView from '@/views/login/Login';
import RegisterView from '@/views/register/Register';

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar custom style
NProgress.configure({
    easing:'ease', // 动画方式
    speed: 600, // 递增进度条的速度
    showSpinner: false, // 是否显示加载ico
    trickleSpeed: 200, // 自动递增间隔
    minimum: 0.3 // 初始化时的最小百分比
}) // NProgress Configuration

const routes = [
    {
        path: '',
        redirect: '/',
        name: 'Root',
        component: DefaultLayout,
        children: [
            {
                path: '',
                name: 'Index',
                component: IndexView
            },
            {
                path: '/register',
                name: 'Register',
                component: RegisterView
            },
        ]
    },
    {
        path: '',
        component: LoginLayout,
        children: [
            {
                path: '/login',
                name: 'Login',
                component: LoginView
            },
        ]
    }
]

const router = createRouter({
    mode: 'history',
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach(async(to, from, next) => {
    NProgress.start() // start progress bar
    next()
})

router.afterEach(async(to, from) => {
    NProgress.done() // finish progress bar
})


export default router
