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

        <q-chat-message v-if="loading" name="Barbearia"
          avatar="https://cdn.pixabay.com/photo/2018/01/09/14/23/vector-3071686_1280.png" bg-color="grey-12"
          class="no-pointer-events">
          <q-spinner-dots />
        </q-chat-message>
      </div>
    </section>
    <section class="full-width" v-if="exibe">

      <q-parallax :height="q.platform.is.desktop ? 800 : q.screen.height * 0.7">
        <template v-slot:media>
          <picture>
            <source srcset="
          ../assets/home/cabelo-e-barba-320x180.jpg 320w,
          ../assets/home/cabelo-e-barba-640x360.jpg 640w,
          ../assets/home/cabelo-e-barba-960x540.jpg 960w,
          ../assets/home/cabelo-e-barba-1280x720.jpg 1280w,
          ../assets/home/cabelo-e-barba-1920x1080.jpg 1920w
        " sizes="100vw" type="image/jpeg" />
            <img src="/home/cabelo-e-barba-960x540.jpg" alt="Banner" class="fit" loading="lazy" />
          </picture>
        </template>

        <h2 ref="textoParallax" class="text-white" :class="{ 'efeito-digitando': (tituloExibido.length < 31) }">
          {{ tituloExibido }}
        </h2>
      </q-parallax>
      <section class="bg-white  q-pa-xl  " :class="{ 'row justify-around items-center': q.platform.is.desktop }">
        <div class="col-7">
          <p>
            Sente a diferença na Barbers Dean! Aqui é onde o clássico encontra o moderno pra te entregar um
            estilo
            só seu,
            daquele jeito que só a gente sabe fazer. Os barbeiros aqui são fera, manjam demais do cabelinho na régua, da
            barba no capricho e do cuidado que você merece.
          </p>
          <p>
            Na Barbers Dean, a gente valoriza a tradição dos bons cortes, mas sem deixar de lado a modernidade — porque
            estilo tem que ser atual, né? O clima é de boa, perfeito pra chegar, trocar ideia, ficar de boa e sair com o
            visual alinhado, daquele jeito que chama atenção.
          </p>
          <p>
            O atendimento é sempre no capricho, feito com aquele cuidado irmão e irmã pra você. Aqui não tem pressa, é
            qualidade e resenha de verdade, onde você se sente em casa, parte da família.
          </p>
          <span class="q-pt-xs">Agende seu momento de elegância agora! 🎩💈 </span>
          <br>
          <span>#BarbersDean #EstiloClássico #ExperiênciaMemorável</span>
        </div>
        <div v-if="q.platform.is.desktop">
          <img src="../assets/home/cadeiras.png" alt="Banner" class="col-4" loading="lazy"
            style="  border-radius: 45px;" />
        </div>
      </section>

      <section>
        <div class="text-center text-h4 q-py-sm text-bold bg-blue-8" :class="{ 'text-h5': q.platform.is.mobile }">
          <span class="text-white">
            Conheça Nossos Trabalhos
          </span>
        </div>
        <CarrosselComponent class="justify-center" />
      </section>
    </section>
    <q-page-scroller class="z-top" position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn fab icon="keyboard_arrow_up" color="blue" class="" />
    </q-page-scroller>
  </q-page>
</template>

<script lang="ts" setup>

import { date, useQuasar } from 'quasar'
import CarrosselComponent from 'src/components/Barbearia/PaginaPrincipal/CarrosselComponent.vue'
import { ref, onMounted, computed } from 'vue'

const q = useQuasar()
const textoParallax = ref<HTMLElement | null>(null)
const exibe = ref(false)

onMounted(() => {
  console.log('Desenvolvido por Fernando11000 (https://br.linkedin.com/in/fernando11000)')
  //ordemMensagens();
  exibeTitulo()
  exibe.value = true
})
const tituloParallax = 'O Refúgio Clássico da Elegância'
const tituloExibido = ref('')
const aguardar = (delay: number) => new Promise(resolve => setTimeout(resolve, delay))
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

<style lang="scss" scoped>
.fonte-principal {
  font-size: 1.2rem;

}

.fonte-conteudo {
  font-size: 1rem;
}

.efeito-digitando::after {
  content: '|';
  animation: blink-animation 1s infinite;
}

@keyframes blink-animation {

  0%,
  49% {
    opacity: 0;
  }

  50%,
  100% {
    opacity: 1;
  }
}
</style>
