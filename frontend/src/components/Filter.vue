<template>
  <div class="date-selector">
    <label class="selector-label">Filtro</label>
    <div class="select">
      <select>
        <option value="project">Projeto</option>
        <option value="collaborator">Colaborador</option>
      </select>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Filter',
})
</script>
