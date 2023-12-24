<template>
    <section class="q-pa-md">
        <q-table flat bordered virtual-scroll title="Gerencia Agendamentos" :rows="rows" :columns="columns" row-key="data"
            :selected-rows-label="getSelectedString" selection="multiple" v-model:selected="selected"
            table-header-class="text-bold" rowsPerPageLabel="Resultados por Pagina:" :loading="loading">

            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td>
                        <q-checkbox v-model="props.selected" />
                    </q-td>
                    <q-td key="acoes" :props="props">
                        <q-btn color="primary" icon="fa-solid fa-pen-to-square" flat round class="q-mr-md" />
                    </q-td>
                    <q-td key="data" :props="props">
                        <span class="q-mr-md">
                            {{ props.row.data }}
                        </span>
                    </q-td>
                    <q-td key="barbeiro" :props="props">
                        <q-badge color="green" class="q-mr-md">
                            {{ props.row.barbeiro }}
                        </q-badge>
                    </q-td>
                    <q-td key="cliente" :props="props">
                        <q-badge color="purple" class="q-mr-md">
                            {{ props.row.cliente }}
                        </q-badge>
                    </q-td>
                    <q-td key="servico" :props="props">
                        <q-badge color="orange">
                            {{ props.row.servico }}
                        </q-badge>
                    </q-td>
                </q-tr>
            </template>
        </q-table>
    </section>
</template>
  
<script setup>
import { onMounted, ref } from 'vue'

import { buscarAgendamentos } from 'src/service/AgendamentoService'
const rows = ref()
const loading = ref(true)
rows.value = buscarAgendamentos()
onMounted(() => {
    loading.value = false
})

const columns = [
    { name: 'acoes', align: 'center', label: 'EDITAR', field: 'calories', sortable: true },
    {
        name: 'data', align: 'center', required: true, label: 'DATA AGENDAMENTO', field: 'data', sortable: true
    },
    { name: 'barbeiro', align: 'center', label: 'BARBEIRO', field: 'barbeiro', sortable: true },
    { name: 'cliente', align: 'center', label: 'CLIENTE', field: 'cliente', sortable: true },
    { name: 'servico', align: 'center', label: 'SERVIÇO', field: 'servico' }

]




const selected = ref([])



const getSelectedString = () => {
    return selected.value.length === 0 ? '' : `${selected.value.length} record${selected.value.length > 1 ? 's' : ''} selected of ${rows.value.length}`
}


</script>

<style lang="scss" scoped>
/* Estilos para linhas ímpares e pares */
.q-table--flat tbody tr:nth-child(odd) {
    background-color: #ffffff;
    /* Cor para linhas ímpares */
}

.q-table--flat tbody tr:nth-child(even) {
    background-color: #EBFAFD;
    /* Cor para linhas pares */
}
</style>