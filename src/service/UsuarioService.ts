import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from 'src/boot/firebase'
import { danger, positive } from 'src/utils/alerta';
import { spinnerFacebook } from 'src/utils/spinner';
import { ref } from 'vue';
import { CadastroUsuario } from 'src/model/types/CadastroUsuario';
const loading = ref(false)
import router from 'src/router';

const retornarMensagem = (msg: string) => `<p class="text-h6">Tentando realizar ${msg}. Aguarde...</p>`
const criarUsuario = async (dados: CadastroUsuario) => {
    loading.value = true
    spinnerFacebook.mostrar(retornarMensagem('cadastro'))
    createUserWithEmailAndPassword(auth, dados.email, dados.senha)
        .then(() => {
            atualizarPerfilUsuario(dados.nome, false)
                .finally(() => {
                    positive('Sua conta foi criada com sucesso seja bem vindo(a)!', 3000)
                    router.push('/home')
                })


        })
        .catch((error) => {
            mensagensErroCadastro(error.code)

        })
        .finally(() => {
            spinnerFacebook.ocultar()
            loading.value = false
        })
}

const atualizarPerfilUsuario = async (nome: string, exibeMensagem = true) => {

    if (auth.currentUser) {
        loading.value = true
        spinnerFacebook.mostrar(' a atualização do nome')
        updateProfile(auth.currentUser, { displayName: nome })
            .then(() => {
                if (exibeMensagem) {
                    positive('Nome atualizado com sucesso!', 3000)
                }
            }).catch(() => {
                if (exibeMensagem) {
                    danger('Ocorreu um erro!')
                }
            }).finally(() => {
                spinnerFacebook.ocultar()
                loading.value = false
            })
    }
    else {
        router.push('/login')
    }
}
const mensagensErroCadastro = (mensagemLogin: string) => {
    switch (mensagemLogin) {
        case 'auth/email-already-in-use':
            danger('Email informado já está em uso!', 3000)
            break;


    }
}

export { criarUsuario, atualizarPerfilUsuario, loading }