<template>
    <section class="q-pa-md">
        <q-table flat bordered virtual-scroll title="Gerencia Agendamentos" :rows="rows" :columns="columns" row-key="data"
            :selected-rows-label="getSelectedString" selection="multiple" v-model:selected="selected"
            table-header-class="text-bold">

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
import { ref } from 'vue'

const columns = [
    { name: 'acoes', align: 'center', label: 'EDITAR', field: 'calories', sortable: true },
    {
        name: 'data',
        align: 'center',
        required: true,
        label: 'DATA AGENDAMENTO',
        field: 'data',
        sortable: true
    },
    { name: 'barbeiro', align: 'center', label: 'BARBEIRO', field: 'barbeiro', sortable: true },
    { name: 'cliente', align: 'center', label: 'CLIENTE', field: 'cliente', sortable: true },
    { name: 'servico', align: 'center', label: 'SERVIÇO', field: 'servico' }

]

const rows = [
    {
        barbeiro: 'Carlos Silva',
        cliente: 'Ana Oliveira',
        data: '20/11/2023',
        servico: 'Corte'
    },
    {
        barbeiro: 'José Pereira',
        cliente: 'Pedro Santos',
        data: '21/11/2023',
        servico: 'Barba'
    },
    {
        barbeiro: 'Mariana Costa',
        cliente: 'Luísa Almeida',
        data: '22/11/2023',
        servico: 'Corte e Barba'
    },
    {
        barbeiro: 'Ricardo Oliveira',
        cliente: 'Fernando Silva',
        data: '23/11/2023',
        servico: 'Corte'
    },
    {
        barbeiro: 'Amanda Santos',
        cliente: 'Rafael Pereira',
        data: '24/11/2023',
        servico: 'Barba'
    },
    {
        barbeiro: 'Lucas Oliveira',
        cliente: 'Isabela Lima',
        data: '25/11/2023',
        servico: 'Corte e Barba'
    },
    {
        barbeiro: 'Juliana Costa',
        cliente: 'Miguel Alves',
        data: '26/11/2023',
        servico: 'Corte'
    },
    {
        barbeiro: 'Roberto Pereira',
        cliente: 'Carla Lima',
        data: '27/11/2023',
        servico: 'Barba'
    },
    {
        barbeiro: 'Patrícia Silva',
        cliente: 'Diego Santos',
        data: '28/11/2023',
        servico: 'Corte e Barba'
    },
    {
        barbeiro: 'Fernanda Oliveira',
        cliente: 'Gustavo Lima',
        data: '29/11/2023',
        servico: 'Corte'
    },
    {
        barbeiro: 'André Santos',
        cliente: 'Camila Pereira',
        data: '30/11/2023',
        servico: 'Barba'
    },
    {
        barbeiro: 'Beatriz Costa',
        cliente: 'Eduardo Almeida',
        data: '01/12/2023',
        servico: 'Corte e Barba'
    },
    {
        barbeiro: 'Gabriel Oliveira',
        cliente: 'Laura Lima',
        data: '02/12/2023',
        servico: 'Corte'
    },
    {
        barbeiro: 'Aline Santos',
        cliente: 'Vinícius Pereira',
        data: '03/12/2023',
        servico: 'Barba'
    },
    {
        barbeiro: 'Marcelo Costa',
        cliente: 'Mariana Alves',
        data: '04/12/2023',
        servico: 'Corte e Barba'
    },
    {
        barbeiro: 'Carolina Silva',
        cliente: 'Lucas Lima',
        data: '05/12/2023',
        servico: 'Corte'
    },
    {
        barbeiro: 'Paulo Pereira',
        cliente: 'Gabriela Santos',
        data: '06/12/2023',
        servico: 'Barba'
    },
    {
        barbeiro: 'Tatiane Oliveira',
        cliente: 'Rafaela Costa',
        data: '07/12/2023',
        servico: 'Corte e Barba'
    },
    {
        barbeiro: 'Rafael Santos',
        cliente: 'Renata Lima',
        data: '08/12/2023',
        servico: 'Corte'
    },
    {
        barbeiro: 'Isaac Almeida',
        cliente: 'Roberto Pereira',
        data: '09/12/2023',
        servico: 'Barba'
    },
    {
        barbeiro: 'Larissa Costa',
        cliente: 'Guilherme Oliveira',
        data: '10/12/2023',
        servico: 'Corte e Barba'
    },
    {
        barbeiro: 'Felipe Lima',
        cliente: 'Carolina Santos',
        data: '11/12/2023',
        servico: 'Corte'
    },
    {
        barbeiro: 'Vanessa Pereira',
        cliente: 'Renato Almeida',
        data: '12/12/2023',
        servico: 'Barba'
    },
    {
        barbeiro: 'Milton Oliveira',
        cliente: 'Fernanda Costa',
        data: '13/12/2023',
        servico: 'Corte e Barba'
    },
    {
        barbeiro: 'Amanda Lima',
        cliente: 'Gustavo Santos',
        data: '14/12/2023',
        servico: 'Corte'
    },
    {
        barbeiro: 'Rodrigo Almeida',
        cliente: 'Catarina Pereira',
        data: '15/12/2023',
        servico: 'Barba'
    },
    {
        barbeiro: 'Juliano Costa',
        cliente: 'Isabella Lima',
        data: '16/12/2023',
        servico: 'Corte e Barba'
    },
    {
        barbeiro: 'Viviane Santos',
        cliente: 'Matheus Alves',
        data: '17/12/2023',
        servico: 'Corte'
    },
    {
        barbeiro: 'Roberta Oliveira',
        cliente: 'Alexandre Pereira',
        data: '18/12/2023',
        servico: 'Barba'
    },
    {
        barbeiro: 'Diego Lima',
        cliente: 'Fernanda Santos',
        data: '19/12/2023',
        servico: 'Corte e Barba'
    },
    {
        barbeiro: 'Camila Almeida',
        cliente: 'Vinícius Costa',
        data: '20/12/2023',
        servico: 'Corte'
    },
    {
        barbeiro: 'Ricardo Pereira',
        cliente: 'Amanda Santos',
        data: '21/12/2023',
        servico: 'Barba'
    },
    {
        barbeiro: 'Mariana Oliveira',
        cliente: 'José Lima',
        data: '22/12/2023',
        servico: 'Corte e Barba'
    },
    {
        barbeiro: 'Guilherme Costa',
        cliente: 'Carla Almeida',
        data: '23/12/2023',
        servico: 'Corte'
    },
    {
        barbeiro: 'Lívia Santos',
        cliente: 'Rodrigo Pereira',
        data: '24/12/2023',
        servico: 'Barba'
    },
    {
        barbeiro: 'Leonardo Almeida',
        cliente: 'Juliana Lima',
        data: '25/12/2023',
        servico: 'Corte e Barba'
    },
    {
        barbeiro: 'Aline Costa',
        cliente: 'Lucas Santos',
        data: '26/12/2023',
        servico: 'Corte'
    },
    {
        barbeiro: 'Rafaela Pereira',
        cliente: 'Paulo Lima',
        data: '27/12/2023',
        servico: 'Barba'
    },
    {
        barbeiro: 'Fábio Oliveira',
        cliente: 'Tatiane Almeida',
        data: '28/12/2023',
        servico: 'Corte e Barba'
    },
    {
        barbeiro: 'Fernando Pereira',
        cliente: 'Mariana Santos',
        data: '29/12/2023',
        servico: 'Corte'
    },
    {
        barbeiro: 'Catarina Almeida',
        cliente: 'Eduardo Lima',
        data: '30/12/2023',
        servico: 'Barba'
    },
    {
        barbeiro: 'Vinícius Oliveira',
        cliente: 'Amanda Alves',
        data: '31/12/2023',
        servico: 'Corte e Barba'
    }
]



const selected = ref([])




const getSelectedString = () => {
    return selected.value.length === 0 ? '' : `${selected.value.length} record${selected.value.length > 1 ? 's' : ''} selected of ${rows.length}`
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