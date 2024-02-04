import { update, } from 'firebase/database';
import { agendamentoRef, agendamentoByIdRef, push, onValue } from 'src/boot/firebase';
import { danger, positive } from 'src/hooks/alerta';
import { Agendamento } from 'src/model/Agendamento';







const criarAgendamento = (agendamento: Agendamento) => {


    const dados = {
        cliente: agendamento.getCliente(),
        data: agendamento.getData(),
        barbeiro: agendamento.getBarbeiro(),
        servico: agendamento.getServico()

    }
    push(agendamentoRef, dados)
        .then(response => {
            console.log(`ID_AGENDAMENTO: ${response.key}`)
            positive('Agendamento realizado com sucesso')
            return true
        })
        .catch(() => {
            danger('Ocorreu um erro ao reallizar o agendamento')
            return false
        })

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
    return new Promise((resolve, reject) => {
        const listaAgendamentos: Array<Agendamento> = [];
        onValue(agendamentoRef, (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                listaAgendamentos.push({ id: childKey, ...childData });
            });
            resolve(listaAgendamentos);
        }, (error) => { // A função de tratamento de erro deve ser passada como terceiro argumento
            reject(error); // Rejeita a Promise em caso de erro
        }

            , {
                onlyOnce: true
            });

    }
    );
}
export { criarAgendamento, buscarAgendamentos, atualizarAgendamento }