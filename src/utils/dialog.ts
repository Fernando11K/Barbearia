import { Dialog } from 'quasar'

const dialog = (mensagem: string) => {
    Dialog.create({
        title: '<em>Mensagem</em>',
        message: mensagem,
        class: 'bg-red-1',
        html: true,
        persistent: true,
        ok: {
            color: 'positive',
            flat: true,
            round: true
        }
    })
}
export default dialog;