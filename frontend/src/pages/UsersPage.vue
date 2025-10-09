<template>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css" />
  <DefaultMain :primary-text="'Usuários'" :second-text="'Gerencie os usuários do sistema'">
    <div class="box" v-for="user in usersList">
      <p class="title">{{ user.username }}</p>
    </div>
  </DefaultMain>
</template>

<script lang="ts">
import { getGenericEndPoint } from '@/api'
import DefaultMain from '@/components/DefaultMain.vue'
import type { IUsers } from '@/interfaces.ts/users.interface'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'UsersPage',
  components: {
    DefaultMain,
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
