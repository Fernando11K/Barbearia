<template>
    <section class="row">
        <InputCep v-model="dadosEndereco.cep" :cepValido="cepValido" :loading="loading"
            @requisitaEndereco="requisitarDadosViaCep(dadosEndereco.cep)"
            v-if="local.id === EnumLocalAtendimento.Outro_Local" />
        <SelectTipoResidencia v-model="tipoResidencia" :cepValido="cepValido" :loading="loading" />
    </section>

    <section v-if="cepValido" class="q-gutter-y-md row">
        <q-input dense type="text" rounded outlined v-model="dadosEndereco.uf" label="UF" disable class="col-6 q-pr-xs"
            bg-color="grey-2" />

        <q-input dense type="text" rounded outlined v-model="dadosEndereco.cidade" label="Cidade" disable
            class="col-6 q-pr-xs" bg-color="grey-2">

            <template v-slot:prepend>
                <q-icon name="fa-solid fa-city" color="primary" />
            </template>
        </q-input>

        <q-input dense type="text" rounded outlined v-model="dadosEndereco.bairro" label="Bairro" disable
            bg-color="grey-2" class="col-12 q-pr-xs"
            :class="{ 'col-6': tipoResidencia.id === EnumTipoResidencia.Apartamento }" />

        <q-input dense type="text" rounded outlined v-model="dadosEndereco.numeroApartamento"
            label="Número do Apartamento" class="col-12 q-pr-xs"
            v-if="tipoResidencia.id === EnumTipoResidencia.Apartamento" />

        <q-input dense type="text" rounded outlined v-model="dadosEndereco.logradouro" disable label="Rua/Avenida"
            class="col-12" bg-color="grey-2" />

        <q-input dense type="text" rounded outlined v-model="dadosEndereco.numeroResidencia"
            label="Número da Residência" class="col-6 q-pr-xs" />


        <q-input dense type="text" rounded outlined v-model="dadosEndereco.complemento" label="Complemento"
            class="col-6" />
    </section>
</template>

<script lang="ts" setup>
import InputCep from 'src/components/Agendamento/InputCep.vue';
import SelectTipoResidencia from 'src/components/Agendamento/SelectTipoResidencia.vue';
import { IEndereco } from 'src/model/interfaces/IEndereco'
import { EnumLocalAtendimento } from 'src/model/enum/EnumLocalAtendimento'
import { EnumTipoResidencia } from 'src/model/enum/EnumTipoResidencia'
import { buscarDadosViaCep } from 'src/service/EnderecoService'
import { computed, ref, watch } from 'vue';

const props = defineProps(['local'])
const emits = defineEmits(['statusOutroLocal'])
const cepValido = ref(false)
const loading = ref(false)
const tipoResidencia = ref({ id: EnumTipoResidencia.Casa, label: 'Casa' })
const dadosEndereco = ref<IEndereco>({
    cep: '',
    uf: '',
    cidade: '',
    bairro: '',
    logradouro: '',
    numeroResidencia: '',
    complemento: '',
    tipoResidencia: tipoResidencia.value.label,
    numeroApartamento: ''
})

const requisitarDadosViaCep = async (cep: string) => {
    cepValido.value = false
    loading.value = true
    buscarDadosViaCep(cep)
        .then(response => {
            dadosEndereco.value = response
            cepValido.value = true
        })
        .finally(() => {
            loading.value = false
        })
}
const regrasValidacaoOutroLocal = computed(() => (tipoResidencia.value.id === EnumTipoResidencia.Casa && !dadosEndereco.value.numeroResidencia) || (tipoResidencia.value.id === EnumTipoResidencia.Apartamento && (!dadosEndereco.value.numeroApartamento || !dadosEndereco.value.numeroResidencia)))

watch([() => props.local, tipoResidencia, () => dadosEndereco.value?.numeroResidencia, () => dadosEndereco.value?.numeroApartamento, () => dadosEndereco.value?.cep], () => {
    emits('statusOutroLocal', regrasValidacaoOutroLocal)
    if ((props.local.id === EnumLocalAtendimento.Barbearia) || !dadosEndereco.value?.cep || dadosEndereco.value?.cep.length < 8) {
        cepValido.value = false

    }
})

</script>