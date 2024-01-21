<template>
    <div>
        <q-btn v-if="false" label="Agendamento" color="primary" />
        <q-dialog v-model="statusModal" class="q-mt-xl" persistent transition-show="slide-up" transition-hide="rotate">
            <q-card ref="card">
                <q-card-section class="bg-primary text-white ">
                    <div class="text-h6 row justify-between">
                        <q-icon class="q-mr-md q-pt-xs" size="sm" name="fa-regular fa-calendar-days" />Agendamento
                        <q-btn icon="close" flat round dense v-close-popup @click="atualizaStatusModalExternamente()" />
                    </div>
                </q-card-section>

                <q-card-section>
                    <FormularioAgendamento ref="formularioAgendamentoRef" @preencheDados="preencheDados"
                        @dadosValidos="validaDados" />
                </q-card-section>

                <q-separator />

                <q-card-actions align="right" class="text-primary col-12 row justify-around">
                    <q-btn v-close-popup @click="atualizaStatusModalExternamente()" rounded icon="fa-solid fa-xmark"
                        color="negative" label="Fechar" class="col-5" />
                    <q-btn @click="realizaAgendamento" rounded icon="fa-regular fa-calendar-check fa-bounce"
                        color="positive" label="Agendar" :disable="desabilitaBotao" class="col-5" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>
  
<script lang="ts" setup>
import FormularioAgendamento from './FormularioAgendamento.vue';
import { ref, watchEffect } from 'vue';
import { criarAgendamento } from 'src/service/AgendamentoService'
import { Agendamento } from 'src/model/Agendamento';

const agendamento = ref<Agendamento | null>(null)

const props = defineProps({ statusProp: { type: Boolean } });
const emits = defineEmits(['atualizaStatusModal']);
const desabilitaBotao = ref(true)
const statusModal = ref(false)
watchEffect(() => statusModal.value = props.statusProp);

const formularioAgendamentoRef = ref<typeof FormularioAgendamento | null>(null);

const preencheDados = (dados: Agendamento) => agendamento.value = dados


const validaDados = (validadeDosDados: boolean) => desabilitaBotao.value = validadeDosDados;

const realizaAgendamento = () => {

    atualizaStatusModalExternamente()
    desabilitaBotao.value = false
    formularioAgendamentoRef.value?.enviaDados()
    agendar()


}
const agendar = () => { if (agendamento.value) { criarAgendamento(agendamento.value.getAgendamento()) } }
const atualizaStatusModalExternamente = () => emits('atualizaStatusModal');
const card = ref(null)



</script>
  