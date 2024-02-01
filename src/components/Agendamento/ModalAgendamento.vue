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
import { QSpinnerFacebook, useQuasar } from 'quasar';
import { danger, positive } from 'src/utils/alerta';

const agendamento = ref<Agendamento | null>(null)
const q = useQuasar()

const props = defineProps({ statusProp: { type: Boolean } });
const emits = defineEmits(['atualizaStatusModal']);
const desabilitaBotao = ref(true)
const statusModal = ref(false)
watchEffect(() => statusModal.value = props.statusProp);

const formularioAgendamentoRef = ref<typeof FormularioAgendamento | null>(null);
const card = ref(null)

const preencheDados = (dados: Agendamento) => agendamento.value = dados
const validaDados = (validadeDosDados: boolean) => desabilitaBotao.value = validadeDosDados;

const realizaAgendamento = () => {

    desabilitaBotao.value = false
    formularioAgendamentoRef.value?.enviaDados()
    agendar()


}
const agendar = () => {
    if (agendamento.value) {
        Spinner.mostrar();
        criarAgendamento(agendamento.value.getAgendamento())
            .then(response => {
                console.log(`ID_AGENDAMENTO: ${response.key}`)
                positive('Agendamento realizado com sucesso')
                atualizaStatusModalExternamente()

            })
            .catch((erro) => {
                console.log(erro)
                danger('Ocorreu um erro ao reallizar o agendamento')

            })
            .finally(() => {

                Spinner.ocultar()
            })
    }
}
const atualizaStatusModalExternamente = () => { emits('atualizaStatusModal', false); }

const Spinner = {
    mostrar() {
        q.loading.show({
            spinner: QSpinnerFacebook,
            spinnerColor: 'primary',
            spinnerSize: 140,
            backgroundColor: 'blue-11',
            messageColor: 'grey-8',
            message: '<p class="text-h6">Realizando agendamento. Aguarde...</p>',
            html: true,
        })
    },
    ocultar() {
        q.loading.hide()
    }
}

</script>
  