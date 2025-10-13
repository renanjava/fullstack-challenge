<template>
  <div class="modal">
    <div class="modal-background" @click="$emit('closeModal')"></div>
    <div class="modal-content">
      <div class="box">
        <h2 class="title is-4 mb-5">
          {{ event === 'create' ? 'Criar' : 'Editar' }} {{ entityName }}
        </h2>

        <form @submit.prevent="submitForms">
          <div v-for="field in formData" :key="field.name" class="field">
            <label class="label">{{ field.label }}</label>

            <div class="control">
              <input
                v-if="field.type !== 'textarea' && field.type !== 'select'"
                :type="field.type"
                v-model="formValues[field.name]"
                :required="field.required"
                class="input"
              />

              <textarea
                v-else-if="field.type === 'textarea'"
                v-model="formValues[field.name]"
                :required="field.required"
                class="textarea"
                rows="4"
              ></textarea>

              <div
                v-else-if="field.type === 'select' && event != 'edit'"
                class="select is-fullwidth"
              >
                <select v-model="formValues[field.name]" :required="field.required">
                  <option disabled value="">Selecione uma opção</option>
                  <option v-for="option in field.options" :key="option.value" :value="option.value">
                    {{ option.label }}
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div class="buttons is-right mt-5">
            <button class="button" type="button" @click="$emit('closeModal')">Cancelar</button>
            <button class="button is-primary" type="submit">
              <span class="icon is-small">
                <i class="fas fa-save"></i>
              </span>
              <span>Salvar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="$emit('closeModal')"></button>
  </div>
</template>

<script lang="ts">
import { patchGenericEndPoint, postGenericEndPoint } from '@/api/api'
import { type IFields } from '@/interfaces/generic-fields.interface'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ModalForm',
  emits: ['closeModal', 'updateListWithCreate', 'updateListWithUpdate'],
  props: {
    inputData: { type: Array as () => IFields[], required: true },
    optionalIdData: { type: String, required: false },
    event: { type: String, required: true },
    entityName: { type: String, required: true },
  },
  data() {
    return {
      formData: [] as IFields[],
      idData: this.optionalIdData,
      formValues: {} as Record<string, any>,
    }
  },
  mounted() {
    this.initializeForm()
  },
  methods: {
    initializeForm() {
      this.formData = [...this.inputData]
      this.formValues = {}

      this.formData.forEach((field) => {
        this.formValues[field.name] = field.editValue ?? ''
      })
    },

    async submitForms() {
      if (this.event === 'create') {
        const response = await postGenericEndPoint(this.entityName, this.formValues)
        if (response.id) {
          this.$emit('updateListWithCreate', response)
        }
      }
      if (this.event === 'edit') {
        if (!this.idData) {
          throw new Error('Id para atualizar não foi informado')
        }

        const { project_id, ...formValuesWithoutProjectId } = this.formValues

        const response = await patchGenericEndPoint(
          this.entityName,
          this.idData,
          formValuesWithoutProjectId,
        )

        if (response.id) {
          this.$emit('updateListWithUpdate', response)
        }
      }
    },
  },
  watch: {
    inputData: {
      handler() {
        this.initializeForm()
      },
      deep: true,
    },
    optionalIdData(newValue) {
      this.idData = newValue
    },
  },
})
</script>

<style scoped>
.modal {
  z-index: 9999;
}

.modal-background {
  z-index: 9998;
}

.modal-content {
  width: 90%;
  max-width: 640px;
  margin: 0 auto;
  z-index: 10000;
  position: relative;
}

.modal-close {
  z-index: 10001;
}

.box {
  padding: 2rem;
  max-height: 85vh;
  overflow-y: auto;
}

.title {
  color: #363636;
  margin-bottom: 1.5rem;
}

.field:not(:last-child) {
  margin-bottom: 1.25rem;
}

.label {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.input,
.textarea,
.select select {
  border-radius: 4px;
  transition: border-color 0.2s ease;
}

.input:focus,
.textarea:focus,
.select select:focus {
  border-color: #3273dc;
  box-shadow: 0 0 0 0.125em rgba(50, 115, 220, 0.25);
}

.buttons {
  margin-top: 1.5rem;
}

@media screen and (max-width: 768px) {
  .modal-content {
    width: 95%;
    margin: 1rem auto;
  }

  .box {
    padding: 1.25rem;
    max-height: 90vh;
  }

  .title {
    font-size: 1.25rem !important;
  }

  .buttons {
    flex-direction: column-reverse;
  }

  .buttons .button {
    width: 100%;
    margin: 0.25rem 0;
  }

  .field:not(:last-child) {
    margin-bottom: 1rem;
  }
}

@media screen and (min-width: 769px) and (max-width: 1023px) {
  .modal-content {
    width: 80%;
  }

  .box {
    padding: 1.75rem;
  }
}

@media screen and (max-width: 480px) {
  .modal-content {
    width: 98%;
    margin: 0.5rem auto;
  }

  .box {
    padding: 1rem;
  }

  .title {
    font-size: 1.1rem !important;
  }

  .label {
    font-size: 0.9rem;
  }

  .input,
  .textarea,
  .select select {
    font-size: 0.95rem;
  }
}

.box::-webkit-scrollbar {
  width: 8px;
}

.box::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.box::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

.box::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>
