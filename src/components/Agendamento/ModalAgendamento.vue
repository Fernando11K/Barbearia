<template>
    <div class="q-pa-md">

        <q-btn label="Agendamento" color="primary" @click="confirm = true" />
        <q-dialog v-model="confirm" persistent>
            <q-card class="my-card" style="min-width: 90vw; max-width: 95%;">
                <q-card-section class="bg-primary  text-white ">
                    <div class="text-h6 row justify-between">
                        <q-icon class="q-mr-md q-pt-xs" size="sm" name="fa-regular fa-calendar-days" />Agendamento
                        <q-btn icon="close" flat round dense v-close-popup class="" />
                    </div>
                </q-card-section>

                <q-card-section>

                    <FormularioAgendamento @dadosValidos="validaDados" />
                </q-card-section>

                <q-separator />

                <q-card-actions align="right" class="text-primary col-12 row justify-around">
                    <q-btn v-close-popup rounded icon="fa-solid fa-xmark" color="negative" label="Sair" class="col-5" />
                    <q-btn @click="realizaAgendamento" rounded icon="fa-regular fa-calendar-check fa-bounce"
                        color="positive" label="Agendar" :disable="desabilitaBotao" class="col-5" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>
  
<script lang="ts" setup>

import alert from 'src/hooks/alert';
import FormularioAgendamento from './FormularioAgendamento.vue';
import { ref } from 'vue'
const alerta = alert()
const desabilitaBotao = ref(true)
const confirm = ref(false)
const validaDados = (validadeDosDados: boolean) => desabilitaBotao.value = validadeDosDados
const realizaAgendamento = () => {
    alerta.positive('Agendamento realizado com sucesso')
    confirm.value = false
}

</script>
  