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
  console.log('dsfadas')
  if (to.path === '/login') {
    // Se a rota é a página de login, permita o roteamento normalmente
    next();
  } else if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (auth.currentUser) {
      next();
    } else {
      next('/login');
    }
  } else {
    next({ path: '/agendamento' });
  }
})



// router.beforeEach((to, from, next) => {
//   const store = useAuthStore()
//   if (store.getEstaAutenticado) {
//     next()
//   } else {
//     console.log('Você não tem permissão!')
//     console.log(store.getEstaAutenticado)
//     next('/')
//   }

// })


export default router;