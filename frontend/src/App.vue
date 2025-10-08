<script lang="ts">
import { defineComponent } from 'vue'
import LoginPage from './pages/LoginPage.vue'

export default defineComponent({
  name: 'App',
  components: {
    LoginPage,
  },
})
</script>

<template>
  <LoginPage />
</template>

<style scoped></style>
