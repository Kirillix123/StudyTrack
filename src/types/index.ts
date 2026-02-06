export interface Goal {
  id: number
  title: string
  description: string
  progress: number
  tasksCompleted: number
  totalTasks: number
  dueDate: string
}

export interface Stat {
  label: string
  value: string | number
  icon: any
  color?: string
}