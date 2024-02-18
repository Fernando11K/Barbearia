<template>
    <q-page class="column flex-center bg-white" @click.self=" boxUsuario.alteraPosicaoCard(false)">
        <BoxUsuario :titulo="'Login'" ref="boxUsuario">
            <q-form class="row justify-center" @submit.prevent="autenticar">
                <InputUsuarioLogin v-model="login.email" :label="'Email'" class="full-width q-pa-md"
                    @focus="mudarPosicao" />
                <InputSenhaLogin v-model="login.senha" class="full-width q-pa-md" @focus="mudarPosicao" />
                <q-btn type="submit" unelevated rounded class="q-mt-md  col-11" color="primary" text-color="white"
                    label="ENTRAR" :disabled="!login.email || !login.senha || loading" />
                <q-btn icon='fa-brands fa-google' @click="autenticacaoGoogle" outline rounded
                    class="q-mt-md col-11 bg-black" text-color="white" label="Fazer login com o Google" />
            </q-form>
        </BoxUsuario>
    </q-page>
</template>
<script setup lang="ts" >

import { ref } from 'vue';
import InputUsuarioLogin from 'src/components/login/InputUsuarioLogin.vue';
import InputSenhaLogin from 'src/components/login/InputSenhaLogin.vue';
import { autenticacaoLocal, autenticacaoGoogle, loading } from 'src/service/LoginService';
import BoxUsuario from 'src/components/common/BoxUsuario.vue';
import { Login } from 'src/model/types/Login';


const boxUsuario = ref()
const autenticar = () => autenticacaoLocal(login.value)
const login = ref<Login>({ email: '', senha: '' })

const mudarPosicao = (status: boolean) => {
    boxUsuario.value.alteraPosicaoCard(status)
}

</script>
  
<style scoped>
.login {
    border: 2px solid #676767;
    padding: 10px;
    border-radius: 25px;
}
</style>
../utils/alerta