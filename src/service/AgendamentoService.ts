import { update } from 'firebase/database';
import { agendamentoRef, agendamentoByIdRef, push, onValue } from 'src/boot/firebase';
import { danger, positive } from 'src/utils/alerta';
import { Agendamento } from 'src/model/Agendamento';
import { ref } from 'vue';

const criarAgendamento = (agendamento: Agendamento) => {

    const dados = {
        cliente: agendamento.getCliente(),
        data: agendamento.getData(),
        barbeiro: agendamento.getBarbeiro(),
        servico: agendamento.getServico()

    }
    return push(agendamentoRef, dados)



};
const atualizarAgendamento = (agendamento: Agendamento) => {
    const dados = {
        cliente: agendamento.getCliente(),
        data: agendamento.getData(),
        barbeiro: agendamento.getBarbeiro(),
        servico: agendamento.getServico(),
        id: '-NnWdXh5OUriDo9BkHKL'

    }

    if (dados.id) {
        update(agendamentoByIdRef(dados.id), dados)
            .then(() => {

                positive('Agendamento alterado com sucesso')
                return true
            })
            .catch(() => {
                danger('Ocorreu um erro ao reallizar o agendamento')
                return false
            })
    }

}

const buscarAgendamentos = () => {
    const listaAgendamentos = ref<Array<Agendamento>>([])
    onValue(agendamentoRef, (snapshot) => {

        snapshot.forEach((childSnapshot) => {
            const childKey = childSnapshot.key;
            const childData = childSnapshot.val();
            listaAgendamentos.value.push({ id: childKey, ...childData })
        });

    }, {
        onlyOnce: true
    });
    return listaAgendamentos.value
}

export { criarAgendamento, buscarAgendamentos, atualizarAgendamento }