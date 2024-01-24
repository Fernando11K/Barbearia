import { createApp } from 'vue';
import { store } from 'quasar/wrappers'
import { createPinia } from 'pinia'
import App from '../App.vue';
import router from '../router/index'

export default store((/* { ssrContext } */) => {
  const pinia = createPinia()
  const app = createApp(App);

  app.use(pinia);
  app.use(router);

  return pinia
})
