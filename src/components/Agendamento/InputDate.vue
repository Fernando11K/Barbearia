<template>
  <q-input dense id="data agendamento" label="Selecione a data e hora:" rounded outlined :modelValue="modelValue"
    @update:modelValue="atualiza" :rules="validaData" mask="##/##/#### ##:##">
    <template v-slot:prepend>
      <q-icon color="primary" name="event" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date today-btn :modelValue="modelValue" @update:modelValue="atualiza" mask="DD/MM/YYYY HH:mm"
            :options="opcoesData">
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Fechar" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>

    <template v-slot:append>
      <q-icon name="access_time" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-time id="horário agendamento" :modelValue="modelValue" @update:modelValue="atualiza" mask="DD/MM/YYYY HH:mm"
            format24h :hour-options="[9, 10, 11, 12, 13, 14, 15, 16, 17]" :minute-options="[0, 15, 30, 45]">
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Fechar" color="primary" flat />
            </div>
          </q-time>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>
  
<script lang="ts" setup>
import { QInput, date } from 'quasar';


const dataAtual = new Date();
const data6MesFuturos = date.addToDate(dataAtual, { months: 6 })
defineProps(['modelValue'])

const emits = defineEmits(['updateModelValue'])

const atualiza = (data: string) => { emits('updateModelValue', data); }

const regexData = new RegExp('^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[12][0-9]{3} ([01][0-9]|2[0-3]):[0-5][0-9]$')
const validaData = [(val: string) => regexData.test(val) || exibeMensagemValidacao()]
const exibeMensagemValidacao = () => {
  atualiza('')
  return 'Data em formato inválido!'
}
const opcoesData = (data: string) => {

  return date.isBetweenDates(new Date(data.split('/')?.toString()), dataAtual, data6MesFuturos, { onlyDate: true, inclusiveFrom: true, inclusiveTo: true });
}

</script>
  