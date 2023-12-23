<template>
  <router-view v-slot="{ Component, route }">
    <Transition name="fade">
      <component :is="Component" :key="route.path" />
    </Transition>
  </router-view>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useUsuarioStore } from './stores/useUsuarioStore';
const usuarioStore = useUsuarioStore();

onMounted(() => {
  usuarioStore.preencheState()

})


</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.9s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
