<template>
  <q-page class="bg-blue-4 fonte-index fonte-principal flex flex-center">
    <section v-if="false" class="q-pa-md">
      <div>
        <q-chat-message v-if="false" avatar="https://cdn.pixabay.com/photo/2018/01/09/14/23/vector-3071686_1280.png"
          name="Barbearia" :text="['Olá, Bem vindo!']" :stamp="dataHora.chat1.value" bg-color="grey-12" />
        <q-chat-message v-if="!loading" avatar="https://cdn.pixabay.com/photo/2018/01/09/14/23/vector-3071686_1280.png"
          name="Barbearia" :stamp="dataHora.chat2.value" bg-color="grey-12">
          <div>
            <span>
              Sistema em desenvolvimento
            </span>
            <q-space />
            <span class="primary">por <a style="text-decoration: none;" href="https://br.linkedin.com/in/fernando11000"
                target="_blank">Fernando11000</a>
            </span>
            <span> &nbsp;😊</span>
          </div>
        </q-chat-message>

        <q-chat-message v-show="loading" name="Barbearia"
          avatar="https://cdn.pixabay.com/photo/2018/01/09/14/23/vector-3071686_1280.png" bg-color="grey-12"
          class="no-pointer-events">
          <q-spinner-dots />
        </q-chat-message>
      </div>
    </section>
    <q-slide-transition :duration="2000">
      <section class="full-width">
        <div class="row bg-grey-1 no-pointer-events">
          <q-parallax :height="800" :src="require('src/assets/cabelo-e-barba.jpg')">
            <h2 ref="textoParallax" class="text-white">{{ tituloExibido }}</h2>

          </q-parallax>
          <div class="bg-white q-pa-xl justify-center">
            Sinta a diferença na Barbers Dean, onde a tradição encontra a modernidade para criar experiências únicas.
            Nossos
            barbeiros experientes são verdadeiros mestres na arte do corte e da barba, proporcionando não apenas um
            serviço,
            mas uma jornada para o estilo clássico e a excelência.


            Barbers Dean: onde a tradição encontra a modernidade, e cada cliente é tratado como parte de nossa história.
            Estilo, qualidade e camaradagem - experimente o melhor na Barbers Dean.
            <div class="q-pt-xs">Agende seu momento de elegância agora! 🎩💈 </div>
            <span>#BarbersDean #EstiloClássico #ExperiênciaMemorável</span>
          </div>
        </div>
        <q-separator color="blue-2" />
        <section>
          <div class="text-center text-h4 q-pa-sm text-bold text-blue-1 bg-dark"
            :class="{ 'text-h5': q.platform.is.mobile }">Conheça Nossos Trabalhos
          </div>
          <CarrosselComponent class="justify-center" />
        </section>
      </section>
    </q-slide-transition>

    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn fab icon="keyboard_arrow_up" color="blue" class="" />
    </q-page-scroller>
  </q-page>
</template>

<script lang="ts" setup >

import { date, useQuasar } from 'quasar'
import CarrosselComponent from 'src/components/Barbearia/PaginaPrincipal/CarrosselComponent.vue'
import { ref, onMounted, computed } from 'vue'

const q = useQuasar()
const textoParallax = ref<HTMLElement | null>(null)

onMounted(() => {
  console.log('Desenvolvido por Fernando11000 (https://br.linkedin.com/in/fernando11000)')
  //ordemMensagens();
  exibeTitulo()
})
const tituloParallax = 'O Refúgio Clássico da Elegância Masculina'
const tituloExibido = ref('')
const aguardar = (segundos: number) => new Promise(resolve => setTimeout(resolve, segundos))
const exibeTitulo = async () => {
  for (let i = 0; i < tituloParallax.length; i++) {
    tituloExibido.value += tituloParallax.charAt(i)
    await aguardar(40)
  }

}
const retornarDataHoraAtual = () => date.formatDate(Date.now(), 'DD/MM/YYYY HH:mm:ss');
const dataHora = {
  chat1: computed(() => retornarDataHoraAtual()),
  chat2: computed(() => retornarDataHoraAtual())
}

const loading = ref(true);
// const bemVindo = ref(false);
// const exibeMensagem = ref(true);

// const ordemMensagens = async () => {

//   await aguardar(500)
//   bemVindo.value = true

//   await aguardar(1000)
//   loading.value = false

//   await aguardar(2500)
//   exibeMensagem.value = false

//   exibeTitulo()
// }

</script>

<style scoped>
.fonte-principal {
  font-size: 1.2rem;
}

.fonte-conteudo {
  font-size: 1rem;
}
</style>

