<template>
    <q-page class=" column flex-center bg-white ">
        <q-card class=" bg-white q-ma-xs " style=" max-width: 400px;" ref="card">
            <div class="text-center q-pt-sm">
                <q-icon size="70px" color="dark" name="fa-solid fa-user" />
                <div class="text-bold text-h5 text-dark q-pt-sm">Barber's Den - Login</div>
            </div>
            <q-card-section>
                <q-form class="row justify-center" @submit.prevent="autenticar">
                    <InputUsuarioLogin v-model="login.email" class="full-width q-pa-md" @focus="alteraPosicaoCard" />
                    <InputSenhaLogin v-model="login.senha" class="full-width q-pa-md" @focus="alteraPosicaoCard" />
                    <q-btn type="submit" unelevated rounded class="q-mt-md  col-11" color="primary" text-color="white"
                        label="ENTRAR" :disabled="!login.email || !login.senha || loading" />

                    <q-btn icon='fa-brands fa-google' @click="autenticacaoGoogle" outline rounded
                        class="q-mt-md col-11 bg-black" text-color="white" label="Fazer login com o Google" />
                </q-form>
            </q-card-section>
        </q-card>
    </q-page>
</template>
<script setup lang="ts" >

import { ref } from 'vue';
import InputUsuarioLogin from 'src/components/login/InputUsuarioLogin.vue';
import InputSenhaLogin from 'src/components/login/InputSenhaLogin.vue';
import { autenticacaoLocal, autenticacaoGoogle, loading } from 'src/service/LoginService';

import { useQuasar } from 'quasar';
import { Login } from 'src/model/types/Login';
const q = useQuasar()
const card = ref<null | { $el: HTMLElement }>(null)

const autenticar = () => autenticacaoLocal(login.value)


const login = ref<Login>({ email: '', senha: '' })

const alteraPosicaoCard = (estaEmFoco = true) => {
    if (q.platform.is.mobile) {
        const elemento = card?.value?.$el;
        if (elemento) {
            elemento.style.transition = 'transform 0.5s ease-in-out';
            elemento.style.transform = (estaEmFoco) ? 'translateY(-30%)' : 'translateY(0%)';

        }
    }

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