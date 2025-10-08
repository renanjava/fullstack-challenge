<template>
  <div class="notification is-danger">
    <button class="delete"></button>
    Erro: {{ message }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ErrorComponent',
  props: {
    message: { type: String, required: true },
  },
})
</script>
