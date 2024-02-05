import { defineStore } from 'pinia';
import { Agendamento } from 'src/model/Agendamento';


export const agendamentoStore = defineStore('agendamento', {

    state: () => ({
        agendamentos: [] as Array<Agendamento>
    }),
    getters: {
        getAgendamentos(state) {
            return state.agendamentos
        }
    },
    actions: {
        setAgendamentos(agendamentos: Array<Agendamento>) {

            this.agendamentos = agendamentos
        }
    }
})
export default agendamentoStore