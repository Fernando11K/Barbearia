<template>
    <div class="tamanho-carrossel">
        <q-carousel   swipeable animated v-model="slide" thumbnails infinite>
            <q-carousel-slide   :name="1" img-src="../../../assets/Carrossel/C1.jpg" />
            <q-carousel-slide  :name="2" img-src="../../../assets/Carrossel/C2.jpg" />
            <q-carousel-slide  :name="3" img-src="../../../assets/Carrossel/C3.jpg"  />            
        </q-carousel>
    </div>
</template>
src/components/Barbearia/PaginaPrincipal/CarrosselComponent.vue
src/assets/Carrossel/C1.jpg

<script setup>
import { ref } from 'vue'

const slide = ref(1)

</script>

<style lang="scss" scoped>
// .tamanho-carrossel {
//   width: 70vw;
//   height: 40vh;
// }

</style>
  