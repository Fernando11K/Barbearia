<template>
    <q-input :modelValue="modelValue" @update:modelValue="atualiza" dense unmasked-value rounded outlined
        label="Digite o CEP do outro local:" mask="#####-###" fill-mask clearable class="q-pr-xs q-py-md"
        :class="{ 'col-6': cepValido, 'col-12': !cepValido }" :color="alterarCorInputCEP" :loading="loading"
        @click="exibeMensagemInformativa()" @blur="buscarEndereco" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { info } from '../../utils/alerta'
const props = defineProps(['modelValue', 'cepValido', 'loading'])
const emits = defineEmits(['requisitaEndereco', 'update:modelValue'])


const atualiza = (valor: string | number | null) => { emits('update:modelValue', valor); }
const buscarEndereco = () => {
    if (props.modelValue.length === 8) {
        emits('requisitaEndereco', props.modelValue)
    }
}
const alterarCorInputCEP = computed(() => (props.cepValido) ? 'light-green-14' : 'red-13')
const exibeMensagemInformativa = () => info('Após terminar de preencher um campo, clique fora dele para validar!')
</script>