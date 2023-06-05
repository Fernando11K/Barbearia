import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  { //lembrar que coloquei para qualquer rota cair no index
    path: '/barbearia',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },

  {
    path: '/:catchAll(.*)', // Rota curinga para capturar todas as rotas
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
];

export default routes;
