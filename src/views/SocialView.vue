<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  Users, 
  Trophy, 
  Clock, 
  Target, 
  TrendingUp, 
  Medal, 
  Award, 
  Plus 
} from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useStudyStore } from '@/stores/studyStore'

const store = useStudyStore()
const sortBy = ref<'studyTime' | 'goals' | 'streak'>('studyTime')

const currentUserStats = computed(() => {
  const totalMinutes = store.sessions.reduce((acc, s) => acc + s.duration, 0)
  const completedGoals = store.goals.filter(g => g.progress === 100).length
  
  return {
    id: 'current',
    name: 'Du (Ich)',
    avatar: 'DU',
    totalStudyTime: totalMinutes,
    completedGoals: completedGoals,
    currentStreak: 8,
    isCurrentUser: true
  }
})

const sortedUsers = computed(() => {
  const all = [
    currentUserStats.value,
    ...store.friends.map(f => ({ ...f, isCurrentUser: false }))
  ]

  return [...all].sort((a, b) => {
    if (sortBy.value === 'studyTime') return b.totalStudyTime - a.totalStudyTime
    if (sortBy.value === 'goals') return b.completedGoals - a.completedGoals
    if (sortBy.value === 'streak') return b.currentStreak - a.currentStreak
    return 0
  })
})

const getRankIcon = (rank: number) => {
  if (rank === 1) return { icon: Trophy, class: 'text-yellow-500' }
  if (rank === 2) return { icon: Medal, class: 'text-slate-400' }
  if (rank === 3) return { icon: Award, class: 'text-orange-600' }
  return null
}

const getAvatarColor = (index: number) => {
  const colors = [
    'from-blue-600 to-indigo-600',
    'from-purple-600 to-pink-600',
    'from-green-600 to-teal-600',
    'from-orange-600 to-red-600',
  ]
  return colors[index % colors.length]
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-slate-900">Freunde & Rangliste</h2>
        <p class="text-slate-500 mt-1">Vergleiche deinen Fortschritt mit Freunden</p>
      </div>
      <Button class="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 gap-2 shadow-md">
        <Plus class="w-5 h-5" />
        Freund hinzufügen
      </Button>
    </div>

    <div class="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-6 text-white shadow-lg">
      <h3 class="text-lg font-semibold mb-6 opacity-90">Deine Statistiken</h3>
      <div class="grid grid-cols-3 gap-4">
        <div class="text-center space-y-1">
          <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-2 backdrop-blur-sm">
            <Clock class="w-6 h-6" />
          </div>
          <p class="text-2xl font-bold">{{ Math.round(currentUserStats.totalStudyTime / 60) }}h</p>
          <p class="text-xs text-blue-100 uppercase tracking-wider font-medium">Lernzeit</p>
        </div>
        <div class="text-center space-y-1">
          <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-2 backdrop-blur-sm">
            <Target class="w-6 h-6" />
          </div>
          <p class="text-2xl font-bold">{{ currentUserStats.completedGoals }}</p>
          <p class="text-xs text-blue-100 uppercase tracking-wider font-medium">Ziele</p>
        </div>
        <div class="text-center space-y-1">
          <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-2 backdrop-blur-sm">
            <TrendingUp class="w-6 h-6" />
          </div>
          <p class="text-2xl font-bold">{{ currentUserStats.currentStreak }}</p>
          <p class="text-xs text-blue-100 uppercase tracking-wider font-medium">Streak</p>
        </div>
      </div>
    </div>

    <div class="flex items-center gap-3 bg-white p-2 rounded-xl border border-slate-200 w-fit">
      <span class="text-xs font-bold text-slate-400 uppercase ml-2">Sortieren:</span>
      <div class="flex gap-1">
        <button 
          v-for="type in (['studyTime', 'goals', 'streak'] as const)" 
          :key="type"
          @click="sortBy = type"
          :class="[
            'px-4 py-1.5 rounded-lg text-sm font-medium transition-all',
            sortBy === type ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
          ]"
        >
          {{ type === 'studyTime' ? 'Zeit' : type === 'goals' ? 'Ziele' : 'Streak' }}
        </button>
      </div>
    </div>

    <Card class="overflow-hidden border-slate-200">
      <div class="p-4 bg-slate-50 border-b border-slate-200 flex items-center gap-2">
        <Trophy class="w-5 h-5 text-yellow-500" />
        <h3 class="font-bold text-slate-800">Globales Ranking</h3>
      </div>
      
      <div class="divide-y divide-slate-100">
        <div 
          v-for="(user, index) in sortedUsers" 
          :key="user.id"
          :class="[
            'p-4 flex items-center gap-4 transition-colors',
            user.isCurrentUser ? 'bg-blue-50/50 border-l-4 border-blue-600' : 'hover:bg-slate-50'
          ]"
        >
          <div class="w-10 flex justify-center">
            <template v-if="getRankIcon(index + 1)">
              <component :is="getRankIcon(index + 1)!.icon" :class="getRankIcon(index + 1)!.class" />
            </template>
            <span v-else class="text-slate-400 font-bold">#{{ index + 1 }}</span>
          </div>

          <div :class="[
            'w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-inner bg-gradient-to-br',
            getAvatarColor(index)
          ]">
            {{ user.avatar }}
          </div>

          <div class="flex-1">
            <p :class="['font-bold', user.isCurrentUser ? 'text-blue-900' : 'text-slate-800']">
              {{ user.name }}
              <span v-if="user.isCurrentUser" class="ml-2 text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full uppercase">Du</span>
            </p>
            <div class="flex items-center gap-3 mt-1 text-xs text-slate-500">
              <span class="flex items-center gap-1"><Clock class="w-3 h-3" /> {{ Math.round(user.totalStudyTime / 60) }}h</span>
              <span class="flex items-center gap-1"><Target class="w-3 h-3" /> {{ user.completedGoals }}</span>
            </div>
          </div>

          <div class="text-right">
            <p class="text-xl font-black text-slate-900">
              <template v-if="sortBy === 'studyTime'">{{ Math.round(user.totalStudyTime / 60) }}h</template>
              <template v-else-if="sortBy === 'goals'">{{ user.completedGoals }}</template>
              <template v-else>{{ user.currentStreak }}🔥</template>
            </p>
            <p class="text-[10px] uppercase font-bold text-slate-400 tracking-tighter">
              {{ sortBy === 'studyTime' ? 'Lernzeit' : sortBy === 'goals' ? 'Ziele' : 'Streak' }}
            </p>
          </div>
        </div>
      </div>
    </Card>

    <div v-if="store.friends.length === 0" class="bg-white rounded-2xl p-12 border-2 border-dashed border-slate-200 text-center">
      <Users class="w-12 h-12 text-slate-300 mx-auto mb-4" />
      <h4 class="text-slate-900 font-bold">Lerne nicht alleine!</h4>
      <p class="text-slate-500 text-sm max-w-xs mx-auto mt-2 mb-6">
        Füge deine Freunde hinzu, um eure Fortschritte zu vergleichen и достигать целей вместе.
      </p>
      <Button variant="outline" class="border-blue-200 text-blue-600 hover:bg-blue-50">
        Einladung senden
      </Button>
    </div>
  </div>
</template>