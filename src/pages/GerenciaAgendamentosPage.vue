<template>
    <q-page class="bg-grey-3  q-pa-md">
        <q-card class="bg-white q-pa-md">
            <CardTituloComponent v-if="q.platform.is.desktop" :titulo="'Gerencia Agendamentos'" />
            <AgendamentosTable />
        </q-card>
    </q-page>
</template>
<script lang="ts" setup>
import { useQuasar } from 'quasar';
import AgendamentosTable from 'src/components/Gerenciamento/GerenciaAgendamentos/AgendamentosTable.vue'
import CardTituloComponent from 'src/components/common/CardTituloComponent.vue'
const q = useQuasar()

</script>
