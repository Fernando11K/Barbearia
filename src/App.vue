<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'src/boot/firebase'
import { useAuthStore } from 'stores/useAuthStore';

const authStore = useAuthStore();

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    console.log('usuario')
    console.log(user)
    if (user) {

      authStore.setEstaAutenticado(true);

    } else {
      authStore.setEstaAutenticado(false);
    }
  })

})



</script>
