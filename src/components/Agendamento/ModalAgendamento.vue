<template>
    <section>
        <q-btn v-if="false" label="Agendamento" color="primary" />
        <q-dialog v-model="statusModal" class="q-mt-xl" persistent transition-show="slide-up" transition-hide="rotate">
            <CardAgendamentoSlot label="Agendamento">
                <q-form @submit.prevent="realizaAgendamento">
                    <q-card-section>
                        <FormularioAgendamento ref="formularioAgendamentoRef" @preencheDados="preencheDados"
                            @dadosValidos="validaDados" />
                    </q-card-section>
                    <q-separator />
                    <q-card-actions align="right" class="text-primary col-12 row justify-around">
                        <q-btn v-close-popup rounded icon="fa-solid fa-xmark" color="negative" label="Fechar"
                            class="col-5" />
                        <q-btn type="submit" rounded icon="fa-regular fa-calendar-check fa-bounce" color="positive"
                            label="Agendar" :disable="desabilitaBotao" class="col-5" />
                    </q-card-actions>
                </q-form>
            </CardAgendamentoSlot>
        </q-dialog>
    </section>
</template>

<script lang="ts" setup>
import FormularioAgendamento from './FormularioAgendamento.vue';
import CardAgendamentoSlot from './CardAgendamentoSlot.vue';
import { ref } from 'vue';
import { criarAgendamento } from 'src/service/AgendamentoService'
import { Agendamento } from 'src/model/Agendamento';
import { danger, positive } from 'src/utils/alerta';
import { spinnerFacebook } from 'src/utils/spinner';

const formularioAgendamentoRef = ref<typeof FormularioAgendamento | null>(null);

const agendamento = ref<Agendamento | null>(null)
const statusModal = ref(false)
const desabilitaBotao = ref(true)


const preencheDados = (dados: Agendamento) => agendamento.value = dados
const validaDados = (validadeDosDados: boolean) => desabilitaBotao.value = validadeDosDados;

const realizaAgendamento = () => {

    desabilitaBotao.value = false
    formularioAgendamentoRef.value?.enviaDados()
    agendar()

}

const agendar = () => {
    if (agendamento.value) {
        spinnerFacebook.mostrar('<p class="text-h6">Realizando agendamento. Aguarde...</p>')
        criarAgendamento(agendamento.value.getAgendamento())
            .then(() => {
                atualiza(false)
                positive('Agendamento realizado com sucesso')

            })
            .catch(() => { danger('Ocorreu um erro ao reallizar o agendamento') })
            .finally(() => spinnerFacebook.ocultar())
    }
}

const atualiza = (status: boolean) => { statusModal.value = status }

defineExpose({ atualiza })
</script>