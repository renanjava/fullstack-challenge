<script lang="ts">
import { defineComponent } from 'vue'
import { loginEndPoint } from '../api/api'

export default defineComponent({
  name: 'LoginForm',
  emits: ['responseForm'],
  data() {
    return {
      username: '',
      password: '',
      successLogin: false,
      errorMessage: '',
    }
  },
  methods: {
    async submitForms() {
      const response = await loginEndPoint(this.username, this.password)
      if (response.access_token) {
        localStorage.setItem('access_token', response.access_token)
        this.successLogin = true
        this.$emit('responseForm', {
          successLogin: this.successLogin,
          errorMessage: this.errorMessage,
        })
        return
      }
      this.successLogin = false
      this.errorMessage = response.message
      this.$emit('responseForm', {
        successLogin: this.successLogin,
        errorMessage: this.errorMessage,
      })
      return
    },
  },
})
</script>

<template>
  <div class="login-container">
    <div class="box login-box">
      <div class="has-text-centered mb-5">
        <h1 class="title is-4 mt-4 mb-2">Time Tracker</h1>
        <p class="subtitle is-6 has-text-grey">Entre com suas credenciais para acessar sua conta</p>
      </div>

      <form @submit.prevent="submitForms">
        <div class="field">
          <label class="label">Usuário</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="Digite seu usuário"
              v-model="username"
              required
            />
          </div>
        </div>

        <div class="field">
          <label class="label">Senha</label>
          <div class="control">
            <input
              class="input"
              type="password"
              placeholder="Digite sua senha"
              v-model="password"
              required
            />
          </div>
        </div>

        <div class="field">
          <button class="button is-primary is-fullwidth" type="submit">Entrar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
* {
  color-scheme: light !important;
}

.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.login-box {
  width: 100%;
  max-width: 420px;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  background-color: #ffffff !important;
}

.title {
  color: #2c3e50 !important;
  font-weight: 700;
}

.subtitle {
  color: #6c757d !important;
}

.label {
  font-weight: 600;
  color: #4a5568 !important;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.input {
  border-radius: 6px;
  border: 2px solid #e1e4e8;
  background-color: #ffffff !important;
  color: #2c3e50 !important;
  transition: all 0.3s ease;
  padding-left: 2.5rem;
  height: 3rem;
}

.input::placeholder {
  color: #9ca3af !important;
}

.input:hover {
  border-color: #9ca3af;
}

.input:focus {
  border-color: #667eea !important;
  box-shadow: 0 0 0 0.125em rgba(102, 126, 234, 0.25) !important;
  outline: none;
}

.button.is-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  border: none !important;
  color: #ffffff !important;
  font-weight: 600;
  padding: 1.5rem;
  height: auto;
  transition: all 0.3s ease;
  border-radius: 6px;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
}

.button.is-primary:hover {
  background: linear-gradient(135deg, #5568d3 0%, #653a8b 100%) !important;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
}

.button.is-primary:active {
  transform: translateY(0);
  box-shadow: 0 2px 10px rgba(102, 126, 234, 0.3);
}

.login-box {
  animation: fadeInUp 0.5s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .login-box {
    padding: 2rem 1.5rem;
    max-width: 100%;
  }
}
</style>
