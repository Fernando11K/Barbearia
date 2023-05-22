<template>
  <q-layout view="hHh LpR fFf">

    <q-header reveal elevated class="bg-dark glossy text-white " height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <q-icon class="" name="fa-solid fa-fan fa-spin-pulse" />
          </q-avatar>
          B&M
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>

      <q-tabs class="glossy bg-grey" align="left">
        <q-route-tab to="/page1" label="Barbearia Tem Tudo" />
        <q-route-tab to="/page2" label="Mercearia da Pracinha" />
        <q-route-tab to="/page3" label="Em breve" />
      </q-tabs>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" side="left" overlay bordered>
      <Instagram/>
    </q-drawer>

    <q-drawer v-model="rightDrawerOpen" side="right" overlay elevated>
     <InstagramTemplate />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>


    <q-footer reveal elevated class="bg-grey-8 text-white glossy">
      <q-toolbar>
        <div class="row col-12">
          <q-btn flat round icon="fa-solid fa-bars fa-beat" class="fonte-footer col-1 q-px-sm q-pt-sm"
            @click="toggleLeftDrawer">
            Menu
          </q-btn>
          <q-btn flat round icon="fa-solid fa-house fa-beat" class="fonte-footer col-1 q-pl-xl q-pt-sm">
            Início
          </q-btn>
        </div>


      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
import { ref } from 'vue'
import InstagramTemplate from 'src/components/InstagramTemplate.vue'

export default {
  components:{
    InstagramTemplate
  },
  setup() {
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },

      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value
      }
    }
  }
}
</script>

<style scoped>
.fonte-footer {

  font-size: 13px;
}
</style>