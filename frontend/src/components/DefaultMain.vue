<template>
  <main class="main-wrapper">
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

<style scoped>
.main-wrapper {
  min-height: 100vh;
  background-color: #f8f9fa !important;
  color-scheme: light !important;
}
</style>
