<template>
    <div class="row" :style="{ height: alturaCarousel }">

        <q-carousel swipeable animated v-model="slide" thumbnails infinite height="100%" class="col-12">
            <q-carousel-slide :name="1"
                img-src="https://img.freepik.com/free-photo/hairdresser-grooming-their-client_23-2149205925.jpg?w=740&t=st=1704036365~exp=1704036965~hmac=73af9ba319730098652e45ad9e76ebc88f500e5706697132417a53584dd3ddf0" />
            <q-carousel-slide :name="2"
                img-src="https://img.freepik.com/fotos-gratis/cabeleireiro-cuidando-do-cliente_23-2149205917.jpg?w=1380&t=st=1704053869~exp=1704054469~hmac=d90db50d640d35c1fe7e86e94ff0429c6dadee4da6deebbd96832ef472a44514" />
            <q-carousel-slide :name="3"
                img-src="https://img.freepik.com/fotos-gratis/homem-em-um-salao-de-barbearia-fazendo-o-corte-de-cabelo-e-barba_1303-20955.jpg?w=1380&t=st=1704053733~exp=1704054333~hmac=8c4d4243928536f929f56e1512804befa96be96a6544ac5de899362fe17b042e" />
            <q-carousel-slide :name="4"
                img-src="https://img.freepik.com/fotos-gratis/homem-cortando-o-cabelo-na-barbearia-4_23-2149186458.jpg?w=1380&t=st=1704054198~exp=1704054798~hmac=34ced433292e050d75772e645264fd5d3594d5448e637ed46f9dfb4613e93872" />
            <q-carousel-slide :name="5"
                img-src="https://img.freepik.com/fotos-gratis/jovem-afro-americano-visitando-uma-barbearia_1157-47699.jpg?w=1380&t=st=1704053958~exp=1704054558~hmac=c4bcd2240783556f2f8116edfba9fc9f87aeb4e5352df664e423404396404d12" />
        </q-carousel>
    </div>
</template>

<script setup lang="ts">
const q = useQuasar()
import { useQuasar } from 'quasar';
import { ref } from 'vue'
const alturaCarousel = q.platform.is.mobile ? '350px' : '720px'

const slide = ref(1)


</script>

