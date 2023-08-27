import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/useAuthStore'
import routes from './routes';

const router = createRouter({
  history: createWebHistory(),
  routes
})



router.beforeEach((to, from, next) => {
  const store = useAuthStore()
  console.log(store.getEstaAutenticado)
  if (!store?.getEstaAutenticado && to.path !== '/login') {
    next('/login')
  }
  else {
    next()
  }

})

export default router;