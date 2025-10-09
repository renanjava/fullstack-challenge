<template>
  <div class="box" v-for="(item, index) in list" :key="index">
    <p class="title">{{ item.name }}</p>
  </div>
</template>

<style lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'List',
  props: {
    list: {
      type: Array as PropType<Array<{ id: number; name: string }>>,
      required: true,
    },
  },
})
</style>
