import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../pages/LoginPage.vue'
import HomePage from '../pages/HomePage.vue'
import TasksPage from '@/pages/TasksPage.vue'
import ProjectsPage from '@/pages/ProjectsPage.vue'
import UsersPage from '@/pages/UsersPage.vue'
import CollaboratorsPage from '@/pages/CollaboratorsPage.vue'
import RelatoryPage from '@/pages/RelatoryPage.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'login', component: LoginPage },
  { path: '/home', name: 'home', component: HomePage },
  { path: '/tasks', name: 'tasks', component: TasksPage },
  { path: '/projects', name: 'projects', component: ProjectsPage },
  { path: '/users', name: 'users', component: UsersPage },
  { path: '/collaborators', name: 'collaborators', component: CollaboratorsPage },
  { path: '/relatory', name: 'relatory', component: RelatoryPage },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
