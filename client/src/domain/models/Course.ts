export interface Course {
  id: string
  title: string
  description: string
  image: string
  tag: string
  instructor: string
  rating: number
  studentsCount: number
  price: number
}

export interface CourseSlide {
  image: string
  title: string
  desc: string
  tag: string
}
