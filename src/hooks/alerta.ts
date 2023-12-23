import { Notify } from 'quasar';


const notificar = (type: string, message: string, tempo = 1000) => {

  Notify.create({
    type: type,
    message: message,
    position: 'center',
    timeout: tempo
  })

}


const positive = (message: string, tempo = 1000) => notificar('positive', message, tempo)
const danger = (message: string, tempo = 1000) => notificar('negative', message, tempo)
const warning = (message: string, tempo = 1000) => notificar('warning', message, tempo)
const info = (message: string, tempo = 1000) => notificar('info', message, tempo)
const ongoing = (message: string, tempo = 1000) => notificar('ongoing', message, tempo)







export { positive, danger, warning, info, ongoing }
