import type { Testimonial } from '@/domain/models/User'

export interface ITestimonialRepository {
  getTestimonials(): Promise<Testimonial[]>
}
