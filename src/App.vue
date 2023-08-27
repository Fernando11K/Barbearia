<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'src/boot/firebase'
import { useAuthStore } from 'stores/useAuthStore';

const authStore = useAuthStore();

console.log('App')
onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {

      authStore.setEstaAutenticado(true);

    } else {
      authStore.setEstaAutenticado(false);
    }
  })

})



</script>
