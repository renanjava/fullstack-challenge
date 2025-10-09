<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css" />
  <DefaultMain :primary-text="'Tarefas'" :second-text="'Gerencie e acompanhe suas tarefas'">
    <div class="box" v-for="task in tasksList">
      <p class="title">{{ task.name }}</p>
      <p class="subtitle">{{ task.description }}</p>
    </div>
  </DefaultMain>
</template>

<script lang="ts">
import { getGenericEndPoint } from '@/api'
import DefaultMain from '@/components/DefaultMain.vue'
import type { ITasks } from '@/interfaces.ts/tasks.interface'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TasksPage',
  components: {
    DefaultMain,
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
