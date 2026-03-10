<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  Plus, 
  Clock, 
  Calendar, 
  TrendingUp, 
  BarChart3,
  X 
} from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useStudyStore } from '@/stores/studyStore'
import type { StudySession } from '@/types'

const store = useStudyStore()

const isAddingSession = ref(false)
const newSession = ref({
  date: new Date().toISOString().split('T')[0],
  duration: '',
  goalId: ''
})

const handleAddSession = () => {
  if (!newSession.value.duration) return

  const session: StudySession = {
    id: Date.now().toString(),
    date: newSession.value.date!,
    duration: parseInt(newSession.value.duration),
    goalId: newSession.value.goalId || undefined,
  }

  store.addSession(session)
  
  newSession.value = {
    date: new Date().toISOString().split('T')[0],
    duration: '',
    goalId: ''
  }
  isAddingSession.value = false
}

const totalMinutes = computed(() => 
  store.sessions.reduce((acc, s) => acc + s.duration, 0)
)

const weeklyMinutes = computed(() => {
  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)
  return store.sessions
    .filter(s => new Date(s.date) >= weekAgo)
    .reduce((acc, s) => acc + s.duration, 0)
})

const averagePerDay = computed(() => 
  store.sessions.length > 0 ? Math.round(totalMinutes.value / store.sessions.length) : 0
)

const chartData7Days = computed(() => {
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    const dateStr = d.toISOString().split('T')[0]
    const dayName = d.toLocaleDateString('de-DE', { weekday: 'short' })
    const mins = store.sessions
      .filter(s => s.date === dateStr)
      .reduce((acc, s) => acc + s.duration, 0)
    return { day: dayName, hours: parseFloat((mins / 60).toFixed(1)) }
  })
})

const sortedSessions = computed(() => {
  return [...store.sessions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  ).slice(0, 10)
})
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-slate-900">Lernzeiten</h2>
        <p class="text-slate-500 mt-1">Tracke deine täglichen Lernzeiten</p>
      </div>
      <Button @click="isAddingSession = true" class="bg-blue-600 hover:bg-blue-700 gap-2 shadow-md">
        <Plus class="w-5 h-5" />
        Lernzeit hinzufügen
      </Button>
    </div>

    <Card v-if="isAddingSession" class="border-blue-200 bg-blue-50/30">
      <CardContent class="p-6">
        <div class="flex justify-between items-center mb-4">
          <h3 class="font-semibold text-slate-800">Lernzeit erfassen</h3>
          <Button variant="ghost" size="icon" @click="isAddingSession = false">
            <X class="w-4 h-4" />
          </Button>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="space-y-2">
            <Label>Datum</Label>
            <Input type="date" v-model="newSession.date" />
          </div>
          <div class="space-y-2">
            <Label>Dauer (Minuten)</Label>
            <Input type="number" v-model="newSession.duration" placeholder="z.B. 90" />
          </div>
          <div class="space-y-2">
            <Label>Lernziel (optional)</Label>
            <select 
              v-model="newSession.goalId"
              class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="">Kein spezifisches Ziel</option>
              <option v-for="goal in store.goals" :key="goal.id" :value="goal.id">
                {{ goal.title }}
              </option>
            </select>
          </div>
        </div>
        
        <div class="flex gap-2 justify-end mt-6">
          <Button variant="outline" @click="isAddingSession = false">Abbrechen</Button>
          <Button @click="handleAddSession" class="bg-blue-600">Hinzufügen</Button>
        </div>
      </CardContent>
    </Card>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardContent class="p-6 flex items-center justify-between">
          <div>
            <p class="text-sm text-slate-500 font-medium">Gesamt gelernt</p>
            <div class="text-3xl font-bold text-slate-800 mt-1">{{ Math.round(totalMinutes / 60) }}h</div>
            <p class="text-xs text-slate-400 mt-1">{{ totalMinutes }} Minuten</p>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600">
            <Clock class="w-6 h-6" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="p-6 flex items-center justify-between">
          <div>
            <p class="text-sm text-slate-500 font-medium">Diese Woche</p>
            <div class="text-3xl font-bold text-slate-800 mt-1">{{ Math.round(weeklyMinutes / 60) }}h</div>
            <p class="text-xs text-slate-400 mt-1">Letzte 7 Tage</p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
            <Calendar class="w-6 h-6" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent class="p-6 flex items-center justify-between">
          <div>
            <p class="text-sm text-slate-500 font-medium">Durchschnitt/Tag</p>
            <div class="text-3xl font-bold text-slate-800 mt-1">{{ averagePerDay }}m</div>
            <p class="text-xs text-slate-400 mt-1">Pro Sitzung</p>
          </div>
          <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
            <TrendingUp class="w-6 h-6" />
          </div>
        </CardContent>
      </Card>
    </div>

    <Card>
      <CardHeader class="flex flex-row items-center gap-2">
        <BarChart3 class="w-5 h-5 text-slate-500" />
        <CardTitle class="text-lg">Lernzeit der letzten 7 Tage</CardTitle>
      </CardHeader>
      <CardContent>
        <div v-if="store.sessions.length === 0" class="text-center py-12 text-slate-400 border-2 border-dashed rounded-lg">
          Noch keine Lernzeiten erfasst.
        </div>
        <div v-else class="h-[300px] flex items-end justify-around gap-2 pt-4">
           <div v-for="day in chartData7Days" :key="day.day" class="flex flex-col items-center flex-1 gap-2 group">
             <div 
                class="w-full bg-blue-500 rounded-t-md transition-all group-hover:bg-blue-600 relative"
                :style="{ height: `${Math.min((day.hours / 8) * 100, 100)}%`, minHeight: '4px' }"
              >
                <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {{ day.hours }}h
                </div>
              </div>
              <span class="text-[10px] font-medium text-slate-500 uppercase">{{ day.day }}</span>
           </div>
        </div>
      </CardContent>
    </Card>

    <Card v-if="store.sessions.length > 0">
      <CardHeader>
        <CardTitle class="text-lg">Letzte Lernsitzungen</CardTitle>
      </CardHeader>
      <CardContent class="space-y-3">
        <div v-for="session in sortedSessions" :key="session.id" 
          class="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100 hover:bg-slate-100 transition-colors"
        >
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center text-blue-600">
              <Clock class="w-5 h-5" />
            </div>
            <div>
              <p class="font-bold text-slate-800">{{ session.duration }} Minuten</p>
              <p v-if="session.goalId" class="text-xs text-blue-600 font-medium">
                {{ store.goals.find(g => g.id === session.goalId)?.title || 'Unbekanntes Ziel' }}
              </p>
            </div>
          </div>
          <span class="text-sm font-medium text-slate-400">
            {{ new Date(session.date).toLocaleDateString('de-DE') }}
          </span>
        </div>
      </CardContent>
    </Card>
  </div>
</template>