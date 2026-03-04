<script setup lang="ts">
import { Target, LayoutDashboard, Clock, Users } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
        <RouterLink to="/" v-slot="{ isActive }">
          <Button :variant="isActive ? 'default' : 'ghost'" :class="[isActive ? 'bg-blue-600' : 'text-slate-600', 'gap-2']">
            <LayoutDashboard class="w-4 h-4" />
            Dashboard
          </Button>
        </RouterLink>

        <RouterLink to="/goals" v-slot="{ isActive }">
          <Button :variant="isActive ? 'default' : 'ghost'" :class="[isActive ? 'bg-blue-600' : 'text-slate-600', 'gap-2']">
            <Target class="w-4 h-4" />
            Lernziele
          </Button>
        </RouterLink>

        <RouterLink to="/studytime" v-slot="{ isActive }">
          <Button :variant="isActive ? 'default' : 'ghost'" :class="[isActive ? 'bg-blue-600' : 'text-slate-600', 'gap-2']">
            <Clock class="w-4 h-4" />
            Lernzeiten
          </Button>
        </RouterLink>

        <RouterLink to="/social" v-slot="{ isActive }">
          <Button :variant="isActive ? 'default' : 'ghost'" :class="[isActive ? 'bg-blue-600' : 'text-slate-600', 'gap-2']">
            <Users class="w-4 h-4" />
            Freunde
          </Button>
        </RouterLink>
      </nav>

      <RouterView />
    </main>
  </div>
</template>