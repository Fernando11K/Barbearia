

import { computed } from 'vue';
import { useUsuarioStore } from 'src/stores/useUsuarioStore';
import IMenu from 'src/interfaces/IMenu'

const usuarioStore = useUsuarioStore()


export const menu = computed(() => [
    {
        icon: 'fa-solid fa-user',
        label: usuarioStore.getNome
            ? usuarioStore.getNome
            : usuarioStore.getEmail
                ? 'Bem-vindo'
                : 'Entrar',
        iconColor: 'primary',
        separator: true,
        ativo: true,
        rota: !usuarioStore.getEmail ? '/login' : '/home'
    },
    {
        icon: 'fa-regular fa-calendar-days fa-beat',
        label: 'Agendamento',
        separator: true,
        ativo: true,
        iconColor: 'primary',
    },
    {
        icon: 'fa-solid fa-brazilian-real-sign',
        label: 'Tabela de Preços',
        separator: true,
        ativo: true,
        iconColor: 'primary',
        rota: '/tabela-precos'
    },
    {
        icon: 'fa-regular fa-clipboard',
        label: 'Gerencia Agendamentos',
        separator: true,
        ativo: usuarioStore.getEmail,
        iconColor: 'primary',
        rota: '/gerencia-agendamentos'
    },
    {
        icon: 'fa-solid fa-person-walking-arrow-right',
        label: 'Sair',
        separator: true,
        ativo: usuarioStore.getEmail,
        iconColor: 'primary',
        rota: '/login'
    },
] as Array<IMenu>);
