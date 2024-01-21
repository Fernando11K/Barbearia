<template>
    <q-page class=" column flex-center bg-white ">
        <q-card class=" bg-white q-ma-xs " style=" max-width: 400px;" ref="card">
            <div class="text-center q-pt-sm">
                <q-icon size="70px" color="dark" name="fa-solid fa-user" />
                <div class="text-bold text-h5 text-dark q-pt-sm">Barber's Den - Login</div>
            </div>
            <q-card-section>
                <q-form class="row justify-center" @submit.prevent="autenticacaoLocal">
                    <InputUsuarioLogin v-model="login.email" class="full-width q-pa-md" @focus="alteraPosicaoCard" />
                    <InputSenhaLogin v-model="login.senha" class="full-width q-pa-md" @focus="alteraPosicaoCard" />
                    <q-btn type="submit" unelevated rounded class="q-mt-md  col-11" color="primary" text-color="white"
                        label="ENTRAR" :disabled="!login.email || !login.senha" />

                    <q-btn icon='fa-brands fa-google' @click="autenticacaoGoogle" outline rounded
                        class="q-mt-md col-11 bg-black" text-color="white" label="Fazer login com o Google" />
                </q-form>
            </q-card-section>
        </q-card>
    </q-page>
</template>
<script setup lang="ts" >

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { auth } from 'src/boot/firebase'
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import InputUsuarioLogin from '/src/components/login/InputUsuarioLogin.vue';
import InputSenhaLogin from 'src/components/login/InputSenhaLogin.vue';
import { positive, danger } from '../hooks/alerta'
import { useUsuarioStore } from '../stores/useUsuarioStore';
import { useQuasar } from 'quasar';

const q = useQuasar()
const card = ref<null | { $el: HTMLElement }>(null)

const usuarioStore = useUsuarioStore()

const router = useRouter()
const login = ref({ email: '', senha: '' })

const autenticacaoLocal = async () => {
    await signInWithEmailAndPassword(auth, login.value.email, login.value.senha)
        .then(() => {
            router.push('/home')

        })
        .catch(() => danger('Usuário ou senha inválidos', 3000))

}
const autenticacaoGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
        .then(() => {
            if (usuarioStore.getNome) {

                positive(`Seja bem vindo ${usuarioStore.getNome}!`, 3000)
            }
            router.push('/home')
        })
        .catch(() => {
            danger('Ocorreu um erro')
        }
        )
}

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
