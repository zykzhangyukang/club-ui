import {createRouter, createWebHistory} from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout';
import IndexView from '@/views/index/Index';
import LoginView from '@/views/login/Login';
import RegisterView from '@/views/register/Register';
import SettingsView from '@/views/settings/Settings';
import PostPublishView from '@/views/post/PostPublish'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'
import {userInfo} from "@/apis/user";
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
                component: IndexView,
                meta: { title: '首页'}
            },
            {
                path: '/settings',
                name: 'Settings',
                component: SettingsView,
                meta: { title: '设置'}
            },
            {
                path: '/login',
                name: 'Login',
                component: LoginView,
                meta: { title: '登录'}
            },
            {
                path: '/register',
                name: 'Register',
                component: RegisterView,
                meta: { title: '注册'}
            },
            {
                path: '/post/publish',
                name: 'PostPublish',
                component: PostPublishView,
                meta: { title: '发帖'}
            },
        ]
    }
]


function getPageTitle(pageTitle) {
    let titleStr = ''
    if (pageTitle) {
        titleStr += `${pageTitle}`
    }
    return titleStr + ' - ' + '章鱼社区'
}

const router = createRouter({
    mode: 'history',
    history: createWebHistory(process.env.BASE_URL),
    routes
})

const whiteUrl = ['/login', '/register', '/'] // 无需鉴权页面

router.beforeEach(async (to, from, next) => {

    NProgress.start() // start progress bar
    document.title = getPageTitle(to.meta.title || to.name); // 设置页面title

    const token = window.localStorage.getItem('token');
    if (!token) {
        if (whiteUrl.includes(to.path)) {
            next()
        } else {
            next({path: '/', query: {redirect: to.fullPath}})
        }
    } else {
        if (to.path === '/login' || to.path === '/register') {
            next({path: '/'})
        }

        // 如果有token获取用户信息
        userInfo().then(res => {
        })
    }

    next()
})

router.afterEach(async (to, from) => {
    NProgress.done() // finish progress bar
})


export default router
