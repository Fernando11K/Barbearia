// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth'
import { getDatabase, ref, push, onValue } from 'firebase/database';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD47inOiGiqV1lzt9r6Ltc2vYqtqHnIoBc',
  authDomain: 'barbearia-90acc.firebaseapp.com',
  projectId: 'barbearia-90acc',
  storageBucket: 'barbearia-90acc.appspot.com',
  messagingSenderId: '1064725248483',
  appId: '1:1064725248483:web:9114ceb5aaa4b7b71fc8d6',
  measurementId: 'G-YZSZ7Y0MQ9'
};


// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const auth = getAuth(firebaseApp);
const dataBase = getDatabase(firebaseApp)
const agendamentoRef = ref(dataBase, '/agendamentos/')
const agendamentoByIdRef = (idAgendamento: string) => ref(dataBase, `/agendamentos/${idAgendamento}`)
const barbeiroByIdRef = (idBarbeiro: number) => ref(dataBase, `/barbeiros/${idBarbeiro}`)
const barbeiroRef = ref(dataBase, '/barbeiros')



export { firebaseApp, analytics, auth, agendamentoRef, agendamentoByIdRef, barbeiroByIdRef, barbeiroRef, push, onValue, ref }

