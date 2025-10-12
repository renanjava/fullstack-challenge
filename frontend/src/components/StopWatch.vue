<template>
  <section class="stopwatch-container">
    <div class="time-display">
      <span class="time-segment">{{ totalTime }}</span>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'StopWatch',
  props: {
    timeInSeconds: { type: Number, default: 0 },
  },
  computed: {
    totalTime(): string {
      return new Date(this.timeInSeconds * 1000).toISOString().substr(11, 8)
    },
  },
})
</script>

<style scoped>
.stopwatch-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 2rem;
  color: #000;
  border-radius: 16px;
  min-width: 280px;
  position: relative;
  overflow: hidden;
}

.stopwatch-container::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
}

.time-display {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  position: relative;
  z-index: 1;
  color: #000;
}

.time-segment {
  font-size: 3.5rem;
  font-weight: 700;
  color: #000 !important;
  -webkit-text-fill-color: #000 !important;
  background-clip: unset;
  -webkit-background-clip: unset;
  font-family: 'Courier New', monospace;
  -webkit-text-fill-color: transparent;
  animation: pulse-number 1s ease-in-out infinite;
  padding: 0 0.2rem;
}

.separator {
  font-size: 3rem;
  font-weight: 700;
  color: #000;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  animation: blink 1s step-end infinite;
  opacity: 0.8;
}

.time-label {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #000;
  text-transform: uppercase;
  letter-spacing: 2px;
  opacity: 0.9;
  position: relative;
  z-index: 1;
}

@media (max-width: 768px) {
  .stopwatch-container {
    min-width: 240px;
    padding: 1.2rem 1.5rem;
  }

  .time-segment {
    font-size: 2.8rem;
  }

  .separator {
    font-size: 2.5rem;
  }

  .time-label {
    font-size: 0.75rem;
  }
}
</style>
