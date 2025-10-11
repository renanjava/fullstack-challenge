<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css" />
  <DefaultMain :primary-text="'Tarefas'" :second-text="'Gerencie e acompanhe suas tarefas'">
    <List :list="tasksList" />
  </DefaultMain>
</template>

<script lang="ts">
import { getGenericEndPoint } from '@/api/api'
import DefaultMain from '@/components/DefaultMain.vue'
import List from '@/components/List.vue'
import type { ITasks } from '@/interfaces.ts/tasks.interface'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TasksPage',
  components: {
    DefaultMain,
    List,
  },
  data() {
    return {
      tasksList: [] as ITasks[],
    }
  },
  async created() {
    this.tasksList = await getGenericEndPoint('tasks')
  },
})
</script>

<style scoped></style>
