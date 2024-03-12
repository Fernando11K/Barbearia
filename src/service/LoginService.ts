
import { ref } from 'vue';
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { usuarioStore } from '../stores/usuario-store';
import { Login } from 'src/model/types/Login';
import { auth } from 'src/boot/firebase'
import { danger, info, positive } from 'src/utils/alerta';
import { spinnerFacebook } from 'src/utils/spinner';
import router from 'src/router';

const loading = ref(false)
const usuario = usuarioStore()

const retornarMensagem = (msg: string) => `<p class="text-h6">Tentando realizar ${msg}. Aguarde...</p>`

const autenticacaoLocal = (dados: Login) => {
    loading.value = true
    spinnerFacebook.mostrar(retornarMensagem('login'))
    signInWithEmailAndPassword(auth, dados.email, dados.senha)
        .then(() => {
            mostrarBoasVindas()
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
            loading.value = false

        })
}

const autenticacaoGoogle = () => {
    spinnerFacebook.mostrar(retornarMensagem('login via Google'))
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
        .then(() => {
            mostrarBoasVindas()
            router.push('/home')
        })
        .catch(() => {
            danger('Ocorreu um erro!')
        }
        )
        .finally(() => {
            spinnerFacebook.ocultar()
            loading.value = false
        })
}
const logout = () => {
    signOut(auth)
        .then(() => {
            info('Usuário deslogado com sucesso!')
            usuario.limparDados()
        })
        .catch(() => danger('Usuário ou senha inválidos', 3000))

}
const mostrarBoasVindas = () => {
    if (usuario.getNome) {

        positive(`Seja bem-vindo, ${usuario.getNome}!`, 3000)
    } else {
        positive('Seja bem-vindo!', 3000)
    }
}
const mensagensErroAutenticacao = (mensagemLogin: string) => {

    switch (mensagemLogin) {
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

        default:
            danger('Ocorreu um erro verifique sua conexão!', 1000)
            break;
    }
}


export { autenticacaoLocal, autenticacaoGoogle, loading, logout }