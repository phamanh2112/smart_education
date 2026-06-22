import type { CourseSlide } from '@/domain/models/Course'
import type { ICourseRepository } from '@/domain/repositories/ICourseRepository'

const MOCK_SLIDES: CourseSlide[] = [
  {
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80',
    title: 'Interactive Online Classes',
    desc: 'Real-time video sessions with smart whiteboards and AI assistance',
    tag: 'Live Learning',
  },
  {
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
    title: 'Personalized Learning Paths',
    desc: 'AI adapts course content to each student unique learning style',
    tag: 'AI Powered',
  },
  {
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
    title: 'Smart Assignment Grading',
    desc: 'Automated grading with detailed feedback saves teachers hours',
    tag: 'Automation',
  },
  {
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80',
    title: 'Global Student Community',
    desc: 'Connect with learners worldwide in collaborative study groups',
    tag: 'Community',
  },
]

export class CourseRepository implements ICourseRepository {
  async getFeaturedSlides(): Promise<CourseSlide[]> {
    return MOCK_SLIDES
  }

  async getPopularCourses() {
    return []
  }

  async getCourseById(_id: string) {
    return null
  }
}
