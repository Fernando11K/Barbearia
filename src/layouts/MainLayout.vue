<template>
  <q-layout view="hHh LpR fFf" :class="{ 'bg-blue-8': q.platform.is.desktop }">

    <QHeaderComponent :titulo="'Barbearia'" @clickBotaoPainelLateralEsquerdo="toggleLeftDrawer"
      @clickBotaoPainelLateralDireito="toggleRightDrawer" />

    <q-drawer v-model="leftDrawerOpen" side="left" bordered>
      <QDrawerConteudo />
    </q-drawer>
    <q-drawer v-if="false" v-model="rightDrawerOpen" side="right" overlay elevated></q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>

    <QFooterComponent @clickBotaoPainelLateralEsquerdo="toggleLeftDrawer" />
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import QHeaderComponent from 'src/components/MainLayout/QHeaderComponent.vue'
import QFooterComponent from 'src/components/MainLayout/QFooterComponent.vue';
import QDrawerConteudo from 'src/components/MainLayout/QDrawerConteudo.vue';
import { useQuasar } from 'quasar';

const q = useQuasar()

const leftDrawerOpen = ref(false)
const rightDrawerOpen = ref(false)
const toggleLeftDrawer = () => leftDrawerOpen.value = !leftDrawerOpen.value
const toggleRightDrawer = () => rightDrawerOpen.value = !rightDrawerOpen.value

</script>
