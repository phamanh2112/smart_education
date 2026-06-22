import { CourseRepository } from '@/data/repositories/CourseRepository'
import { TestimonialRepository } from '@/data/repositories/TestimonialRepository'
import { FeatureRepository } from '@/data/repositories/FeatureRepository'
import { StatsRepository } from '@/data/repositories/StatsRepository'

describe('CourseRepository', () => {
  let repo: CourseRepository

  beforeEach(() => {
    repo = new CourseRepository()
  })

  it('should return featured slides', async () => {
    const slides = await repo.getFeaturedSlides()
    expect(slides).toHaveLength(4)
    slides.forEach(slide => {
      expect(slide).toHaveProperty('image')
      expect(slide).toHaveProperty('title')
      expect(slide).toHaveProperty('desc')
      expect(slide).toHaveProperty('tag')
    })
  })

  it('should return empty array for popular courses', async () => {
    const courses = await repo.getPopularCourses()
    expect(courses).toEqual([])
  })

  it('should return null for unknown course id', async () => {
    const course = await repo.getCourseById('nonexistent')
    expect(course).toBeNull()
  })
})

describe('TestimonialRepository', () => {
  let repo: TestimonialRepository

  beforeEach(() => {
    repo = new TestimonialRepository()
  })

  it('should return testimonials with valid ratings', async () => {
    const testimonials = await repo.getTestimonials()
    expect(testimonials).toHaveLength(3)
    testimonials.forEach(t => {
      expect(t.rating).toBeGreaterThanOrEqual(1)
      expect(t.rating).toBeLessThanOrEqual(5)
      expect(t.name).toBeTruthy()
      expect(t.text).toBeTruthy()
    })
  })
})

describe('FeatureRepository', () => {
  let repo: FeatureRepository

  beforeEach(() => {
    repo = new FeatureRepository()
  })

  it('should return 6 features', async () => {
    const features = await repo.getFeatures()
    expect(features).toHaveLength(6)
    features.forEach(f => {
      expect(f.icon).toHaveLength(1)
      expect(f.gradient).toContain('from-')
      expect(f.gradient).toContain('to-')
    })
  })
})

describe('StatsRepository', () => {
  let repo: StatsRepository

  beforeEach(() => {
    repo = new StatsRepository()
  })

  it('should return 4 stats', async () => {
    const stats = await repo.getStats()
    expect(stats).toHaveLength(4)
    stats.forEach(s => {
      expect(s.value).toBeTruthy()
      expect(s.label).toBeTruthy()
    })
  })
})
