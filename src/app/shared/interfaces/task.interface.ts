import { Status, Priority } from '../types/task.types'
export interface Task {
  id?: number
  title: string
  description: string
  category: string
  priority: Priority
  status: Status
}

export interface TaskCount {
  total: number
  inCompleted: number
  completed: number
}
