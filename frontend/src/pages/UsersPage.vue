<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css" />
  <DefaultMain :primary-text="'Usuários'" :second-text="'Gerencie os usuários do sistema'">
    <h1>asodasokdoskdosak</h1>
  </DefaultMain>
</template>

<script lang="ts">
import DefaultMain from '@/components/DefaultMain.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UsersPage',
  components: {
    DefaultMain,
  },
})
</script>

<style scoped></style>
