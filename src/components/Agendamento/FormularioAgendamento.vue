<template >
   <section class="row col-12 ">

      <InputDate v-model="data" autofocus class="col-12" @updateModelValue="atualiza" />
      <q-select v-model.trim="barbeiro" :options="opcoesBarbeiros" use-input @filter="filtro" transition-show="scale"
         transition-hide="scale" options-cover clearable label="Selecione o profissional:" dense rounded outlined
         class="col-12 q-pr-xs"
         :rules="[val => val && val?.label.length > 0 || 'Favor selecionar um profissional para o atendimento']">
         <template v-slot:prepend>
            <q-icon name="fa-solid fa-user-tie" color="primary" />
         </template>
      </q-select>

      <q-select v-model="local" dense rounded outlined :options="localAtendimento"
         label="Selecione o local de atendimento:" behavior="menu" class="col-12 q-pr-xs q-pb-sm"
         :class="{ 'col-6': local.id === 1 }">
         <template v-slot:prepend>
            <q-icon name="fa-solid fa-location-dot" color="primary" />
         </template>

      </q-select>

      <q-input v-model.trim="dadosEndereco.cep" dense unmasked-value @blur="requisitaDadosViaCep" rounded outlined
         label="Digite o CEP do outro local:" mask="#####-###" fill-mask clearable class="q-pr-xs q-pb-sm"
         :class="{ 'col-6': cepValido, 'col-12': !cepValido }" v-if="local.id === 1" :color="alterarCorInputCEP"
         :loading="loading" />

      <q-select dense type="text" rounded outlined v-model="modelTipoResidencia" :options="tipoResidencia"
         label="Selecione o tipo de residência" class="col-6 q-pb-sm" v-if="cepValido">

         <template v-slot:prepend>
            <q-icon :name="iconeReativoTipoResidencia" color="primary" />
         </template>
      </q-select>
   </section>

   <section v-if="cepValido" class="q-gutter-y-sm row">
      <q-input dense type="text" rounded outlined v-model="dadosEndereco.uf" label="UF" disable class="col-6 q-pr-xs"
         bg-color="grey-2" />

      <q-input dense type="text" rounded outlined v-model="dadosEndereco.cidade" label="Cidade" disable
         class="col-6 q-pr-xs" bg-color="grey-2">

         <template v-slot:prepend>
            <q-icon name="fa-solid fa-city" color="primary" />
         </template>
      </q-input>

      <q-input dense type="text" rounded outlined v-model="dadosEndereco.bairro" label="Bairro" disable bg-color="grey-2"
         class="col-12 q-pr-xs" :class="{ 'col-6': modelTipoResidencia.id === 1 }" />
      <q-input dense type="text" rounded outlined v-model="dadosEndereco.numeroApartamento" label="Número do Apartamento"
         class="col-12 q-pr-xs" v-if="modelTipoResidencia.id === 1" />

      <q-input dense type="text" rounded outlined v-model="dadosEndereco.logradouro" disable label="Rua/Avenida"
         class="col-12" bg-color="grey-2" />

      <q-input dense type="text" rounded outlined v-model="dadosEndereco.numeroResidencia" label="Número da Residência"
         class="col-6 q-pr-xs" />

      <q-input dense type="text" rounded outlined v-model="dadosEndereco.complemento" label="Complemento" class="col-6" />
   </section>
</template>

<script lang="ts" setup>
import { IEndereco } from '../../interfaces/IEndereco'
import { computed, onMounted, ref, watch } from 'vue';
import InputDate from './InputDate.vue';
import { info, danger } from '../../hooks/alerta'
import { getDadosViaCep } from 'src/service/EnderecoService'
import { QSelectOption, date } from 'quasar'
import { buscarBarbeiros } from 'src/service/BabeiroService'
import { EnumLocalAtendimento } from 'src/model/enum/EnumLocalAtendimento'
import { EnumTipoResidencia } from 'src/model/enum/EnumTipoResidencia'

const emits = defineEmits(['dadosValidos', 'preencheDados']);
const timeStamp = Date.now()
const dataAtual = date.formatDate(timeStamp, 'DD/MM/YYYY HH:mm')
const data = ref(dataAtual)
const barbeiro = ref<QSelectOption<number | null>>({ value: null, label: '' })
const listaBarbeiros = buscarBarbeiros()
const opcoesBarbeiros = ref(listaBarbeiros)

const filtro = (valor: string, update: any) => {
   console.log(valor)
   if (valor === '') {
      update(() => {
         opcoesBarbeiros.value = listaBarbeiros
      })
      return;
   }
   update(() => {
      const needle = valor.toLowerCase();
      opcoesBarbeiros.value = listaBarbeiros.filter(v => v.label.toLowerCase().indexOf(needle) > -1);
   });
}

onMounted(() => { emiteValidacaoDados() });

const dadosEndereco = ref(<IEndereco>{})
const loading = ref(false)


const localAtendimento = [
   { id: 0, label: 'Barbearia' },
   { id: 1, label: 'Outro local' }
];

const local = ref(localAtendimento[0])


const dadosAgendamento = ref<any>({})

const enviaDados = () => {

   dadosAgendamento.value = {
      local: local.value,
      data: data.value,
      barbeiro: barbeiro.value.label,
      servico: 'Corte'
   }

   preencheDados()
}
const preencheDados = () => { emits('preencheDados', dadosAgendamento.value) }

const atualiza = (dados: string) => data.value = dados

const tipoResidencia = [
   {
      id: 0,
      label: 'Casa'
   },
   {
      id: 1,
      label: 'Apartamento'
   }
]
const modelTipoResidencia = ref(tipoResidencia[0])

const cepValido = ref(false)

const requisitaDadosViaCep = () => {
   cepValido.value = false
   loading.value = false
   if (dadosEndereco.value.cep.length === 8) {
      getDadosViaCep(dadosEndereco.value.cep)
         .then(response => {
            dadosEndereco.value = response
            loading.value = false
            cepValido.value = true
            info('Após terminar de preencher um campo, clique fora dele para validar!')

         }).catch(() => {
            danger('CEP inválido ou não localizado, por favor verifique e tente novamente. ')
            loading.value = false

         })
   }
}

const validaDados = () => {
   return !barbeiro.value?.label || (local.value.id === EnumLocalAtendimento.Outro_Local && (regrasValidacaoOutroLocal.value))
}
const regrasValidacaoOutroLocal = computed(() => (modelTipoResidencia.value.id === EnumTipoResidencia.Casa && !dadosEndereco.value.numeroResidencia) || (modelTipoResidencia.value.id === EnumTipoResidencia.Apartamento && (!dadosEndereco.value.numeroApartamento || !dadosEndereco.value.numeroResidencia)))
const emiteValidacaoDados = () => emits('dadosValidos', validaDados())

const iconeReativoTipoResidencia = computed(() => (modelTipoResidencia.value.id === 0) ? 'fa-solid fa-house' : 'fa-solid fa-building')
const alterarCorInputCEP = computed(() => (cepValido.value) ? 'light-green-14' : 'red-13')

defineExpose({ enviaDados })

watch([data, barbeiro, local, modelTipoResidencia, () => dadosEndereco.value.numeroResidencia, () => dadosEndereco.value.numeroApartamento], () => {
   emiteValidacaoDados()
})
</script>