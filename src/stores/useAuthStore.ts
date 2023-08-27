import { defineStore } from 'pinia';
import { ref } from 'vue'

interface AuthState {
    token: string | null;

}
const estaAutenticado = ref(true)

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        token: localStorage.getItem('token') ?? null

    }),
    getters: {
        getToken(): string | null {
            return this.token;
        },
        getEstaAutenticado: (): boolean => estaAutenticado.value

    },
    actions: {
        setToken(token: string) {
            this.token = token;
            localStorage.setItem('token', token)
        },
        clearToken() {
            this.token = null;
            localStorage.removeItem('token');
        },
        setEstaAutenticado(autenticado: boolean) {
            estaAutenticado.value = autenticado
        }
    },
});
