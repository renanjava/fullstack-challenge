<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'App',
    data() {
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        submitForms() {
            console.log(
                {username: this.username, password: this.password}
            );
            
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

<style scoped>
</style>
