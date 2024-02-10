import { Loading, QSpinnerFacebook } from 'quasar'
import { Component } from 'vue'

const spinner = {
    mostrar(spinner: Component, mensagem: string) {
        Loading.show(
            {
                spinner: spinner,
                spinnerColor: 'primary',
                spinnerSize: 140,
                backgroundColor: 'blue-11',
                messageColor: 'dark',
                message: mensagem,
                html: true

            }
        )
    },
    ocultar() { Loading.hide() }

}

const spinnerFacebook = {
    mostrar(mensagem = '') { spinner.mostrar(QSpinnerFacebook, mensagem) },
    ocultar() { spinner.ocultar() }
}

export { spinnerFacebook }