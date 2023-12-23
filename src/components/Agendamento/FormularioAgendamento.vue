<template >
   <section class="row col-12 ">
      <InputDate v-model="dataAtual" autofocus class="col-12 q-pb-sm " @updateModelValue="atualiza" />

      <q-select @blur="emiteValidacaoDados()" dense rounded outlined v-model="local" :options="localAtendimento"
         label="Selecione o local de atendimento:" behavior="menu" class="col-12 q-pr-xs q-pb-sm"
         :class="{ 'col-6': local.id === 1 }">
         <template v-slot:prepend>
            <q-icon name="fa-solid fa-location-dot" color="primary" />
         </template>

      </q-select>

      <q-input dense unmasked-value @blur="requisitaDadosViaCep" rounded outlined v-model.trim="dadosEndereco.cep"
         label="Digite o CEP do outro local:" mask="#####-###" fill-mask clearable class="q-pr-xs q-pb-sm"
         :class="{ 'col-6': cepValido, 'col-12': !cepValido }" v-if="local.id === 1" :color="alterarCorInputCEP"
         :loading="loading" />

      <q-select @blur="emiteValidacaoDados()" dense type="text" rounded outlined v-model="modelTipoResidencia"
         :options="tipoResidencia" label="Selecione o tipo de residência" class="col-6 q-pb-sm" v-if="cepValido">

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

      <q-input @blur="emiteValidacaoDados()" dense type="text" rounded outlined v-model="dadosEndereco.numeroApartamento"
         label="Número do Apartamento" class="col-12 q-pr-xs" v-if="modelTipoResidencia.id === 1" />

      <q-input dense type="text" rounded outlined v-model="dadosEndereco.logradouro" disable label="Rua/Avenida"
         class="col-12" bg-color="grey-2" />

      <q-input @blur="emiteValidacaoDados()" dense type="text" rounded outlined v-model="dadosEndereco.numeroResidencia"
         label="Número da Residência" class="col-6 q-pr-xs" />

      <q-input dense type="text" rounded outlined v-model="dadosEndereco.complemento" label="Complemento" class="col-6" />
   </section>
</template>

<script lang="ts" setup>
import { IEndereco } from '../../interfaces/IEndereco'
import { computed, onMounted, ref, defineExpose } from 'vue';
import InputDate from './InputDate.vue';
import { info, danger } from '../../hooks/alerta'
import { getDadosViaCep } from 'src/service/EnderecoService'
import { date } from 'quasar'
const timeStamp = Date.now()
const dataAtual = date.formatDate(timeStamp, 'DD/MM/YYYY HH:mm')


onMounted(() => emiteValidacaoDados());
const emits = defineEmits(['dadosValidos', 'preencheDados']);



const dadosEndereco = ref(<IEndereco>{})
const loading = ref(false)



const localAtendimento = [
   {
      id: 0,
      label: 'Barbearia'
   },
   {
      id: 1,
      label: 'Outro local'
   }
];

const local = ref(localAtendimento[0])
const listaDeBarbeiros = [
   'João Silva',
   'Maria Oliveira',
   'Antônio Santos',
   'Isabel Pereira',
   'Ricardo Mendes',
   'Laura Costa',
   'Pedro Almeida',
   'Carla Rocha',
   'Fernando Carvalho',
   'Amanda Souza'
];


const dadosAgendamento = ref<any>({})

const enviaDados = () => {

   dadosAgendamento.value = {
      local: local.value,
      data: data.value,
      barbeiro: listaDeBarbeiros[Math.floor(Math.random() * listaDeBarbeiros.length)],
      servico: 'Corte'
   }

   preencheDados()
}
const preencheDados = () => {
   emits('preencheDados', dadosAgendamento.value)
}

const atualiza = (dados: any) => data.value = dados



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
   if (local.value.id === 0) return false;

   if (modelTipoResidencia.value.id === 0) return !dadosEndereco.value.numeroResidencia;

   if (modelTipoResidencia.value.id === 1) return !(dadosEndereco.value.numeroResidencia && dadosEndereco.value.numeroApartamento);

}
const emiteValidacaoDados = () => emits('dadosValidos', validaDados())

const iconeReativoTipoResidencia = computed(() => (modelTipoResidencia.value.id === 0) ? 'fa-solid fa-house' : 'fa-solid fa-building')
const alterarCorInputCEP = computed(() => (cepValido.value) ? 'light-green-14' : 'red-13')

defineExpose({

   enviaDados
}
)
</script>