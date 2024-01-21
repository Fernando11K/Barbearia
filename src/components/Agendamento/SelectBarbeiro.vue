<template>
    <q-select :modelValue='modelValue' @update:modelValue='atualiza' :options="opcoesBarbeiros" @filter="filtro"
        transition-show="scale" transition-hide="scale" options-cover label="Selecione o profissional:" dense rounded
        outlined class="col-12 q-pr-xs"
        :rules="[val => val && val?.label?.length > 0 || 'Favor selecionar um profissional para o atendimento']"
        behavior="menu" autofocus clearable :use-chips="!!modelValue?.label">
        <template v-slot:prepend>
            <q-icon name="fa-solid fa-user-tie" color="primary" />
        </template>
    </q-select>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { buscarBarbeiros } from 'src/service/BabeiroService'

const emits = defineEmits(['update:modelValue'])
defineProps(['modelValue'])
const atualiza = (value: string | number | null) => emits('update:modelValue', value)


const listaBarbeiros = buscarBarbeiros()
const opcoesBarbeiros = ref(listaBarbeiros)

const filtro = (valor: string, update: CallableFunction) => {
    update(() => opcoesBarbeiros.value = (valor === '') ? listaBarbeiros : listaBarbeiros.filter(v => v.label.toLowerCase().indexOf(valor.toLowerCase()) > -1));
}



</script>