<script lang="ts">
import DefaultMain from '@/components/DefaultMain.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomePage',
  components: {
    DefaultMain,
  },
  data() {
    return {
      username: '',
      todayHours: '0:01',
      monthlyHours: '0:01',
      activeTasks: 1,
      productivity: 95,
      recentActivities: [
        { id: 1, name: 'Tarefa #1', project: 'Projeto Alpha', time: '1:30h', active: true },
        { id: 2, name: 'Tarefa #2', project: 'Projeto Alpha', time: '1:30h', active: true },
        { id: 3, name: 'Tarefa #3', project: 'Projeto Alpha', time: '1:30h', active: true },
      ],
      timerRunning: false,
    }
  },
  async mounted() {
    const token = localStorage.getItem('access_token')
    if (!token) {
      this.$router.push('/login')
      return
    }
    try {
      const res = await fetch('http://localhost:3000/auth/profile', {
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
  },
  methods: {
    startTimer() {
      this.timerRunning = true
      // Lógica para iniciar o timer
    },
    createNewTask() {
      // Lógica para criar nova tarefa
    },
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
    <div class="columns is-multiline mb-5">
      <div class="column is-3">
        <div class="card stats-card">
          <div class="card-content">
            <div class="level is-mobile mb-2">
              <div class="level-left">
                <div class="level-item">
                  <p class="heading has-text-grey">Tempo Hoje</p>
                </div>
              </div>
              <div class="level-right">
                <div class="level-item">
                  <span class="icon-circle purple-bg">
                    <i class="fas fa-clock"></i>
                  </span>
                </div>
              </div>
            </div>
            <p class="title is-3 mb-1">{{ todayHours }}</p>
            <p class="subtitle is-7 has-text-grey">Horas trabalhadas hoje</p>
          </div>
        </div>
      </div>

      <div class="column is-3">
        <div class="card stats-card">
          <div class="card-content">
            <div class="level is-mobile mb-2">
              <div class="level-left">
                <div class="level-item">
                  <p class="heading has-text-grey">Tempo Mensal</p>
                </div>
              </div>
              <div class="level-right">
                <div class="level-item">
                  <span class="icon-circle green-bg">
                    <i class="fas fa-calendar"></i>
                  </span>
                </div>
              </div>
            </div>
            <p class="title is-3 mb-1">{{ monthlyHours }}</p>
            <p class="subtitle is-7 has-text-grey">Total de horas este mês</p>
          </div>
        </div>
      </div>

      <div class="column is-3">
        <div class="card stats-card">
          <div class="card-content">
            <div class="level is-mobile mb-2">
              <div class="level-left">
                <div class="level-item">
                  <p class="heading has-text-grey">Tarefas Ativas</p>
                </div>
              </div>
              <div class="level-right">
                <div class="level-item">
                  <span class="icon-circle purple-light-bg">
                    <i class="fas fa-play"></i>
                  </span>
                </div>
              </div>
            </div>
            <p class="title is-3 mb-1">{{ activeTasks }}</p>
            <p class="subtitle is-7 has-text-grey">Tarefas em progresso</p>
          </div>
        </div>
      </div>

      <div class="column is-3">
        <div class="card stats-card">
          <div class="card-content">
            <div class="level is-mobile mb-2">
              <div class="level-left">
                <div class="level-item">
                  <p class="heading has-text-grey">Produtividade</p>
                </div>
              </div>
              <div class="level-right">
                <div class="level-item">
                  <span class="icon-circle green-light-bg">
                    <i class="fas fa-chart-line"></i>
                  </span>
                </div>
              </div>
            </div>
            <p class="title is-3 mb-1">{{ productivity }}%</p>
            <p class="subtitle is-7 has-text-grey">Acima da meta</p>
          </div>
        </div>
      </div>
    </div>

    <div class="columns">
      <div class="column is-6">
        <div class="card">
          <div class="card-content">
            <h2 class="title is-5 mb-4">Atividade Recente</h2>

            <div class="activity-list">
              <div v-for="activity in recentActivities" :key="activity.id" class="activity-item">
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
            </div>
          </div>
        </div>
      </div>

      <div class="column is-6">
        <div class="card">
          <div class="card-content">
            <h2 class="title is-5 mb-4">Ações Rápidas</h2>

            <div class="columns is-mobile">
              <div class="column is-8">
                <button
                  class="button is-primary is-fullwidth is-large quick-action-btn"
                  @click="startTimer"
                >
                  <span class="icon">
                    <i class="fas fa-clock"></i>
                  </span>
                  <span>Iniciar Timer</span>
                </button>
              </div>
              <div class="column is-4">
                <button
                  class="button is-light is-fullwidth is-large quick-action-btn"
                  @click="createNewTask"
                >
                  <span class="icon">
                    <i class="fas fa-play"></i>
                  </span>
                  <span>Nova Tarefa</span>
                </button>
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
