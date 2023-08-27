import { defineStore } from 'pinia';

interface AuthState {
    token: string | null;
    estaAutenticado: boolean

}

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        token: localStorage.getItem('token') ?? null,
        estaAutenticado: JSON.parse(localStorage.getItem('autenticado') || 'false')

    }),
    getters: {
        getToken(): string | null {
            return this.token;
        },
        getEstaAutenticado(): boolean { return this.estaAutenticado }

    },
    actions: {
        setToken(token: string) {
            this.token = token;
            localStorage.setItem('token', token)
        },
        setEstaAutenticado(autenticado: boolean) {
            this.estaAutenticado = autenticado
            localStorage.setItem('autenticado', JSON.stringify(autenticado))
        },
        clearToken() {
            this.token = null;
            localStorage.removeItem('token');
        },
    },
});
