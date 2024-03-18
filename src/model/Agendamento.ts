import { usuarioStore } from 'src/stores/usuario-store';


const usuario = usuarioStore()
class Agendamento {

    private id?: string;
    private nomeCliente: string;
    private cliente: string | null;
    private data: string;
    private idBarbeiro: string;
    private servico: string;
    private local: number;
    private status: boolean;

    constructor(data: string, idBarbeiro: string, servico: string, local: number) {
        this.nomeCliente = usuario.getNome ?? 'Não Identificado'
        this.cliente = usuario.getEmail;
        this.data = data;
        this.idBarbeiro = idBarbeiro;
        this.servico = servico;
        this.status = true;
        this.local = local
    }

    getId(): string {
        return this.id ?? ''
    }
    getNome(): string {
        return this.nomeCliente;
    }
    getCliente(): string {
        return this.cliente ? this.cliente : '';
    }

    setId(id: string): void {
        this.id = id;
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

    getIdBarbeiro(): string {
        return this.idBarbeiro;
    }

    setBarbeiro(barbeiro: string): void {
        this.idBarbeiro = barbeiro;
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
