import Vue from 'vue'
import VueRouter from 'vue-router'
// 路有懒加载
const Login = () => import(/* webpackChunkName: "Login_Home_Welcome" */ '@/views/login')
const Home = () => import(/* webpackChunkName: "Index_Home_Welcome" */ '@/views/index')
const User = () => import(/* webpackChunkName: "User_Home_Welcome" */ '@/views/users')
const Welcome = () => import(/* webpackChunkName: "Welcome_Home_Welcome" */ '@/views/welcome')
const Reports = () => import(/* webpackChunkName: "Reports_Home_Welcome" */ '@/views/data')
const Roles = () => import(/* webpackChunkName: "Roles_Home_Welcome" */ '@/views/auth/role.vue')
const Auths = () => import(/* webpackChunkName: "Auths_Home_Welcome" */ '@/views/auth')
const Shops = () => import(/* webpackChunkName: "Shops_Home_Welcome" */ '@/views/shop')
const Params = () => import(/* webpackChunkName: "Params_Home_Welcome" */ '@/views/shop/params.vue')
const Categories = () => import(/* webpackChunkName: "Categorys_Home_Welcome" */ '@/views/shop/category.vue')
const Orders = () => import(/* webpackChunkName: "Orders_Home_Welcome" */ '@/views/order')

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
    component: Home,
    redirect: '/welcome',
    children: [
      {
        name: 'welcome',
        path: '/welcome',
        component: Welcome
      },
      {
        name: 'users',
        path: '/users',
        component: User
      },
      {
        name: 'reports',
        path: '/reports',
        component: Reports
      },
      {
        name: 'roles',
        path: '/roles',
        component: Roles
      },
      {
        name: 'rights',
        path: '/rights',
        component: Auths
      },
      {
        name: 'goods',
        path: '/goods',
        component: Shops
      },
      {
        name: 'params',
        path: '/params',
        component: Params
      },
      {
        name: 'categories',
        path: '/categories',
        component: Categories
      },
      {
        name: 'orders',
        path: '/orders',
        component: Orders
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 解决路由相同报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

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
