<template>
  <q-layout view="hHh LpR fFf">

  <QHeaderComponent :corToolbar="corToolbar" :titulo="'Barbearia Tem Tudo'" @clickBotaoPainelLateralEsquerdo="toggleLeftDrawer" @clickBotaoPainelLateralDireito="toggleRightDrawer" />

    <q-drawer v-model="leftDrawerOpen" side="left" overlay bordered>

      <q-img class="full-width q-img-clickable imagem" src="../assets/instagram.jpg" style="height: 150px"
        @click="redirecionarParaInstagram">
        <div class="bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="../assets/pablo.png">
          </q-avatar>
          <div class="text-weight-bold">Pablo Ferreira</div>
          <div>@_pbsilva</div>
        </div>
      </q-img>

      <q-scroll-area class="fit">
        <q-list>

          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item clickable :active="!menuItem.ativo.value" v-ripple
              @click="funcionalidadeNaoDisponivel(menuItem.ativo.value)">
              <q-item-section avatar v-show="menuItem.ativo.value">
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section v-show="menuItem.ativo.value">
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index" v-if="menuItem.separator" />
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-drawer v-model="rightDrawerOpen" side="right" overlay elevated>

    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <QFooterComponent @clickBotaoPainelLateralEsquerdo="toggleLeftDrawer"  />
    
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import QHeaderComponent from 'src/components/MainLayout/QHeaderComponent.vue'
import QFooterComponent from 'src/components/MainLayout/QFooterComponent.vue';
import alert from '../hooks/alert'
const corToolbar = ref('bg-blue-8 ')
const leftDrawerOpen = ref(false)
const rightDrawerOpen = ref(false)
const toggleLeftDrawer = () => leftDrawerOpen.value = !leftDrawerOpen.value
const toggleRightDrawer = () => rightDrawerOpen.value = !rightDrawerOpen.value

const alerta = alert()
const funcionalidadeNaoDisponivel = (value) => {
  if (value) {
    alerta.warning('A funcionalidade estará disponível em breve!')
  }
}

const redirecionarParaInstagram = () => {
  setTimeout(function () {

    window.location.href = 'https://www.instagram.com/_pbsilva/';
  }, 250);

}

const menuList = [
  {
    icon: 'fa-regular fa-calendar-days fa-beat',
    label: 'Agendamento',
    separator: true,
    ativo: ref(true),
    iconColor: 'primary'

  },
  {
    icon: 'send',
    label: 'Tabela de Preços',
    separator: false,
    ativo: ref(false)

  },
  {
    icon: 'delete',
    label: 'Trash',
    separator: false,
    ativo: ref(false)

  },
  {
    icon: 'error',
    label: 'Spam',
    separator: true,
    ativo: ref(false)

  },
  {
    icon: 'settings',
    label: 'Settings',
    separator: false,
    ativo: ref(false)

  },
  {
    icon: 'feedback',
    label: 'Send Feedback',
    separator: false,
    ativo: ref(false)

  },
  {
    icon: 'help',
    iconColor: 'primary',
    label: 'Help',
    separator: false,
    ativo: ref(false)

  }
];

</script>



<style scoped lang="scss">
.fonte-footer {

  font-size: 13px;
}

.imagem:hover {
  /* Estilos para o efeito hover */
  /* Por exemplo, alterar a opacidade da imagem */
  opacity: 0.5;
  transition: opacity 0.3s;
}
</style>