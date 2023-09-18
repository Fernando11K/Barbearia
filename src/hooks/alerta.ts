import { useQuasar } from 'quasar'

export type Notificacoes = {
  positive: (message: string, tempo?: number) => void;
  danger: (message: string, tempo?: number) => void;
  warning: (message: string, tempo?: number) => void;
  info: (message: string, tempo?: number) => void;
  ongoing: (message: string, tempo?: number) => void;
}

const alert = (): Notificacoes => {
  const $q = useQuasar()

  const positive = (message: string, tempo = 1000) => {
    $q.notify({
      type: 'positive',
      message: message,
      position: 'center',
      timeout: tempo
    })
  }

  const danger = (message: string, tempo = 1000) => {
    $q.notify({
      type: 'negative',
      message: message,
      position: 'center',
      timeout: tempo
    });
  }

  const warning = (message: string, tempo = 1000) => {
    $q.notify({
      type: 'warning',
      message: message,
      position: 'center',
      timeout: tempo
    })
  }

  const info = (message: string, tempo = 1000) => {
    $q.notify({
      type: 'info',
      message: message,
      position: 'center',
      timeout: tempo
    })
  }

  const ongoing = (message: string, tempo = 1000) => {
    const notif = $q.notify({
      type: 'ongoing',
      message: message,
      position: 'center',
      timeout: tempo
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
