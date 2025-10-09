<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css" />
  <DefaultMain
    :primary-text="'Colaboradores'"
    :second-text="'Gerencie os colaboradores do sistema'"
  >
    <div class="box" v-for="collaborator in collaboratorsList">
      <p class="title">{{ collaborator.name }}</p>
    </div>
  </DefaultMain>
</template>

<script lang="ts">
import { getGenericEndPoint } from '@/api'
import DefaultMain from '@/components/DefaultMain.vue'
import type { ICollaborators } from '@/interfaces.ts/collaborators.interface'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CollaboratorsPage',
  components: {
    DefaultMain,
  },
  data() {
    return {
      collaboratorsList: [] as ICollaborators[],
    }
  },
  async created() {
    this.collaboratorsList = await getGenericEndPoint('collaborators')
  },
})
</script>

<style scoped></style>
