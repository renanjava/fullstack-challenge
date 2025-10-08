import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../pages/LoginPage.vue'
import HomePage from '../pages/HomePage.vue'
import TasksPage from '@/pages/TasksPage.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'login', component: LoginPage },
  { path: '/home', name: 'home', component: HomePage },
  { path: '/tasks', name: 'tasks', component: TasksPage },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
