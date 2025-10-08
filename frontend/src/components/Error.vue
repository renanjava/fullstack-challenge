<template>
  <div class="notification is-danger">
    <button class="delete"></button>
    Erro: {{ message }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Error',
  props: {
    message: { type: String, required: true },
  },
})
</script>
