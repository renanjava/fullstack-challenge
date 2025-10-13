<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css" />
  <DefaultMain :primary-text="'Tarefas'" :second-text="'Gerencie e acompanhe suas tarefas'">
    <Notification
      :show="notification.show"
      :type="notification.type"
      :message="notification.message"
      :duration="3000"
      @close="notification.show = false"
    />
    <TimeTrackerForm
      v-if="tasksList.length > 0"
      :task-name-list="taskNameList"
      :collaborator-list="collaboratorsNameList"
      @task-completed="handleTaskCompleted"
    />
    <Filter
      :collaborator-list="collaboratorsNameList"
      :project-list="projectNameList"
      @filter-applied="applyFilter"
    />
    <CreateButton :buttonName="buttonName" @open-modal="handleCrudOperation" />
    <List :list="filteredTasksList" @edit="handleCrudOperation" @delete="handleCrudOperation" />
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
  </DefaultMain>
</template>

<script lang="ts">
import { getGenericEndPoint } from '@/api/api'
import { useCrudOperations } from '@/api/utils/crud-operations'
import DefaultMain from '@/components/DefaultMain.vue'
import CreateButton from '@/components/CreateButton.vue'
import List from '@/components/List.vue'
import type { ITasks } from '@/interfaces/tasks.interface'
import { computed, defineComponent, onMounted, ref } from 'vue'
import ModalForm from '@/components/ModalForm.vue'
import type { IProjects } from '@/interfaces/projects.interface'
import TimeTrackerForm from '@/components/TimeTrackerForm.vue'
import type { ICollaborators } from '@/interfaces/collaborators.interface'
import Filter from '@/components/Filter.vue'
import Notification from '@/components/Notification.vue'

export default defineComponent({
  name: 'TasksPage',
  components: {
    DefaultMain,
    List,
    CreateButton,
    ModalForm,
    TimeTrackerForm,
    Filter,
    Notification,
  },
  setup() {
    const notification = ref({
      show: false,
      type: 'success' as 'success' | 'danger' | 'warning' | 'info',
      message: '',
    })
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
        required: true,
        options: [],
      },
    ])
    const taskIdModal = ref('')
    const event = ref('')
    const buttonName = 'Criar nova tarefa'
    const entityName = 'tasks'
    const getProjects = ref([] as IProjects[])
    const getCollaborators = ref([] as ICollaborators[])
    const activeFilter = ref<{ type: string; id: string } | null>(null)
    const taskIdsFromCollaborator = ref<string[]>([])

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

    const notify = {
      success: (message: string) => {
        notification.value = { show: true, type: 'success', message }
      },
      error: (message: string) => {
        notification.value = { show: true, type: 'danger', message }
      },
      warning: (message: string) => {
        notification.value = { show: true, type: 'warning', message }
      },
      info: (message: string) => {
        notification.value = { show: true, type: 'info', message }
      },
    }

    const handleTaskCompleted = () => {
      notify.success('Tempo de tarefa registrada com sucesso!')
    }

    const taskNameList = computed(() => {
      return tasksList.value.map((task) => ({
        label: task.name,
        value: task.id,
      }))
    })

    const collaboratorsNameList = computed(() => {
      return getCollaborators.value.map((collaborator) => ({
        label: collaborator.name,
        value: collaborator.id,
      }))
    })

    const projectNameList = computed(() => {
      return getProjects.value.map((project) => ({
        label: project.name,
        value: project.id,
      }))
    })

    const filteredTasksList = computed(() => {
      if (!activeFilter.value) {
        return tasksList.value
      }

      if (activeFilter.value.type === 'project') {
        return tasksList.value.filter((task) => task.project_id === activeFilter.value!.id)
      }

      if (activeFilter.value.type === 'collaborator') {
        return tasksList.value.filter((task) => taskIdsFromCollaborator.value.includes(task.id))
      }

      return tasksList.value
    })

    const updateListWithNewCreatedData = (data: ITasks) => {
      try {
        tasksList.value.push(data)
        showEditOrCreateModal.value = false
        notify.success('Tarefa criada com sucesso!')
      } catch (error) {
        notify.error('Erro ao criar tarefa. Tente novamente.')
      }
    }

    const updateListWithNewUpdatedData = (data: ITasks) => {
      const index = tasksList.value.findIndex((p: ITasks) => p.id === data.id)
      if (index !== -1) {
        tasksList.value[index].name = data.name
        tasksList.value[index].description = data.description
      }
      closeModalAndClearEditForm()
      notify.success('Tarefa editada com sucesso!')
    }

    const closeModalAndClearEditForm = () => {
      showEditOrCreateModal.value = !showEditOrCreateModal.value
      taskJsonModal.value[0].editValue = ''
      taskJsonModal.value[1].editValue = ''
    }

    const applyFilter = async (data: { type: string; value: string }) => {
      if (!data.type || !data.value) {
        activeFilter.value = null
        taskIdsFromCollaborator.value = []
        return
      }

      activeFilter.value = { type: data.type, id: data.value }

      if (data.type === 'collaborator') {
        try {
          const timeTrackers = await getGenericEndPoint('time-trackers')
          taskIdsFromCollaborator.value = timeTrackers
            .filter((tracker: any) => tracker.collaborator_id === data.value)
            .map((tracker: any) => tracker.task_id)
            .filter((value: string, index: number, self: string[]) => self.indexOf(value) === index)
        } catch (error) {
          console.error('Erro ao buscar time trackers:', error)
          taskIdsFromCollaborator.value = []
        }
      }
    }

    onMounted(async () => {
      tasksList.value = await getGenericEndPoint('tasks')
      getProjects.value = await getGenericEndPoint('projects')
      getCollaborators.value = await getGenericEndPoint('collaborators')
      taskJsonModal.value[2].options = getProjects.value.map((project) => {
        return {
          label: project.name,
          value: project.id,
        }
      })
      taskNameList.value = tasksList.value.map((task) => {
        return {
          label: task.name,
          value: task.id,
        }
      })
    })

    return {
      tasksList,
      filteredTasksList,
      showEditOrCreateModal,
      taskJsonModal,
      taskIdModal,
      taskNameList,
      projectNameList,
      event,
      buttonName,
      entityName,
      getCollaborators,
      collaboratorsNameList,
      notification,
      notify,
      handleTaskCompleted,
      handleCrudOperation,
      closeModalAndClearEditForm,
      updateListWithNewCreatedData,
      updateListWithNewUpdatedData,
      applyFilter,
    }
  },
})
</script>

<style scoped></style>
