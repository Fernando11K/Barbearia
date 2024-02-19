<template>
    <q-card class=" bg-white q-ma-xs" style=" max-width: 400px;" ref="card">
        <div class="text-center q-pt-sm">
            <q-icon size="70px" color="dark" name="fa-solid fa-user" />
            <div class="text-bold text-h5 text-dark q-pt-sm">Barber's Den - {{ titulo }}</div>
        </div>
        <q-card-section>
            <slot> </slot>
        </q-card-section>
    </q-card>
</template>
<script setup lang="ts">
import { useQuasar } from 'quasar';
import { ref } from 'vue';

defineProps(['titulo'])
const q = useQuasar()
const card = ref<null | { $el: HTMLElement }>(null)
const alteraPosicaoCard = (estaEmFoco = true) => {
    if (q.platform.is.mobile) {
        const elemento = card?.value?.$el;
        if (elemento) {
            elemento.style.transition = 'transform 0.5s ease-in-out';
            elemento.style.transform = (estaEmFoco) ? 'translateY(-17%)' : 'translateY(0%)';

        }
    }
}
defineExpose({ alteraPosicaoCard })

</script>