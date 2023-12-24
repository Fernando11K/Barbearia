import { QSelectOption } from 'quasar';
import { barbeiroRef, onValue } from 'src/boot/firebase';
import { ref } from 'vue';




const buscarBarbeiros = () => {
    const barbeiros = ref<Array<QSelectOption<number>>>([])
    onValue(barbeiroRef, (snapshot) => {

        snapshot.forEach((childSnapshot) => {
            const childData = childSnapshot.val();

            barbeiros.value?.push({ value: childData.id, label: childData.nome })

        });

    }, {
        onlyOnce: true
    });
    return barbeiros.value
}

export { buscarBarbeiros }