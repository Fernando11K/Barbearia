<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useUsuarioStore } from './stores/useUsuarioStore';
const usuarioStore = useUsuarioStore();

onMounted(() => {
  usuarioStore.preencheState()
})


</script>
