import { useUsuarioStore } from 'src/stores/useUsuarioStore';



const usuario = useUsuarioStore()
class Agendamento {
    private cliente: string | null;
    private data: string;
    private barbeiro: string;
    private servico: string;
    private local: number;
    private status: boolean;

    constructor(data: string, barbeiro: string, servico: string, local: number) {
        this.cliente = usuario.getEmail;
        this.data = data;
        this.barbeiro = barbeiro;
        this.servico = servico;
        this.status = true;
        this.local = local
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
    getLocal(): number {
        return this.local
    }
    getAgendamento(): this {
        return this

    }
}
export { Agendamento }
