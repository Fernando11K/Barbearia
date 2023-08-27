import { createRouter, createWebHistory } from 'vue-router'
//import { useAuthStore } from '../stores/useAuthStore'
import routes from './routes';
import { auth } from 'src/boot/firebase'

//import { useAuthStore } from 'stores/useAuthStore';


const router = createRouter({
  history: createWebHistory(),
  routes
})



router.beforeEach((to, from, next) => {

  if (to.meta.requiresAuth && !auth.currentUser) {
    next('/login')
  } else {
    next()
  }
})

export default router;