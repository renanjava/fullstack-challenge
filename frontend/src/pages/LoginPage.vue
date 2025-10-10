<script lang="ts">
import { defineComponent } from 'vue'
import LoginForm from '../components/LoginForm.vue'

export default defineComponent({
  name: 'LoginPage',
  components: {
    LoginForm,
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

<template>
  <div>
    <transition name="slide-fade">
      <div class="notification is-success notification-fixed" v-if="showSuccess">
        <button class="delete" @click="closeNotification"></button>
        Usuário logado com sucesso!
      </div>
    </transition>

    <transition name="slide-fade">
      <div class="notification is-danger notification-fixed" v-if="error">
        <button class="delete" @click="closeNotification"></button>
        {{ errorMessage }}
      </div>
    </transition>

    <LoginForm @response-form="handleResponseForm" />
  </div>
</template>

<style scoped>
.notification-fixed {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  max-width: 400px;
}

.notification {
  background-color: white !important;
}

.notification.is-success {
  background-color: #48c78e !important;
  color: white !important;
}

.notification.is-danger {
  background-color: #f14668 !important;
  color: white !important;
}

.slide-fade-enter-active {
  animation: slideIn 0.3s ease-out;
}

.slide-fade-leave-active {
  animation: slideOut 0.3s ease-in;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOut {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}
</style>
