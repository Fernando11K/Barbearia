<template>
    <section>
        <q-btn color="primary" icon="fa-solid fa-pen-to-square" flat round @click="() => statusModal = true" />
        <q-dialog v-model="statusModal" class="q-mt-xl" persistent transition-show="slide-up" transition-hide="rotate">
            <CardAgendamentoSlot label="Editar Agendamento">
                <q-form @submit.prevent="atualizarAgendamento">
                    <q-card-section>
                        <FormularioAgendamento ref="formularioAgendamentoRef" @preencheDados="preencheDados"
                            @dadosValidos="validaDados" :dados="dadosAgendamento" />
                    </q-card-section>
                    <q-separator />
                    <q-card-actions align="right" class="text-primary col-12 row justify-around">
                        <q-btn v-close-popup rounded icon="fa-solid fa-xmark" color="negative" label="Fechar"
                            class="col-5" />
                        <q-btn type="submit" rounded icon="fa-regular fa-calendar-check fa-bounce" color="positive"
                            label="Editar" :disable="desabilitaBotao" class="col-5" :loading="loading" />
                    </q-card-actions>
                </q-form>
            </CardAgendamentoSlot>
        </q-dialog>
    </section>
</template>

<script setup lang="ts">

import CardAgendamentoSlot from 'src/components/Agendamento/CardAgendamentoSlot.vue';
import FormularioAgendamento from 'src/components/Agendamento/FormularioAgendamento.vue';
import { Agendamento } from 'src/model/Agendamento';
import { atualizarAgendamento as atualizaAgendamento, loading } from 'src/service/AgendamentoService';
import { ref } from 'vue';

const props = defineProps(['dadosAgendamento'])
const statusModal = ref(false)
const desabilitaBotao = ref(true)
const formularioAgendamentoRef = ref<typeof FormularioAgendamento | null>(null);
const validaDados = (validadeDosDados: boolean) => desabilitaBotao.value = validadeDosDados;

const agendamento = ref<Agendamento | null>(null)

const atualizarAgendamento = () => {
    desabilitaBotao.value = false;
    formularioAgendamentoRef.value?.enviaDados();
    agendamento.value?.setId(props.dadosAgendamento.id)
    const dados = agendamento.value?.getAgendamento();

    if (dados) {
        atualizaAgendamento(dados)
            .then(() => {
                statusModal.value = false
            })

    }
}

const preencheDados = (dados: Agendamento) => agendamento.value = dados;

</script>