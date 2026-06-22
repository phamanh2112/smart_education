import type { Course, CourseSlide } from '@/domain/models/Course'
import type { Feature } from '@/domain/models/Feature'
import type { NavLink } from '@/domain/models/NavLink'
import type { Stat } from '@/domain/models/Stats'
import type { Testimonial, User } from '@/domain/models/User'

describe('Domain Models', () => {
  it('creates a valid Course', () => {
    const course: Course = {
      id: '1', title: 'Math 101', description: 'Basic math',
      image: 'img.jpg', tag: 'Math', instructor: 'John',
      rating: 4.5, studentsCount: 100, price: 49.99,
    }
    expect(course.id).toBe('1')
    expect(course.price).toBeGreaterThan(0)
  })

  it('creates a valid CourseSlide', () => {
    const slide: CourseSlide = { image: 'slide.jpg', title: 'Test', desc: 'Desc', tag: 'Featured' }
    expect(slide.title).toBeTruthy()
    expect(slide.image).toBeTruthy()
  })

  it('creates a valid Feature', () => {
    const feat: Feature = { id: 'f1', icon: '🚀', title: 'Fast', desc: 'Learn', gradient: 'from-a to-b' }
    expect(feat.gradient).toContain('from-')
    expect(feat.gradient).toContain('to-')
  })

  it('creates a valid Stat', () => {
    const stat: Stat = { id: 's1', value: '10K+', label: 'Students', icon: '🎓' }
    expect(stat.value).toMatch(/\d+K?\+?/)
  })

  it('creates a valid Testimonial', () => {
    const t: Testimonial = { id: 't1', name: 'Jane', role: 'Teacher', avatar: 'a.jpg', text: 'Great!', rating: 5 }
    expect(t.rating).toBeGreaterThanOrEqual(1)
    expect(t.rating).toBeLessThanOrEqual(5)
  })

  it('creates a valid User', () => {
    const user: User = { id: 'u1', name: 'Alice', email: 'alice@test.com', avatar: 'a.jpg', role: 'student', createdAt: new Date() }
    expect(user.role).toMatch(/^(teacher|student|admin)$/)
    expect(user.email).toContain('@')
  })

  it('creates a valid NavLink', () => {
    const link: NavLink = { label: 'Home', href: '/' }
    expect(link.href).toBe('/')
    expect(link.label).toBe('Home')
  })
})
