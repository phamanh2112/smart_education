import { CourseRepository } from '@/data/repositories/CourseRepository'
import { TestimonialRepository } from '@/data/repositories/TestimonialRepository'
import { FeatureRepository } from '@/data/repositories/FeatureRepository'
import { StatsRepository } from '@/data/repositories/StatsRepository'

describe('CourseRepository', () => {
  let repo: CourseRepository

  beforeEach(() => { repo = new CourseRepository() })

  it('returns featured slides', async () => {
    const slides = await repo.getFeaturedSlides()
    expect(slides).toHaveLength(4)
    slides.forEach(slide => {
      expect(slide).toHaveProperty('image')
      expect(slide).toHaveProperty('title')
      expect(slide).toHaveProperty('desc')
      expect(slide).toHaveProperty('tag')
    })
  })

  it('returns empty for popular courses', async () => {
    expect(await repo.getPopularCourses()).toEqual([])
  })

  it('returns null for unknown id', async () => {
    expect(await repo.getCourseById('x')).toBeNull()
  })
})

describe('TestimonialRepository', () => {
  let repo: TestimonialRepository
  beforeEach(() => { repo = new TestimonialRepository() })

  it('returns 3 testimonials with valid ratings', async () => {
    const ts = await repo.getTestimonials()
    expect(ts).toHaveLength(3)
    ts.forEach(t => {
      expect(t.rating).toBeGreaterThanOrEqual(1)
      expect(t.rating).toBeLessThanOrEqual(5)
      expect(t.name).toBeTruthy()
    })
  })
})

describe('FeatureRepository', () => {
  let repo: FeatureRepository
  beforeEach(() => { repo = new FeatureRepository() })

  it('returns 6 features with gradient classes', async () => {
    const features = await repo.getFeatures()
    expect(features).toHaveLength(6)
    features.forEach(f => {
      expect(typeof f.icon).toBe('string')
      expect(f.icon.length).toBeGreaterThan(0)
      expect(f.gradient).toContain('from-')
      expect(f.gradient).toContain('to-')
    })
  })
})

describe('StatsRepository', () => {
  let repo: StatsRepository
  beforeEach(() => { repo = new StatsRepository() })

  it('returns 4 stats with values', async () => {
    const stats = await repo.getStats()
    expect(stats).toHaveLength(4)
    stats.forEach(s => {
      expect(s.value).toBeTruthy()
      expect(s.label).toBeTruthy()
    })
  })
})
