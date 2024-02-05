<template>
    <q-page class="flex flex-center background no-pointer-events">
        <div class="fit">
            <q-card>
                <q-skeleton v-if="!imagemCarregada" animation="wave" :style="{ 'min-height': `${q.screen.height}px` }" />
                <q-img class="relative-position" :src="require('src/assets/tabelaPrecos.jpeg')" loading="lazy"
                    @load="imagemCarregada = true" width="100%" height="100%" :ratio="9 / 16" />
            </q-card>
        </div>
    </q-page>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import { useQuasar } from 'quasar'
const q = useQuasar()
const imagemCarregada = ref(false);
</script>