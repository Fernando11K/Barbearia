<template>
  <q-page class="bg-blue-4 fonte-index fonte-principal flex flex-center no-pointer-events">

    <section v-if="exibeMensagem" class="q-pa-md">
      <div>
        <q-chat-message v-show="bemVindo" avatar="https://cdn.pixabay.com/photo/2018/01/09/14/23/vector-3071686_1280.png"
          name="Barbearia" :text="['Olá, Bem vindo!']" stamp="agora mesmo" bg-color="grey-12" class="" />
        <q-chat-message v-show="!loading" avatar="https://cdn.pixabay.com/photo/2018/01/09/14/23/vector-3071686_1280.png"
          name="Barbearia" stamp="agora mesmo" bg-color="grey-12">
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
          avatar="https://cdn.pixabay.com/photo/2018/01/09/14/23/vector-3071686_1280.png" bg-color="grey-12" size="9">
          <q-spinner-dots />
        </q-chat-message>
      </div>
    </section>
    <q-slide-transition :duration="2000">
      <section v-show="!exibeMensagem" class="full-width">

        <div class="row bg-grey-1">
          <q-parallax :height="800" :src="require('src/assets/cabelo-e-barba.jpg')" ref="imagem" class="">
            <h2 class="text-white">O Refúgio Clássico da Elegância Masculina</h2>

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
        <div>
          <div class="text-center text-h2 q-pa-md text-bold text-blue-1 bg-dark "
            :class="{ 'text-h5': q.platform.is.mobile }">Conheça
            Nossos
            Trabalhos
          </div>
          <CarrosselComponent class="justify-center" />
        </div>
      </section>
    </q-slide-transition>

    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn fab icon="keyboard_arrow_up" color="blue" class="" />
    </q-page-scroller>
  </q-page>
</template>

<script lang="ts" setup >
import CarrosselComponent from 'src/components/Barbearia/PaginaPrincipal/CarrosselComponent.vue'
import { useQuasar } from 'quasar'
import { ref, onMounted } from 'vue'

const q = useQuasar()

onMounted(() => {
  ordemMensagens()

})

const loading = ref(true)
const bemVindo = ref(false)
const exibeMensagem = ref(true)

const imagem = ref(null)

const ordemMensagens = () => {

  console.log('Desenvolvido por Fernando11000')
  setTimeout(() => bemVindo.value = true, 1000);
  setTimeout(() => loading.value = false, 3000);
  setTimeout(() => exibeMensagem.value = false, 6000);
}

</script>

<style scoped>
.fonte-principal {
  font-size: 1.2rem;
}

.fonte-conteudo {
  font-size: 1rem;
}
</style>

