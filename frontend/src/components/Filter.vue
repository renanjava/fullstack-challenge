<template>
  <form class="box filter-form" @submit.prevent="applyFilter">
    <h3 class="title is-5 has-text-weight-semibold mb-4">Filtro</h3>

    <div class="columns is-variable is-2 is-multiline">
      <div class="column is-5">
        <div class="field">
          <label class="label">Tipo</label>
          <div class="control">
            <div class="select is-fullwidth">
              <select v-model="typeFilter">
                <option value="project">Projeto</option>
                <option value="collaborator">Colaborador</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="column is-5">
        <div class="field">
          <label class="label">Valor</label>
          <div class="control">
            <div class="select is-fullwidth">
              <select v-model="dataFilter">
                <option disabled value="">Selecione...</option>
                <option
                  v-if="typeFilter === 'project'"
                  v-for="option in projectList"
                  :key="'project-' + option.value"
                  :value="option.value"
                >
                  {{ option.label }}
                </option>
                <option
                  v-else-if="typeFilter === 'collaborator'"
                  v-for="option in collaboratorList"
                  :key="'collaborator-' + option.value"
                  :value="option.value"
                >
                  {{ option.label }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div class="column is-2 is-flex is-align-items-end">
        <button class="button is-primary is-fullwidth" type="submit" :disabled="!dataFilter">
          Aplicar
        </button>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'FilterForm',
  props: {
    projectList: {
      type: Array as () => { label: string; value: string }[],
      required: true,
    },
    collaboratorList: {
      type: Array as () => { label: string; value: string }[],
      required: true,
    },
  },
  setup(props, { emit }) {
    const typeFilter = ref('project')
    const dataFilter = ref('')

    watch(typeFilter, () => {
      dataFilter.value = ''
    })

    const applyFilter = () => {
      emit('filter-applied', {
        type: typeFilter.value,
        value: dataFilter.value,
      })
    }

    return { typeFilter, dataFilter, applyFilter }
  },
})
</script>

<style scoped>
.filter-form {
  max-width: 700px;
  margin: 1rem auto;
}

button.is-primary {
  font-weight: 600;
}

@media (max-width: 768px) {
  .filter-form {
    padding: 1rem;
  }
}
</style>
