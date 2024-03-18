import { update, set } from 'firebase/database';
import { agendamentoRef, agendamentoByIdRef, push, onValue } from 'src/boot/firebase';
import { danger, positive } from 'src/utils/alerta';
import { Agendamento } from 'src/model/Agendamento';
import agendamentoStore from 'src/stores/agendamento-store';
import { buscarBarbeiros } from './BabeiroService';
import { spinnerFacebook } from 'src/utils/spinner';
import { ref } from 'vue';

const store = agendamentoStore()
const loading = ref(false)
const retornarMensagem = (msg: string) => `<p class="text-h6">Tentando ${msg}. Aguarde...</p>`


const criarAgendamento = (agendamento: Agendamento) => {

    const dados = {
        dataRegistro: new Date().toLocaleString('pt-BR').replace(',', ''),
        cliente: agendamento.getCliente(),
        data: agendamento.getData(),
        idBarbeiro: agendamento.getIdBarbeiro(),
        servico: agendamento.getServico()

    }
    return push(agendamentoRef, dados)
};
const atualizarAgendamento = async (agendamento: Agendamento) => {
    loading.value = true
    spinnerFacebook.mostrar(retornarMensagem('atualizar agendamento'))
    /*
        Implementar logica para edicao pelo operador e usuário
        Não preencher id do cliente se for operador
    */
    const idAgendamento = agendamento.getId();
    const dados = {
        //    cliente: agendamento.getCliente(),
        data: agendamento.getData(),
        idBarbeiro: agendamento.getIdBarbeiro(),
        servico: agendamento.getServico(),
        dataUltimaAtualizacao: new Date().toLocaleString('pt-BR').replace(',', ''),
    }
    update(agendamentoByIdRef(idAgendamento), dados)
        .then(() => {
            positive('Agendamento atualizado com sucesso!')
        })
        .catch(() => {
            danger('Ocorreu um erro ao realizar a atualização!')
        })
        .finally(() => {
            spinnerFacebook.ocultar()
            loading.value = false
        })




}

const inserirAgendamento = (agendamento: Agendamento) => {//Substitui os dados    

    const dados = {
        dataRegistro: new Date().toLocaleString('pt-BR').replace(',', ''),
        cliente: agendamento.getCliente(),
        data: agendamento.getData(),
        idBarbeiro: agendamento.getIdBarbeiro(),
        servico: agendamento.getServico()

    }
    set(agendamentoByIdRef(agendamento.getId()), dados)

}

const buscarAgendamentos = async () => {
    const barbeiros = await buscarBarbeiros()
    return new Promise((resolve, reject) => {
        onValue(agendamentoRef, (snapshot) => {
            const listaAgendamentos: Array<Agendamento> = []
            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                const childData = childSnapshot.val();
                listaAgendamentos.push({ id: childKey, barbeiro: barbeiros.find((barbeiro) => barbeiro.getId() === childData.idBarbeiro), ...childData });
            });
            store.setAgendamentos([...listaAgendamentos] as Agendamento[])

            resolve(listaAgendamentos);
        }, (error) => {
            reject(error);
        },
            {
                //    onlyOnce: false
            });
    }
    );
}
export { criarAgendamento, buscarAgendamentos, atualizarAgendamento, inserirAgendamento, loading }