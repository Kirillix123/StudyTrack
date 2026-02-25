<script setup lang="ts">
import { ref } from 'vue'
import { Plus, Trash2, Check, Calendar } from 'lucide-vue-next'
import type { Goal, Task } from '@/types'

const props = defineProps<{
  goals?: Goal[]
}>()

const emit = defineEmits<{
  (e: 'update:goals', goals: Goal[]): void
}>()

const localGoals = ref<Goal[]>(props.goals || [])
const isAddingGoal = ref(false)

const newGoal = ref({
  title: '',
  description: '',
  targetDate: '',
  category: ''
})

const newTaskText = ref<Record<string, string>>({})

const handleAddGoal = () => {
  if (!newGoal.value.title.trim()) return

  const goal: Goal = {
    id: Date.now().toString(),
    title: newGoal.value.title,
    description: newGoal.value.description,
    progress: 0,
    targetDate: newGoal.value.targetDate,
    category: newGoal.value.category || 'Allgemein',
    tasks: [],
    createdAt: new Date()
  }

  localGoals.value = [...localGoals.value, goal]
  emit('update:goals', localGoals.value)

  newGoal.value = { title: '', description: '', targetDate: '', category: '' }
  isAddingGoal.value = false
}

const handleDeleteGoal = (goalId: string) => {
  localGoals.value = localGoals.value.filter((g) => g.id !== goalId)
  emit('update:goals', localGoals.value)
}

const handleAddTask = (goalId: string) => {
  const taskText = newTaskText.value[goalId]?.trim()
  if (!taskText) return

  localGoals.value = localGoals.value.map((goal) => {
    if (goal.id === goalId) {
      const newTask: Task = {
        id: `${goalId}-${Date.now()}`,
        title: taskText,
        completed: false,
        goalId: goalId,
        createdAt: new Date()
      }
      return { ...goal, tasks: [...goal.tasks, newTask] }
    }
    return goal
  })

  emit('update:goals', localGoals.value)
  newTaskText.value = { ...newTaskText.value, [goalId]: '' }
}

const handleToggleTask = (goalId: string, taskId: string) => {
  localGoals.value = localGoals.value.map((goal) => {
    if (goal.id === goalId) {
      const updatedTasks = goal.tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
      const completedCount = updatedTasks.filter((t) => t.completed).length
      const progress = updatedTasks.length > 0
        ? Math.round((completedCount / updatedTasks.length) * 100)
        : 0
      return { ...goal, tasks: updatedTasks, progress }
    }
    return goal
  })

  emit('update:goals', localGoals.value)
}

const handleDeleteTask = (goalId: string, taskId: string) => {
  localGoals.value = localGoals.value.map((goal) => {
    if (goal.id === goalId) {
      const updatedTasks = goal.tasks.filter((task) => task.id !== taskId)
      const completedCount = updatedTasks.filter((t) => t.completed).length
      const progress = updatedTasks.length > 0
        ? Math.round((completedCount / updatedTasks.length) * 100)
        : 0
      return { ...goal, tasks: updatedTasks, progress }
    }
    return goal
  })

  emit('update:goals', localGoals.value)
}

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    'Programmierung': 'bg-blue-100 text-blue-700',
    'Datenbanken': 'bg-purple-100 text-purple-700',
    'Web': 'bg-green-100 text-green-700',
    'Allgemein': 'bg-gray-100 text-gray-700'
  }
  return colors[category] || colors['Allgemein']
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Lernziele</h2>
        <p class="text-gray-600 mt-1">Verwalte deine Lernziele und Aufgaben</p>
      </div>
      <button
        @click="isAddingGoal = true"
        class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md"
      >
        <Plus class="w-5 h-5" />
        Neues Ziel
      </button>
    </div>

    <div v-if="isAddingGoal" class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h3 class="font-semibold mb-4">Neues Lernziel erstellen</h3>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Titel *
          </label>
          <input
            type="text"
            v-model="newGoal.title"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="z.B. Java Grundlagen meistern"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Beschreibung
          </label>
          <textarea
            v-model="newGoal.description"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="3"
            placeholder="Beschreibe dein Lernziel..."
          ></textarea>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Kategorie
            </label>
            <select
              v-model="newGoal.category"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Kategorie wählen</option>
              <option value="Programmierung">Programmierung</option>
              <option value="Datenbanken">Datenbanken</option>
              <option value="Web">Web</option>
              <option value="Allgemein">Allgemein</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Zieldatum
            </label>
            <input
              type="date"
              v-model="newGoal.targetDate"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div class="flex gap-2 justify-end">
          <button
            @click="isAddingGoal = false; newGoal = { title: '', description: '', targetDate: '', category: '' }"
            class="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Abbrechen
          </button>
          <button
            @click="handleAddGoal"
            class="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
          >
            Erstellen
          </button>
        </div>
      </div>
    </div>

    <div v-if="localGoals.length === 0 && !isAddingGoal" class="bg-white rounded-xl p-12 shadow-sm border border-gray-200 text-center">
      <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Plus class="w-8 h-8 text-gray-400" />
      </div>
      <p class="text-gray-600 mb-4">Noch keine Lernziele vorhanden</p>
      <button
        @click="isAddingGoal = true"
        class="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
      >
        Erstes Lernziel erstellen
      </button>
    </div>

    <div v-else class="space-y-4">
      <div v-for="goal in localGoals" :key="goal.id" class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div class="flex items-start justify-between mb-4">
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-2">
              <h3 class="text-lg font-semibold text-gray-900">{{ goal.title }}</h3>
              <span :class="['text-xs px-2 py-1 rounded-full', getCategoryColor(goal.category)]">
                {{ goal.category }}
              </span>
            </div>
            <p v-if="goal.description" class="text-sm text-gray-600 mb-2">{{ goal.description }}</p>
            <div v-if="goal.targetDate" class="flex items-center gap-1 text-xs text-gray-500">
              <Calendar class="w-3 h-3" />
              Zieldatum: {{ new Date(goal.targetDate).toLocaleDateString('de-DE') }}
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-2xl font-bold text-blue-600">{{ goal.progress }}%</span>
            <button
              @click="handleDeleteGoal(goal.id)"
              class="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 class="w-5 h-5" />
            </button>
          </div>
        </div>

        <div class="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            class="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full transition-all"
            :style="{ width: `${goal.progress}%` }"
          ></div>
        </div>

        <div class="space-y-2">
          <h4 class="text-sm font-semibold text-gray-700 mb-2">Aufgaben:</h4>
          
          <div
            v-for="task in goal.tasks"
            :key="task.id"
            class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <button
              @click="handleToggleTask(goal.id, task.id)"
              :class="[
                'w-5 h-5 rounded border-2 flex items-center justify-center transition-colors',
                task.completed ? 'bg-green-600 border-green-600' : 'border-gray-300 hover:border-green-600'
              ]"
            >
              <Check v-if="task.completed" class="w-3 h-3 text-white" />
            </button>
            <span :class="['flex-1', task.completed ? 'line-through text-gray-500' : 'text-gray-700']">
              {{ task.title }}
            </span>
            <button
              @click="handleDeleteTask(goal.id, task.id)"
              class="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
            >
              <Trash2 class="w-4 h-4" />
            </button>
          </div>

          <div class="flex gap-2 mt-3">
            <input
              type="text"
              v-model="newTaskText[goal.id]"
              @keypress.enter="handleAddTask(goal.id)"
              placeholder="Neue Aufgabe hinzufügen..."
              class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
            <button
              @click="handleAddTask(goal.id)"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>