<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <StopWatch :time-in-seconds="timeInSeconds" />
    <button class="button" @click="start()" :disabled="runningStopWatch || !taskSelected">
      <span class="icon">
        <i class="fas fa-play"></i>
      </span>
      <span>play</span>
    </button>
    <button class="button" @click="finish()" :disabled="!runningStopWatch">
      <span class="icon">
        <i class="fas fa-stop"></i>
      </span>
      <span>stop</span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import StopWatch from './StopWatch.vue'

export default defineComponent({
  name: 'Timer',
  emits: ['toTimerFinished'],
  data() {
    return {
      timeInSeconds: 0,
      timer: 0,
      runningStopWatch: false,
      startDate: null as Date | null,
      endDate: null as Date | null,
      timezoneId: '',
    }
  },
  props: {
    taskSelected: { type: Boolean, default: false },
  },
  components: {
    StopWatch,
  },
  methods: {
    start() {
      this.timezoneId = Intl.DateTimeFormat().resolvedOptions().timeZone
      this.startDate = new Date()
      this.timer = setInterval(() => {
        this.timeInSeconds += 1
      }, 1000)
      this.runningStopWatch = true
    },
    finish() {
      this.endDate = new Date()
      clearInterval(this.timer)
      this.runningStopWatch = false
      this.$emit('toTimerFinished', {
        start_date: this.startDate.toISOString(),
        end_date: this.endDate.toISOString(),
        timezone_id: this.timezoneId,
      })
      this.timeInSeconds = 0
    },
  },
})
</script>

<style scoped>
.button {
  color: var(--primary-text);
  background-color: var(--primary-background) !important;
}
</style>
