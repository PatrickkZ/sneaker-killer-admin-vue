import Vue from 'vue'
import Router from 'vue-router'
import Login from "@/components/Login";
import Home from "@/components/Home";
import Layout from "@/layout/Layout";
import ItemInfo from "@/layout/components/info/ItemInfo";
import SecondKillInfo from "@/layout/components/info/SecondKillInfo";
import DefaultPage from "@/layout/components/info/DefaultPage";

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/home',
            name: 'Home',
            component: Home,
            children: [
                {
                    path: '/admin',
                    name: 'Layout',
                    component: Layout,
                    meta: {
                        requireAuth: true
                    },
                    children: [
                        {
                            path: 'item',
                            name: 'itemInfo',
                            component: ItemInfo,
                            meta: {
                                requireAuth: true
                            }
                        },
                        {
                            path: 'seckill',
                            name: 'SecondKillInfo',
                            component: SecondKillInfo,
                            meta: {
                                requireAuth: true
                            },
                        },
                        {
                            path: 'home',
                            name: 'DefaultPage',
                            component: DefaultPage,
                            meta: {
                                requireAuth: true
                            },
                        },
                    ]
                }
            ]
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        },
        {
            path: '/',
            redirect: '/login'
        }
    ]
})
