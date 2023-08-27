import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/IndexPage.vue') },
      { path: '/home', component: () => import('pages/IndexPage.vue') },
      { path: '/barbearia', component: () => import('pages/IndexPage.vue') },
      { path: '/agendamento', component: () => import('pages/AgendamentoPage.vue') },
      { path: '/login', component: () => import('../pages/LoginPage.vue') }
    ]
  },
  // {
  //   path: '/:catchAll(.*)', // Rota curinga para capturar todas as rotas
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  // },
];

export default routes;
