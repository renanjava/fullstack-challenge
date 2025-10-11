<template>
  <div class="box formulario">
    <div class="columns">
      <div
        class="column is-8"
        role="form"
        aria-label="Formulário para criação do timer de uma tarefa"
      >
        <div class="select is-fullwidth">
          <select v-model="selectTask" :required="true">
            <option disabled value="">Selecione uma tarefa</option>
            <option v-for="task in nameList" :key="task.value" :value="task.value">
              {{ task.label }}
            </option>
          </select>
        </div>
        <div class="column">
          <Timer @to-timer-finished="finishTask" :task-selected="!!selectTask" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import Timer from './Timer.vue'
import { postGenericEndPoint } from '@/api/api'

export default defineComponent({
  name: 'TimeTrackerForm',
  components: {
    Timer,
  },
  emits: ['submitTarefa'],
  data() {
    return {
      selectTask: '',
    }
  },
  computed: {
    nameList() {
      return this.taskNameList
    },
  },
  props: {
    taskNameList: { type: Array as PropType<Array<{ label: string; value: string }>> },
  },
  methods: {
    async finishTask(totalTime: Record<string, any>) {
      const createTaskPayload = {
        ...totalTime,
        task_id: this.selectTask,
      }

      const response = await postGenericEndPoint('time-trackers', createTaskPayload)
      console.log({ response_time_tracker: response })

      this.$emit('submitTarefa', createTaskPayload)
    },
  },
})
</script>
