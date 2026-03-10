import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { Goal, Friend, StudySession } from '@/types'
import { initialGoals, initialFriends, initialStudySessions } from '../data/mockData'

export const useStudyStore = defineStore('study', () => {
  const goals = ref<Goal[]>(
    JSON.parse(localStorage.getItem('study_goals') || JSON.stringify(initialGoals))
  )
  
  const sessions = ref<StudySession[]>(
    JSON.parse(localStorage.getItem('study_sessions') || JSON.stringify(initialStudySessions))
  )

  const friends = ref<Friend[]>(initialFriends)

  watch(goals, (newVal) => {
    localStorage.setItem('study_goals', JSON.stringify(newVal))
  }, { deep: true })

  watch(sessions, (newVal) => {
    localStorage.setItem('study_sessions', JSON.stringify(newVal))
  }, { deep: true })

  const addGoal = (goal: Goal) => {
    goals.value.push(goal)
  }

  const addSession = (session: StudySession) => {
    sessions.value.push(session)
    updateGoalProgress(session.goalId)
  }

  const toggleTask = (goalId: string, taskId: string) => {
    const goal = goals.value.find(g => g.id === goalId)
    if (goal) {
      const task = goal.tasks.find(t => t.id === taskId)
      if (task) {
        task.completed = !task.completed
        const completedCount = goal.tasks.filter(t => t.completed).length
        goal.progress = Math.round((completedCount / goal.tasks.length) * 100)
      }
    }
  }

  const updateGoalProgress = (goalId?: string) => {
    if (!goalId) return
    const goal = goals.value.find(g => g.id === goalId)
    if (goal && goal.tasks.length > 0) {
      const completed = goal.tasks.filter(t => t.completed).length
      goal.progress = Math.round((completed / goal.tasks.length) * 100)
    }
  }

  return { 
    goals, 
    sessions, 
    friends, 
    addGoal, 
    addSession, 
    toggleTask 
  }
})