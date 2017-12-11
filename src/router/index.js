import Vue from 'vue'
import Router from 'vue-router'
import ListPage from '@/components/ListPage'
import DetailsPage from '@/components/DetailsPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ListPage',
      component: ListPage
    }, {
      path: '/details/:name',
      name: 'DetailsPage',
      component: DetailsPage
    }
  ]
})
