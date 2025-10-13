<template>
  <transition name="slide-fade">
    <div v-if="show" class="notification-toast" :class="[`is-${type}`, { 'is-mobile': isMobile }]">
      <div class="notification-content">
        <span class="notification-icon">
          <i :class="iconClass"></i>
        </span>
        <span class="notification-text">{{ message }}</span>
        <button class="delete" @click="close" aria-label="Fechar notificação"></button>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Notification',
  props: {
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'info',
      validator: (value: string) => ['success', 'danger', 'warning', 'info'].includes(value),
    },
    duration: {
      type: Number,
      default: 3000,
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['close'],
  data() {
    return {
      timeoutId: null as number | null,
      isMobile: false,
    }
  },
  computed: {
    iconClass() {
      const icons = {
        success: 'fas fa-check-circle',
        danger: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle',
      }
      return icons[this.type as keyof typeof icons] || icons.info
    },
  },
  watch: {
    show(newValue) {
      if (newValue && this.duration > 0) {
        this.startTimer()
      }
    },
  },
  mounted() {
    this.checkMobile()
    window.addEventListener('resize', this.checkMobile)
    if (this.show && this.duration > 0) {
      this.startTimer()
    }
  },
  beforeUnmount() {
    this.clearTimer()
    window.removeEventListener('resize', this.checkMobile)
  },
  methods: {
    close() {
      this.clearTimer()
      this.$emit('close')
    },
    startTimer() {
      this.clearTimer()
      this.timeoutId = window.setTimeout(() => {
        this.close()
      }, this.duration)
    },
    clearTimer() {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId)
        this.timeoutId = null
      }
    },
    checkMobile() {
      this.isMobile = window.innerWidth <= 768
    },
  },
})
</script>

<style scoped>
* {
  color-scheme: light !important;
}

.notification-toast {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 99999;
  max-width: 400px;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
}

.notification-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.25rem;
}

.notification-icon {
  color: #ffffff !important;
  font-size: 1.5rem;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.notification-icon i {
  color: #ffffff !important;
}

.notification-text {
  color: #ffffff !important;
  font-weight: 600;
  flex: 1;
  word-break: break-word;
}

.notification-toast .delete {
  background-color: rgba(255, 255, 255, 0.3) !important;
  flex-shrink: 0;
  margin-left: auto;
}

.notification-toast .delete:hover {
  background-color: rgba(255, 255, 255, 0.5) !important;
}

.notification-toast .delete::before,
.notification-toast .delete::after {
  background-color: #ffffff !important;
}

.notification-toast.is-success {
  background-color: #48c78e !important;
  border-left: 4px solid #3ab57a;
  animation: successPulse 0.5s ease-out;
}

.notification-toast.is-danger {
  background-color: #f14668 !important;
  border-left: 4px solid #d93654;
  animation: errorShake 0.5s ease-out;
}

.notification-toast.is-warning {
  background-color: #ffe08a !important;
  border-left: 4px solid #ffd83d;
}

.notification-toast.is-warning .notification-icon,
.notification-toast.is-warning .notification-text {
  color: #947600 !important;
}

.notification-toast.is-warning .notification-icon i {
  color: #947600 !important;
}

.notification-toast.is-warning .delete::before,
.notification-toast.is-warning .delete::after {
  background-color: #947600 !important;
}

.notification-toast.is-info {
  background-color: #3e8ed0 !important;
  border-left: 4px solid #296fa8;
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
  .notification-toast {
    top: 10px;
    right: 10px;
    left: 10px;
    max-width: calc(100% - 20px);
  }

  .notification-content {
    font-size: 0.9rem;
    padding: 1rem;
  }

  .notification-icon {
    font-size: 1.25rem;
  }
}

@media (max-width: 480px) {
  .notification-toast {
    top: 5px;
    right: 5px;
    left: 5px;
    max-width: calc(100% - 10px);
  }

  .notification-content {
    font-size: 0.85rem;
    padding: 0.875rem;
    gap: 0.5rem;
  }

  .notification-icon {
    font-size: 1.1rem;
  }
}
</style>
