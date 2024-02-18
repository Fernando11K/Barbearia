<template>
    <q-page class="bg-grey-3  q-pa-md">
        <q-card class="bg-white q-pa-md">
            <CardTituloComponent :titulo="'Gerencia Agendamentos'" />
            <AgendamentosTable />
        </q-card>
    </q-page>
</template>
<script lang="ts" setup>
import AgendamentosTable from 'src/components/Gerenciamento/GerenciaAgendamentos/AgendamentosTable.vue'
import CardTituloComponent from 'src/components/common/CardTituloComponent.vue'

</script>
