<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between timer-container">
    <StopWatch :time-in-seconds="timeInSeconds" />
    <button
      class="button play-button"
      @click="start()"
      :disabled="runningStopWatch || !taskSelected"
      :class="{ 'is-enabled': !runningStopWatch && taskSelected }"
    >
      <span class="icon">
        <i class="fas fa-play"></i>
      </span>
      <span>play</span>
    </button>
    <button
      class="button stop-button"
      @click="finish()"
      :disabled="!runningStopWatch"
      :class="{ 'is-enabled': runningStopWatch }"
    >
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
.timer-container {
  gap: 1rem;
  padding: 1rem;
}

.button {
  font-weight: 600;
  transition: all 0.3s ease;
  position: relative;
  border-width: 2px;
  min-width: 100px;
}

.play-button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  background-color: #e1e4e8 !important;
  color: #9ca3af !important;
  border-color: #d1d5db !important;
  box-shadow: none !important;
}

.play-button.is-enabled {
  background-color: #48c774 !important;
  color: #ffffff !important;
  border-color: #48c774 !important;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(72, 199, 116, 0.4);
  animation: pulse-play 2s infinite;
}

.play-button.is-enabled:hover {
  background-color: #3ec46d !important;
  border-color: #3ec46d !important;
  transform: translateY(-3px) scale(1.08);
  box-shadow: 0 8px 25px rgba(72, 199, 116, 0.5);
}

.play-button.is-enabled:active {
  transform: translateY(-1px) scale(1.02);
  box-shadow: 0 3px 10px rgba(72, 199, 116, 0.4);
}

@keyframes pulse-play {
  0%,
  100% {
    box-shadow: 0 4px 15px rgba(72, 199, 116, 0.4);
  }
  50% {
    box-shadow: 0 4px 25px rgba(72, 199, 116, 0.6);
  }
}

.play-button.is-enabled .icon {
  animation: icon-glow 2s infinite;
}

@keyframes icon-glow {
  0%,
  100% {
    filter: drop-shadow(0 0 3px rgba(255, 255, 255, 0.5));
  }
  50% {
    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.8));
  }
}

.stop-button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  background-color: #e1e4e8 !important;
  color: #9ca3af !important;
  border-color: #d1d5db !important;
  box-shadow: none !important;
}

.stop-button.is-enabled {
  background-color: #f14668 !important;
  color: #ffffff !important;
  border-color: #f14668 !important;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(241, 70, 104, 0.4);
}

.stop-button.is-enabled:hover {
  background-color: #ef2e55 !important;
  border-color: #ef2e55 !important;
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 6px 20px rgba(241, 70, 104, 0.5);
}

.stop-button.is-enabled:active {
  transform: translateY(-1px) scale(1.02);
  box-shadow: 0 3px 10px rgba(241, 70, 104, 0.4);
}

@media (max-width: 768px) {
  .timer-container {
    flex-direction: column;
    gap: 0.75rem;
  }

  .button {
    width: 100%;
  }
}

.play-button.is-enabled::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s;
}

.play-button.is-enabled:hover::before {
  transform: translateX(100%);
}
</style>
