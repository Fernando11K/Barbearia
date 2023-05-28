import { useQuasar } from 'quasar'

type Notificacoes  = {
  positive: (message: string) => void;
  danger: (message: string) => void;
  warning: (message: string) => void;
  info: (message: string) => void;
  ongoing: (message: string) => void;
}

const alert = (): Notificacoes => {
  const $q = useQuasar()

  const positive = (message: string) => {
    $q.notify({
      type: 'positive',
      message: message,
      position: 'center' 
    })
  }

  const danger = (message: string) => {
    $q.notify({
      type: 'negative',
      message: message,
      position: 'center',
      timeout: 1000 
    });
  }

  const warning = (message: string) => {
    $q.notify({
      type: 'warning',
      message: message,
      position: 'center',       
      timeout: 500 
    })
  }

  const info = (message: string) => {
    $q.notify({
      type: 'info',
      message: message,
      position: 'center' 
    })
  }

  const ongoing = (message: string) => {
    const notif = $q.notify({
      type: 'ongoing',
      message: message,
      position: 'center' 
    })

    setTimeout(() => {
      notif({
        type: 'positive',
        message: 'Found the results that you were looking for',
        timeout: 1000
      })
    }, 4000)
  }

  return {
    positive,
    danger,
    warning,
    info,
    ongoing
  }
}

export default alert
