<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css" />
  <DefaultMain :primary-text="'Projetos'" :second-text="'Organize seu trabalho em projetos'">
    <CreateButton :buttonName="buttonName" @open-modal="handleCrudOperation" />
    <!--
    <div class="date-selector">
      <label class="selector-label">Período do Tempo</label>
      <div class="select">
        <select>
          <option value="today">Hoje</option>
          <option value="week">Esta Semana</option>
          <option value="month">Este Mês</option>
          <option value="year">Este Ano</option>
          <option value="custom">Personalizado</option>
        </select>
      </div>
    </div>
    -->
    <List :list="projectsList" @edit="handleCrudOperation" @delete="handleCrudOperation" />
    <ModalForm
      :class="{ 'is-active': showEditOrCreateModal }"
      :inputData="projectJsonModal"
      :event="event"
      :entityName="entityName"
      :optional-id-data="projectIdModal"
      @close-modal="closeModalAndClearEditForm"
      @update-list-with-create="updateListWithNewCreatedData"
      @update-list-with-update="updateListWithNewUpdatedData"
    />
  </DefaultMain>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import DefaultMain from '@/components/DefaultMain.vue'
import List from '@/components/List.vue'
import CreateButton from '../components/CreateButton.vue'
import ModalForm from '@/components/ModalForm.vue'
import { getGenericEndPoint } from '@/api/api'
import { useCrudOperations } from '@/api/utils/crud-operations'
import type { IProjects } from '@/interfaces/projects.interface'

export default defineComponent({
  name: 'ProjectsPage',
  components: { DefaultMain, List, CreateButton, ModalForm },
  setup() {
    const projectsList = ref<IProjects[]>([])
    const showEditOrCreateModal = ref(false)
    const projectJsonModal = ref([
      { name: 'name', label: 'Nome do projeto', type: 'text', required: true, editValue: '' },
    ])
    const projectIdModal = ref('')
    const event = ref('')
    const buttonName = 'Criar novo projeto'
    const entityName = 'projects'

    const { handleCrudOperation } = useCrudOperations<IProjects>('projects', {
      listRef: projectsList,
      onEdit: (item) => {
        event.value = 'edit'
        projectJsonModal.value[0].editValue = item.name
        projectIdModal.value = item.id
        showEditOrCreateModal.value = true
      },
      onCreate: () => {
        event.value = 'create'
        projectIdModal.value = ''
        projectJsonModal.value[0].editValue = ''
        showEditOrCreateModal.value = true
      },
    })

    const updateListWithNewCreatedData = (data: IProjects) => {
      projectsList.value.push(data)
      showEditOrCreateModal.value = false
    }

    const updateListWithNewUpdatedData = (data: IProjects) => {
      const index = projectsList.value.findIndex((p) => p.id === data.id)
      if (index !== -1) projectsList.value[index].name = data.name
      showEditOrCreateModal.value = false
    }

    onMounted(async () => {
      projectsList.value = await getGenericEndPoint('projects')
    })

    const closeModalAndClearEditForm = () => {
      showEditOrCreateModal.value = !showEditOrCreateModal.value
      projectJsonModal.value[0].editValue = ''
    }

    return {
      projectsList,
      showEditOrCreateModal,
      projectJsonModal,
      projectIdModal,
      event,
      buttonName,
      entityName,
      closeModalAndClearEditForm,
      handleCrudOperation,
      updateListWithNewCreatedData,
      updateListWithNewUpdatedData,
    }
  },
})
</script>

<style scoped></style>
