<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css" />
  <main class="columns is-gapless is-multiline">
    <DefaultHeader :primaryText="'Tarefas'" :secondaryText="'Gerencie e acompanhe suas tarefas'" />
  </main>
</template>

<script lang="ts">
import DefaultHeader from '@/components/DefaultHeader.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TasksPage',
  components: {
    DefaultHeader,
  },
})
</script>

<style scoped></style>
