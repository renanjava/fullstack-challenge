<template>
  <header>
    <h1 class="title">Time Tracker</h1>
    <h3 class="subtitle is-6 my-6">Menu principal</h3>
    <ul v-for="item in menuItems" :key="item.title" class="menu-list">
      <li>
        <a @click="redirectPage(item.url)">{{ item.title }}</a>
      </li>
    </ul>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BarraLateral',
  methods: {
    redirectPage(page: string) {
      this.$router.push(page)
    },
  },
  data() {
    return {
      menuItems: [
        { title: 'Dashboard', url: '/home' },
        { title: 'Tarefas', url: '/tasks' },
        { title: 'Projetos', url: '/projects' },
        { title: 'Usuários', url: '/users' },
        { title: 'Colaboradores', url: '/collaborators' },
        { title: 'Relatórios', url: '/relatory' },
      ],
    }
  },
})
</script>

<style scoped>
header {
  padding: 1rem;
  background: #0d3b66;
  width: 100%;
  height: 100vh;
  text-align: center;
}

@media only screen and (max-width: 768px) {
  header {
    padding: 2.5rem;
    height: auto;
  }
}
</style>
