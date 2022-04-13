import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Order from '../views/Order.vue'
import OrderDetails from '../views/OrderDetails.vue'

import Login from '../views/admin/Login.vue'
import AdminOrders from '../views/admin/Orders.vue'
import CarDetails from '../views/admin/CarDetails.vue'
import Cars from '../views/admin/Cars.vue'
import Categories from '../views/admin/Categories.vue'
import Points from '../views/admin/Points.vue'
import Rates from '../views/admin/Rates.vue'

import PageNotFound from '../views/404.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/order',
    name: 'Order',
    component: Order
  },
  {
    path: '/order/:id',
    name: 'OrderDetails',
    component: OrderDetails,
  },
  {
    path: '/admin/',
    name: 'Login',
    component: Login,
    meta: { layout: 'main' },
  },
  {
    path: '/admin/orders',
    name: 'AdminOrders',
    component: AdminOrders,
    meta: { layout: 'admin', auth: true },
  },
  {
    path: '/admin/car/',
    name: 'CarDetails',
    component: CarDetails,
    meta: { layout: 'admin', auth: true },
  },
  {
    path: '/admin/cars',
    name: 'Cars',
    component: Cars,
    meta: { layout: 'admin', auth: true },
  },
  {
    path: '/admin/categories',
    name: 'Categories',
    component: Categories,
    meta: { layout: 'admin', auth: true },
  },
  {
    path: '/admin/points',
    name: 'Points',
    component: Points,
    meta: { layout: 'admin', auth: true },
  },
  {
    path: '/admin/rates',
    name: 'Rates',
    component: Rates,
    meta: { layout: 'admin', auth: true },
  },
  {
    path: '/404',
    name: '404',
    component: PageNotFound
  },
  {
    path: '*',
    redirect: { name: '404' }
  }
]

const router = new VueRouter({
  base: location.pathname,
  // mode: 'history',
  routes
})

export default router
