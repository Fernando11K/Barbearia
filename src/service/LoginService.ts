
import { ref } from 'vue';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { usuarioStore } from '../stores/usuario-store';
import { Login } from 'src/model/types/Login';
import { auth } from 'src/boot/firebase'
import { danger, positive } from 'src/utils/alerta';
import { spinnerFacebook } from 'src/utils/spinner';
import router from 'src/router';

const loading = ref(false)
const usuario = usuarioStore()
const mensagem = '<p class="text-h6">Tentando realizar login. Aguarde...</p>'

const criarUsuario = (dados: Login) => {
    loading.value = true
    createUserWithEmailAndPassword(auth, dados.email, dados.senha)
        .then((response) => {
            console.log(response)
            positive('Sua conta foi criado com sucesso seja bem vindo!', 3000)
            router.push('/home')

        })
        .catch((error) => {
            mensagensErroCadastro(error.code)

        })
        .finally(() => {
            loading.value = false
        })
}

const autenticacaoLocal = (dados: Login) => {
    loading.value = true
    spinnerFacebook.mostrar(mensagem)
    signInWithEmailAndPassword(auth, dados.email, dados.senha)
        .then(() => {
            positive('Seja bem vindo!', 3000)
            router.push('/home')

        })
        .catch((error) => {
            mensagensErroAutenticacao(error.code)
            setTimeout(() => {
                loading.value = false
            }, 5000);
        })
        .finally(() => {
            spinnerFacebook.ocultar()

        })
}

const autenticacaoGoogle = () => {
    spinnerFacebook.mostrar(mensagem)
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then(() => {
            if (usuario.getNome) {

                positive(`Seja bem vindo ${usuario.getNome}!`, 3000)
            }
            console.log(router)
            router.push('/home')
        })
        .catch(() => {
            danger('Ocorreu um erro!')
        }
        )
        .finally(() => {
            spinnerFacebook.ocultar()
        })
}

const mensagensErroAutenticacao = (mensagem: string) => {

    switch (mensagem) {
        case 'auth/invalid-credential':
        case 'auth/invalid-email':
            danger('Usuário ou senha inválidos!', 3000)
            break;
        case 'auth/too-many-requests':
            danger('O usuário está temporariamente bloqueado devido a várias tentativas de login sem sucesso.', 2400)
            setTimeout(() => {

                danger('Tente novamente mais tarde...', 1000)
            }, 4000);
            break;

        // default:
        //     danger('Ocorreu um erro verifique sua conexão!', 1000)
        //     break;
    }
}

const mensagensErroCadastro = (mensagem: string) => {
    switch (mensagem) {
        case 'auth/email-already-in-use':
            danger('Email informado já está em uso!', 3000)
            break;


    }
}

export { autenticacaoLocal, autenticacaoGoogle, loading, criarUsuario }