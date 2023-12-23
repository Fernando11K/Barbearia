import { agendamentoRef, push, onValue } from 'src/boot/firebase';
import { danger, positive } from 'src/hooks/alerta';
import { Agendamento } from 'src/model/Agendamento';

import { ref } from 'vue';



const criarAgendamento = (agendamento: Agendamento) => {


    const dados = {
        cliente: agendamento.getCliente(),
        data: agendamento.getData(),
        barbeiro: agendamento.getBarbeiro(),
        servico: agendamento.getServico()

    }
    push(agendamentoRef, dados)
        .then(response => {
            positive('Agendamento realizado com sucesso')
            return true
        })
        .catch(erro => {
            danger('Ocorreu um erro ao reallizar o agendamento')
            return false
        })

};
const buscarAgendamentos = async () => {
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




export { criarAgendamento, buscarAgendamentos }