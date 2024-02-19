<template>
    <q-input dense outlined bg-color="grey-1" :modelValue='modelValue' @update:modelValue='atualiza'
        :type="isPassword ? 'password' : 'text'" :label="label" autocomplete="current-password" required>
        <template v-slot:append>
            <q-icon :name="isPassword ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                @click="isPassword = !isPassword" />
        </template>
        <template v-slot:prepend>
            <q-icon name="fa-solid fa-key" />
        </template>
    </q-input>
</template>

<script setup lang="ts">

import { ref } from 'vue'
const emits = defineEmits(['update:modelValue'])

defineProps(['modelValue', 'label'])

const isPassword = ref(true)
const atualiza = (senha: string | number | null) => emits('update:modelValue', senha)


</script>


