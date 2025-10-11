<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css" />
  <DefaultMain :primary-text="'Tarefas'" :second-text="'Gerencie e acompanhe suas tarefas'">
    <CreateButton :buttonName="buttonName" @open-modal="handleCrudOperation" />
    <List :list="tasksList" @edit="handleCrudOperation" />
    <ModalForm
      :class="{ 'is-active': showEditOrCreateModal }"
      :inputData="taskJsonModal"
      :event="event"
      :entityName="entityName"
      :optional-id-data="taskIdModal"
      @close-modal="closeModalAndClearEditForm"
      @update-list-with-create="updateListWithNewCreatedData"
      @update-list-with-update="updateListWithNewUpdatedData"
    />
    />
  </DefaultMain>
</template>

<script lang="ts">
import { getGenericEndPoint } from '@/api/api'
import { useCrudOperations } from '@/api/utils/crud-operations'
import DefaultMain from '@/components/DefaultMain.vue'
import CreateButton from '@/components/CreateButton.vue'
import List from '@/components/List.vue'
import type { ITasks } from '@/interfaces/tasks.interface'
import { defineComponent, onMounted, ref } from 'vue'
import ModalForm from '@/components/ModalForm.vue'
import type { IProjects } from '@/interfaces/projects.interface'

export default defineComponent({
  name: 'TasksPage',
  components: {
    DefaultMain,
    List,
    CreateButton,
    ModalForm,
  },
  setup() {
    const tasksList = ref<ITasks[]>([])
    const showEditOrCreateModal = ref(false)
    const taskJsonModal = ref([
      { name: 'name', label: 'Nome da tarefa', type: 'text', required: true, editValue: '' },
      {
        name: 'description',
        label: 'Descrição',
        type: 'textarea',
        required: true,
        editValue: '',
      },
      {
        name: 'project_id',
        label: 'Nome do Projeto',
        type: 'select',
        required: false,
        options: [],
      },
    ])
    const formValuesFromComponent = ref('')
    const taskIdModal = ref('')
    const event = ref('')
    const buttonName = 'Criar nova tarefa'
    const entityName = 'tasks'
    const getProjects = ref([] as IProjects[])

    const { handleCrudOperation } = useCrudOperations<ITasks>('tasks', {
      listRef: tasksList,
      onEdit: (item) => {
        event.value = 'edit'
        taskJsonModal.value[0].editValue = item.name
        taskJsonModal.value[1].editValue = item.description
        taskIdModal.value = item.id
        showEditOrCreateModal.value = true
      },
      onCreate: () => {
        event.value = 'create'
        taskIdModal.value = ''
        showEditOrCreateModal.value = true
      },
    })

    const updateListWithNewCreatedData = (data: ITasks) => {
      tasksList.value.push(data)
      showEditOrCreateModal.value = false
    }

    const updateListWithNewUpdatedData = (data: ITasks) => {
      const index = tasksList.value.findIndex((p: ITasks) => p.id === data.id)
      if (index !== -1) {
        tasksList.value[index].name = data.name
        tasksList.value[index].description = data.description
      }
      closeModalAndClearEditForm()
    }

    const closeModalAndClearEditForm = () => {
      showEditOrCreateModal.value = !showEditOrCreateModal.value
      taskJsonModal.value[0].editValue = ''
      taskJsonModal.value[1].editValue = ''
    }

    onMounted(async () => {
      tasksList.value = await getGenericEndPoint('tasks')
      getProjects.value = await getGenericEndPoint('projects')
      taskJsonModal.value[2].options = getProjects.value.map((project) => {
        return {
          label: project.name,
          value: project.id,
        }
      })
    })

    return {
      tasksList,
      showEditOrCreateModal,
      taskJsonModal,
      taskIdModal,
      event,
      buttonName,
      entityName,
      formValuesFromComponent,
      handleCrudOperation,
      closeModalAndClearEditForm,
      updateListWithNewCreatedData,
      updateListWithNewUpdatedData,
    }
  },
})
</script>

<style scoped></style>
