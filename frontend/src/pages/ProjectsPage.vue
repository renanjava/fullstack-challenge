<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css" />
  <DefaultMain :primary-text="'Projetos'" :second-text="'Organize seu trabalho em projetos'">
    <CreateButton :name="name" @open-modal="handleCrudOperation" />
    <List :list="projectsList" @edit="handleCrudOperation" @delete="handleCrudOperation" />
    <ModalForm
      :class="{ 'is-active': showEditOrCreateModal }"
      :inputData="projectNameModal"
      :event="event"
      :optional-id-data="projectIdModal"
      @close-modal="showEditOrCreateModal = !showEditOrCreateModal"
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
import type { IProjects } from '@/interfaces.ts/projects.interface'

export default defineComponent({
  name: 'ProjectsPage',
  components: { DefaultMain, List, CreateButton, ModalForm },
  setup() {
    const projectsList = ref<IProjects[]>([])
    const showEditOrCreateModal = ref(false)
    const projectNameModal = ref('')
    const projectIdModal = ref('')
    const event = ref('')
    const name = 'projeto'

    const { handleCrudOperation } = useCrudOperations<IProjects>('projects', {
      listRef: projectsList,
      onEdit: (item) => {
        event.value = 'edit'
        projectNameModal.value = item.name
        projectIdModal.value = item.id
        showEditOrCreateModal.value = true
      },
      onCreate: () => {
        event.value = 'create'
        projectIdModal.value = ''
        projectNameModal.value = ''
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

    return {
      projectsList,
      showEditOrCreateModal,
      projectNameModal,
      projectIdModal,
      event,
      name,
      handleCrudOperation,
      updateListWithNewCreatedData,
      updateListWithNewUpdatedData,
    }
  },
})
</script>

<style scoped></style>
