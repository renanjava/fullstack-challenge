<template>
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DaysAndMonthsWorked',
  props: {
    todayHours: { type: String, required: true },
    monthlyHours: { type: String, required: true },
  },
})
</script>

<style scoped>
.title {
  color: #0000006e !important;
}

.card {
  background-color: white !important;
  color: #363636 !important;
}

.card-content {
  background-color: white !important;
}
</style>
