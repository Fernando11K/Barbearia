import { useUsuarioStore } from 'src/stores/useUsuarioStore';
import { criarAgendamento } from 'src/service/AgendamentoService'


const usuario = useUsuarioStore()
class Agendamento {
    private cliente: string | null;
    private data: string;
    private barbeiro: string;
    private servico: string;
    private local: string;
    private status: boolean;

    constructor(data: string, barbeiro: string, servico: string, local: string) {
        this.cliente = usuario.getEmail;
        this.data = data;
        this.barbeiro = barbeiro;
        this.servico = servico;
        this.status = true;
        this.local = local
    }
    agendar() {
        const dadosAgendamento = {
            cliente: this.cliente,
            data: this.data,
            servico: this.servico,
            barbeiro: this.barbeiro,
            local: this.local

        }
        return criarAgendamento(dadosAgendamento)

    }

    // Métodos acessores
    getCliente(): string {
        return this.cliente ? this.cliente : '';
    }

    setCliente(cliente: string): void {
        this.cliente = cliente;
    }

    getData(): string {
        return this.data;
    }

    setData(data: string): void {
        this.data = data;
    }

    getBarbeiro(): string {
        return this.barbeiro;
    }

    setBarbeiro(barbeiro: string): void {
        this.barbeiro = barbeiro;
    }

    getServico(): string {
        return this.servico;
    }

    setServico(servico: string): void {
        this.servico = servico;
    }

    getStatus(): boolean {
        return this.status;
    }

    setStatus(status: boolean): void {
        this.status = status;
    }
}
export { Agendamento }
