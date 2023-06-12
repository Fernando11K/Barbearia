<template >
   <section class="row col-12 ">
      <InputDate autofocus class="col-12 q-pb-sm " />

      <q-select dense rounded outlined v-model="modelLocalAtendimento" :options="localAtendimento"
         label="Selecione o local de atendimento:" behavior="menu" class="col-12 q-pr-xs q-pb-sm"
         :class="{ 'col-6': modelLocalAtendimento.id === 1 }"   >
         <template v-slot:prepend>
          <q-icon name="fa-solid fa-location-dot" color="primary" />
        </template>
      
      </q-select>

      <q-input dense unmasked-value @blur="requisitaDadosViaCep" rounded outlined v-model.trim="dadosEndereco.cep"
         label="Digite o CEP do outro local:" mask="#####-###" fill-mask clearable class="q-pr-xs q-pb-sm"
         :class="{ 'col-6': cepValido, 'col-12': !cepValido }" v-if="modelLocalAtendimento.id === 1" :color="alterarCorInputCEP" :loading="loading"
          />

      <q-select @blur="emiteValidacaoDados()" dense type="text" rounded outlined v-model="modelTipoResidencia" :options="tipoResidencia"
         label="Selecione o tipo de residência" class="col-6 q-pb-sm" v-if="cepValido"  >
      
         <template v-slot:prepend>
          <q-icon :name="iconeReativoTipoResidencia" color="primary" />
        </template>
      </q-select>
   </section>

   <section v-if="cepValido" class="q-gutter-y-sm row">
      <q-input dense type="text" rounded outlined v-model="dadosEndereco.uf" label="UF" disable class="col-6 q-pr-xs"
         bg-color="grey-2"
          />

      <q-input dense type="text" rounded outlined v-model="dadosEndereco.cidade" label="Cidade" disable class="col-6 q-pr-xs"
         bg-color="grey-2" >
       
         <template v-slot:prepend>
          <q-icon name="fa-solid fa-city" color="primary" />
        </template>
      </q-input>

      <q-input dense type="text" rounded outlined v-model="dadosEndereco.bairro" label="Bairro" disable bg-color="grey-2"
         class="col-12 q-pr-xs" :class="{ 'col-6': modelTipoResidencia.id === 1 }" />

      <q-input @blur="emiteValidacaoDados()" dense type="text" rounded outlined v-model="dadosEndereco.numeroApartamento" label="Número do Apartamento"
         class="col-12 q-pr-xs" v-if="modelTipoResidencia.id === 1" />

      <q-input dense type="text" rounded outlined v-model="dadosEndereco.logradouro" disable label="Rua/Avenida" class="col-12"
         bg-color="grey-2" />

      <q-input @blur="emiteValidacaoDados()" dense type="text" rounded outlined v-model="dadosEndereco.numeroResidencia" label="Número da Residência" class="col-6 q-pr-xs" />

      <q-input dense type="text" rounded outlined v-model="dadosEndereco.complemento" label="Complemento" class="col-6" />
   </section>
</template>

<script lang="ts" setup>

import { AxiosResponse } from 'axios';
import { apiViaCep } from 'src/boot/axios';
import { computed, onMounted, ref } from 'vue';
import InputDate from './InputDate.vue';

const emits = defineEmits(['dadosValidos']);
import alert from '../../hooks/alert'
const alerta = alert()

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
const modelLocalAtendimento = ref(localAtendimento[0])
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


const dadosEndereco = ref({
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
const cepValido = ref(false)
const requisitaDadosViaCep = () => {
   cepValido.value = false
   loading.value = false 
   if (dadosEndereco.value.cep.length === 8) {
      loading.value = true 
      
      apiViaCep.get(`viacep.com.br/ws/${dadosEndereco.value.cep}/json/`)
      .then((response: AxiosResponse) => {
         console.log(response)
         dadosEndereco.value = {
            cep: response.data.cep,
            uf: response.data.uf,
            cidade: response.data.localidade,
            bairro: response.data.bairro,
            logradouro: response.data.logradouro,
         }
         loading.value = false
         cepValido.value = true
         alerta.info('Após terminar de preencher um campo, clique fora dele para validar!')
      })
      .catch((erro: XMLHttpRequest) => {
         console.error(erro);
         loading.value = false
         
      })
   }

}
const validaDados = () => {
   if (modelTipoResidencia.value.id === 0 ) {
      return !dadosEndereco.value.numeroResidencia
   }
   if (modelTipoResidencia.value.id === 1 ) {
      return !(dadosEndereco.value.numeroResidencia && dadosEndereco.value.numeroApartamento)
   }
   
   
}
const emiteValidacaoDados = () => emits('dadosValidos', validaDados() ) 

const iconeReativoTipoResidencia = computed(() =>  (modelTipoResidencia.value.id === 0) ?  'fa-solid fa-house' : 'fa-solid fa-building')
const alterarCorInputCEP = computed(() =>  (cepValido.value) ?  'light-green-14' : 'red-13')

onMounted(() =>  emiteValidacaoDados(true));

</script>