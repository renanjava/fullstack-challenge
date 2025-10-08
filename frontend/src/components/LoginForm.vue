<script lang="ts">
import { defineComponent } from 'vue'
import { loginEndPoint } from '../api'

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
  <form class="box" @submit.prevent="submitForms">
    <h3 class="subtitle is-6">Entre com suas credencias para acessar sua conta</h3>
    <div class="field">
      <label class="label">Nome de usuário</label>
      <div class="control">
        <input class="input" type="username" placeholder="e.g. alex123" v-model="username" />
      </div>
    </div>
    <div class="field">
      <label class="label">Senha</label>
      <div class="control">
        <input class="input" type="password" placeholder="********" v-model="password" />
      </div>
    </div>
    <button class="button is-primary">Login</button>
  </form>
</template>
