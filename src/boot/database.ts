import { getDatabase } from 'firebase/database';
import { firebaseApp } from 'src/boot/firebase';
const dataBase = getDatabase(firebaseApp)



export { dataBase }