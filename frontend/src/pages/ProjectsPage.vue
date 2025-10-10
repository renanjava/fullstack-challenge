<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css" />
  <DefaultMain :primary-text="'Projetos'" :second-text="'Organize seu trabalho em projetos'">
    <CreateButton :name="name" @open-modal="crudOperation" />
    <List :list="projectsList" @edit="crudOperation" @delete="crudOperation" />
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
import { deleteGenericEndPoint, getGenericEndPoint } from '@/api'
import DefaultMain from '@/components/DefaultMain.vue'
import List from '@/components/List.vue'
import type { IProjects } from '@/interfaces.ts/projects.interface'
import { defineComponent } from 'vue'
import CreateButton from './CreateButton.vue'
import ModalForm from '@/components/ModalForm.vue'

export default defineComponent({
  name: 'ProjectsPage',
  components: {
    DefaultMain,
    List,
    CreateButton,
    ModalForm,
  },
  data() {
    return {
      projectsList: [] as IProjects[],
      name: 'projeto',
      showEditOrCreateModal: false,
      projectNameModal: '',
      projectIdModal: '',
      event: '',
    }
  },
  methods: {
    async crudOperation(data: Record<string, any>) {
      switch (data.event) {
        case 'delete':
          await deleteGenericEndPoint('projects', data.item.id)
          this.projectsList = this.projectsList.filter((project) => project.id != data.item.id)
          break
        case 'edit':
          console.log({ dataevent: data.event })
          this.event = data.event
          this.projectNameModal = data.item.name
          this.projectIdModal = data.item.id
          this.showEditOrCreateModal = true
          break
        case 'create':
          console.log({ dataevent: data.event })
          this.event = data.event
          this.projectIdModal = ''
          this.projectNameModal = ''
          this.showEditOrCreateModal = true
          break
      }
    },
    updateListWithNewCreatedData(data: IProjects) {
      this.projectsList.push(data)
      this.showEditOrCreateModal = false
    },
    updateListWithNewUpdatedData(data: IProjects) {
      this.projectsList = this.projectsList.filter((project) => {
        if (project.id === data.id) {
          project.name = data.name
        }
        return
      })
      this.showEditOrCreateModal = false
    },
  },
  async created() {
    this.projectsList = await getGenericEndPoint('projects')
  },
})
</script>

<style scoped></style>
