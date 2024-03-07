<template>
  <q-layout view="hHh LpR fFf" :class="{ 'bg-blue-8': q.platform.is.desktop }">

    <QHeaderComponent :titulo="titulo" @clickBotaoPainelLateralEsquerdo="toggleLeftDrawer"
      @clickBotaoPainelLateralDireito="toggleRightDrawer" />

    <q-drawer v-model="leftDrawerOpen" side="left" bordered>
      <QDrawerConteudo />
    </q-drawer>
    <q-drawer v-if="false" v-model="rightDrawerOpen" side="right" overlay elevated></q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>


    <footer v-if="q.platform.is.desktop">
      <q-toolbar class="shadow-up-24">
        <q-toolbar-title class="text-center text-subtitle1 text-white">
          <q-badge rounded outline color="blue-6" align="middle">
            <span class="text-white">
              &copy; {{ ano }}
            </span>
            <a style="text-decoration: none;" class="text-white" href="https://br.linkedin.com/in/fernando11000"
              type="text/html" target="_blank" rel="noopener noreferrer">
              &nbsp;- Fernando11000
            </a>
            <span class="text-white">
              &nbsp;- Versão {{ versao }}
            </span>
          </q-badge>
        </q-toolbar-title>
      </q-toolbar>
    </footer>
    <QFooterMobile @clickBotaoPainelLateralEsquerdo="toggleLeftDrawer" />
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import QHeaderComponent from 'src/components/MainLayout/QHeaderComponent.vue'
import QFooterMobile from 'src/components/MainLayout/QFooterMobile.vue';
import QDrawerConteudo from 'src/components/MainLayout/QDrawerConteudo.vue';
import { useQuasar } from 'quasar';

const q = useQuasar()

const ano = new Date().getFullYear();
const versao = process.env.VERSAO
const titulo = process.env.TITULO

const leftDrawerOpen = ref(false)
const rightDrawerOpen = ref(false)
const toggleLeftDrawer = () => leftDrawerOpen.value = !leftDrawerOpen.value
const toggleRightDrawer = () => rightDrawerOpen.value = !rightDrawerOpen.value

</script>
