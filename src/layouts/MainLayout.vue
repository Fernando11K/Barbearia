<template>
  <q-layout view="hHh LpR fFf">

    <QHeaderComponent :corToolbar="corToolbar" :titulo="'Barbearia'" @clickBotaoPainelLateralEsquerdo="toggleLeftDrawer"
      @clickBotaoPainelLateralDireito="toggleRightDrawer" />

    <q-drawer v-model="leftDrawerOpen" side="left" overlay bordered>

      <q-img alt="logo instagram" class="full-width q-img-clickable imagem " src="../assets/instagram.jpg"
        style="height: 150px; width: 500px" @click="redirecionarParaInstagram">
        <div class="bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img alt="retrato de um homem com barba"
              src="https://cdn.pixabay.com/photo/2018/01/09/14/23/vector-3071686_1280.png">
          </q-avatar>
          <div class="text-weight-bold">Barber's Den</div>
          <div>@barbers.den</div>
        </div>
      </q-img>

      <q-scroll-area class="fit">
        <q-list>

          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item clickable :active="!menuItem.ativo" v-ripple
              @click="verificaDisponibilidadeDaFuncionalidade(menuItem)" :to="menuItem.rota">
              <q-item-section avatar v-show="menuItem.ativo">
                <q-icon :name="menuItem.icon" :color="menuItem.iconColor" />
              </q-item-section>
              <q-item-section v-show="menuItem.ativo">
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index" v-if="menuItem.separator" />
          </template>
        </q-list>
      </q-scroll-area>

    </q-drawer>
    <ModalAgendamento :statusProp="statusModalAgendamento"
      @atualizaStatusModal="(value) => { statusModalAgendamento = value }" />
    <q-drawer v-if="false" v-model="rightDrawerOpen" side="right" overlay elevated></q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>

    <QFooterComponent @clickBotaoPainelLateralEsquerdo="toggleLeftDrawer" />

  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import QHeaderComponent from 'src/components/MainLayout/QHeaderComponent.vue'
import QFooterComponent from 'src/components/MainLayout/QFooterComponent.vue';
import ModalAgendamento from 'src/components/Agendamento/ModalAgendamento.vue'

import alert from '../hooks/alert'

const corToolbar = ref('bg-blue-8 ')
const leftDrawerOpen = ref(false)
const rightDrawerOpen = ref(false)
const toggleLeftDrawer = () => leftDrawerOpen.value = !leftDrawerOpen.value
const toggleRightDrawer = () => rightDrawerOpen.value = !rightDrawerOpen.value
const statusModalAgendamento = ref(false);

const alerta = alert()
const verificaDisponibilidadeDaFuncionalidade = (itemMenu) => {

  !itemMenu.ativo ? alerta.warning('A funcionalidade estará disponível em breve!') : abreModalAgendamento(itemMenu)

}


const abreModalAgendamento = (itemMenu) => {

  if (itemMenu.label === 'Agendamento') statusModalAgendamento.value = true
};

const redirecionarParaInstagram = () => setTimeout(() => window.location.href = 'https://www.instagram.com/barbers.den/', 250);

const menuList = [
  {
    icon: 'fa-regular fa-calendar-days fa-beat',
    label: 'Agendamento',
    separator: true,
    ativo: true,
    iconColor: 'primary',
    rota: 'agendamento'

  },
  {
    icon: 'fa-solid fa-house',
    label: 'Tabela de Preços',
    ativo: false,
    separator: false


  },
  {
    icon: 'delete',
    label: 'Trash',
    separator: false,
    ativo: false

  },
  {
    icon: 'error',
    label: 'Spam',
    separator: true,
    ativo: false

  },
  {
    icon: 'settings',
    label: 'Settings',
    separator: false,
    ativo: false

  },
  {
    icon: 'feedback',
    label: 'Send Feedback',
    separator: false,
    ativo: false

  },
  {
    icon: 'help',
    iconColor: 'primary',
    label: 'Help',
    separator: false,
    ativo: false

  }
];
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