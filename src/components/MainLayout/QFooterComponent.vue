<template>
  <q-footer v-if="q.platform.is.mobile" reveal elevated class="bg-blue-8 glossy text-white ">
    <q-separator :color="corAtual" class="shadow-up-24 glossy " />
    <q-toolbar class="orientation-portrait ">
      <div class="row justify-around col-12 fonte-footer ">
        <q-btn size="md" flat round icon="fa-solid fa-bars" class="fonte-footer  "
          @click="capturaClickDoBotaoPainelLateralEsquerdo">
        </q-btn>
        <q-btn size="md" flat round icon="fa-solid fa-house " class="fonte-footer " @click="home">
        </q-btn>
        <q-btn v-if="false" size="md" flat round icon="fa-solid fa-bell fa-beat" class="fonte-footer disabled"
          @click="funcionalidadeNaoDisponivel">
        </q-btn>
        <q-btn size="md" flat round icon="fa-regular fa-calendar-days fa-beat" class="fonte-footer "
          @click="statusModalAgendamento = true" :disabled="!usuarioStore.getEmail">
        </q-btn>
        <q-btn size="md" flat round class="fonte-footer " @click="abrirWhatsApp">
          <q-icon size="md" name="fa-brands fa-whatsapp fa-bounce" color="light-green-13">
          </q-icon>
        </q-btn>
      </div>
    </q-toolbar>
  </q-footer>
  <ModalAgendamento :statusProp="statusModalAgendamento" v-show="false"
    @atualizaStatusModal="(value: boolean) => { statusModalAgendamento = value }" />
</template>

<script setup lang="ts">
import ModalAgendamento from 'src/components/Agendamento/ModalAgendamento.vue'
import { useUsuarioStore } from 'src/stores/useUsuarioStore';
import { warning } from '../../hooks/alerta'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
const q = useQuasar()

const usuarioStore = useUsuarioStore()
const emits = defineEmits(['clickBotaoPainelLateralEsquerdo']);



const corAtual = ref<string>()
const corAtualIndex = ref<number>(0)
const cores = ['blue-3', 'blue-4', 'blue-5', 'blue-6'];
const statusModalAgendamento = ref(false)
const router = useRouter()
const trocarCor = () => {
  corAtualIndex.value = (corAtualIndex.value + 1) % cores.length;
  corAtual.value = cores[corAtualIndex.value]
}
const loopCores = setInterval(trocarCor, 500)
onMounted(() => loopCores)
onBeforeUnmount(() => clearInterval(loopCores))

const celular = ref('5521975294416');
const message = ref('Olá! Está funcionando?');
const abrirWhatsApp = () => { const url = `https://api.whatsapp.com/send?phone=${celular.value}&text=${encodeURIComponent(message.value)}`; window.open(url, '_blank') }
const funcionalidadeNaoDisponivel = () => warning('A funcionalidade estará disponível em breve!')

const capturaClickDoBotaoPainelLateralEsquerdo = () => emits('clickBotaoPainelLateralEsquerdo')
const home = () => { router.push('/home') }


</script>
