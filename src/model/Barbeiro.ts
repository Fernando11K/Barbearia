export default class Barbeiro {
    id: string;
    nome: string;

    constructor(id: string, nome: string) {
        this.id = id;
        this.nome = nome;
    }

    getId(): string {
        return this.id;
    }
    getNome(): string {
        return this.nome;
    }
}