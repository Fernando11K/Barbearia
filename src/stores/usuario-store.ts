import { User } from 'firebase/auth';
import { defineStore } from 'pinia';
import { auth } from 'src/boot/firebase'
import Usuario from 'src/model/Usuario';

export const usuarioStore = defineStore('usuario', {

    state: () => ({
        nome: null,
        nomeCompleto: null,
        email: null,
        emailVerificado: false,
        urlFoto: null,
    } as Usuario),
    getters: {
        getNome(state) {
            return state.nome;
        },
        getNomeCompleto(state) {
            return state.nomeCompleto;
        },
        getEmail(state) {
            return state.email;
        },
        getEmailVerificado(state) {
            return state.emailVerificado;
        },
        getUrlFoto(state) {
            return state.urlFoto;
        },
    },
    actions: {
        async preencheState() {
            auth.onAuthStateChanged((user: User | null) => {
                if (user) {
                    const { displayName: nomeCompleto, email, photoURL: urlFoto, emailVerified: emailVerificado } = user

                    this.nome = nomeCompleto?.split(' ')[0] ?? null
                    this.nomeCompleto = nomeCompleto
                    this.email = email
                    this.urlFoto = urlFoto
                    this.emailVerificado = emailVerificado
                }
            })

        },
        limparDados() {
            this.nome = null;
            this.nomeCompleto = null;
            this.email = null;
            this.emailVerificado = false;
            this.urlFoto = null;
        }
    }
})