<script lang="ts">
import DefaultHeader from '@/components/DefaultHeader.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomePage',
  components: {
    DefaultHeader,
  },
})
</script>

<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css" />
  <main class="columns is-gapless is-multiline">
    <DefaultHeader
      :primaryText="'Boas vindas!'"
      :secondaryText="'Visão geral do seu controle de tempo'"
    />
  </main>
</template>

<style scoped></style>
