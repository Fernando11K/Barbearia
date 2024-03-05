<template>
    <q-page class="column flex-center bg-white">
        <BoxUsuario :titulo="'Cadastro'" ref="boxUsuario">
            <q-form class="row justify-center" @submit.prevent="criarConta">
                <InputNome v-model="novoUsuario.nome" class="col-12 q-pa-md" />
                <InputUsuarioLogin v-model="novoUsuario.email" :label="'Email'" class="col-12 q-pa-md" />
                <InputSenhaLogin v-model="novoUsuario.senha" :label="'Senha'" class="col-12 q-pa-md" />
                <InputSenhaLogin v-model="confirmacaoSenha" :label="'Confimar senha'" class="col-12 q-pa-md" />
                <q-btn type="submit" unelevated rounded class="q-mt-md col-11" color="positive" text-color="white"
                    label="Cadastrar" :disabled="desabilitarBotao" />
                <CardRequisitosSenha :senha="novoUsuario.senha" @statusRequisitos="atualizarStatusRequisitos" />
            </q-form>
        </BoxUsuario>

    </q-page>
</template>

<script setup lang="ts">

import BoxUsuario from 'src/components/common/BoxUsuario.vue';
import InputUsuarioLogin from 'src/components/login/InputUsuarioLogin.vue';
import InputSenhaLogin from 'src/components/login/InputSenhaLogin.vue';
import InputNome from 'src/components/common/InputNome.vue';
import CardRequisitosSenha from 'src/components/CadastroUsuario/CardRequisitosSenha.vue'
import { CadastroUsuario } from 'src/model/types/CadastroUsuario';
import { criarUsuario, loading } from 'src/service/UsuarioService'
import { ref, computed, onBeforeMount } from 'vue'
import { warning } from 'src/utils/alerta';
import { usuarioStore } from 'src/stores/usuario-store';
import router from 'src/router';

onBeforeMount(() => {
    const usuario = usuarioStore();
    if (usuario.getEmail) {
        router.push('/home')
    }
})
const boxUsuario = ref()
const novoUsuario = ref<CadastroUsuario>({ email: '', senha: '', nome: '' })
const confirmacaoSenha = ref('')
const statusRequisitos = ref(false)
const desabilitarBotao = computed(() => !(novoUsuario.value.email && novoUsuario.value.senha && confirmacaoSenha.value && !loading.value && statusRequisitos.value))

const atualizarStatusRequisitos = (valor: boolean) => {
    statusRequisitos.value = valor
}
const criarConta = () => {

    if (validarCadastro()) {

        criarUsuario(novoUsuario.value)
    }
}

const validarCadastro = () => {

    if (novoUsuario.value.senha !== confirmacaoSenha.value) {
        warning('As senhas não correspondem!')
        return

    }
    else if (!statusRequisitos.value) {
        warning('Atenda aos requisitos de senha!')
        return
    }
    return true

}
</script>