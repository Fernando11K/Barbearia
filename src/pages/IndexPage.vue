<template>
  <q-page class="bg-blue-4 flex flex-center">
    <div v-if="q.platform.is.desktop && exibeMensagem" class="q-pa-md row justify-center desktop-only">
      <div style="width: 100%; max-width: 400px" class="">
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
    </div>

    <section v-else>
      <q-card class="row justify-center" style="border-radius: 0%">
        <q-card-section vertical class="col-12 col-md-9">
          <q-card-section>
            <div class="text-h5 text-bold tex-left">O Refúgio Clássico da Elegância Masculina</div>

          </q-card-section>
          <q-card-section style="font-size: 16px;">
            Sinta a diferença na Barbers Dean, onde a tradição encontra a modernidade para criar experiências únicas.
            Nossos
            barbeiros experientes são verdadeiros mestres na arte do corte e da barba, proporcionando não apenas um
            serviço,
            mas uma jornada para o estilo clássico e a excelência.


            Barbers Dean: onde a tradição encontra a modernidade, e cada cliente é tratado como parte de nossa história.
            Estilo, qualidade e camaradagem - experimente o melhor na Barbers Dean.
            <div class="q-pt-xs">Agende seu momento de elegância agora! 🎩💈 </div>
            <span>#BarbersDean #EstiloClássico #ExperiênciaMemorável</span>

          </q-card-section>
        </q-card-section>
      </q-card>

      <CarrosselComponent />
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

