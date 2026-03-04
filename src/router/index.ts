import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import GoalsView from '@/views/GoalsView.vue'
import StudyTime from '@/views/StudyTime.vue'
import SocialView from '@/views/SocialView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'dashboard', component: DashboardView },
    { path: '/goals', name: 'goals', component: GoalsView },
    { path: '/studytime', name: 'studytime', component: StudyTime },
    { path: '/social', name: 'social', component: SocialView }
  ]
})

export default router