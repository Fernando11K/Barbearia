<template>   
   <q-footer reveal elevated class="bg-blue-8 glossy text-white ">
      <q-separator color="grey-14" class="shadow-up-24" />
      <q-toolbar class="mobile-only ">
        <div class="row justify-around col-12 fonte-footer ">
          <q-btn size="md" flat round icon="fa-solid fa-bars" class="fonte-footer  " @click="capturaClickDoBotaoPainelLateralEsquerdo">
          </q-btn>
          <q-btn size="md" flat round icon="fa-solid fa-house " class="fonte-footer disabled " @click="funcionalidadeNaoDisponivel">
          </q-btn>
          <q-btn size="md" flat round icon="fa-solid fa-bell fa-beat" class="fonte-footer disabled " @click="funcionalidadeNaoDisponivel">
          </q-btn>
          <q-btn size="md" flat round class="fonte-footer " @click="abrirWhatsApp">
            <q-icon size="md" name="fa-brands fa-whatsapp fa-bounce" color="light-green-13">
            </q-icon>
          </q-btn>

        </div>
      </q-toolbar>
    </q-footer>        
</template>

<script setup>
import { ref } from 'vue'
import alert from '../../hooks/alert'
const emits = defineEmits(['clickBotaoPainelLateralEsquerdo']);

const capturaClickDoBotaoPainelLateralEsquerdo = () => { 
    emits('clickBotaoPainelLateralEsquerdo')
}

const celular = ref('5521969085364');
const message = ref('Olá! Está funcionando?');
const abrirWhatsApp = () => {
  const url = `https://api.whatsapp.com/send?phone=${celular.value}&text=${encodeURIComponent(message.value)}`;
  window.open(url, '_blank')

}
const alerta = alert()
const funcionalidadeNaoDisponivel = (value) => {
  if (value) {
    alerta.warning('A funcionalidade estará disponível em breve!')
  }
}
</script>