import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/',
        redirect: '/home', // Redireciona '/' para '/home'
      },
      {
        path: '/home', component: () => import('pages/IndexPage.vue')
      },
      {
        path: '/barbearia', component: () => import('pages/IndexPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/agendamento', component: () => import('pages/AgendamentoPage.vue'),
        meta: { requiresAuth: true },
      },
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
