<template>
    <q-page class="bg-white window-width row justify-center">
        <q-card class="bg-white fit q-ma-xs" style="max-width: 400px">
            <div class="text-center q-pt-sm">
                <q-icon size="70px" color="dark" name="fa-solid fa-user" />
                <div class="text-bold text-h5 text-dark q-pt-sm">Barber's Den - Login</div>
            </div>
            <q-card-section>
                <q-form class="row justify-center" @submit.prevent="autenticacaoLocal">
                    <InputUsuarioLogin v-model="login.email" class="full-width q-pa-md" />
                    <InputSenhaLogin v-model="login.senha" class="full-width q-pa-md" />
                    <q-btn type="submit" unelevated rounded class="q-mt-md  col-11" color="primary" text-color="white"
                        label="ENTRAR" :disabled="!login.email || !login.senha" />

                    <q-btn icon='fa-brands fa-google' @click="autenticacaoGoogle" outline rounded
                        class="q-mt-md col-11 bg-black" text-color="white" label="Fazer login com o Google" />
                </q-form>
            </q-card-section>
        </q-card>
    </q-page>
    <q-dialog v-model="model">
        <q-card class="bg-red-14 q-pa-sm">
            <q-card-actions class="glossy shadow-24" align="center">
                <q-icon class="shadow-24" color="amber" name="fa-solid fa-triangle-exclamation text" size="25px" />
                <span class="q-pl-lg text-weight-medium text-amber">Email ou senha incorretos!
                </span>

                <q-btn class="q-ml-sm glossy" dense color="dark" rounded label="OK" text-color="white" v-close-popup />
            </q-card-actions>

        </q-card>
    </q-dialog>
</template>
<script lang="ts"  setup>

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from 'src/boot/firebase'
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import InputUsuarioLogin from '/src/components/login/InputUsuarioLogin.vue';
import InputSenhaLogin from 'src/components/login/InputSenhaLogin.vue';
import alert from '../hooks/alerta'
import { useUsuarioStore } from '../stores/useUsuarioStore';
const usuarioStore = useUsuarioStore()

const router = useRouter()
const login = ref({ email: '', senha: '' })
const model = false
const alerta = alert()

const autenticacaoLocal = async () => {
    await signInWithEmailAndPassword(auth, login.value.email, login.value.senha)
        .then(() => {
            router.push('/home')

        })
        .catch(() => alerta.danger('Usuário ou senha inválidos', 3000))

}
const autenticacaoGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
        .then(() => {
            if (usuarioStore.getNome) {

                alerta.positive(`Seja bem vindo ${usuarioStore.getNome}!`, 3000)
            }
            router.push('/home')
        })
        .catch(() => {

            alerta.danger('Ocorreu um erro')
        }
        )
}

</script>
  
<style scoped>
.login {
    border: 2px solid #676767;
    padding: 10px;
    border-radius: 25px;
}
</style>
