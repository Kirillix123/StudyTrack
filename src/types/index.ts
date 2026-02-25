
export interface Task {
  id: string;
  title: string;
  completed: boolean;
  goalId: string;
  createdAt: Date;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  progress: number;
  targetDate: string;
  category: string;
  tasks: Task[];
  createdAt: Date;
}

export interface StudySession {
  id: string;
  date: string;
  duration: number;
  goalId?: string;
}

export interface Stat {
  label: string;
  value: string | number;
  icon: any;
  color: string;
}

export interface Friend {
  id: string;
  name: string;
  avatar: string;
  totalStudyTime: number;
  completedGoals: number;
  currentStreak: number;
}

export interface MotivationalQuote {
  id: string;
  text: string;
  author: string;
}