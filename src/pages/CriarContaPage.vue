<template>
    <q-page class="column flex-center bg-white">
        <BoxUsuario :titulo="'Cadastro'" ref="boxUsuario">
            <q-form class="row justify-center" @submit.prevent="criarConta">
                <InputUsuarioLogin v-model="login.email" :label="'Email'" class="full-width q-pa-md" />
                <InputSenhaLogin v-model="login.senha" :label="'Senha'" class="full-width q-pa-md" />
                <InputSenhaLogin v-model="confirmacaoSenha" :label="'Confimar senha'" class="full-width q-pa-md" />
                <q-btn type="submit" unelevated rounded class="q-mt-md  col-11" color="positive" text-color="white"
                    label="CRIAR CONTA" :disabled="desabilitarBotao" />
                <CardRequisitosSenha :senha="login.senha" @statusRequisitos="atualizarStatusRequisitos" />
            </q-form>
        </BoxUsuario>

    </q-page>
</template>
<script setup lang="ts">
import BoxUsuario from 'src/components/common/BoxUsuario.vue';
import InputUsuarioLogin from 'src/components/login/InputUsuarioLogin.vue';
import InputSenhaLogin from 'src/components/login/InputSenhaLogin.vue';
import CardRequisitosSenha from 'src/components/CadastroUsuario/CardRequisitosSenha.vue'
import { Login } from 'src/model/types/Login';
import { criarUsuario, loading } from 'src/service/LoginService'
import { ref, computed } from 'vue'
import { warning } from 'src/utils/alerta';
const boxUsuario = ref()
const login = ref<Login>({ email: '', senha: '' })
const confirmacaoSenha = ref('')
const statusRequisitos = ref(false)
const atualizarStatusRequisitos = (valor: boolean) => {
    statusRequisitos.value = valor
}
const criarConta = () => {

    if (validarCadastro()) {

        criarUsuario(login.value)
    }
}

const desabilitarBotao = computed(() => !(login.value.email && login.value.senha && confirmacaoSenha.value && !loading.value && statusRequisitos.value))
const validarCadastro = () => {

    if (login.value.senha !== confirmacaoSenha.value) {
        warning('As senhas não correspondem!')
        return false

    }
    else if (!statusRequisitos.value) {
        warning('Atenda aos requisitos de senha!')
        return false
    }
    return true

}
</script>