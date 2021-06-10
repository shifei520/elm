import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('views/Home')
const City = () => import('views/City')
const Msite = () => import('views/msite/Msite')
const Search = () => import('views/search/Search')
const Order = () => import('views/order/Order')
const Profile = () => import('views/profile/Profile')
const Food = () => import('views/food/Food')
const Shop = () => import('views/shop/Shop')

Vue.use(Router)
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/city/:id',
    component: City
  },
  {
    path: '/msite',
    component: Msite
  },
  {
    path: '/search/:geohash',
    component: Search
  },
  {
    path: '/order',
    component: Order
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/food',
    component: Food
  },
  {
    path: '/shop',
    component: Shop
  }
]

export default new Router({
  routes
})
