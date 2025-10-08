<script lang="ts">
import { defineComponent } from 'vue';
import { loginEndPoint } from '../api';

export default defineComponent({
    name: 'LoginForm',
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        async submitForms() {
            console.log(
                {username: this.username, password: this.password}
            );
            const response = await loginEndPoint(this.username, this.password)
            console.log({response});
            
        }
    }
})
</script>

<template>
    <form class="box" @submit.prevent="submitForms">
        <h3 class="subtitle is-6">Entre com suas credencias para acessar sua conta</h3>
        <div class="field">
            <label class="label">Nome de usuário</label>
            <div class="control">
                <input class="input" type="username" placeholder="e.g. alex123" v-model="username"/>
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
