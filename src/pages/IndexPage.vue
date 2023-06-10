<template>
  <q-page class="flex flex-center bg-blue-4">
    <FundoBarbeariaComponent class="mobile-only" title="Fundo Barbearia" active></FundoBarbeariaComponent>
    <div class="q-pa-md row justify-center desktop-only">
      <div style="width: 100%; max-width: 400px" class="">
        <q-chat-message v-show="bemVindo" avatar="../assets/pablo.png" name="Barbearia Tem Tudo"
          :text="['Olá, Bem vindo!']" stamp="agora mesmo" bg-color="grey-12" class="" />
        <q-chat-message v-show="!loading" avatar="../assets/pablo.png" name="Barbearia Tem Tudo" stamp="agora mesmo"
          bg-color="grey-12">
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

        <q-chat-message v-show="loading" name="Barbearia Tem Tudo" avatar="../assets/pablo.png" bg-color="grey-12"
          class="">
          <q-spinner-dots size="2rem" />
        </q-chat-message>

      </div>
    </div>
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
onMounted(() => ordemMensagens() )


</script>

