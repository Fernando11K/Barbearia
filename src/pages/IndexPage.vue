<template>
  <q-page class="bg-white fonte-index fonte-principal">
    <section v-if="false && q.platform.is.desktop && exibeMensagem" class="row justify-center  q-pa-md ">
      <div style="max-width: 400px" class="full-width">
        <q-chat-message v-show="bemVindo" avatar="https://cdn.pixabay.com/photo/2018/01/09/14/23/vector-3071686_1280.png"
          name="Barbearia" :text="['Olá, Bem vindo!']" stamp="agora mesmo" bg-color="grey-12" class="" />
        <q-chat-message v-show="!loading" avatar="https://cdn.pixabay.com/photo/2018/01/09/14/23/vector-3071686_1280.png"
          name="Barbearia" stamp="agora mesmo" bg-color="grey-12">
          <div>
            <span>
              Sinta-se a vontade para explorar
            </span>
            <q-space />
            <span>o sistema
            </span>
            <span> &nbsp;😊</span>
          </div>
        </q-chat-message>

        <q-chat-message v-show="loading" name="Barbearia"
          avatar="https://cdn.pixabay.com/photo/2018/01/09/14/23/vector-3071686_1280.png" bg-color="grey-12" class="">
          <q-spinner-dots />
        </q-chat-message>
      </div>
    </section>


    <section v-else class="full-width">

      <div class="row bg-grey-1">

        <q-parallax :height="700"
          src="https://img.freepik.com/fotos-gratis/homem-em-um-salao-de-barbearia-fazendo-o-corte-de-cabelo-e-barba_1303-20955.jpg?w=1380&t=st=1704053733~exp=1704054333~hmac=8c4d4243928536f929f56e1512804befa96be96a6544ac5de899362fe17b042e">
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
      <q-separator color="grey-4" />

      <div class="bg-blue-1">
        <div class="text-center text-h2 q-pa-xl">Conheça Nossos Trabalhos</div>
        <CarrosselComponent class="justify-center " />
      </div>


    </section>

    <q-page-scroller position="bottom-right" :scroll-offset="150" :offset="[18, 18]">
      <q-btn fab icon="keyboard_arrow_up" color="blue" class="" />
    </q-page-scroller>
  </q-page>
</template>

<script lang="ts" setup >
import CarrosselComponent from 'src/components/Barbearia/PaginaPrincipal/CarrosselComponent.vue'
import { useQuasar } from 'quasar'

const q = useQuasar()
import { ref, onMounted } from 'vue'
const loading = ref(true)
const bemVindo = ref(false)
const exibeMensagem = ref(true)


const ordemMensagens = () => {

  console.log('Desenvolvido por Fernando11000')
  setTimeout(() => bemVindo.value = true, 1000);
  setTimeout(() => loading.value = false, 3000);
  setTimeout(() => exibeMensagem.value = false, 6000);
}
onMounted(() => {
  // scrollToElement()
  ordemMensagens()
})


</script>

<style scoped>
.fonte-principal {
  font-size: 1.2rem;

}

.fonte-conteudo {
  font-size: 1rem;

}
</style>

