<template>
  <main class="columns is-gapless is-multiline">
    <DefaultHeader :primaryText="'Tarefas'" :secondaryText="'Gerencie e acompanhe suas tarefas'">
      <slot></slot>
    </DefaultHeader>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import DefaultHeader from './DefaultHeader.vue'

export default defineComponent({
  name: 'DefaultMain',
  components: {
    DefaultHeader,
  },
})
</script>

<style scoped></style>
