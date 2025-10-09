<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css" />
  <DefaultMain :primary-text="'Projetos'" :second-text="'Organize seu trabalho em projetos'">
    <h1>asodasokdoskdosak</h1>
  </DefaultMain>
</template>

<script lang="ts">
import DefaultMain from '@/components/DefaultMain.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProjectsPage',
  components: {
    DefaultMain,
  },
})
</script>

<style scoped></style>
