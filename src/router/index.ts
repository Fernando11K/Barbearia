import { createRouter, createWebHistory } from 'vue-router'
//import { userAuthStore } from '../stores/userAuthStore'
import routes from './routes';
import { auth } from 'src/boot/firebase'

//import { userAuthStore } from 'stores/userAuthStore';


const router = createRouter({
  history: createWebHistory(),
  routes
})



router.beforeEach((to, from, next) => {
  auth.onAuthStateChanged((usuario) => {
    if (to.meta.requiresAuth && !usuario) {
      next('/login')
    } else {
      next()
    }

  })
})



export default router;