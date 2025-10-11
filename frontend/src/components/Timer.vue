<template>
  <div class="is-flex is-align-items-center is-justify-content-space-between">
    <StopWatch :time-in-seconds="tempoEmSegundos" />
    <button class="button" @click="iniciar()" :disabled="cronometroRodando">
      <span class="icon">
        <i class="fas fa-play"></i>
      </span>
      <span>play</span>
    </button>
    <button class="button" @click="finalizar()" :disabled="!cronometroRodando">
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
      tempoEmSegundos: 0,
      cronometro: 0,
      cronometroRodando: false,
    }
  },
  components: {
    StopWatch,
  },
  methods: {
    iniciar() {
      this.cronometro = setInterval(() => {
        this.tempoEmSegundos += 1
      }, 1000)
      this.cronometroRodando = true
    },
    finalizar() {
      clearInterval(this.cronometro)
      this.cronometroRodando = false
      this.$emit('toTimerFinished', this.tempoEmSegundos)
      this.tempoEmSegundos = 0
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
