import {createRouter, createWebHashHistory} from 'vue-router'
import DefaultLayout from '@/layout/DefaultLayout';
import IndexView from '@/views/index';

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
        ]
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
