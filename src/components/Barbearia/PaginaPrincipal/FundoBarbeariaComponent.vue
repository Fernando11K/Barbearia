<template >
  <div class="fit">
    <q-img class="relative-position" width="100%" height="100%" :src="require('../../../assets/tabelaPrecos.jpeg')" />
    <q-separator :color="corAtual" class="shadow-up-24 glossy " />

    <CarrosselComponent v-if="true" class="absolute-top-center  " />
    <!-- <q-img class="relative-position" width="100%" height="100%" :src="require('../../../assets/tabelaPrecos.jpeg')" />-->
  </div>
</template>

<script lang="ts" setup>
import CarrosselComponent from './CarrosselComponent.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'
const corAtual = ref<string>()
const corAtualIndex = ref<number>(0)
const cores = ['blue-3', 'blue-4', 'blue-5', 'blue-6'];

const trocarCor = () => {
  corAtualIndex.value = (corAtualIndex.value + 1) % cores.length;
  corAtual.value = cores[corAtualIndex.value]
}
const loopCores = setInterval(trocarCor, 500)
onMounted(() => loopCores)
onBeforeUnmount(() => clearInterval(loopCores))

</script>

<style lang="scss" scoped>
// .absolute-top-center {
//   position: absolute;
//   top: 1px;


// }
</style>
  