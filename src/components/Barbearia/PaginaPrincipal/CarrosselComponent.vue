<template>
    <q-card class="my-card text-white glossy"
        style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%);border-radius: 0%">
        <q-carousel swipeable animated v-model="slide" thumbnails infinite>
            <q-carousel-slide :name="1"
                img-src="https://img.freepik.com/free-photo/man-barbershop-salon-doing-haircut-beard-trim_1303-20948.jpg?w=740&t=st=1704034152~exp=1704034752~hmac=a7c82f4ac24a33b43daf945cb3bb3d255ab26fff628e82638ee47a53fb2cf3fd" />
            <q-carousel-slide :name="2"
                img-src="https://img.freepik.com/free-photo/young-african-american-man-visiting-barbershop_1157-47699.jpg?w=900&t=st=1704034524~exp=1704035124~hmac=5813206e4c02948a63acf07b0172c413a019be9a8a94e6ea54cba302e07984e0" />
            <q-carousel-slide :name="3"
                img-src="https://img.freepik.com/free-photo/young-man-barbershop-trimming-hair_1303-26254.jpg?w=900&t=st=1704034087~exp=1704034687~hmac=e6aafba46dc514b394f8d913f3dc9f2aa0bb654e7b8ae3ca6bbfd26093b7dcf3" />
            <q-carousel-slide :name="4"
                img-src="https://img.freepik.com/free-photo/hairdresser-grooming-their-client_23-2149205925.jpg?w=740&t=st=1704036365~exp=1704036965~hmac=73af9ba319730098652e45ad9e76ebc88f500e5706697132417a53584dd3ddf0" />
            <q-carousel-slide :name="5"
                img-src="https://img.freepik.com/free-photo/man-barbershop-salon-doing-haircut-beard-trim_1303-20945.jpg?w=740&t=st=1704034480~exp=1704035080~hmac=265f2e0ade06ba119a45dbf5479136841b5f39bd122f61dec92f443540ddecfb" />
        </q-carousel>
    </q-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const slide = ref(1)

</script>
