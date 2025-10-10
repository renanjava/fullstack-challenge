<template>
  <div class="buttons has-addons is-right">
    <button class="button is-success mb-4">Criar novo {{ name }}</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CreateButton',
  props: {
    name: { type: String, required: true },
  },
})
</script>

<style scoped></style>
