import { defineStore } from 'pinia';
import IUsuario from 'src/interfaces/IUsuario';
import { auth } from 'src/boot/firebase'


export const useUsuarioStore = defineStore('usuario', {

    state: (): IUsuario => ({
        nome: null,
        nomeCompleto: null,
        email: null,
        emailVerificado: null,
        urlFoto: null,
    }),
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
        preencheState() {
            //     auth.onAuthStateChanged((usuario: any) => {
            //        console.log('dentro da state')
            //      console.log(usuario)
            //  })
            console.log('state')
            console.log(auth.currentUser)
        }
    }
})