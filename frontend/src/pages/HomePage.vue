<script lang="ts">
import DefaultMain from '@/components/DefaultMain.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomePage',
  components: {
    DefaultMain,
  },
})
</script>

<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css" />
  <DefaultMain :primary-text="'Bem vindo!'" :second-text="'Visão geral do seu controle de tempo'">
    <h1>aslfals</h1>
  </DefaultMain>
</template>

<style scoped></style>
