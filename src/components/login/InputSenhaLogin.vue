<template>
    <q-input dense outlined bg-color="white" :modelValue='modelValue' @update:modelValue='atualiza'
        :type="isPassword ? 'password' : 'text'" label="Senha">
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

defineProps(['modelValue'])

const isPassword = ref(<boolean>true)
const atualiza = (senha: any) => emits('update:modelValue', senha)


</script>


