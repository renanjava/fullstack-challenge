<script lang="ts">
import SideBar from '@/components/SideBar.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomePage',
  components: {
    SideBar,
  },
})
</script>

<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css" />
  <main class="columns is-gapless is-multiline">
    <div class="column is-one-quarter">
      <SideBar />
    </div>
    <div class="column is-three-quarter">teste</div>
  </main>
</template>

<style scoped></style>
