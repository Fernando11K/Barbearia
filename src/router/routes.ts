import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  { //lembrar que coloquei para qualquer rota cair no index
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },

{
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  }

];

export default routes;
