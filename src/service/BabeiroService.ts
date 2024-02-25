import { barbeiroRef, onValue } from 'src/boot/firebase';
import Barbeiro from 'src/model/Barbeiro';
import { ref } from 'vue';


const loading = ref(false)

const buscarBarbeiros = async () => {

    loading.value = true
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
        loading.value = false
    })
}



export { buscarBarbeiros, loading }