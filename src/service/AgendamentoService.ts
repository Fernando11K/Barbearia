import { agendamentoRef, push } from 'src/boot/firebase';
import alert from 'src/hooks/alerta';
const alerta = alert()
const criarAgendamento = (dadosAgendamento: any) => {
    try {
        const dados = {
            cliente: dadosAgendamento.cliente,
            data: dadosAgendamento.data,
            barbeiro: dadosAgendamento.barbeiro,
            servico: dadosAgendamento.servico

        }
        push(agendamentoRef, dados);
        alerta.positive('Agendamento realizado com sucesso')
    } catch (erro) {
        alerta.danger('Ocorreu um erro ao reallizar o agendamento')

    }
};



export { criarAgendamento }