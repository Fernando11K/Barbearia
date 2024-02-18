<template>
    <q-page class="background bg-grey-3 q-pa-md">
        <q-card class="bg-white q-pa-md">
            <CardTituloComponent :titulo="'Tabela de Preços'" />
            <ServicosTable />
        </q-card>
    </q-page>
</template>
<script setup>
import CardTituloComponent from 'src/components/common/CardTituloComponent.vue'
import ServicosTable from 'src/components/Gerenciamento/GerenciaServicos/ServicosTable.vue';

</script>