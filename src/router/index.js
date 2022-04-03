import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Order from '../views/Order.vue'
import OrderDetails from '../views/OrderDetails.vue'
import AdminPanel from '../views/AdminPanel.vue'
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
    component: OrderDetails
  },
  {
    path: '/admin/',
    name: 'AdminPanel',
    component: AdminPanel
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
