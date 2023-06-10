import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  { 
    path: '/barbearia',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/agendamento', component: () => import('pages/Barbearia/AgendamentoPage.vue')}  
  ]
  },    
  // {
  //   path: '/:catchAll(.*)', // Rota curinga para capturar todas as rotas
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  // },
];

export default routes;
