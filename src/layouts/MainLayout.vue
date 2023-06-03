<template>
  <q-layout view="hHh LpR fFf">

   <!-- <q-header reveal elevated class="bg-blue-8 glossy text-white " height-hint="98">
      <q-toolbar>
        <q-btn class="desktop-only " dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title class="text-center  ">
          <q-avatar>
            <q-icon @click="enterFullscreen" name="fa-solid fa-scissors fa-shake" />
          </q-avatar>
          Barbearia Tem Tudo
        </q-toolbar-title>

        <q-btn class="desktop-only " dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>

      <q-tabs class=" bg-red-6 glossy" align="left">
        <q-route-tab to="/page1" label="Barbearia Tem Tudo" />
        <q-route-tab to="/page2" label="Mercearia da Pracinha" />
        <q-route-tab to="/page3" label="Em breve" />
      </q-tabs>  -->
  <!--  </q-header>  -->
  <QHeaderComponent :titulo="'Barbearia Tem Tudo'" @clickBotaoPainelLateralEsquerdo="toggleLeftDrawer" @clickBotaoPainelLateralDireito="toggleRightDrawer" />

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

    <q-footer reveal elevated class="bg-blue-8 glossy text-white ">
      <q-separator color="grey-14" class="shadow-up-24" />
      <q-toolbar class="mobile-only ">
        <div class="row justify-around col-12 fonte-footer ">
          <q-btn size="md" flat round icon="fa-solid fa-bars" class="fonte-footer  " @click="toggleLeftDrawer">
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

  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import QHeaderComponent from 'src/components/MainLayout/QHeaderComponent.vue'
import alert from '../hooks/alert'

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

const celular = ref('5521969085364');
const message = ref('Olá! Está funcionando?');
const abrirWhatsApp = () => {
  const url = `https://api.whatsapp.com/send?phone=${celular.value}&text=${encodeURIComponent(message.value)}`;
  window.open(url, '_blank')
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