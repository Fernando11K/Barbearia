<template>
    <q-card flat class="q-px-md q-mt-md text-weight-regular ">
        <q-separator size="1px" color="grey-3" inset class="col-12 " />
        <section class="q-gutter-y-md q-py-sm">
            <p class="text-body1 text-center">Requisitos de Senha</p>
            <div class="row" v-for="(item, index) in requisitos" :key="index">
                <q-icon :name="icone(item.status)" :color="cor(item.status)" size="sm" class="q-pr-xs col-1" />
                <span class="col-10" :class="{ 'text-strike': item.status }">
                    {{ item.mensagem }}
                </span>
            </div>

        </section>

    </q-card>
</template>

<script setup lang="ts">

import { ref, watch } from 'vue';
const emits = defineEmits(['statusRequisitos'])
const props = defineProps({ senha: String })
const requisitos = ref([
    {
        id: 0,
        mensagem: 'Sua senha deve ter pelo menos 8 caracteres.',
        status: false
    },
    {
        id: 1,
        mensagem: 'Use uma combinação de letras maiúsculas, minúsculas e números.',
        status: false
    },
    {
        id: 2,
        mensagem: 'Use um ou mais caracteres especiais.',
        status: false
    },
    {
        id: 3,
        mensagem: 'Evite caracteres em sequência.',
        status: true
    }
])
const icone = (status: boolean) => status ? 'fa-regular fa-circle-check' : 'fa-regular fa-circle-xmark'
const cor = (status: boolean) => status ? 'positive' : 'negative'
const validacoes = () => {
    if (props.senha) {
        requisitos.value[0].status = props.senha.length >= 8
        requisitos.value[1].status = /(?=.*\d)(?=.*[A-Z])(?=.*[a-z])/.test(props.senha)
        requisitos.value[2].status = /\W/.test(props.senha)
        requisitos.value[3].status = !/(\w)\1+/g.test(props.senha)
    }
    emits('statusRequisitos', !requisitos.value.some(item => item.status === false))
}

watch(() => props.senha, () => validacoes())

</script>

