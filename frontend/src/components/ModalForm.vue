<template>
  <div class="modal">
    <div class="modal-background"></div>
    <div class="modal-content">
      <form @submit.prevent="submitForms">
        <div v-for="field in formData" :key="field.name" class="field">
          <label class="label">{{ field.label }}</label>

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
          ></textarea>

          <div v-else-if="field.type === 'select'" class="select is-fullwidth">
            <select v-model="formValues[field.name]" :required="field.required">
              <option disabled value="">Selecione uma opção</option>
              <option v-for="option in field.options" :key="option.value" :value="option.value">
                {{ option.label }}
              </option>
            </select>
          </div>
        </div>

        <button class="button is-primary is-fullwidth" type="submit">Salvar</button>
      </form>
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

        const response = await patchGenericEndPoint(this.entityName, this.idData, this.formValues)
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
