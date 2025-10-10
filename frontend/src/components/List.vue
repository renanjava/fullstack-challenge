<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
  />

  <div class="list-container">
    <div v-if="!isLoaded" class="loading-state">
      <div class="spinner"></div>
      <p>Carregando lista...</p>
    </div>

    <div v-else-if="list.length === 0" class="empty-state">
      <div class="empty-icon">
        <i class="fas fa-inbox"></i>
      </div>
      <h3 class="empty-title">Nenhum item encontrado</h3>
      <p class="empty-text">A lista está vazia no momento</p>
    </div>

    <div v-else class="items-grid">
      <div v-for="(item, index) in list" :key="index" class="item-card">
        <div class="card-header">
          <div class="item-info">
            <h3 class="item-title">{{ getMainField(item) }}</h3>
            <p class="item-subtitle" v-if="getSecondaryField(item)">
              {{ getSecondaryField(item) }}
            </p>
          </div>
          <div class="item-actions">
            <button class="action-btn play-btn" @click="$emit('play', item)" title="Iniciar">
              <i class="fas fa-play"></i>
            </button>
            <button class="action-btn edit-btn" @click="$emit('edit', item)" title="Editar">
              <i class="fas fa-edit"></i>
            </button>
            <button class="action-btn delete-btn" @click="$emit('delete', item)" title="Excluir">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>

        <div class="card-body" v-if="hasRelatedEntities(item)">
          <div v-for="[key, value] in getRelatedEntities(item)" :key="key" class="related-item">
            <span class="related-label">{{ formatLabel(key) }}:</span>
            <span class="related-value">{{ formatValue(value) }}</span>
          </div>
        </div>

        <div class="card-footer" v-if="getMetadata(item)">
          <span class="metadata-tag">{{ getMetadata(item) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'List',
  emits: ['play', 'edit', 'delete'],
  data() {
    return {
      isLoaded: false,
    }
  },
  watch: {
    list: {
      immediate: false,
      handler(newVal) {
        if (newVal && newVal.length >= 0) {
          this.isLoaded = true
        }
      },
    },
  },
  props: {
    list: {
      type: Array as PropType<Array<Record<string, any>>>,
      required: true,
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

    getMainField(item: Record<string, any>): string {
      const sanitized = this.sanitizeItem(item)
      const mainFields = ['name', 'title', 'username', 'email']

      for (const field of mainFields) {
        if (sanitized[field]) return sanitized[field]
      }

      const firstKey = Object.keys(sanitized)[0]
      return sanitized[firstKey] || 'Sem nome'
    },

    getSecondaryField(item: Record<string, any>): string {
      const sanitized = this.sanitizeItem(item)
      const secondaryFields = ['description', 'email', 'role', 'status']

      for (const field of secondaryFields) {
        if (sanitized[field] && typeof sanitized[field] === 'string') {
          return sanitized[field]
        }
      }

      return ''
    },

    hasRelatedEntities(item: Record<string, any>): boolean {
      const sanitized = this.sanitizeItem(item)
      return Object.entries(sanitized).some(
        ([key, value]) => this.isJsonLike(value) || this.isJsonArray(value),
      )
    },

    getRelatedEntities(item: Record<string, any>): [string, any][] {
      const sanitized = this.sanitizeItem(item)
      return Object.entries(sanitized).filter(
        ([key, value]) => this.isJsonLike(value) || this.isJsonArray(value),
      )
    },

    getMetadata(item: Record<string, any>): string {
      if (item.created_at) {
        const date = new Date(item.created_at)
        return date.toLocaleDateString('pt-BR')
      }
      return ''
    },

    formatLabel(key: string): string {
      return key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
    },

    formatValue(value: any): string {
      if (this.isJsonArray(value)) {
        if (value.length === 0) return 'Nenhum cadastrado'
        return value.map((v: any) => this.getMainField(v)).join(', ')
      }

      if (this.isJsonLike(value)) {
        return this.getMainField(value)
      }

      return value?.toString() || 'Nenhum cadastrado'
    },

    isJsonLike(value: any): boolean {
      return typeof value === 'object' && value !== null && !Array.isArray(value)
    },

    isJsonArray(value: any): boolean {
      return (
        Array.isArray(value) &&
        value.every((item) => typeof item === 'object' && item !== null && !Array.isArray(item))
      )
    },
  },
})
</script>

<style scoped>
* {
  color-scheme: light !important;
}

.list-container {
  width: 100%;
  color: #363636 !important;
}

.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  color: #7a7a7a !important;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #f3f4f6;
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background-color: #ffffff !important;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.empty-icon {
  font-size: 4rem;
  color: #d1d5db !important;
  margin-bottom: 1rem;
}

.empty-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #363636 !important;
  margin-bottom: 0.5rem;
}

.empty-text {
  color: #7a7a7a !important;
  font-size: 1rem;
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.item-card {
  background-color: #ffffff !important;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.item-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.5rem;
  border-bottom: 1px solid #f3f4f6;
  gap: 1rem;
}

.item-info {
  flex: 1;
  min-width: 0;
}

.item-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #1f2937 !important;
  margin-bottom: 0.25rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-subtitle {
  font-size: 0.875rem;
  color: #6b7280 !important;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-actions {
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
}

.action-btn {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  font-size: 0.875rem;
}

.play-btn {
  background-color: #10b981 !important;
  color: white !important;
}

.play-btn:hover {
  background-color: #059669 !important;
  transform: scale(1.05);
}

.edit-btn {
  background-color: #f3f4f6 !important;
  color: #6b7280 !important;
}

.edit-btn:hover {
  background-color: #e5e7eb !important;
  color: #374151 !important;
}

.delete-btn {
  background-color: #f3f4f6 !important;
  color: #6b7280 !important;
}

.delete-btn:hover {
  background-color: #fee2e2 !important;
  color: #dc2626 !important;
}

.card-body {
  padding: 1rem 1.5rem;
  background-color: #f9fafb !important;
}

.related-item {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
}

.related-item:last-child {
  margin-bottom: 0;
}

.related-label {
  font-weight: 600;
  color: #4b5563 !important;
  flex-shrink: 0;
}

.related-value {
  color: #6b7280 !important;
  word-break: break-word;
}

.card-footer {
  padding: 0.75rem 1.5rem;
  border-top: 1px solid #f3f4f6;
  background-color: #fafafa !important;
}

.metadata-tag {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background-color: #e5e7eb !important;
  color: #6b7280 !important;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 500;
}

@media screen and (max-width: 768px) {
  .items-grid {
    grid-template-columns: 1fr;
  }

  .card-header {
    flex-direction: column;
    gap: 1rem;
  }

  .item-actions {
    width: 100%;
    justify-content: flex-end;
  }
}
</style>
