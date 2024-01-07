<template>
    <q-img alt="logo instagram" class="full-width q-img-clickable imagem " src="../../assets/instagram.jpg"
        style="height: 150px; width: 500px" @click="redirecionarParaInstagram">
        <div class="bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
                <img alt="retrato de um homem com barba"
                    src="https://cdn.pixabay.com/photo/2018/01/09/14/23/vector-3071686_1280.png">
            </q-avatar>
            <div class="text-weight-bold">Barber's Den</div>
            <div>@barbers.den</div>
        </div>
    </q-img>

    <q-scroll-area class="fit">
        <q-list>
            <template v-for="(menuItem, index) in menu" :key="index">
                <q-item clickable v-if="menuItem.ativo" :active="!menuItem.ativo" v-ripple
                    @click="verificaDisponibilidadeDaFuncionalidade(menuItem)" :to="menuItem.rota">
                    <q-item-section avatar>
                        <q-icon :name="menuItem.icon" :color="menuItem.iconColor" />
                    </q-item-section>
                    <q-item-section>
                        {{ menuItem.label }}
                    </q-item-section>
                </q-item>
                <q-separator v-if="menuItem.separator" />
            </template>
        </q-list>
    </q-scroll-area>
</template>

<script setup lang="ts">
import { auth } from 'src/boot/firebase'
import { signOut } from 'firebase/auth';
import { useUsuarioStore } from '../../stores/useUsuarioStore';
import { warning, info, danger } from '../../hooks/alerta'
import { menu } from 'src/utils/menu'
import IMenu from 'src/interfaces/IMenu'


const usuarioStore = useUsuarioStore()

const emits = defineEmits(['abreModalAgendamento'])
const redirecionarParaInstagram = () => setTimeout(() => window.location.href = 'https://www.instagram.com/barbers.den/', 250);

const verificaDisponibilidadeDaFuncionalidade = (itemMenu: IMenu) => (!itemMenu.ativo) ? warning('A funcionalidade estará disponível em breve!') : executaAcao(itemMenu.label)


const executaAcao = (label: string) => {

    logout(label)
    abreModalAgendamento(label)
}

const abreModalAgendamento = (label: string) => {
    if (label === 'Agendamento' && usuarioStore.getEmail) {
        emits('abreModalAgendamento')
    } else if (label === 'Agendamento' && !usuarioStore.getEmail) {
        warning('É necessário estar logado para realizar agendamento!')
    }
};

const logout = async (label: string) => {
    if (label == 'Sair') {
        await signOut(auth)
            .then(() => {
                info('Usuário deslogado com sucesso!')
                usuarioStore.limparDados()
            })
            .catch(() => danger('Usuário ou senha inválidos', 3000))

    }
}
</script>