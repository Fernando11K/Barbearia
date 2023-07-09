
<template>
  <q-header  color="purple-13" reveal elevated :class="corToolbar" class="glossy text-white " height-hint="98">
    <q-toolbar>
      <q-btn class="desktop-only " dense flat round icon="menu" @click="capturaClickDoBotaoPainelLateralEsquerdo" />

      <q-toolbar-title class="text-center  ">
        <q-avatar>
          <q-icon @click="toggleFullscreen" name="fa-solid fa-scissors fa-shake" />
        </q-avatar>
        {{ props.titulo }}
      </q-toolbar-title>

      <q-btn class="desktop-only " dense flat round icon="menu" @click="capturaClickDoBotaoPainelLateralDireito" />
    </q-toolbar>
    <!--
    <q-tabs class=" bg-red-6 glossy" align="left">
      <q-route-tab to="/page1" label="Barbearia Tem Tudo" />
      <q-route-tab to="/page3" label="Em breve" />
    </q-tabs>  -->
  </q-header>
</template>

<script setup lang="ts">

import { AppFullscreen } from 'quasar'
const emits = defineEmits(['clickBotaoPainelLateralEsquerdo', 'clickBotaoPainelLateralDireito']);
const props = defineProps(['titulo', 'corToolbar'])

const toggleFullscreen = () => (AppFullscreen.isActive) ? AppFullscreen.exit() : AppFullscreen.request()
const capturaClickDoBotaoPainelLateralEsquerdo = () => emits('clickBotaoPainelLateralEsquerdo')
const capturaClickDoBotaoPainelLateralDireito = () => emits('clickBotaoPainelLateralDireito')

</script>