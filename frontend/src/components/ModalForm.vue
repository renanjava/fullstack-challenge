<template>
  <div class="modal">
    <div class="modal-background"></div>
    <div class="modal-content">
      <form @submit.prevent="submitForms">
        <div class="field">
          <label class="label">Name</label>
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="Digite o nome do projeto"
              v-model="formData"
              required
            />
          </div>
        </div>
        <div class="field">
          <button class="button is-primary is-fullwidth" type="submit">Salvar</button>
        </div>
      </form>
    </div>
    <button class="modal-close is-large" aria-label="close" @click="$emit('closeModal')"></button>
  </div>
</template>

<script lang="ts">
import { patchGenericEndPoint, postGenericEndPoint } from '@/api'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ModalForm',
  emits: ['closeModal', 'updateListWithCreate', 'updateListWithUpdate'],
  props: {
    inputData: { type: String, required: false },
    optionalIdData: { type: String, required: false },
    event: { type: String, required: true },
  },
  data() {
    return {
      formData: this.inputData,
      idData: this.optionalIdData,
    }
  },
  methods: {
    async submitForms() {
      if (this.event === 'create') {
        const response = await postGenericEndPoint('projects', { name: this.formData })
        if (response.id) {
          this.$emit('updateListWithCreate', response)
        }
      }
      if (this.event === 'edit') {
        if (!this.idData) {
          throw Error('Id para atualizar não foi informado')
        }
        const response = await patchGenericEndPoint('projects', this.idData, {
          name: this.formData,
        })
        if (response.id) {
          this.$emit('updateListWithUpdate', response)
        }
      }
    },
  },
  watch: {
    inputData(newValue) {
      this.formData = newValue
    },

    optionalIdData(newValue) {
      this.idData = newValue
    },
  },
})
</script>

<style></style>
