import Vue from 'vue'
import VueRouter from 'vue-router'
// 路有懒加载
const Login = () => import(/* webpackChunkName: "Login_Home_Welcome" */ '@/views/login')
const Home = () => import(/* webpackChunkName: "Index_Home_Welcome" */ '@/views/index')
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect: '/home',
    component: Home
  },
  {
    name: 'login',
    path: '/login',
    component: Login
  },
  {
    name: 'home',
    path: '/home',
    component: Home
  }
]

const router = new VueRouter({
  routes
})

// 简易处理路由拦截
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    return next()
  }
  const token = localStorage.getItem('token')
  if (!token) {
    return next('/login')
  }
  next()
})
export default router
