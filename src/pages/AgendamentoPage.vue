<template>
    <q-page class="bg-grey-3  q-pa-md">
        <q-card class="bg-white">
            <CardTituloGerenciaAgendamentos />
            <GerenciaAgendamentosGrid />
        </q-card>
    </q-page>
</template>
<script lang="ts" setup>
import GerenciaAgendamentosGrid from 'src/components/GerenciaAgendamentos/GerenciaAgendamentosGrid.vue'
import CardTituloGerenciaAgendamentos from 'src/components/GerenciaAgendamentos/CardTituloGerenciaAgendamentos.vue'

</script>
