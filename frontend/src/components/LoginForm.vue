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
        <div class="icon-wrapper">
          <span class="icon is-large">
            <i class="fas fa-lock fa-2x"></i>
          </span>
        </div>
        <h1 class="title is-4 mt-4 mb-2">Time Tracker</h1>
        <p class="subtitle is-6 has-text-grey">Entre com suas credenciais para acessar sua conta</p>
      </div>

      <form @submit.prevent="submitForms">
        <div class="field">
          <label class="label">Usuário</label>
          <div class="control has-icons-left">
            <input
              class="input"
              type="text"
              placeholder="Digite seu usuário"
              v-model="username"
              required
            />
            <span class="icon is-small is-left">
              <i class="fas fa-user"></i>
            </span>
          </div>
        </div>

        <div class="field">
          <label class="label">Senha</label>
          <div class="control has-icons-left">
            <input
              class="input"
              type="password"
              placeholder="Digite sua senha"
              v-model="password"
              required
            />
            <span class="icon is-small is-left">
              <i class="fas fa-lock"></i>
            </span>
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
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
  padding: 20px;
}

.login-box {
  width: 100%;
  max-width: 420px;
  padding: 2.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.icon-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
}

.icon-wrapper .icon {
  color: white;
}

.button.is-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  font-weight: 600;
  padding: 1.5rem;
  height: auto;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.button.is-primary:hover {
  background: linear-gradient(135deg, #5568d3 0%, #653a8b 100%);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.label {
  font-weight: 600;
  color: #363636;
  margin-bottom: 0.5rem;
}

.input {
  border-radius: 4px;
  border-color: #dbdbdb;
}

.input:focus {
  border-color: #667eea;
  box-shadow: 0 0 0 0.125em rgba(102, 126, 234, 0.25);
}
</style>
