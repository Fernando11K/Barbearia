import { agendamentoRef, push } from 'src/boot/firebase';
import { danger, positive } from 'src/hooks/alerta';



const criarAgendamento = (dadosAgendamento: any) => {

    const dados = {
        cliente: dadosAgendamento.cliente,
        data: dadosAgendamento.data,
        barbeiro: dadosAgendamento.barbeiro,
        servico: dadosAgendamento.servico

    }
    push(agendamentoRef, dados)
        .then(response => {
            console.log(response)
            positive('Agendamento realizado com sucesso')
            return true
        })
        .catch(erro => {
            console.log(erro)
            danger('Ocorreu um erro ao reallizar o agendamento')
            return false
        })

};




export { criarAgendamento }