<template>
  <aside class="hero sidebar-custom">
    <div class="hero-head">
      <div class="container p-5">
        <h1 class="title is-4 has-text-weight-semibold app-title">Time Tracker</h1>
      </div>
    </div>

    <div class="hero-body">
      <div class="container">
        <h3
          class="subtitle is-7 has-text-weight-semibold has-text-grey-light is-uppercase menu-heading mb-4"
        >
          Menu Principal
        </h3>

        <aside class="menu">
          <ul class="menu-list">
            <li v-for="item in menuItems" :key="item.title">
              <a @click="redirectPage(item.url)" class="menu-item-custom">
                <span class="icon is-small menu-icon-custom">
                  <component :is="item.icon" class="h-5 w-5" />
                </span>
                <span>{{ item.title }}</span>
              </a>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  </aside>
</template>

<script lang="ts">
import { BarChart3, FolderKanban, LayoutDashboard, ListTodo, UserCog, Users } from 'lucide-vue-next'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'SideBar',
  methods: {
    redirectPage(page: string) {
      this.$router.push(page)
    },
  },
  data() {
    return {
      menuItems: [
        {
          title: 'Dashboard',
          url: '/home',
          icon: LayoutDashboard,
        },
        {
          title: 'Tarefas',
          url: '/tasks',
          icon: ListTodo,
        },
        {
          title: 'Projetos',
          url: '/projects',
          icon: FolderKanban,
        },
        {
          title: 'Usuários',
          url: '/users',
          icon: Users,
        },
        {
          title: 'Colaboradores',
          url: '/collaborators',
          icon: UserCog,
        },
        {
          title: 'Relatórios',
          url: '/relatory',
          icon: BarChart3,
        },
      ],
    }
  },
})
</script>
<style scoped>
.hero-body,
.container,
.menu-item-custom {
  background: #1a2332 !important;
  color: #ffffff;
}

.hero {
  height: 100vh;
}

.app-title {
  color: #8b7ff4;
  margin-bottom: 0;
}

.menu-heading {
  letter-spacing: 0.5px;
  padding-left: 0.25rem;
}

.menu-list {
  line-height: 1.25;
}

.menu-list a {
  color: #c5cdd8;
  border-radius: 0;
  padding: 0.75rem 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.875rem;
}

.menu-list a:hover {
  background-color: rgba(139, 127, 244, 0.1);
  color: #ffffff;
}

.menu-icon-custom {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0;
}

.menu-icon-custom svg {
  width: 20px;
  height: 20px;
}

@media only screen and (max-width: 768px) {
  .hero-head .container {
    padding: 2rem 1.5rem;
  }

  .hero {
    height: 50vh;
  }
}
</style>
