
<template>
  <q-header color="purple-13" reveal elevated :class="corToolbar" class="glossy text-white transparent " height-hint="98">
    <q-toolbar>
      <q-btn v-show="q.platform.is.desktop || (q.platform.is.mobile && telaHorizontal)" class="orientation-landscape"
        dense flat round icon="menu" @click="capturaClickDoBotaoPainelLateralEsquerdo" />

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

import { AppFullscreen, useQuasar } from 'quasar'
import { computed } from 'vue';
const emits = defineEmits(['clickBotaoPainelLateralEsquerdo', 'clickBotaoPainelLateralDireito']);
const q = useQuasar()
defineProps(['titulo', 'corToolbar'])


const toggleFullscreen = () => (AppFullscreen.isActive) ? AppFullscreen.exit() : AppFullscreen.request()
const capturaClickDoBotaoPainelLateralEsquerdo = () => emits('clickBotaoPainelLateralEsquerdo')
const capturaClickDoBotaoPainelLateralDireito = () => emits('clickBotaoPainelLateralDireito')
const telaHorizontal = computed(() => q.screen.width > q.screen.height)


</script>