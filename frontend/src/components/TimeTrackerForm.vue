<template>
  <div class="box formulario">
    <div class="columns">
      <div class="column is-8" role="form" aria-label="Formulário para criação de uma nova tarefa">
        <div class="select is-fullwidth">
          <select v-model="selectTask" :required="true">
            <option disabled value="">Selecione uma opção</option>
            <option v-for="task in nameList" :key="task.value" :value="task.value">
              {{ task.label }}
            </option>
          </select>
        </div>
        <div class="column">
          <Timer @to-timer-finished="finishTask" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import Timer from './Timer.vue'

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
    finishTask(totalTime: number): void {
      const tarefa = {
        secondsDuration: totalTime,
        taskId: this.selectTask,
      }
      this.$emit('submitTarefa', tarefa)
    },
  },
})
</script>
