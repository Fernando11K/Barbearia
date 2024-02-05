<template>
  <router-view v-slot="{ Component, route }">
    <Transition name="slide">
      <component :is="Component" :key="route.path" />
    </Transition>
  </router-view>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { usuarioStore } from './stores/usuario-store';
const usuario = usuarioStore();

onMounted(() => {
  usuario.preencheState()


})

</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.07s;
}

.slide-enter,
.slide-leave-to {
  transform: translateX(50%);
}
</style>
