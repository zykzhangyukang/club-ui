import {createRouter, createWebHistory} from 'vue-router'
import store from '@/store/index'
import DefaultLayout from '@/layouts/DefaultLayout';
import IndexView from '@/views/index/Index';
import LoginView from '@/views/login/Login';
import RegisterView from '@/views/register/Register';
import SettingsView from '@/views/settings/Settings';
import PostPublishView from '@/views/post/PostPublish'
import PostDetailView from '@/views/post/PostDetail'
import NotificationView from '@/views/notification/Notification'
import SystemNotification from '@/views/notification/System'
import AtNotification from '@/views/notification/At'
import ZanNotification from '@/views/notification/Zan'
import MyMsgNotification from '@/views/notification/MyMsg'
import ReplyMsgNotification from '@/views/notification/Reply'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'
import {userInfo} from "@/apis/user";

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
                meta: {title: '首页'}
            },
            {
                path: '/settings',
                name: 'Settings',
                component: SettingsView,
                meta: {title: '设置'}
            },
            {
                path: '/login',
                name: 'Login',
                component: LoginView,
                meta: {title: '登录'}
            },
            {
                path: '/register',
                name: 'Register',
                component: RegisterView,
                meta: {title: '注册'}
            },
            {
                path: '/post/publish',
                name: 'PostPublish',
                component: PostPublishView,
                meta: {title: '发帖'}
            },
            {
                path: '/post/detail',
                name: 'PostDetail',
                component: PostDetailView,
                meta: {title: '帖子详情'}
            },
            {
                path: '/notification',
                name: 'Notification',
                component: NotificationView,
                meta: {title: '消息通知'},
                children: [
                    {
                        path: 'system',
                        name: 'SystemNotification',
                        component: SystemNotification,
                        meta: {title: '消息通知'}
                    },
                    {
                        path: 'zan',
                        name: 'ZanNotification',
                        component: ZanNotification,
                        meta: {title: '消息通知'}
                    },
                    {
                        path: 'at',
                        name: 'AtNotification',
                        component: AtNotification,
                        meta: {title: '消息通知'}
                    },
                    {
                        path: 'reply',
                        name: 'ReplyNotification',
                        component: ReplyMsgNotification,
                        meta: {title: '消息通知'}
                    }, {
                        path: 'MyMsg',
                        name: 'MyMsgNotification',
                        component: MyMsgNotification,
                        meta: {title: '我的私信'}
                    }
                ]
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

const whiteUrl = ['/post/detail', '/login', '/register', '/'] // 无需鉴权页面

router.beforeEach(async (to, from, next) => {

    NProgress.start()
    document.title = getPageTitle(to.meta.title || to.name);

    const token = window.localStorage.getItem('token');
    if (!token) {
        if (whiteUrl.includes(to.path)) {
            next()
        } else {
            next({path: '/login', query: {redirect: to.fullPath}})
        }
    } else {

        if (to.path === '/login' || to.path === '/register') {
            next({path: '/'})
        }

        userInfo().then(res => {
            store.commit('user/setUser', res.result);
        })
    }

    next()
})

router.afterEach(async (to, from) => {
    NProgress.done();
})


export default router
