import { ref, onValue } from 'firebase/database';
import { dataBase } from 'src/boot/database';
import Barbeiro from 'src/model/Barbeiro';


//const barbeiroByIdRef = (idBarbeiro: number) => ref(dataBase, `/barbeiros/${idBarbeiro}`)
const barbeiroRef = ref(dataBase, '/barbeiros')


let loading = false

const buscarBarbeiros = async () => {

    loading = true
    return new Promise<Array<Barbeiro>>((resolve, reject) => {

        onValue(barbeiroRef, (snapshot) => {

            const barbeiros: Array<Barbeiro> = []
            snapshot.forEach((childSnapshot) => {
                const chieldKey = childSnapshot.key;
                const childData = childSnapshot.val();
                barbeiros.push(new Barbeiro(chieldKey, childData.nome))

            });
            resolve(barbeiros);
        }, (error) => { reject(error); },

            {
                onlyOnce: true
            }

        );
        loading = false
    })
}



export { buscarBarbeiros, loading }