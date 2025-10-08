<template>
  <header>
    <h1 class="title">Time Tracker</h1>
    <h3 class="subtitle is-6 my-6">Menu principal</h3>
    <ul class="menu-list">
      <li><a>Dashboard</a></li>
      <li><a>Tarefas</a></li>
      <li><a>Projetos</a></li>
      <li><a>Usuários</a></li>
      <li><a>Colaboradores</a></li>
      <li><a>Relatórios</a></li>
    </ul>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BarraLateral',
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
