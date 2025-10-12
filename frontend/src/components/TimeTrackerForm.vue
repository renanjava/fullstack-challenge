<template>
  <div class="box formulario">
    <div class="columns">
      <div
        class="column is-8"
        role="form"
        aria-label="Formulário para criação do timer de uma tarefa"
      >
        <div class="columns is-variable is-2">
          <div class="column">
            <div class="field">
              <label class="label">Tarefa (Obrigatório)</label>
              <div class="control">
                <div class="select is-fullwidth">
                  <select v-model="selectTask" required>
                    <option disabled value="">Selecione uma tarefa</option>
                    <option v-for="task in nameList" :key="task.value" :value="task.value">
                      {{ task.label }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div class="column">
            <div class="field">
              <label class="label">Colaborador (Opcional)</label>
              <div class="control">
                <div class="select is-fullwidth">
                  <select v-model="selectCollaborator">
                    <option disabled value="">Selecione um colaborador</option>
                    <option
                      v-for="collaborator in collaboratorList"
                      :key="collaborator.value"
                      :value="collaborator.value"
                    >
                      {{ collaborator.label }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="column has-text-centered mt-4">
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
  data() {
    return {
      selectTask: '',
      selectCollaborator: '',
    }
  },
  computed: {
    nameList() {
      return this.taskNameList
    },
  },
  props: {
    taskNameList: { type: Array as PropType<Array<{ label: string; value: string }>> },
    collaboratorList: { type: Array as PropType<Array<{ label: string; value: string }>> },
  },
  methods: {
    async finishTask(totalTime: Record<string, any>) {
      const createTaskPayload = {
        ...totalTime,
        task_id: this.selectTask,
        collaborator_id: undefined as undefined | string,
      }
      if (this.selectCollaborator != '') {
        createTaskPayload.collaborator_id = this.selectCollaborator
      }
      await postGenericEndPoint('time-trackers', createTaskPayload)
    },
  },
})
</script>

<style scoped>
.formulario {
  background-color: #ffffff;
  border: 1px solid #e1e4e8;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.label {
  color: #4a5568;
  font-weight: 600;
  font-size: 0.9rem;
}

.select select {
  background-color: #ffffff;
  border-color: #d1d5db;
  color: #2c3e50;
  transition: all 0.2s ease;
}

.select select:hover {
  border-color: #9ca3af;
}

.select select:focus {
  border-color: #3273dc;
  box-shadow: 0 0 0 0.125em rgba(50, 115, 220, 0.25);
  outline: none;
}

.select select option {
  background-color: #ffffff;
  color: #2c3e50;
  padding: 0.5rem;
}

.select select option:disabled {
  color: #9ca3af;
  font-style: italic;
}

.select select option:checked {
  background-color: #3273dc;
  color: #ffffff;
}

.select select:required:invalid {
  border-color: #f14668;
}

.formulario * {
  color-scheme: light;
}

.field {
  margin-bottom: 0.75rem;
}

.select:hover select {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .formulario {
    padding: 1rem;
  }

  .label {
    font-size: 0.85rem;
  }
}
</style>
