import {createRouter, createWebHashHistory} from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout';
import LoginLayout from "@/layouts/LoginLayout";
import IndexView from '@/views/index/Index';
import LoginView from '@/views/login/Login';
import RegisterView from '@/views/register/Register';

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
    history: createWebHashHistory(),
    routes
})

export default router
