import { getAuth } from 'firebase/auth'
import { firebaseApp } from 'src/boot/firebase';
const auth = getAuth(firebaseApp);
export { auth }
