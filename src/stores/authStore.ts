import { defineStore } from 'pinia';

interface AuthState {
    token: string | null;


}

/*
Nem tudo está sendo utilizado, pois estou utilizando a auteticação do firebase
*/
export const userAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        token: localStorage.getItem('token') ?? null


    }),
    getters: {
        getToken(state): string | null {
            return state.token;
        }


    },
    actions: {
        setToken(token: string) {
            this.token = token;
            localStorage.setItem('token', token)
        },
        setEstaAutenticado(autenticado: boolean) {

            localStorage.setItem('autenticado', JSON.stringify(autenticado))
        },
        clearToken() {
            this.token = null;
            localStorage.removeItem('token');
        },
    },
});
