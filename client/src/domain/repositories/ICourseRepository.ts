import type { Course, CourseSlide } from '@/domain/models/Course'

export interface ICourseRepository {
  getFeaturedSlides(): Promise<CourseSlide[]>
  getPopularCourses(): Promise<Course[]>
  getCourseById(id: string): Promise<Course | null>
}
