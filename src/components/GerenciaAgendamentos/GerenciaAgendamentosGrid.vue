<template>
    <section class="q-pa-md">
        <q-table flat bordered virtual-scroll title="Gerencia Agendamentos" :rows="rows" :columns="columns" row-key="id"
            :selected-rows-label="getSelectedString" selection="single" v-model:selected="selected"
            table-header-class="text-bold" rowsPerPageLabel="Resultados por Pagina:" :loading="loading"
            :sort-method="ordenarLinhas">
            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td>
                        <q-checkbox v-model="props.selected" disable />
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
  
<script setup lang="ts">
import { ref, watch } from 'vue'
import { QTableProps } from 'quasar';
import { buscarAgendamentos } from 'src/service/AgendamentoService'
import { danger } from 'src/utils/alerta';
import agendamentoStore from 'src/stores/agendamento-store';
import { Agendamento } from 'src/model/Agendamento'
import { converteDataStringAgendamentoParaDate as parseDate } from 'src/utils/dateUtils'

const store = agendamentoStore()
const rows = ref<Array<QTableProps['rows']>>([])
const loading = ref(true)
const selected = ref([])

const columns: QTableProps['columns'] = [
    { name: 'acoes', align: 'center', label: 'EDITAR', field: 'calories', sortable: true },
    { name: 'data', align: 'center', required: true, label: 'DATA AGENDAMENTO', field: 'data', sortable: true },
    { name: 'barbeiro', align: 'center', label: 'BARBEIRO', field: 'barbeiro', sortable: true },
    { name: 'cliente', align: 'center', label: 'CLIENTE', field: 'cliente', sortable: true },
    { name: 'servico', align: 'center', label: 'SERVIÇO', field: 'servico', sortable: true }

]

const preencherTabela = () => {
    buscarAgendamentos()
        .then((response) => preencherLinhas(response as Agendamento[]))
        .catch((error) => {
            danger('Erro ao buscar agendamentos:', error);
        })
        .finally(() => {
            loading.value = false;
        })
}
const preencherLinhas = (linhas: Array<Agendamento>) => {
    if (linhas) {
        rows.value = linhas
        ordenarLinhas(rows.value, 'data', 'descending')
    }
}
preencherTabela()
const ordenarLinhas = (row: QTableProps['rows'], sortBy: string, descending: string) => {
    if (!rows.value) {
        return
    }
    return rows.value.sort((a, b) => {
        if (a && b) {
            const elementoA = a[sortBy]
            const elementoB = b[sortBy]
            if (sortBy === 'data') {
                const data1 = parseDate(elementoA) as Date;
                const data2 = parseDate(elementoB) as Date;

                return descending ? (data2.getTime() - data1.getTime()) : (data1.getTime() - data2.getTime())
            }
            return descending ? elementoB.localeCompare(elementoA) : elementoA.localeCompare(elementoB);
        }
    });

}

const getSelectedString = () => {
    return selected.value?.length === 0 ? '' : `${selected.value?.length} linha${selected.value?.length > 1 ? 's' : ''} selecionada de ${rows.value?.length} linhas`
}

watch(() => store.getAgendamentos, () => {
    preencherLinhas(store.getAgendamentos as Agendamento[])
})

</script>

<style lang="scss" scoped>
.q-table--flat tbody tr:nth-child(odd) {
    background-color: #ffffff;

}

.q-table--flat tbody tr:nth-child(even) {
    background-color: #EBFAFD;

}
</style>