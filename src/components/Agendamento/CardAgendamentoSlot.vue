<template>
    <q-card ref="card" style="min-width: 350px; min-height: 300px;">
        <q-card-section class="bg-primary text-white ">
            <div class="text-h6 row justify-between">
                <q-icon class="q-mr-md q-pt-xs" size="sm" name="fa-regular fa-calendar-days" />{{ label }}
                <q-btn icon="close" flat round dense v-close-popup />
            </div>
        </q-card-section>
        <slot> </slot>
    </q-card>
</template>

<script setup>
defineProps(['label'])
</script>