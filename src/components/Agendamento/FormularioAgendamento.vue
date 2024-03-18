<template>
   <section class="row col-12 ">
      <SelectBarbeiro v-model="barbeiro" class="col-12" />
      <InputDate v-model="data" class="col-12" @updateModelValue="atualiza" />
      <SelectLocalAtendimento v-model="local" class="col-12" />
   </section>
   <DadosAgendamentoExternoView :local="local" @statusOutroLocal="(status) => { statusValidacaoOutroLocal = status }" />
</template>

<script setup lang="ts">

import InputDate from './InputDate.vue'
import SelectBarbeiro from './SelectBarbeiro.vue';
import { onBeforeMount, onMounted, ref, watch } from 'vue';
import { EnumLocalAtendimento } from 'src/model/enum/EnumLocalAtendimento'
import { Agendamento } from 'src/model/Agendamento';
import { QSelectOption } from 'quasar';
import SelectLocalAtendimento from './SelectLocalAtendimento.vue';
import DadosAgendamentoExternoView from 'src/components/Agendamento/DadosAgendamentoExternoView.vue'

const props = defineProps(['dados'])
onBeforeMount(() => {
   if (props.dados) {
      preencheDadosDeEdicao()
   }
})
const preencheDadosDeEdicao = () => {

   const { barbeiro: barbeiroRecebido, data: dataRecebida } = props.dados
   barbeiro.value = { value: barbeiroRecebido.id, label: barbeiroRecebido.nome }
   data.value = dataRecebida

}
onMounted(() => { emiteValidacaoDados() });
const emits = defineEmits(['dadosValidos', 'preencheDados']);

const statusValidacaoOutroLocal = ref(false)
const data = ref('')
const barbeiro = ref<QSelectOption<string>>({ value: '', label: '' });
const local = ref({ id: 0, label: 'Barbearia' })

const enviaDados = async () => {
   if (barbeiro.value.value) {
      emits('preencheDados', new Agendamento(data.value, barbeiro.value.value, 'corte', local.value.id))
   }
}

const atualiza = (dados: string) => data.value = dados

const validaDados = () => {
   return !data.value || data.value.endsWith('00:00') || !barbeiro.value?.label || (local.value.id === EnumLocalAtendimento.Outro_Local && (statusValidacaoOutroLocal.value))
}

const emiteValidacaoDados = () => emits('dadosValidos', validaDados())

watch([data, barbeiro, local], () => {
   emiteValidacaoDados()

})
defineExpose({ enviaDados })
</script>