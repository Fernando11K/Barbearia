<template>
  <div>
    <q-input dense id="data agendamento" label="Selecione a data e hora:" rounded outlined :modelValue="modelValue"
      @update:modelValue="atualiza">
      <template v-slot:prepend>
        <q-icon color="primary" name="event" class="cursor-pointer">
          <q-popup-proxy cover transition-show="scale" transition-hide="scale">
            <q-date today-btn :modelValue="modelValue" @update:modelValue="atualiza" mask="DD/MM/YYYY HH:mm">
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
            <q-time id="horário agendamento" :modelValue="modelValue" @update:modelValue="atualiza"
              mask="DD/MM/YYYY HH:mm" format24h>
              <div class="row items-center justify-end">
                <q-btn v-close-popup label="Fechar" color="primary" flat />
              </div>
            </q-time>
          </q-popup-proxy>
        </q-icon>
      </template>
    </q-input>
  </div>
</template>
  
<script lang="ts" setup>
//import { ref } from 'vue'
const emits = defineEmits(['updateModelValue'])
defineProps(['modelValue'])
const atualiza = (data: string | number | null) => emits('updateModelValue', data)

//const dataAtualEHoraAtual = `${new Intl.DateTimeFormat().format(new Date())}${' '}${new Date().getHours()}${':'}${new Date().getMinutes()}`



</script>
  