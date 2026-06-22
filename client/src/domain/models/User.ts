export type UserRole = 'teacher' | 'student' | 'admin'

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  role: UserRole
  createdAt: Date
}

export interface Testimonial {
  id: string
  name: string
  role: string
  avatar: string
  text: string
  rating: number
}
