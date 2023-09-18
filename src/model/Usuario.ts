export default class Usuario {
    private _nome: string | null;
    private _nomeCompleto: string | null;
    private _email: string | null;
    private _emailVerificado: boolean;
    private _urlFoto: string | null;


    constructor() {
        this._nome = null;
        this._nomeCompleto = null;
        this._email = null;
        this._emailVerificado = false;
        this._urlFoto = null;
    }

    get nome(): string | null {
        return this._nome;
    }

    set nome(nome: string | null) {
        this._nome = nome;
    }

    get nomeCompleto(): string | null {
        return this._nomeCompleto;
    }

    set nomeCompleto(nomeCompleto: string | null) {
        this._nomeCompleto = nomeCompleto;
    }

    get email(): string | null {
        return this._email;
    }

    set email(email: string | null) {
        this._email = email;
    }

    get emailVerificado(): boolean {
        return this._emailVerificado;
    }

    set emailVerificado(emailVerificado: boolean) {
        this._emailVerificado = emailVerificado;
    }

    get urlFoto(): string | null {
        return this._urlFoto;
    }

    set urlFoto(urlFoto: string | null) {
        this._urlFoto = urlFoto;
    }
}