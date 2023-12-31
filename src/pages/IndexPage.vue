<template>
  <q-page class="flex flex-center bg-blue-4">
    <FundoBarbeariaComponent class="mobile-only" />
    <div class="q-pa-md row justify-center desktop-only">
      <div style="width: 100%; max-width: 400px" class="">
        <q-chat-message v-show="bemVindo" avatar="https://cdn.pixabay.com/photo/2018/01/09/14/23/vector-3071686_1280.png"
          name="Barbearia" :text="['Olá, Bem vindo!']" stamp="agora mesmo" bg-color="grey-12" class="" />
        <q-chat-message v-show="!loading" avatar="https://cdn.pixabay.com/photo/2018/01/09/14/23/vector-3071686_1280.png"
          name="Barbearia" stamp="agora mesmo" bg-color="grey-12">
          <div>
            <span>
              Infelizmente esse site ainda não
            </span>
            <q-space />
            <span> tem uma versão para </span>
            <q-space />
            <span>computadores
            </span>
            <span> &nbsp;😞</span>
          </div>
        </q-chat-message>

        <q-chat-message v-show="loading" name="Barbearia"
          avatar="https://cdn.pixabay.com/photo/2018/01/09/14/23/vector-3071686_1280.png" bg-color="grey-12" class="">
          <q-spinner-dots />
        </q-chat-message>

      </div>
    </div>

    <!-- place QPageScroller at end of page -->
    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn fab icon="keyboard_arrow_up" color="blue" class="" />
    </q-page-scroller>
  </q-page>
</template>

<script lang="ts" setup >
import FundoBarbeariaComponent from 'src/components/Barbearia/PaginaPrincipal/FundoBarbeariaComponent.vue';


import { ref, onMounted } from 'vue'
const loading = ref(true)
const bemVindo = ref(false)

const ordemMensagens = () => {

  console.log('Desenvolvido por Fernando11000')
  setTimeout(() => bemVindo.value = true, 1000);
  setTimeout(() => loading.value = false, 3000);
}
onMounted(() => {
  // scrollToElement()
  ordemMensagens()
})


</script>

