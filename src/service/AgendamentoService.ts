import { agendamentoRef, push } from 'src/boot/firebase';

const criarAgendamento = (dadosAgendamento: any) => {
    try {
        const dados = {
            cliente: dadosAgendamento.cliente,
            data: dadosAgendamento.data,
            barbeiro: dadosAgendamento.barbeiro,
            servico: dadosAgendamento.servico

        }
        push(agendamentoRef, dados);
        //  alerta.positive('Agendamento realizado com sucesso')
        return true
    } catch (erro) {
        // alerta.danger('Ocorreu um erro ao reallizar o agendamento')
        console.log(erro)
        return false

    }
};



export { criarAgendamento }