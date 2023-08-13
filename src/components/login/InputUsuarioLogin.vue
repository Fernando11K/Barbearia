<template>
    <q-input for="email" standout="bg-info" outlined dense bg-color="white" :modelValue='modelValue'
        @update:modelValue='atualiza' type='text' label='Usuário'>
        <template v-slot:prepend>
            <q-icon name="fa-solid fa-user" />
        </template>
    </q-input>
</template>

<script setup lang="ts">

const emits = defineEmits(['update:modelValue'])
defineProps(['modelValue'])
const atualiza = (value: any) => emits('update:modelValue', value)


</script>


