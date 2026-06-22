import { renderHook, act } from '@testing-library/react'
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

// --- Mocks ---

class MockCourseRepository implements ICourseRepository {
  async getFeaturedSlides(): Promise<CourseSlide[]> {
    return [
      { image: 'a.jpg', title: 'A', desc: 'Desc A', tag: 'Tag A' },
      { image: 'b.jpg', title: 'B', desc: 'Desc B', tag: 'Tag B' },
    ]
  }
  async getPopularCourses() { return [] }
  async getCourseById(_id: string) { return null }
}

class MockFeatureRepository implements IFeatureRepository {
  async getFeatures() {
    return [
      { id: '1', icon: '🎯', title: 'Smart', desc: 'AI learning', gradient: 'from-a to-b' },
    ]
  }
}

class MockStatsRepository implements IStatsRepository {
  async getStats() {
    return [
      { id: '1', value: '10K+', label: 'Students', icon: '🎓' },
    ]
  }
}

class MockTestimonialRepository implements ITestimonialRepository {
  async getTestimonials() {
    return [
      { id: '1', name: 'John', role: 'Teacher', avatar: 'a.jpg', text: 'Great', rating: 5 },
    ]
  }
}

// --- Tests ---

describe('useNavbarViewModel', () => {
  it('should return initial state', () => {
    const { result } = renderHook(() => useNavbarViewModel())
    expect(result.current.menuOpen).toBe(false)
    expect(result.current.navLinks).toHaveLength(4)
  })

  it('should toggle menu', () => {
    const { result } = renderHook(() => useNavbarViewModel())
    act(() => result.current.setMenuOpen(true))
    expect(result.current.menuOpen).toBe(true)
  })
})

describe('useSliderViewModel', () => {
  it('should load slides', async () => {
    const { result } = renderHook(() => useSliderViewModel(new MockCourseRepository()))
    await act(async () => {})
    expect(result.current.isLoading).toBe(false)
    expect(result.current.slides).toHaveLength(2)
    expect(result.current.error).toBeNull()
  })

  it('should navigate slides', async () => {
    const { result } = renderHook(() => useSliderViewModel(new MockCourseRepository()))
    await act(async () => {})
    expect(result.current.currentIndex).toBe(0)

    act(() => result.current.goNext())
    expect(result.current.currentIndex).toBe(1)

    act(() => result.current.goPrev())
    expect(result.current.currentIndex).toBe(0)

    act(() => result.current.goTo(1))
    expect(result.current.currentIndex).toBe(1)
  })

  it('should wrap around on next', async () => {
    const { result } = renderHook(() => useSliderViewModel(new MockCourseRepository()))
    await act(async () => {})
    act(() => result.current.goNext())
    act(() => result.current.goNext())
    expect(result.current.currentIndex).toBe(0)
  })
})

describe('useFeaturesViewModel', () => {
  it('should load features', async () => {
    const { result } = renderHook(() => useFeaturesViewModel(new MockFeatureRepository()))
    await act(async () => {})
    expect(result.current.isLoading).toBe(false)
    expect(result.current.features).toHaveLength(1)
    expect(result.current.features[0].title).toBe('Smart')
  })
})

describe('useStatsViewModel', () => {
  it('should load stats', async () => {
    const { result } = renderHook(() => useStatsViewModel(new MockStatsRepository()))
    await act(async () => {})
    expect(result.current.isLoading).toBe(false)
    expect(result.current.stats).toHaveLength(1)
    expect(result.current.stats[0].value).toBe('10K+')
  })
})

describe('useTestimonialsViewModel', () => {
  it('should load testimonials', async () => {
    const { result } = renderHook(() => useTestimonialsViewModel(new MockTestimonialRepository()))
    await act(async () => {})
    expect(result.current.isLoading).toBe(false)
    expect(result.current.testimonials).toHaveLength(1)
    expect(result.current.testimonials[0].name).toBe('John')
  })
})
