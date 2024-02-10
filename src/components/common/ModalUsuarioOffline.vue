<template>
    <q-dialog v-model="status" persistent>
        <q-card>
            <q-bar class="bg-primary text-bold q-pa-lg ">
                <q-icon name="warning" color="warning" size="1.5rem" class="q-pr-sm" />
                <span class="text-white text-h6 ">Atenção</span>
                <q-space />
                <q-btn dense flat icon="close" color="white" v-close-popup />
            </q-bar>
            <q-card-section class="row items-center ">
                <q-avatar icon="signal_wifi_off" color="white" text-color="red" />
                <span class="text-body1">Você está sem conexão.</span>
            </q-card-section>
            <q-card-actions align="right">
                <q-btn flat label="Ok" color="primary" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
const status = ref(false)

onMounted(() => {
    window.addEventListener('offline', () => status.value = true)
    window.addEventListener('online', () => status.value = false)
})


</script>