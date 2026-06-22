import type { Course, CourseSlide } from '@/domain/models/Course'
import type { Feature } from '@/domain/models/Feature'
import type { NavLink } from '@/domain/models/NavLink'
import type { Stat } from '@/domain/models/Stats'
import type { Testimonial, User } from '@/domain/models/User'

describe('Domain Models', () => {
  it('should create a valid Course', () => {
    const course: Course = {
      id: '1',
      title: 'Math 101',
      description: 'Basic math',
      image: 'img.jpg',
      tag: 'Math',
      instructor: 'John',
      rating: 4.5,
      studentsCount: 100,
      price: 49.99,
    }
    expect(course.id).toBe('1')
    expect(course.title).toBe('Math 101')
    expect(course.price).toBeGreaterThan(0)
  })

  it('should create a valid CourseSlide', () => {
    const slide: CourseSlide = {
      image: 'slide.jpg',
      title: 'Test Slide',
      desc: 'A slide description',
      tag: 'Featured',
    }
    expect(slide.title).toBeTruthy()
    expect(slide.image).toBeTruthy()
    expect(slide.desc).toBeTruthy()
    expect(slide.tag).toBeTruthy()
  })

  it('should create a valid Feature', () => {
    const feature: Feature = {
      id: 'f1',
      icon: '🚀',
      title: 'Fast Learning',
      desc: 'Learn quickly',
      gradient: 'from-blue-500 to-purple-500',
    }
    expect(feature.icon).toHaveLength(1)
    expect(feature.title).toBeTruthy()
    expect(feature.gradient).toContain('from-')
    expect(feature.gradient).toContain('to-')
  })

  it('should create a valid Stat', () => {
    const stat: Stat = {
      id: 's1',
      value: '10K+',
      label: 'Students',
      icon: '🎓',
    }
    expect(stat.value).toMatch(/\d+K?\+?/)
    expect(stat.label).toBeTruthy()
    expect(stat.icon).toBeTruthy()
  })

  it('should create a valid Testimonial', () => {
    const testimonial: Testimonial = {
      id: 't1',
      name: 'Jane Doe',
      role: 'Teacher',
      avatar: 'avatar.jpg',
      text: 'Great platform!',
      rating: 5,
    }
    expect(testimonial.rating).toBeGreaterThanOrEqual(1)
    expect(testimonial.rating).toBeLessThanOrEqual(5)
    expect(testimonial.name).toBeTruthy()
    expect(testimonial.text).toBeTruthy()
  })

  it('should create a valid User', () => {
    const user: User = {
      id: 'u1',
      name: 'Alice',
      email: 'alice@test.com',
      avatar: 'avatar.jpg',
      role: 'student',
      createdAt: new Date('2026-01-01'),
    }
    expect(user.role).toMatch(/^(teacher|student|admin)$/)
    expect(user.email).toContain('@')
    expect(user.createdAt).toBeInstanceOf(Date)
  })

  it('should create a valid NavLink', () => {
    const link: NavLink = { label: 'Home', href: '/' }
    expect(link.href).toStartWith('/')
    expect(link.label).toBeTruthy()
  })
})
