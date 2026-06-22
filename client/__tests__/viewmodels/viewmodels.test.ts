import { renderHook, act, waitFor } from '@testing-library/react'
import { useSliderViewModel } from '@/presentation/viewmodels/useSliderViewModel'
import { useFeaturesViewModel } from '@/presentation/viewmodels/useFeaturesViewModel'
import { useStatsViewModel } from '@/presentation/viewmodels/useStatsViewModel'
import { useTestimonialsViewModel } from '@/presentation/viewmodels/useTestimonialsViewModel'
import { useNavbarViewModel } from '@/presentation/viewmodels/useNavbarViewModel'
import type { ICourseRepository } from '@/domain/repositories/ICourseRepository'
import type { IFeatureRepository } from '@/domain/repositories/IFeatureRepository'
import type { IStatsRepository } from '@/domain/repositories/IStatsRepository'
import type { ITestimonialRepository } from '@/domain/repositories/ITestimonialRepository'
import type { CourseSlide } from '@/domain/models/Course'

class MockCourseRepo implements ICourseRepository {
  slides: CourseSlide[] = [
    { image: 'a.jpg', title: 'A', desc: 'Desc A', tag: 'Tag A' },
    { image: 'b.jpg', title: 'B', desc: 'Desc B', tag: 'Tag B' },
  ]
  async getFeaturedSlides(): Promise<CourseSlide[]> { return this.slides }
  async getPopularCourses() { return [] }
  async getCourseById(_id: string) { return null }
}

class MockFeatureRepo implements IFeatureRepository {
  async getFeatures() {
    return [{ id: '1', icon: '🎯', title: 'Smart', desc: 'AI', gradient: 'from-a to-b' }]
  }
}

class MockStatsRepo implements IStatsRepository {
  async getStats() {
    return [{ id: '1', value: '10K+', label: 'Students', icon: '🎓' }]
  }
}

class MockTestimonialRepo implements ITestimonialRepository {
  async getTestimonials() {
    return [{ id: '1', name: 'John', role: 'Teacher', avatar: 'a.jpg', text: 'Great', rating: 5 }]
  }
}

describe('useNavbarViewModel', () => {
  it('returns initial state', () => {
    const { result } = renderHook(() => useNavbarViewModel())
    expect(result.current.menuOpen).toBe(false)
    expect(result.current.navLinks).toHaveLength(4)
  })

  it('toggles menu', () => {
    const { result } = renderHook(() => useNavbarViewModel())
    act(() => result.current.setMenuOpen(true))
    expect(result.current.menuOpen).toBe(true)
  })
})

describe('useSliderViewModel', () => {
  it('loads slides', async () => {
    const repo = new MockCourseRepo()
    const { result } = renderHook(() => useSliderViewModel(repo))
    await waitFor(() => expect(result.current.isLoading).toBe(false), { timeout: 3000 })
    expect(result.current.slides).toHaveLength(2)
    expect(result.current.error).toBeNull()
  }, 10000)

  it('navigates slides', async () => {
    const repo = new MockCourseRepo()
    const { result } = renderHook(() => useSliderViewModel(repo))
    await waitFor(() => expect(result.current.isLoading).toBe(false), { timeout: 3000 })
    expect(result.current.currentIndex).toBe(0)

    act(() => result.current.goNext())
    expect(result.current.currentIndex).toBe(1)

    act(() => result.current.goPrev())
    expect(result.current.currentIndex).toBe(0)

    act(() => result.current.goTo(1))
    expect(result.current.currentIndex).toBe(1)
  }, 10000)

  it('wraps around on overflow', async () => {
    const repo = new MockCourseRepo()
    const { result } = renderHook(() => useSliderViewModel(repo))
    await waitFor(() => expect(result.current.isLoading).toBe(false), { timeout: 3000 })
    act(() => result.current.goNext())
    act(() => result.current.goNext())
    act(() => result.current.goNext())
    expect(result.current.currentIndex).toBe(1)
  }, 10000)
})

describe('useFeaturesViewModel', () => {
  it('loads features', async () => {
    const repo = new MockFeatureRepo()
    const { result } = renderHook(() => useFeaturesViewModel(repo))
    await waitFor(() => expect(result.current.isLoading).toBe(false), { timeout: 3000 })
    expect(result.current.features).toHaveLength(1)
    expect(result.current.features[0].title).toBe('Smart')
  }, 10000)
})

describe('useStatsViewModel', () => {
  it('loads stats', async () => {
    const repo = new MockStatsRepo()
    const { result } = renderHook(() => useStatsViewModel(repo))
    await waitFor(() => expect(result.current.isLoading).toBe(false), { timeout: 3000 })
    expect(result.current.stats).toHaveLength(1)
    expect(result.current.stats[0].value).toBe('10K+')
  }, 10000)
})

describe('useTestimonialsViewModel', () => {
  it('loads testimonials', async () => {
    const repo = new MockTestimonialRepo()
    const { result } = renderHook(() => useTestimonialsViewModel(repo))
    await waitFor(() => expect(result.current.isLoading).toBe(false), { timeout: 3000 })
    expect(result.current.testimonials).toHaveLength(1)
    expect(result.current.testimonials[0].name).toBe('John')
  }, 10000)
})
