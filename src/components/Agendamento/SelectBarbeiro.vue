<template>
    <q-select :modelValue='modelValue' @update:modelValue='atualiza' :options="opcoesBarbeiros" @filter="filtro"
        transition-show="scale" transition-hide="scale" options-cover label="Selecione o profissional:" dense rounded
        outlined class="col-12 q-pr-xs"
        :rules="[val => val && val?.label?.length > 0 || 'Favor selecionar um profissional para o atendimento']"
        behavior="menu" autofocus :use-chips="!!modelValue?.label" :loading="loading">
        <template v-slot:prepend>
            <q-icon name="fa-solid fa-user-tie" color="primary" />
        </template>
    </q-select>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { buscarBarbeiros, loading } from 'src/service/BabeiroService'
import Barbeiro from 'src/model/Barbeiro';
import { QSelectOption } from 'quasar';

const emits = defineEmits(['update:modelValue'])
defineProps(['modelValue'])
onMounted(() => {
    buscarBarbeiros()
        .then((response: Array<Barbeiro>) => {

            listaBarbeiros.value = response.map((barbeiro: Barbeiro) => ({ value: barbeiro.getId(), label: barbeiro.getNome() }))

        })

})
const atualiza = (value: string | number | null) => emits('update:modelValue', value)
const listaBarbeiros = ref<QSelectOption<string>[]>([])
const opcoesBarbeiros = ref(listaBarbeiros.value)
const filtro = (valor: string, update: CallableFunction) => {
    update(() => opcoesBarbeiros.value = (valor === '') ? listaBarbeiros.value : listaBarbeiros.value.filter(v => v.label.toLowerCase().indexOf(valor.toLowerCase()) > -1));
}



</script>