import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/useAuthStore'
import routes from './routes';
//import { auth } from 'src/boot/firebase'

//import { useAuthStore } from 'stores/useAuthStore';


const router = createRouter({
  history: createWebHistory(),
  routes
})



router.beforeEach((to, from, next) => {
  const store = useAuthStore()
  console.log('before')
  console.log(store.getEstaAutenticado)
  if (to.meta.requiresAuth && !store.getEstaAutenticado) {
    next('/login')
  } else {
    next()
  }
})

export default router;