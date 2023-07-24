<template>
<div>

  <q-img class="relative-position" width="100%" height="100%" :src="require('../../../assets/tabelaPrecos.jpeg')" /> 
  <q-img class="relative-position" width="100%" height="100%" :src="require('../../../assets/tabelaPrecos.jpeg')" /> 
  <CarrosselComponent v-if="false" class="abosolute-top-center full-width " />      
</div>  
</template>

<script lang="ts" setup>
import CarrosselComponent from './CarrosselComponent.vue'

</script>

<style lang="scss" scoped>
.abosolute-top-center {
  position: absolute;
  top: 1px;
  
  
}

</style>
  