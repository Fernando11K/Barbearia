<template>
  <q-layout view="hHh LpR fFf">

    <QHeaderComponent :corToolbar="corToolbar" :titulo="'Barbearia'" @clickBotaoPainelLateralEsquerdo="toggleLeftDrawer"
      @clickBotaoPainelLateralDireito="toggleRightDrawer" />

    <q-drawer v-model="leftDrawerOpen" side="left" overlay bordered>
      <QDrawerConteudo @abreModalAgendamento="abreModalAgendamento" />
    </q-drawer>
    <q-drawer v-if="false" v-model="rightDrawerOpen" side="right" overlay elevated></q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>

    <QFooterComponent @clickBotaoPainelLateralEsquerdo="toggleLeftDrawer" />

    <ModalAgendamento :statusProp="statusModalAgendamento" @atualizaStatusModal="abreModalAgendamento" />
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import QHeaderComponent from 'src/components/MainLayout/QHeaderComponent.vue'
import QFooterComponent from 'src/components/MainLayout/QFooterComponent.vue';
import ModalAgendamento from 'src/components/Agendamento/ModalAgendamento.vue'
import QDrawerConteudo from 'src/components/MainLayout/QDrawerConteudo.vue';

const corToolbar = ref('bg-blue-8')
const leftDrawerOpen = ref(false)
const rightDrawerOpen = ref(false)
const statusModalAgendamento = ref(false);
const abreModalAgendamento = () => statusModalAgendamento.value = true
const toggleLeftDrawer = () => leftDrawerOpen.value = !leftDrawerOpen.value
const toggleRightDrawer = () => rightDrawerOpen.value = !rightDrawerOpen.value
</script>

<style scoped lang="scss">
.fonte-footer {
  font-size: 13px;
}

.imagem {
  &:hover {
    /* Estilos para o efeito hover */
    /* Por exemplo, alterar a opacidade da imagem */
    opacity: 0.5;
    transition: opacity 0.3s;
  }
}
</style>