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
* {
  color-scheme: light !important;
}

.page-wrapper {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.notification-fixed {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 9999;
  max-width: 400px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.notification.is-success {
  background-color: #48c78e !important;
  color: #ffffff !important;
  border-left: 4px solid #3ab57a;
}

.notification.is-danger {
  background-color: #f14668 !important;
  color: #ffffff !important;
  border-left: 4px solid #d93654;
}

.notification-icon {
  color: #ffffff !important;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.notification-icon i {
  color: #ffffff !important;
}

.notification-text {
  color: #ffffff !important;
  font-weight: 600;
  flex: 1;
}

.notification .delete {
  background-color: rgba(255, 255, 255, 0.3) !important;
  flex-shrink: 0;
}

.notification .delete:hover {
  background-color: rgba(255, 255, 255, 0.5) !important;
}

.notification .delete::before,
.notification .delete::after {
  background-color: #ffffff !important;
}

.slide-fade-enter-active {
  animation: slideIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.slide-fade-leave-active {
  animation: slideOut 0.3s ease-in;
}

@keyframes slideIn {
  from {
    transform: translateX(120%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOut {
  from {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
  to {
    transform: translateX(120%) scale(0.9);
    opacity: 0;
  }
}

.notification.is-success {
  animation: successPulse 0.5s ease-out;
}

@keyframes successPulse {
  0% {
    transform: scale(0.95);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}

.notification.is-danger {
  animation: errorShake 0.5s ease-out;
}

@keyframes errorShake {
  0%,
  100% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-10px);
  }
  75% {
    transform: translateX(10px);
  }
}

@media (max-width: 768px) {
  .notification-fixed {
    top: 10px;
    right: 10px;
    left: 10px;
    max-width: calc(100% - 20px);
    font-size: 0.9rem;
  }

  .notification-icon {
    font-size: 1.25rem;
  }
}
</style>
