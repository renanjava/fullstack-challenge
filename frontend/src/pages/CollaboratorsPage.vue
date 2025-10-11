<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css" />
  <DefaultMain
    :primary-text="'Colaboradores'"
    :second-text="'Gerencie os colaboradores do sistema'"
  >
    <List :list="collaboratorsList" />
  </DefaultMain>
</template>

<script lang="ts">
import { getGenericEndPoint } from '@/api/api'
import DefaultMain from '@/components/DefaultMain.vue'
import List from '@/components/List.vue'
import type { ICollaborators } from '@/interfaces.ts/collaborators.interface'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CollaboratorsPage',
  components: {
    DefaultMain,
    List,
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
