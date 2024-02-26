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
        path: '/agendamento', component: () => import('pages/GerenciaAgendamentosPage.vue'),
        meta: { requiresAuth: true },
      },
      { path: '/login', component: () => import('../pages/LoginPage.vue') },
      {
        path: '/gerencia-agendamentos', component: () => import('pages/GerenciaAgendamentosPage.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/tabela-precos', component: () => import('pages/GerenciaServicosPage.vue'),
        meta: { requiresAuth: false },
      },
      {
        path: '/criar-conta', component: () => import('pages/CriarContaPage.vue'),
        meta: { requiresAuth: false },
      },
    ]
  },
  {
    path: '/:catchAll(.*)', // Rota curinga para capturar todas as rotas
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/ErrorNotFound.vue') }],
  },
];
export default routes;
