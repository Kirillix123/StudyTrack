import type { Goal, Friend, MotivationalQuote, StudySession } from '../types';

export const motivationalQuotes: MotivationalQuote[] = [
  { id: '1', text: 'Der Erfolg ist die Summe kleiner Bemühungen, die jeden Tag wiederholt werden.', author: 'Robert Collier' },
  { id: '2', text: 'Bildung ist die mächtigste Waffe, die du verwenden kannst, um die Welt zu verändern.', author: 'Nelson Mandela' },
  { id: '3', text: 'Lernen ist wie Rudern gegen den Strom. Hört man damit auf, treibt man zurück.', author: 'Laozi' },
  { id: '4', text: 'Der einzige Weg, großartige Arbeit zu leisten, ist zu lieben, was man tut.', author: 'Steve Jobs' },
  { id: '5', text: 'Wissen ist Macht.', author: 'Francis Bacon' },
  { id: '6', text: 'Die Zukunft gehört denen, die an die Schönheit ihrer Träume glauben.', author: 'Eleanor Roosevelt' },
  { id: '7', text: 'Erfolg besteht darin, von Misserfolg zu Misserfolg zu gehen, ohne seinen Enthusiasmus zu verlieren.', author: 'Winston Churchill' },
  { id: '8', text: 'Du musst nicht großartig sein, um anzufangen, aber du musst anfangen, um großartig zu sein.', author: 'Zig Ziglar' },
];

export const initialGoals: Goal[] = [
  {
    id: '1',
    title: 'Java Grundlagen meistern',
    description: 'OOP, Datenstrukturen und grundlegende Algorithmen verstehen',
    progress: 50, // Вычисляется как (выполнено 2 из 4 задач)
    targetDate: '2026-03-15',
    category: 'Programmierung',
    tasks: [
      { id: '1-1', title: 'Kapitel 1-3 Lehrbuch durcharbeiten', completed: true, goalId: '1', createdAt: new Date('2026-01-15') },
      { id: '1-2', title: 'Übungsaufgaben zu OOP lösen', completed: true, goalId: '1', createdAt: new Date('2026-01-16') },
      { id: '1-3', title: 'Eigenes Projekt: Bibliotheksverwaltung', completed: false, goalId: '1', createdAt: new Date('2026-01-18') },
      { id: '1-4', title: 'Unit Tests schreiben lernen', completed: false, goalId: '1', createdAt: new Date('2026-01-20') },
    ],
    createdAt: new Date('2026-01-15'),
  },
  {
    id: '2',
    title: 'Datenbanken & SQL',
    description: 'Relationale Datenbanken und SQL-Abfragen beherrschen',
    progress: 33, // (1 из 3 задач)
    targetDate: '2026-02-28',
    category: 'Datenbanken',
    tasks: [
      { id: '2-1', title: 'SQL Grundlagen lernen', completed: true, goalId: '2', createdAt: new Date('2026-01-17') },
      { id: '2-2', title: 'Joins und Subqueries üben', completed: false, goalId: '2', createdAt: new Date('2026-01-19') },
      { id: '2-3', title: 'Normalisierung verstehen', completed: false, goalId: '2', createdAt: new Date('2026-01-21') },
    ],
    createdAt: new Date('2026-01-17'),
  },
  {
    id: '3',
    title: 'Web-Entwicklung Basics',
    description: 'HTML, CSS, JavaScript und React lernen',
    progress: 25, // (1 из 4 задач)
    targetDate: '2026-04-01',
    category: 'Web',
    tasks: [
      { id: '3-1', title: 'HTML & CSS Grundlagen', completed: true, goalId: '3', createdAt: new Date('2026-01-19') },
      { id: '3-2', title: 'JavaScript ES6+ Features', completed: false, goalId: '3', createdAt: new Date('2026-01-20') },
      { id: '3-3', title: 'React Tutorial durcharbeiten', completed: false, goalId: '3', createdAt: new Date('2026-01-21') },
      { id: '3-4', title: 'Eigene Portfolio-Website erstellen', completed: false, goalId: '3', createdAt: new Date('2026-01-22') },
    ],
    createdAt: new Date('2026-01-19'),
  },
];

export const initialFriends: Friend[] = [
  {
    id: '1',
    name: 'Anna Schmidt',
    avatar: 'AS',
    totalStudyTime: 2840,
    completedGoals: 8,
    currentStreak: 12,
  },
  {
    id: '2',
    name: 'Max Müller',
    avatar: 'MM',
    totalStudyTime: 3120,
    completedGoals: 10,
    currentStreak: 15,
  },
  {
    id: '3',
    name: 'Lisa Wagner',
    avatar: 'LW',
    totalStudyTime: 2560,
    completedGoals: 7,
    currentStreak: 9,
  },
  {
    id: '4',
    name: 'Tom Fischer',
    avatar: 'TF',
    totalStudyTime: 1920,
    completedGoals: 5,
    currentStreak: 6,
  },
];

export const initialStudySessions: StudySession[] = [
  { id: '1', date: '2026-01-16', duration: 90, goalId: '1' },
  { id: '2', date: '2026-01-17', duration: 120, goalId: '2' },
  { id: '3', date: '2026-01-18', duration: 60, goalId: '1' },
  { id: '4', date: '2026-01-19', duration: 150, goalId: '3' },
  { id: '5', date: '2026-01-20', duration: 105, goalId: '1' },
  { id: '6', date: '2026-01-21', duration: 90, goalId: '2' },
  { id: '7', date: '2026-01-22', duration: 120, goalId: '3' },
];