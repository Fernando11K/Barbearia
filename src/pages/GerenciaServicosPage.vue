<template>
    <q-page class="background bg-grey-3 q-pa-md">
        <q-card class="bg-white q-pa-md">
            <CardTituloComponent v-if="q.platform.is.desktop" :titulo="'Tabela de Preços'" />
            <ServicosTable />
        </q-card>
    </q-page>
</template>
<script setup>
import { useQuasar } from 'quasar';
import CardTituloComponent from 'src/components/common/CardTituloComponent.vue'
import ServicosTable from 'src/components/Gerenciamento/GerenciaServicos/ServicosTable.vue';
const q = useQuasar()

</script>