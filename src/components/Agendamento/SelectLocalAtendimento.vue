<template>
    <q-select :modelValue="local" @update:modelValue="atualiza" dense rounded outlined :options="localAtendimento"
        label="Selecione o local de atendimento:" behavior="menu" class="col-12 q-pr-xs "
        :class="{ 'col-6': local?.id === EnumLocalAtendimento.Outro_Local }">
        <template v-slot:prepend>
            <q-icon name="fa-solid fa-location-dot" color="primary" />
        </template>
    </q-select>
</template>

<script setup>
import { EnumLocalAtendimento } from 'src/model/enum/EnumLocalAtendimento'

defineProps(['local'])
const localAtendimento = [
    { id: 0, label: 'Barbearia' },
    { id: 1, label: 'Outro local' }
];
const emits = defineEmits(['update:modelValue'])
const atualiza = (valor) => emits('update:modelValue', valor)
</script>