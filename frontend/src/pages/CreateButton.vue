<template>
  <div class="buttons has-addons is-right">
    <button class="button is-success mb-4" @click="$emit('openModal')">
      Criar novo {{ name }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CreateButton',
  emits: ['openModal'],
  props: {
    name: { type: String, required: true },
  },
})
</script>

<style scoped></style>
