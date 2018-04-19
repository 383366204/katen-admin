import Vue from 'vue'
import Router from 'vue-router'
import SideBar from '@/components/SideBar'
import Login from '@/views/Login';
import Product from '@/views/Product'
import Message from '@/views/Message'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component:Login
    },
    {
      path: '/Product',
      name: 'Product',
      component:Product
    },
    {
      path: '/Message',
      name: 'Message',
      component:Message
    }
  ]
})
