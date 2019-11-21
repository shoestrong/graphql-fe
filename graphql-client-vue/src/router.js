import Vue from 'vue'
import Router from 'vue-router'
import Product from './views/Product.vue'
import Content from './views/Content.vue'
import Category from './views/Category.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/product'
    },
    {
      path: '/product',
      name: 'product',
      component: Product
    },
    {
      path: '/content/:id',
      name: 'content',
      component: Content
    },
    {
      path: '/category',
      name: 'category',
      component: Category
    }
  ]
})
