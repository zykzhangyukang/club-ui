import {createRouter, createWebHashHistory} from 'vue-router'
import DefaultLayout from '@/layout/DefaultLayout';
import IndexView from '@/views/Index';
import LoginView from '@/views/Login';
import RegisterView from '@/views/Register';

const routes = [
    {
        path: '',
        redirect: '/index',
        name: 'Root',
        component: DefaultLayout,
        children: [
            {
                path: '/index',
                name: 'Index',
                component: IndexView
            },
            {
                path: '/login',
                name: 'Login',
                component: LoginView
            },
            {
                path: '/register',
                name: 'Register',
                component: RegisterView
            },
        ]
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
