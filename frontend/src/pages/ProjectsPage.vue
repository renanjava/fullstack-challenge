<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css" />
  <DefaultMain :primary-text="'Projetos'" :second-text="'Organize seu trabalho em projetos'">
    <div class="box" v-for="project in projectsList">
      <p class="title">{{ project.name }}</p>
    </div>
  </DefaultMain>
</template>

<script lang="ts">
import { getGenericEndPoint } from '@/api'
import DefaultMain from '@/components/DefaultMain.vue'
import type { IProjects } from '@/interfaces.ts/projects.interface'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ProjectsPage',
  components: {
    DefaultMain,
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
