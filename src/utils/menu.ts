

import { computed } from 'vue';
import { usuarioStore } from 'src/stores/usuario-store';
import IMenu from 'src/model/interfaces/IMenu'

const usuario = usuarioStore()
export const menu = computed(() => [
    {
        icon: 'fa-solid fa-user',
        label: usuario.getNome
            ? usuario.getNome
            : usuario.getEmail
                ? 'Bem-vindo'
                : 'Entrar',
        iconColor: 'primary',
        separator: true,
        ativo: true,
        rota: !usuario.getEmail ? '/login' : '/home'
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
        ativo: usuario.getEmail,
        iconColor: 'primary',
        rota: '/gerencia-agendamentos'
    },
    {
        icon: 'fa-solid fa-person-walking-arrow-right',
        label: 'Sair',
        separator: true,
        ativo: usuario.getEmail,
        iconColor: 'primary',
        rota: '/login'
    },
] as Array<IMenu>);
