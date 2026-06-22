import type { Testimonial } from '@/domain/models/User'
import type { ITestimonialRepository } from '@/domain/repositories/ITestimonialRepository'

const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Mathematics Teacher',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    text: 'EduSmart transformed how I teach. The AI grading feature saves me 10 hours per week, and my students love the interactive lessons.',
    rating: 5,
  },
  {
    id: '2',
    name: 'James Chen',
    role: 'High School Student',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    text: 'The AI tutor helped me understand calculus concepts I struggled with for months. My grades improved from C to A in just one semester!',
    rating: 5,
  },
  {
    id: '3',
    name: 'Dr. Maria Lopez',
    role: 'University Professor',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    text: 'The analytics dashboard gives me real-time insights into student performance. I can identify struggling students before they fall behind.',
    rating: 5,
  },
]

export class TestimonialRepository implements ITestimonialRepository {
  async getTestimonials(): Promise<Testimonial[]> {
    return MOCK_TESTIMONIALS
  }
}
