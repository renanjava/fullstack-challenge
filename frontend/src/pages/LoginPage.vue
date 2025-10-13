<template>
  <div>
    <Notification
      :show="showSuccess"
      type="success"
      message="Usuário logado com sucesso!"
      :duration="1500"
      @close="closeNotification"
    />

    <Notification
      :show="error"
      type="danger"
      :message="errorMessage"
      :duration="4000"
      @close="closeNotification"
    />

    <LoginForm @response-form="handleResponseForm" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoginForm from '../components/LoginForm.vue'
import Notification from '../components/Notification.vue'

export default defineComponent({
  name: 'LoginPage',
  components: {
    LoginForm,
    Notification,
  },
  data() {
    return {
      error: false,
      errorMessage: '',
      showSuccess: false,
    }
  },
  methods: {
    handleResponseForm(responseForm: Record<string, any>) {
      if (!responseForm.successLogin) {
        this.error = true
        this.errorMessage = responseForm.errorMessage
        this.showSuccess = false
        return
      }

      this.error = false
      this.showSuccess = true
      setTimeout(() => {
        this.$router.push('/home')
      }, 1500)
    },
    closeNotification() {
      this.showSuccess = false
      this.error = false
    },
  },
})
</script>
