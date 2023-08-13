
<template>
  <q-header color="purple-13" reveal elevated :class="corToolbar" class="glossy text-white " height-hint="98">
    <q-toolbar>
      <q-btn class="desktop-only " dense flat round icon="menu" @click="capturaClickDoBotaoPainelLateralEsquerdo" />

      <q-toolbar-title class="text-center  ">
        <q-avatar>
          <q-icon @click="toggleFullscreen" name="fa-solid fa-scissors fa-shake" />
        </q-avatar>
        {{ titulo }}
      </q-toolbar-title>

      <q-btn v-if="false" class="desktop-only" dense flat round icon="menu"
        @click="capturaClickDoBotaoPainelLateralDireito" />
    </q-toolbar>
  </q-header>
</template>

<script setup lang="ts">

import { AppFullscreen } from 'quasar'
const emits = defineEmits(['clickBotaoPainelLateralEsquerdo', 'clickBotaoPainelLateralDireito']);
defineProps(['titulo', 'corToolbar'])

const toggleFullscreen = () => (AppFullscreen.isActive) ? AppFullscreen.exit() : AppFullscreen.request()
const capturaClickDoBotaoPainelLateralEsquerdo = () => emits('clickBotaoPainelLateralEsquerdo')
const capturaClickDoBotaoPainelLateralDireito = () => emits('clickBotaoPainelLateralDireito')

</script>