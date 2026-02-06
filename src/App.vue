<script setup lang="ts">
import { 
  LayoutDashboard, 
  Target, 
  Clock, 
  Users, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp 
} from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import type { Goal, Stat } from '@/types'

const stats: Stat[] = [
  { label: 'Aktive Lernziele', value: 3, icon: Target, color: 'text-blue-500' },
  { label: 'Erledigte Aufgaben', value: '4/11', icon: CheckCircle2, color: 'text-green-500' },
  { label: 'Gesamte Lernzeit', value: '12h', icon: Clock, color: 'text-purple-500' },
  { label: 'Durchschnittlicher Fortschritt', value: '45%', icon: TrendingUp, color: 'text-orange-500' }
]

const goals: Goal[] = [
  {
    id: 1,
    title: 'Java Grundlagen meistern',
    description: 'OOP, Datenstrukturen und grundlegende Algorithmen verstehen',
    progress: 65,
    tasksCompleted: 2,
    totalTasks: 4,
    dueDate: '15.3.2026'
  },
  {
    id: 2,
    title: 'Datenbanken & SQL',
    description: 'Relationale Datenbanken und SQL-Abfragen beherrschen',
    progress: 40,
    tasksCompleted: 1,
    totalTasks: 3,
    dueDate: '28.2.2026'
  }
]
</script>

<template>
  <div class="min-h-screen bg-slate-50 font-sans">
    
    <header class="bg-white border-b px-6 py-3 flex items-center justify-between sticky top-0 z-10">
      <div class="flex items-center gap-2">
        <div class="bg-blue-600 p-1.5 rounded-lg">
          <Target class="w-5 h-5 text-white" />
        </div>
        <span class="text-xl font-bold text-blue-600">StudyTrack</span>
      </div>
      <Avatar class="bg-blue-100">
        <AvatarImage src="" />
        <AvatarFallback class="text-blue-700 font-medium">DU</AvatarFallback>
      </Avatar>
    </header>

    <main class="max-w-7xl mx-auto p-6 space-y-8">
      
      <nav class="bg-white p-2 rounded-xl shadow-sm border flex items-center gap-2 overflow-x-auto">
        <Button variant="default" class="bg-blue-600 hover:bg-blue-700 gap-2">
          <LayoutDashboard class="w-4 h-4" />
          Dashboard
        </Button>
        <Button variant="ghost" class="text-slate-600 hover:text-blue-600 gap-2">
          <Target class="w-4 h-4" />
          Lernziele
        </Button>
        <Button variant="ghost" class="text-slate-600 hover:text-blue-600 gap-2">
          <Clock class="w-4 h-4" />
          Lernzeiten
        </Button>
        <Button variant="ghost" class="text-slate-600 hover:text-blue-600 gap-2">
          <Users class="w-4 h-4" />
          Freunde
        </Button>
      </nav>

      <div class="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
        <div class="relative z-10">
          <div class="flex items-start gap-4">
            <Sparkles class="w-8 h-8 text-yellow-300 flex-shrink-0 mt-1" />
            <div class="space-y-2">
              <h2 class="text-2xl font-serif italic font-medium leading-relaxed opacity-95">
                "Bildung ist die mächtigste Waffe, die du verwenden kannst, um die Welt zu verändern."
              </h2>
              <p class="text-blue-100 font-medium">— Nelson Mandela</p>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card v-for="(stat, index) in stats" :key="index" class="hover:shadow-md transition-shadow">
          <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle class="text-sm font-medium text-slate-500">
              {{ stat.label }}
            </CardTitle>
            <component :is="stat.icon" :class="`w-8 h-8 p-1.5 rounded-md bg-opacity-10 ${stat.color.replace('text-', 'bg-')} ${stat.color}`" />
          </CardHeader>
          <CardContent>
            <div class="text-3xl font-bold text-slate-800">{{ stat.value }}</div>
          </CardContent>
        </Card>
      </div>

      <section class="space-y-6">
        <h3 class="text-lg font-bold text-slate-800">Deine aktuellen Lernziele</h3>
        
        <div class="flex flex-col gap-4">
          <Card v-for="goal in goals" :key="goal.id" class="group hover:border-blue-300 transition-colors">
            <CardContent class="p-6">
              <div class="flex justify-between items-start mb-2">
                <div>
                  <h4 class="font-bold text-slate-800 text-lg">{{ goal.title }}</h4>
                  <p class="text-slate-500 text-sm mt-1">{{ goal.description }}</p>
                </div>
                <span class="font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-sm">
                  {{ goal.progress }}%
                </span>
              </div>
              
              <div class="mt-4 mb-2">
                <Progress :model-value="goal.progress" class="h-2.5 bg-slate-100" />
              </div>

              <div class="flex justify-between items-center text-xs text-slate-400 font-medium mt-3">
                <span>{{ goal.tasksCompleted }} von {{ goal.totalTasks }} Aufgaben erledigt</span>
                <span>Ziel: {{ goal.dueDate }}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

    </main>
  </div>
</template>