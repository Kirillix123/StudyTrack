import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import GoalsView from '@/views/GoalsView.vue'
import StudyTime from '@/views/StudyTime.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'dashboard', component: DashboardView },
    { path: '/goals', name: 'goals', component: GoalsView },
    { path: '/studytime', name: 'studytime', component: StudyTime },
  ]
})

export default router