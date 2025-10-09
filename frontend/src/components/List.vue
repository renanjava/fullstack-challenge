<template>
  <div class="box" v-if="list.length > 0" v-for="(item, index) in list" :key="index">
    <div v-for="[key, value] in Object.entries(sanitizeItem(item))">
      <div class="subtitle" v-if="isJsonLike(value)">{{ key }}: {{ sanitizeItem(value) }}</div>
      <div class="subtitle" v-else>{{ key }}: {{ value || 'nenhum cadastrado' }}</div>
    </div>
  </div>
  <p v-else class="box subtitle">A lista está vazia</p>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'List',
  props: {
    list: {
      type: Array as PropType<Array<Record<string, any>>>,
      required: true,
      default: () => [],
    },
  },
  methods: {
    sanitizeItem(item: Record<string, any>) {
      const {
        id,
        created_at,
        updated_at,
        password,
        deleted_at,
        project_id,
        user_id,
        ...sanitizedItem
      } = item
      return sanitizedItem
    },
    isJsonLike(value: any): boolean {
      return typeof value === 'object' && value !== null && !Array.isArray(value)
    },
  },
})
</script>
