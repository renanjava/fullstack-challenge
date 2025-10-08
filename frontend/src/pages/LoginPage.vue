<script lang="ts">
import { defineComponent } from 'vue'
import LoginForm from '../components/LoginForm.vue'
import Error from '../components/Error.vue'

export default defineComponent({
  name: 'LoginPage',
  components: {
    LoginForm,
    Error,
  },
  data() {
    return {
      error: false,
      errorMessage: '',
    }
  },
  methods: {
    handleResponseForm(responseForm: Record<string, any>) {
      this.error = !responseForm.successLogin
      if (this.error) {
        this.errorMessage = responseForm.errorMessage
      }
    },
  },
})
</script>

<template>
  <LoginForm @response-form="handleResponseForm" />
  <Error v-if="error === true" :message="errorMessage" />
  <div class="notification is-success" v-else>
    <button class="delete"></button>
    Usuário logado com sucesso!
  </div>
</template>

<style scoped></style>
