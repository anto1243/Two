export interface Player {
  id: string
  name: string
  number: number
  position: string
  age: number
  nationality: string
  avatar: string
  healthScore: number
  xp: number
  level: number
  status: 'available' | 'injured' | 'suspended' | 'doubtful'
  stats: PlayerStats
}

export interface PlayerStats {
  matches: number
  goals: number
  assists: number
  yellowCards: number
  redCards: number
  minutesPlayed: number
  rating: number
  attendance: number
}

export interface Team {
  id: string
  name: string
  category: string
  coach: string
  players: number
  nextMatch?: Match
}

export interface Match {
  id: string
  opponent: string
  date: string
  time: string
  location: string
  type: 'home' | 'away'
  competition: string
  result?: { home: number; away: number }
}

export interface TrainingSession {
  id: string
  date: string
  time: string
  duration: number
  type: string
  location: string
  attendance: number
  total: number
}

export interface Notification {
  id: string
  type: 'info' | 'warning' | 'success' | 'danger'
  title: string
  message: string
  time: string
  read: boolean
}

export interface HealthData {
  score: number
  heartRate: number
  sleep: number
  hydration: number
  fatigue: number
  stress: number
  recovery: number
}

export interface Badge {
  id: string
  name: string
  description: string
  icon: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  earned: boolean
  earnedAt?: string
}

export interface Post {
  id: string
  author: string
  authorRole: string
  avatar: string
  content: string
  image?: string
  likes: number
  comments: number
  time: string
  liked: boolean
}
