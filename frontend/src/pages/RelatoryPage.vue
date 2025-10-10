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
        <div class="date-selector">
          <label class="selector-label">Período do Tempo</label>
          <div class="select">
            <select v-model="selectedPeriod">
              <option value="today">Hoje</option>
              <option value="week">Esta Semana</option>
              <option value="month">Este Mês</option>
              <option value="year">Este Ano</option>
              <option value="custom">Personalizado</option>
            </select>
          </div>
        </div>
      </div>

      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-label">Horas Trabalhadas</span>
            <span class="stat-icon">
              <i class="fas fa-clock"></i>
            </span>
          </div>
          <div class="stat-value">{{ workedHours }}</div>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-label">Total Horas</span>
            <span class="stat-icon">
              <i class="fas fa-calendar"></i>
            </span>
          </div>
          <div class="stat-value">{{ totalHours }}</div>
        </div>

        <div class="stat-card">
          <div class="stat-header">
            <span class="stat-label">Horas Restantes</span>
            <span class="stat-icon">
              <i class="fas fa-hourglass-half"></i>
            </span>
          </div>
          <div class="stat-value">{{ remainingHours }}</div>
        </div>
      </div>

      <div class="charts-section">
        <div class="chart-card">
          <div class="chart-header">
            <h3 class="chart-title">Gráfico de Barras - Horas por Dia</h3>
            <button class="export-btn">
              <i class="fas fa-download"></i>
              Exportar
            </button>
          </div>
          <div class="chart-placeholder">
            <canvas ref="barChart"></canvas>
          </div>
        </div>

        <div class="chart-card">
          <div class="chart-header">
            <h3 class="chart-title">Gráfico de Linhas - Evolução Temporal</h3>
            <button class="export-btn">
              <i class="fas fa-download"></i>
              Exportar
            </button>
          </div>
          <div class="chart-placeholder">
            <canvas ref="lineChart"></canvas>
          </div>
        </div>
      </div>
    </div>
  </DefaultMain>
</template>

<script lang="ts">
import DefaultMain from '@/components/DefaultMain.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'RelatoryPage',
  components: {
    DefaultMain,
  },
  data() {
    return {
      selectedPeriod: 'today',
      workedHours: '0:01',
      totalHours: '1',
      remainingHours: '0:01',
    }
  },
  mounted() {
    this.renderCharts()
  },
  methods: {
    renderCharts() {
      // Aqui você pode integrar com Chart.js ou outra biblioteca
      // Por enquanto, deixo preparado para implementação
      this.renderBarChart()
      this.renderLineChart()
    },
    renderBarChart() {
      // Implementar gráfico de barras
      const canvas = this.$refs.barChart as HTMLCanvasElement
      if (canvas) {
        const ctx = canvas.getContext('2d')
        if (ctx) {
          // Placeholder - Adicione Chart.js aqui
          ctx.fillStyle = '#f3f4f6'
          ctx.fillRect(0, 0, canvas.width, canvas.height)
          ctx.fillStyle = '#6b7280'
          ctx.font = '14px sans-serif'
          ctx.textAlign = 'center'
          ctx.fillText('Gráfico será renderizado aqui', canvas.width / 2, canvas.height / 2)
        }
      }
    },
    renderLineChart() {
      // Implementar gráfico de linhas
      const canvas = this.$refs.lineChart as HTMLCanvasElement
      if (canvas) {
        const ctx = canvas.getContext('2d')
        if (ctx) {
          // Placeholder - Adicione Chart.js aqui
          ctx.fillStyle = '#f3f4f6'
          ctx.fillRect(0, 0, canvas.width, canvas.height)
          ctx.fillStyle = '#6b7280'
          ctx.font = '14px sans-serif'
          ctx.textAlign = 'center'
          ctx.fillText('Gráfico será renderizado aqui', canvas.width / 2, canvas.height / 2)
        }
      }
    },
  },
})
</script>

<style scoped>
* {
  color-scheme: light !important;
}

.reports-container {
  width: 100%;
  color: #363636 !important;
}

.reports-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #1f2937 !important;
  margin: 0;
}

.date-selector {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.selector-label {
  font-size: 0.875rem;
  color: #6b7280 !important;
  font-weight: 500;
}

.select {
  position: relative;
}

.select select {
  background-color: #ffffff !important;
  color: #363636 !important;
  border: 1px solid #dbdbdb !important;
  border-radius: 8px;
  padding: 0.5rem 2.5rem 0.5rem 1rem;
  font-size: 0.875rem;
  cursor: pointer;
  appearance: none;
  min-width: 150px;
}

.select::after {
  content: '\f078';
  font-family: 'Font Awesome 6 Free';
  font-weight: 900;
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: #6b7280;
  font-size: 0.75rem;
}

.select select:focus {
  outline: none;
  border-color: #667eea !important;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.stats-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background-color: #ffffff !important;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.stat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.stat-label {
  font-size: 0.875rem;
  color: #6b7280 !important;
  font-weight: 500;
}

.stat-icon {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff !important;
  font-size: 0.875rem;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: #1f2937 !important;
}

.charts-section {
  display: grid;
  gap: 2rem;
}

.chart-card {
  background-color: #ffffff !important;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.chart-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937 !important;
  margin: 0;
}

.export-btn {
  background-color: #f3f4f6 !important;
  color: #6b7280 !important;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s;
}

.export-btn:hover {
  background-color: #e5e7eb !important;
  color: #374151 !important;
}

.export-btn i {
  font-size: 0.875rem;
}

.chart-placeholder {
  width: 100%;
  min-height: 300px;
  background-color: #f9fafb !important;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e5e7eb;
}

.chart-placeholder canvas {
  width: 100% !important;
  height: 300px !important;
}

@media screen and (max-width: 768px) {
  .reports-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .stats-row {
    grid-template-columns: 1fr;
  }

  .chart-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .export-btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
