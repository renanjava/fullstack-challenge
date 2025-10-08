<template>
  <div class="column is-one-quarter">
    <SideBar />
  </div>

  <div class="column is-three-quarter">
    <section class="hero is-small is-link">
      <div class="hero-body"></div>
    </section>
    <h1 class="title has-text-primary-00">{{ primaryText }}</h1>
    <h3 class="subtitle is-6 has-text-primary-00">{{ secondaryText }}</h3>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SideBar from './SideBar.vue'

export default defineComponent({
  name: 'DefaultHeader',
  components: {
    SideBar,
  },
  props: {
    primaryText: { type: String, required: true },
    secondaryText: { type: String, required: true },
  },
})
</script>

<style scoped>
.hero,
.column {
  background-color: #ffffffee !important;
}
.hero-body {
  background-color: #fff;
}
</style>
