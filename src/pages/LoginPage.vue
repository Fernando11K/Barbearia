<template>
    <q-page class="bg-white window-width row justify-center">
        <q-card class="bg-white fit q-ma-xs" style="max-width: 400px">
            <div class="text-center q-pt-sm">
                <q-icon size="70px" color="dark" name="fa-solid fa-user" />
                <div class="text-bold text-h5 text-dark q-pt-sm">Barber's Den - Login</div>
            </div>
            <q-card-section>
                <q-form class="row justify-center" @submit.prevent="autenticacaoLocal()">
                    <InputUsuarioLogin v-model="usuario.email" class="full-width q-pa-md" />
                    <InputSenhaLogin v-model="usuario.senha" class="full-width q-pa-md" />
                    <q-btn type="submit" unelevated rounded class="q-mt-md  col-11" color="primary" text-color="white"
                        label="ENTRAR" />
                </q-form>
            </q-card-section>
        </q-card>
    </q-page>
    <q-dialog v-model="alert">
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
<script setup>

import { ref } from 'vue';
import InputUsuarioLogin from '/src/components/login/InputUsuarioLogin.vue';
import InputSenhaLogin from 'src/components/login/InputSenhaLogin.vue';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from 'src/boot/firebase.ts'
import { useAuthStore } from '../stores/useAuthStore';
import { useRouter } from 'vue-router';
const router = useRouter()


const usuario = ref({ email: '', senha: '' })
const alert = false
const authStore = useAuthStore();

const autenticacaoLocal = async () => {
    await signInWithEmailAndPassword(auth, usuario.value.email, usuario.value.senha)
        .then((userCredential) => {
            const user = userCredential.user;
            authStore.setEstaAutenticado(true);
            router.push('/home')
            return user.getIdToken();
        })
        .catch((error) => {
            // Algum erro ocorreu durante o login
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Erro de login:', errorCode, errorMessage);
        })



}
// const autenticacaoGoogle = () => {
//     const provider = new GoogleAuthProvider();
//     signInWithPopup(auth, provider)
//         .then((response) => {
//             console.log(response)
//         })
//         .catch((error) => console.log(error)
//         )

// }

</script>
  
<style scoped>
.login {
    border: 2px solid #676767;
    padding: 10px;
    border-radius: 25px;
}
</style>
  