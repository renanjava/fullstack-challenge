<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css" />
  <DefaultMain :primary-text="'Projetos'" :second-text="'Organize seu trabalho em projetos'">
    <List :list="projectsList" />
  </DefaultMain>
</template>

<script lang="ts">
import { getGenericEndPoint } from '@/api'
import DefaultMain from '@/components/DefaultMain.vue'
import List from '@/components/List.vue'
import type { IProjects } from '@/interfaces.ts/projects.interface'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProjectsPage',
  components: {
    DefaultMain,
    List,
  },
  data() {
    return {
      projectsList: [] as IProjects[],
    }
  },
  async created() {
    this.projectsList = await getGenericEndPoint('projects')
  },
})
</script>

<style scoped></style>
