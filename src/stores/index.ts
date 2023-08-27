import { createApp } from 'vue';
import { store } from 'quasar/wrappers'
import { createPinia } from 'pinia'
import App from '../App.vue';
import router from '../router/index'




export default store((/* { ssrContext } */) => {
  const app = createApp(App);
  const pinia = createPinia()

  app.use(pinia);
  app.use(router);

  app.mount('#app');

  return pinia
})
