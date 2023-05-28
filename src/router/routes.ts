import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  { //lembrar que coloquei para qualquer rota cair no index
    path: '/barbearia',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
/*  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
  */
];

export default routes;
