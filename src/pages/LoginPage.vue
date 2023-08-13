<template>
    <q-page class="bg-black window-width row justify-center items-center">
        <section class="q-ma-sm shadow-24 login glossy bg-black">
            <q-card style="max-width: 350px" class="bg-dark fit glossy">
                <div class="text-center q-pt-sm ">
                    <q-icon size="70px" color="white" name="fa-solid fa-user" />
                    <div class="text-bold text-h5 text-white q-pt-sm">Barber's Den</div>
                </div>
                <q-card-section class="row justify-center">
                    <InputUsuarioLogin v-model="usuario.email" class="full-width q-pa-md shadow-24 glossy" />
                    <InputSenhaLogin v-model="usuario.senha" class="full-width q-pa-md shadow-24 glossy" />
                    <q-btn @click="autenticacaoLocal" class="q-mt-md glossy" color="white" text-color="danger"
                        label="ENTRAR" />
                </q-card-section>
            </q-card>
        </section>
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

const usuario = ref({ email: '', senha: '' })
const alert = false
const autenticacaoLocal = () => {
    signInWithEmailAndPassword(auth, usuario.value.email, usuario.value.senha)
        .then((userCredential) => {
            // Login bem-sucedido, você pode acessar o usuário autenticado através de userCredential.user
            console.log(userCredential)
            const user = userCredential.user;
            console.log('Usuário autenticado:', user);
        })
        .catch((error) => {
            // Algum erro ocorreu durante o login
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Erro de login:', errorCode, errorMessage);
        });

}
const autenticacaoGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then((response) => {
            console.log(response)
        })
        .catch((error) => console.log(error)
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
  