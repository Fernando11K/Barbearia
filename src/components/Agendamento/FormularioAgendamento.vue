<template >
   <section class="row col-12 ">
      <SelectBarbeiro v-model="barbeiro" class="col-12" />
      <InputDate v-model="data" class="col-12" @updateModelValue="atualiza" />
      <SelectLocalAtendimento v-model="local" />
      <InputCep v-model="dadosEndereco.cep" :cepValido="cepValido" :loading="loading"
         @requisitaEndereco="requisitarDadosViaCep(dadosEndereco.cep)"
         v-if="local.id === EnumLocalAtendimento.Outro_Local" />
      <SelectTipoResidencia v-model="tipoResidencia" :cepValido="cepValido" :loading="loading" />
   </section>

   <section v-if="cepValido" class="q-gutter-y-md row">
      <q-input dense type="text" rounded outlined v-model="dadosEndereco.uf" label="UF" disable class="col-6 q-pr-xs"
         bg-color="grey-2" />

      <q-input dense type="text" rounded outlined v-model="dadosEndereco.cidade" label="Cidade" disable
         class="col-6 q-pr-xs" bg-color="grey-2">

         <template v-slot:prepend>
            <q-icon name="fa-solid fa-city" color="primary" />
         </template>
      </q-input>

      <q-input dense type="text" rounded outlined v-model="dadosEndereco.bairro" label="Bairro" disable bg-color="grey-2"
         class="col-12 q-pr-xs" :class="{ 'col-6': tipoResidencia.id === EnumTipoResidencia.Apartamento }" />
      <q-input dense type="text" rounded outlined v-model="dadosEndereco.numeroApartamento"
         labecepValidol="Número do Apartamento" class="coldadosEndereco.-12 q-pr-xs"
         v-if="tipoResidencia.id === EnumTipoResidencia.Apartamento" />

      <q-input dense type="text" rounded outlined v-model="dadosEndereco.logradouro" disable label="Rua/Avenida"
         class="col-12" bg-color="grey-2" />

      <q-input dense type="text" rounded outlined v-model="dadosEndereco.numeroResidencia" label="Número da Residência"
         class="col-6 q-pr-xs" />

      <q-input dense type="text" rounded outlined v-model="dadosEndereco.complemento" label="Complemento" class="col-6" />
   </section>
</template>

<script lang="ts" setup>

import { IEndereco } from 'src/model/interfaces/IEndereco'
import { computed, onMounted, ref, watch } from 'vue';
import InputDate from './InputDate.vue'
import { buscarDadosViaCep } from 'src/service/EnderecoService'
import { EnumLocalAtendimento } from 'src/model/enum/EnumLocalAtendimento'
import { EnumTipoResidencia } from 'src/model/enum/EnumTipoResidencia'
import { Agendamento } from 'src/model/Agendamento';
import SelectBarbeiro from './SelectBarbeiro.vue';
import { QSelectOption } from 'quasar';
import SelectLocalAtendimento from './SelectLocalAtendimento.vue';
import SelectTipoResidencia from './SelectTipoResidencia.vue';
import InputCep from './InputCep.vue';


const emits = defineEmits(['dadosValidos', 'preencheDados']);
onMounted(() => { emiteValidacaoDados() });

const data = ref('')
const barbeiro = ref<QSelectOption<string>>({ value: '', label: '' });
const loading = ref(false)

const local = ref({ id: 0, label: 'Barbearia' })
const dadosEndereco = ref<IEndereco>({
   cep: '',
   uf: '',
   cidade: '',
   bairro: '',
   logradouro: '',
   numeroResidencia: '',
   complemento: '',
   tipoResidencia: '',
   numeroApartamento: ''
})

const enviaDados = () => {
   if (barbeiro.value.value) {
      emits('preencheDados', new Agendamento(data.value, barbeiro.value.value, 'corte', local.value.id))
   }
}

const atualiza = (dados: string) => data.value = dados
const tipoResidencia = ref({ id: EnumTipoResidencia.Casa, label: 'Casa' })
const cepValido = ref(false)

const requisitarDadosViaCep = async (cep: string) => {
   cepValido.value = false
   loading.value = true
   buscarDadosViaCep(cep)
      .then(response => {
         dadosEndereco.value = response
         cepValido.value = true
      })
      .finally(() => {
         loading.value = false
      })

}

const regrasValidacaoOutroLocal = computed(() => (tipoResidencia.value.id === EnumTipoResidencia.Casa && !dadosEndereco.value.numeroResidencia) || (tipoResidencia.value.id === EnumTipoResidencia.Apartamento && (!dadosEndereco.value.numeroApartamento || !dadosEndereco.value.numeroResidencia)))

const validaDados = () => {
   return !data.value || data.value.endsWith('00:00') || !barbeiro.value?.label || (local.value.id === EnumLocalAtendimento.Outro_Local && (regrasValidacaoOutroLocal.value))
}
const emiteValidacaoDados = () => emits('dadosValidos', validaDados())

watch([data, barbeiro, local, tipoResidencia, () => dadosEndereco.value?.numeroResidencia, () => dadosEndereco.value?.numeroApartamento, () => dadosEndereco.value?.cep], () => {
   emiteValidacaoDados()
   if ((local.value.id === EnumLocalAtendimento.Barbearia) || !dadosEndereco.value?.cep || dadosEndereco.value?.cep.length < 8) {
      cepValido.value = false
   }
})
defineExpose({ enviaDados })

</script>