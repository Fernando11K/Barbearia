<template>
    <section>
        <q-card class="my-card text-h6 bg-blue-2">
            <q-card-section>
                <div>{{ titulo }}</div>
            </q-card-section>
        </q-card>
    </section>
</template>
<script setup>
defineProps(['titulo'])
</script>

<style lang="sass" scoped>
.my-card
  width: 100%

</style>