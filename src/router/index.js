import Vue from 'vue'
import Router from 'vue-router'
import SideBar from '@/components/SideBar'
import Order from '@/views/Order'
import Message from '@/views/Message'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index'
    },
    {
      path: '/Order',
      name: 'Order',
      component:Order
    },
    {
      path: '/Message',
      name: 'Message',
      component:Message
    }
  ]
})
