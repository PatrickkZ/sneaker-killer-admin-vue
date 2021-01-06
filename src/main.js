import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './store'

const axios = require('axios');
axios.defaults.baseURL = 'http://localhost:8443/api'
// 让前端能带上cookie
axios.defaults.withCredentials = true
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios

Vue.use(ElementUI)
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
      if (store.state.username && to.path.startsWith('/admin')) {
        initAdminMenu(router, store)
      }
      // 如果前端没有登录信息则直接拦截，如果有则判断后端是否正常登录（防止构造参数绕过）
      if (to.meta.requireAuth) {
        if (store.state.username) {
          axios.post('/authentication',{
            username: store.state.username
          },{headers: {'Content-Type': 'text/plain'}})
              .then(resp => {
                if (resp.data.code === 200) {
                  next()
                }
              })
        } else {
          next({
            path: 'login',
            query: {redirect: to.fullPath}
          })
        }
      } else {
        next()
      }
    }
)

const initAdminMenu = (router, store) => {
  // 防止重复触发加载菜单操作
  // if (store.state.adminMenus.length > 0) {
  //   return
  // }
  axios.get('/menu').then(resp => {
    if (resp && resp.data.code === 200) {
      const menus = resp.data.result
      store.commit('initAdminMenu', menus)
    }
  })
}

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
