<script setup lang="ts">
import { computed } from 'vue'
import { 
  Target, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  TrendingUp 
} from 'lucide-vue-next'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

import type { Goal, Stat } from '@/types'

const goals: Goal[] = [
  {
    id: '1',
    title: 'Java Grundlagen meistern',
    description: 'OOP, Datenstrukturen und grundlegende Algorithmen verstehen',
    progress: 65,
    targetDate: '15.3.2026',
    category: 'Programmierung',
    createdAt: new Date(),
    tasks: [
      { id: '1-1', title: 'Kapitel 1-3 Lehrbuch', completed: true, goalId: '1', createdAt: new Date() },
      { id: '1-2', title: 'Übungsaufgaben zu OOP', completed: true, goalId: '1', createdAt: new Date() },
      { id: '1-3', title: 'Eigenes Projekt', completed: false, goalId: '1', createdAt: new Date() },
      { id: '1-4', title: 'Unit Tests', completed: false, goalId: '1', createdAt: new Date() },
    ]
  },
  {
    id: '2',
    title: 'Datenbanken & SQL',
    description: 'Relationale Datenbanken und SQL-Abfragen beherrschen',
    progress: 40,
    targetDate: '28.2.2026',
    category: 'Datenbanken',
    createdAt: new Date(),
    tasks: [
      { id: '2-1', title: 'SQL Basics', completed: true, goalId: '2', createdAt: new Date() },
      { id: '2-2', title: 'Joins & Subqueries', completed: false, goalId: '2', createdAt: new Date() },
      { id: '2-3', title: 'Datenmodellierung', completed: false, goalId: '2', createdAt: new Date() },
    ]
  }
]

const stats = computed<Stat[]>(() => {
  const totalTasks = goals.reduce((acc, goal) => acc + goal.tasks.length, 0)
  const completedTasks = goals.reduce((acc, goal) => acc + goal.tasks.filter(t => t.completed).length, 0)
  
  return [
    { label: 'Aktive Lernziele', value: goals.length, icon: Target, color: 'text-blue-500' },
    { label: 'Erledigte Aufgaben', value: `${completedTasks}/${totalTasks}`, icon: CheckCircle2, color: 'text-green-500' },
    { label: 'Gesamte Lernzeit', value: '12h', icon: Clock, color: 'text-purple-500' },
    { label: 'Durchschnittlicher Fortschritt', value: '45%', icon: TrendingUp, color: 'text-orange-500' }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-slate-50 font-sans">
    <main class="max-w-7xl mx-auto p-6 space-y-8">
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
                  <div class="flex items-center gap-2">
                    <h4 class="font-bold text-slate-800 text-lg">{{ goal.title }}</h4>
                    <span class="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full uppercase tracking-wider font-semibold">
                      {{ goal.category }}
                    </span>
                  </div>
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
                <span>
                  {{ goal.tasks.filter(t => t.completed).length }} von {{ goal.tasks.length }} Aufgaben erledigt
                </span>
                <span>Ziel: {{ goal.targetDate }}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

    </main>
  </div>
</template>