
<template>
    <q-header reveal elevated class="bg-blue-8 glossy text-white " height-hint="98">
        <q-toolbar>
            <q-btn class="desktop-only " dense flat round icon="menu" @click="capturaClickDoBotaoPainelLateralEsquerdo" />

            <q-toolbar-title class="text-center  ">
                <q-avatar>
                    <q-icon @click="enterFullscreen" name="fa-solid fa-scissors fa-shake" />
                </q-avatar>
                {{ props.titulo }}
            </q-toolbar-title>

            <q-btn class="desktop-only " dense flat round icon="menu" @click="capturaClickDoBotaoPainelLateralDireito" />
        </q-toolbar>
        <!--
    <q-tabs class=" bg-red-6 glossy" align="left">
      <q-route-tab to="/page1" label="Barbearia Tem Tudo" />
      <q-route-tab to="/page2" label="Mercearia da Pracinha" />
      <q-route-tab to="/page3" label="Em breve" />
    </q-tabs>  -->
    </q-header>
</template>
<script setup>
import { defineEmits } from 'vue'
const emits = defineEmits(['clickBotaoPainelLateralEsquerdo', 'clickBotaoPainelLateralDireito']);
const props = defineProps(['titulo'])

const enterFullscreen = () => {
  const element = document.documentElement
  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen()
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen()
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen()
  }
}

const capturaClickDoBotaoPainelLateralEsquerdo = () => { 
    emits('clickBotaoPainelLateralEsquerdo')
}

const capturaClickDoBotaoPainelLateralDireito = () => { 
    emits('clickBotaoPainelLateralDireito')
}


</script>