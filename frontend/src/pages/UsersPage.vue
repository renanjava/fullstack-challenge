<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css" />
  <DefaultMain :primary-text="'Usuários'" :second-text="'Gerencie os usuários do sistema'">
    <List :list="usersList" />
  </DefaultMain>
</template>

<script lang="ts">
import { getGenericEndPoint } from '@/api/api'
import DefaultMain from '@/components/DefaultMain.vue'
import List from '@/components/List.vue'
import type { IUsers } from '@/interfaces.ts/users.interface'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UsersPage',
  components: {
    DefaultMain,
    List,
  },
  data() {
    return {
      usersList: [] as IUsers[],
    }
  },
  async created() {
    this.usersList = await getGenericEndPoint('users')
  },
})
</script>

<style scoped></style>
