import Vue from 'vue'
import VueRouter from 'vue-router'
import Cinema from '@/router/Cinema'
import Mine from '@/router/Mine'
import Movie from '@/router/Movie'


Vue.use(VueRouter)

  const routes = [
      Cinema,
      Mine,
      Movie,
      {
          path:"/*",
          redirect:"/movie"
      }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
