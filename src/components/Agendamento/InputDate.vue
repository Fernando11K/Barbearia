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
      <q-icon name="access_time" class="cursor-pointer" color="primary">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-time id="horário agendamento" :modelValue="modelValue" @update:modelValue="atualiza"
            mask="DD/MM/YYYY HH:mm" format24h :options="opcoesHorario">
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
import { formataDDMMYYYYHHmmParaDate as formataData } from 'src/utils/dateUtils'

const props = defineProps(['modelValue'])

const emits = defineEmits(['update:modelValue'])
const atualiza: (data: string | number | null) => void = (data): void => {
  emits('update:modelValue', data);
}

const regexData = new RegExp('^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[12][0-9]{3} ([01][0-9]|2[0-3]):[0-5][0-9]$')
const validaData = [(val: string) => regexData.test(val) || exibeMensagemValidacao()]

const exibeMensagemValidacao = () => {
  atualiza('')
  return 'Data em formato inválido!'
}

const retornaDataHorarioAtual = () => new Date()
const data6MesFuturos = date.addToDate(retornaDataHorarioAtual(), { months: 6, hours: 23, minutes: 59 })
const opcoesData = (data: string) => {
  const dataAtual = retornaDataHorarioAtual();
  return date.isBetweenDates(new Date(data.split('/')?.toString()), dataAtual, data6MesFuturos, { onlyDate: true, inclusiveFrom: true, inclusiveTo: true });

}
const opcoesHorario: (hr: number, min: number | null, sec: number | null) => boolean | null | undefined = (hora, minutos: number | null) => {
  if (hora && !minutos && !dataSelecionadaEhHoje()) {
    return !horaEhInvalida(hora)
  }
  if (hora && minutos) {
    return validacoesHorarioAgendamento(hora, minutos)
  }

}

const validacoesHorarioAgendamento = (hora: number, minutos: number) => {

  const dataHorarioAtual = retornaDataHorarioAtual();
  const dataAtualComHorarioRecebido = date.adjustDate(dataHorarioAtual, { hours: hora, minutes: minutos })
  const dataSelecionada = formataData(props.modelValue) as Date
  const periodoInvalido = horaEhInvalida(hora)
  if (minutos % 15 != 0) {
    return false
  }
  if (!dataSelecionada || periodoInvalido) {
    return false;
  }
  if (dataSelecionada > dataAtualComHorarioRecebido) {

    return true
  }
  return date.isBetweenDates(dataAtualComHorarioRecebido, dataHorarioAtual, data6MesFuturos, { onlyDate: false, inclusiveFrom: true, inclusiveTo: true });

}
const horaEhInvalida = (hora: number) => (hora < 9 || hora > 17)
const dataSelecionadaEhHoje = () => retornaDataHorarioAtual().toLocaleDateString('pt-br') === props.modelValue.slice(0, 10)
</script>