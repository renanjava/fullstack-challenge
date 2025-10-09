<template>
  <main class="columns is-gapless is-multiline">
    <DefaultHeader :primaryText="primaryText" :secondaryText="secondText">
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
  props: {
    primaryText: { type: String, required: true },
    secondText: { type: String, required: true },
  },
})
</script>

<style scoped></style>
