<template>
    <q-img class="full-width q-img-clickable imagem cursor-pointer" src="../../assets/instagram.jpg"
        style="height: 150px; width: 500px" @click="redirecionarParaInstagram"
        :alt="'Siga a Barbers Dean no Instagram: @barbers.den Clique aqui para acessar nosso perfil e ficar por dentro das novidades, promoções e mais!'">
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
    <ModalAgendamento :statusProp="statusModalAgendamento" @atualizaStatusModal="atualizaStatusModal" />
</template>

<script setup lang="ts">
import { auth } from 'src/boot/firebase'
import { signOut } from 'firebase/auth';
import { usuarioStore } from '../../stores/usuario-store';
import { warning, info, danger } from '../../utils/alerta'
import { menu } from 'src/utils/menu'
import IMenu from 'src/model/interfaces/IMenu'
import { ref } from 'vue';
import ModalAgendamento from '../Agendamento/ModalAgendamento.vue';


const usuario = usuarioStore()
const statusModalAgendamento = ref(false)

const redirecionarParaInstagram = () => setTimeout(() => window.open('https://www.instagram.com/barbers.den/', '_blank'), 250);

const verificaDisponibilidadeDaFuncionalidade = (itemMenu: IMenu) => (!itemMenu.ativo) ? warning('A funcionalidade estará disponível em breve!') : executaAcao(itemMenu.label)

const executaAcao = (label: string) => {

    if (label == 'Sair') {
        logout()
    }
    if (label === 'Agendamento') {
        abreModalAgendamento()
    }
}

const abreModalAgendamento = () => {
    if (usuario.getEmail) {
        atualizaStatusModal(true)
        return
    }
    warning('É necessário estar logado para realizar agendamento!')

};

const logout = () => {
    signOut(auth)
        .then(() => {
            info('Usuário deslogado com sucesso!')
            usuario.limparDados()
        })
        .catch(() => danger('Usuário ou senha inválidos', 3000))

}

const atualizaStatusModal = (status: boolean) => statusModalAgendamento.value = status

</script>

<style scoped lang="scss">
.fonte-footer {
    font-size: 13px;
}

.imagem {
    &:hover {
        opacity: 0.5;
        transition: opacity 0.8s;
    }
}
</style>