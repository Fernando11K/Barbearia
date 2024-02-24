<template>
    <q-input for="nome" standout="bg-info" round outlined dense bg-color="grey-1" :modelValue='modelValue'
        @update:modelValue='atualiza' type='text' label="Nome" autocomplete="username" :rules="[
            val => !!val || 'Digite seu completo!',
            val => regexNome.test(val) || 'Nome inválido!',
        ]" lazyRules required class="col-11">
        <template v-slot:prepend>
            <q-icon name="fa-solid fa-user" />
        </template>
    </q-input>
</template>

<script setup lang="ts">
const emits = defineEmits(['update:modelValue'])
defineProps(['modelValue'])
const regexNome = new RegExp('^[a-zA-ZÀ-ü\']+ [a-zA-ZÀ-ü\']{2,}( [a-zA-ZÀ-ü\'].+)?')
const atualiza = (value: string | number | null) => emits('update:modelValue', value)


</script>