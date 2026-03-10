<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { 
  Target, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  Sparkles,
  Calendar
} from 'lucide-vue-next'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useStudyStore } from '@/stores/studyStore'
import { motivationalQuotes } from '@/data/mockData'
import type { MotivationalQuote } from '@/types'

const store = useStudyStore()
const quote = ref<MotivationalQuote | null>(null)

onMounted(() => {
  const randomIndex = Math.floor(Math.random() * motivationalQuotes.length)
  quote.value = motivationalQuotes[randomIndex] ?? null
})

const totalGoals = computed(() => store.goals.length)

const taskStats = computed(() => {
  const total = store.goals.reduce((acc, goal) => acc + goal.tasks.length, 0)
  const completed = store.goals.reduce((acc, goal) => 
    acc + goal.tasks.filter(t => t.completed).length, 0)
  return { total, completed }
})

const totalStudyTimeHours = computed(() => {
  const totalMins = store.sessions.reduce((acc, s) => acc + s.duration, 0)
  return Math.round(totalMins / 60)
})

const averageProgress = computed(() => {
  if (store.goals.length === 0) return 0
  const totalProgress = store.goals.reduce((acc, goal) => acc + goal.progress, 0)
  return Math.round(totalProgress / store.goals.length)
})

const statsCards = computed(() => [
  { 
    label: 'Aktive Lernziele', 
    value: totalGoals.value, 
    icon: Target, 
    color: 'text-blue-600', 
    bgColor: 'bg-blue-100' 
  },
  { 
    label: 'Erledigte Aufgaben', 
    value: `${taskStats.value.completed}/${taskStats.value.total}`, 
    icon: CheckCircle, 
    color: 'text-green-600', 
    bgColor: 'bg-green-100' 
  },
  { 
    label: 'Gesamte Lernzeit', 
    value: `${totalStudyTimeHours.value}h`, 
    icon: Clock, 
    color: 'text-purple-600', 
    bgColor: 'bg-purple-100' 
  },
  { 
    label: 'Durchschnittlicher Fortschritt', 
    value: `${averageProgress.value}%`, 
    icon: TrendingUp, 
    color: 'text-orange-600', 
    bgColor: 'bg-orange-100' 
  }
])

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString('de-DE')
}
</script>

<template>
  <div class="space-y-6">
    <div 
      v-if="quote" 
      class="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden"
    >
      <div class="flex items-start gap-4 relative z-10">
        <Sparkles class="w-8 h-8 text-yellow-300 flex-shrink-0 mt-1" />
        <div class="space-y-2">
          <h2 class="text-2xl font-serif italic font-medium leading-relaxed opacity-95">
            "{{ quote.text }}"
          </h2>
          <p class="text-blue-100 font-medium">— {{ quote.author }}</p>
        </div>
      </div>
      <div class="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card v-for="(stat, index) in statsCards" :key="index" class="hover:shadow-md transition-shadow">
        <CardContent class="p-6">
          <div class="flex items-center justify-between mb-2">
            <div :class="`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center ${stat.color}`">
              <component :is="stat.icon" class="w-6 h-6" />
            </div>
            <span class="text-3xl font-bold text-slate-900">{{ stat.value }}</span>
          </div>
          <p class="text-sm font-medium text-slate-500">{{ stat.label }}</p>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader>
        <CardTitle class="text-lg font-bold text-slate-800">
          Deine aktuellen Lernziele
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div v-if="store.goals.length === 0" class="text-center py-12 text-slate-400 border-2 border-dashed rounded-xl">
          Noch keine Lernziele vorhanden. Erstelle dein erstes Lernziel im Tab "Lernziele"!
        </div>
        
        <div v-else class="space-y-4">
          <div 
            v-for="goal in store.goals" 
            :key="goal.id" 
            class="group border border-slate-200 rounded-xl p-5 hover:border-blue-300 transition-colors bg-white shadow-sm"
          >
            <div class="flex items-start justify-between mb-4">
              <div class="flex-1">
                <div class="flex items-center gap-3">
                  <h4 class="font-bold text-slate-900 text-lg">{{ goal.title }}</h4>
                  <span class="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full uppercase tracking-wider font-bold">
                    {{ goal.category }}
                  </span>
                </div>
                <p class="text-sm text-slate-500 mt-1 line-clamp-1">{{ goal.description }}</p>
              </div>
              <span class="text-sm font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                {{ goal.progress }}%
              </span>
            </div>

            <Progress :model-value="goal.progress" class="h-2.5 bg-slate-100 mb-4" />

            <div class="flex items-center justify-between text-xs text-slate-400 font-medium pt-1">
              <div class="flex items-center gap-1">
                <CheckCircle class="w-3.5 h-3.5" />
                {{ goal.tasks.filter(t => t.completed).length }} von {{ goal.tasks.length }} Aufgaben erledigt
              </div>
              <div class="flex items-center gap-1">
                <Calendar class="w-3.5 h-3.5" />
                Ziel: {{ formatDate(goal.targetDate) }}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>