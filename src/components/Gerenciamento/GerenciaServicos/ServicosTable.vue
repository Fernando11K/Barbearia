<template>
    <section class="q-pa-md">
        <q-table flat bordered title="Tabela de Preços" :rows="rows" :columns="columns" color="primary" row-key="name"
            separator="cell" rowsPerPageLabel="Resultados por página:" :col-props="{ style: 'width: 50%' }">
            <template v-slot:top>
                <QAvatar />
                <div class="col-2 q-table__title q-pl-md">Tabela de Preços</div>
            </template>
            <template v-slot:header="props">
                <q-tr :props="props">
                    <q-th v-for="col in props.cols" :key="col.name" :props="props" class="">
                        <span style="font-size: 1rem;"> {{ col.label }}</span>
                    </q-th>
                </q-tr>
            </template>
            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td key="servico" :props="props" :style="{ width: columns[0].width }">
                        <span class="q-mr-md">
                            <q-badge color="blue" class="q-mr-md">
                                {{ props.row.servico }}
                            </q-badge>
                        </span>
                    </q-td>
                    <q-td key="preco" :props="props" :style="{ width: columns[0].width }">
                        <q-badge color="green" class="q-mr-md">
                            {{ converteParaBRL(props.row.preco) }}
                        </q-badge>
                    </q-td>

                </q-tr>
            </template>
            <template v-slot:top-right>
                <q-btn color="primary" icon-right="archive" label="Baixar Planilha" no-caps @click="exportTable" />
            </template>
        </q-table>
    </section>
</template>

<script setup>
import servicos from 'src/assets/servicos';
import { exportFile } from 'quasar'
import QAvatar from '../GerenciaAgendamentos/QAvatar.vue';

const converteParaBRL = (valor) => valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
})
const columns = [
    {
        name: 'servico',
        required: true,
        label: 'Serviço',
        align: 'center',
        field: row => row.servico,
        sortable: true,
        width: '40%'
    },
    {
        name: 'preco',
        align: 'center',
        label: 'Preço(R$)',
        field: row => row.preco,
        format: valor => converteParaBRL(valor),
        sortable: true,
        width: '60%'
    }

]

const rows = servicos
const wrapCsvValue = (val, formatFn, row) => {
    let formatted = formatFn !== void 0
        ? formatFn(val, row)
        : val

    formatted = formatted === void 0 || formatted === null
        ? ''
        : String(formatted)

    formatted = formatted.split('"').join('""')
    /**
     * Excel accepts \n and \r in strings, but some other CSV parsers do not
     * Uncomment the next two lines to escape new lines
     */
    // .split('\n').join('\\n')
    // .split('\r').join('\\r')

    return `"${formatted}"`
}







const exportTable = () => {
    // naive encoding to csv format
    const content = [columns.map(col => wrapCsvValue(col.label))].concat(
        rows.map(row => columns.map(col => wrapCsvValue(
            typeof col.field === 'function'
                ? col.field(row)
                : row[col.field === void 0 ? col.name : col.field],
            col.format,
            row
        )).join(','))
    ).join('\r\n')

    const status = exportFile(
        'tabela-precos.csv',
        content,
        'text/csv'
    )

    if (status !== true) {
        q.notify({
            message: 'Browser denied file download...',
            color: 'negative',
            icon: 'warning'
        })
    }
}



</script>


