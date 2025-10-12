<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css" />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
  />

  <DefaultMain
    :primary-text="'Relatórios'"
    :second-text="'Visualize suas análises de controle de tempo'"
  >
    <div class="reports-container">
      <div class="reports-header">
        <h2 class="section-title">Relatórios</h2>
      </div>

      <DaysAndMonthsWorked :today-hours="todayHours" :monthly-hours="monthlyHours" />
      <Filter
        :collaborator-list="collaboratorsNameList"
        :project-list="projectNameList"
        @filter-applied="applyFilter"
      />
    </div>
  </DefaultMain>
</template>

<script lang="ts">
import { getGenericEndPoint } from '@/api/api'
import DaysAndMonthsWorked from '@/components/DaysAndMonthsWorked.vue'
import DefaultMain from '@/components/DefaultMain.vue'
import Filter from '@/components/Filter.vue'
import type { ICollaborators } from '@/interfaces/collaborators.interface'
import type { IProjects } from '@/interfaces/projects.interface'
import { hoursToHHMM } from '@/utils/utils'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RelatoryPage',
  components: {
    DefaultMain,
    DaysAndMonthsWorked,
    Filter,
  },
  data() {
    return {
      todayHours: '0:00',
      monthlyHours: '0:00',
      getProjects: [] as IProjects[],
      getCollaborators: [] as ICollaborators[],
    }
  },
  computed: {
    collaboratorsNameList() {
      return this.getCollaborators.map((collaborator) => ({
        label: collaborator.name,
        value: collaborator.id,
      }))
    },
    projectNameList() {
      return this.getProjects.map((project) => ({
        label: project.name,
        value: project.id,
      }))
    },
  },
  async created() {
    this.getProjects = await getGenericEndPoint('projects')
    this.getCollaborators = await getGenericEndPoint('collaborators')
  },
  methods: {
    async applyFilter(data: any) {
      const today = new Date().toISOString().split('T')[0]

      const responseDay = await getGenericEndPoint(
        `time-trackers/${data.type}/${data.value}/day/${today}`,
      )
      this.todayHours = hoursToHHMM(responseDay[0].hours_in_day)
      const responseMonth = await getGenericEndPoint(
        `time-trackers/${data.type}/${data.value}/month/${today}`,
      )
      this.monthlyHours = hoursToHHMM(responseMonth[0].hours_in_month)
    },
  },
})
</script>
