<script lang="ts">
import { getGenericEndPoint } from '@/api/api'
import DaysAndMonthsWorked from '@/components/DaysAndMonthsWorked.vue'
import DefaultMain from '@/components/DefaultMain.vue'
import { API_URL } from '@/constants/constants'
import { hoursToHHMM } from '@/utils/utils'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomePage',
  components: {
    DefaultMain,
    DaysAndMonthsWorked,
  },
  data() {
    return {
      username: '',
      todayHours: '0:00',
      monthlyHours: '0:00',
      recentActivities: [],
    }
  },
  methods: {
    getTimeDifference(startDate: Date, endDate: Date) {
      const diffMs = Math.abs(endDate.getTime() - startDate.getTime())

      const totalSeconds = Math.floor(diffMs / 1000)
      const hours = Math.floor(totalSeconds / 3600)
      const minutes = Math.floor((totalSeconds % 3600) / 60)
      const seconds = totalSeconds % 60

      const format = (n) => String(n).padStart(2, '0')
      return `${format(hours)}:${format(minutes)}:${format(seconds)}`
    },
  },
  async mounted() {
    const token = localStorage.getItem('access_token')
    if (!token) {
      this.$router.push('/login')
      return
    }
    try {
      const res = await fetch(`${API_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const resJson = await res.json()
      if (!resJson.user_id) {
        throw new Error('não foi possível encontrar nenhum usuário com esse token')
      }

      this.username = resJson.username
    } catch (err) {
      console.error('Token inválido:', err)
      localStorage.removeItem('access_token')
      this.$router.push('/login')
    }

    const today = new Date().toISOString().split('T')[0]

    const responseDay = await getGenericEndPoint(`time-trackers/day/${today}`)
    this.todayHours = hoursToHHMM(responseDay[0].hours_in_day)
    const responseMonth = await getGenericEndPoint(`time-trackers/month/${today}`)
    this.monthlyHours = hoursToHHMM(responseMonth[0].hours_in_month)

    const responseTimeTrackerList = await getGenericEndPoint('time-trackers')
    const lastThreeTimeTrackers = responseTimeTrackerList
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 3)
    this.recentActivities = await Promise.all(
      lastThreeTimeTrackers.map(async (timeTracker) => {
        const project = await getGenericEndPoint(`projects/${timeTracker.tasks.project_id}`)
        return {
          id: timeTracker.id,
          name: timeTracker.tasks.name,
          project: project.name,
          time: this.getTimeDifference(
            new Date(timeTracker.start_date),
            new Date(timeTracker.end_date),
          ),
          active: true,
        }
      }),
    )
  },
})
</script>

<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css" />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
  />

  <DefaultMain
    :primary-text="`Bem vindo ${this.username}!`"
    :second-text="'Visão geral do seu controle de tempo'"
  >
    <DaysAndMonthsWorked :today-hours="todayHours" :monthly-hours="monthlyHours" />
    <div class="columns">
      <div class="column is-6">
        <div class="card">
          <div class="card-content">
            <h2 class="title is-5 mb-4">Atividade Recente</h2>

            <div class="activity-list">
              <div
                v-if="recentActivities.length > 0"
                v-for="activity in recentActivities"
                :key="activity.id"
                class="activity-item"
              >
                <div class="level is-mobile">
                  <div class="level-left">
                    <div class="level-item">
                      <span class="dot green-dot"></span>
                    </div>
                    <div class="level-item">
                      <div>
                        <p class="has-text-weight-semibold">{{ activity.name }}</p>
                        <p class="is-size-7 has-text-grey">{{ activity.project }}</p>
                      </div>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <span class="tag is-light">{{ activity.time }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else>
                <p class="subtitle">Nenhum item encontrado</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </DefaultMain>
</template>

<style scoped>
.card {
  background-color: white !important;
  color: #363636 !important;
}

.card-content {
  background-color: white !important;
}

.stats-card {
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
  background-color: white !important;
}

.stats-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.icon-circle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  color: white;
}

.purple-bg {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.green-bg {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
}

.purple-light-bg {
  background: linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%);
}

.green-light-bg {
  background: linear-gradient(135deg, #56ab2f 0%, #a8e063 100%);
}

.card {
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}

.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  padding: 0.75rem 0;
  border-bottom: 1px solid #f5f5f5;
}

.activity-item:last-child {
  border-bottom: none;
}

.dot {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin-right: 0.5rem;
}

.green-dot {
  background-color: #48c78e;
}

.quick-action-btn {
  height: 120px;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-radius: 8px;
  font-weight: 600;
}

.button.is-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.button.is-primary:hover {
  background: linear-gradient(135deg, #5568d3 0%, #653a8b 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.button.is-light {
  background-color: #f5f5f5;
  border: 1px solid #e8e8e8;
  color: #363636;
  transition: all 0.2s;
}

.button.is-light:hover {
  background-color: #efefef;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.heading {
  text-transform: uppercase;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.5px;
}
</style>
