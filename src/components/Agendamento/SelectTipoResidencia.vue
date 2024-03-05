<template>
    <q-select dense type="text" rounded outlined :modelValue="modelValue" :options="tiposResidencia"
        @update:modelValue="atualiza" label="Selecione o tipo de residência" class="col-6 q-py-md" v-if="cepValido">
        <template v-slot:prepend>
            <q-icon :name="iconeReativoTipoResidencia" color="primary" />
        </template>
    </q-select>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps(['modelValue', 'cepValido'])
const emits = defineEmits(['update:modelValue'])
const atualiza = (valor) => emits('update:modelValue', valor)

const iconeReativoTipoResidencia = computed(() => (props.modelValue?.id === 0) ? 'fa-solid fa-house' : 'fa-solid fa-building')
const tiposResidencia = [
    { id: 0, label: 'Casa' },
    { id: 1, label: 'Apartamento' }
]
</script>