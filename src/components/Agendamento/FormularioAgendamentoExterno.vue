<template>
    <InputCep v-model="dadosEndereco.cep" :cepValido="cepValido" :loading="loading"
        @requisitaEndereco="requisitarDadosViaCep(dadosEndereco.cep)"
        v-if="local.id === EnumLocalAtendimento.Outro_Local" />
    <SelectTipoResidencia v-model="tipoResidencia" :cepValido="cepValido" :loading="loading" />
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
            labecepValidol="Número do Apartamento" class="coldadosEndereco.-12 q-pr-xs"
            v-if="tipoResidencia.id === EnumTipoResidencia.Apartamento" />

        <q-input dense type="text" rounded outlined v-model="dadosEndereco.logradouro" disable label="Rua/Avenida"
            class="col-12" bg-color="grey-2" />

        <q-input dense type="text" rounded outlined v-model="dadosEndereco.numeroResidencia"
            label="Número da Residência" class="col-6 q-pr-xs" />

        <q-input dense type="text" rounded outlined v-model="dadosEndereco.complemento" label="Complemento"
            class="col-6" />
    </section>

</template>

<script setup lang="ts">
import { EnumTipoResidencia } from 'src/model/enum/EnumTipoResidencia'
import { ref } from 'vue'
const dadosEndereco = ref<IEndereco>({
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

</script>