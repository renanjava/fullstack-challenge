<template>
  <section>
    <strong class="display">{{ totalTime }}</strong>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'StopWatch',
  props: {
    timeInSeconds: { type: Number, default: 0 },
  },
  computed: {
    totalTime(): string {
      return new Date(this.timeInSeconds * 1000).toISOString().substr(11, 8)
    },
  },
})
</script>

<style scoped>
.display {
  color: var(--primary-text) !important;
}
</style>
