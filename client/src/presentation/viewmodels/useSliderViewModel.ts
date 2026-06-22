import { useState, useEffect, useCallback } from 'react'
import type { CourseSlide } from '@/domain/models/Course'
import type { ICourseRepository } from '@/domain/repositories/ICourseRepository'
import { getDIContainer } from '@/di/container'

interface SliderViewModel {
  slides: CourseSlide[]
  currentIndex: number
  isLoading: boolean
  error: string | null
  goNext: () => void
  goPrev: () => void
  goTo: (index: number) => void
}

export function useSliderViewModel(
  repository?: ICourseRepository
): SliderViewModel {
  const repo = repository ?? getDIContainer().courseRepository
  const [slides, setSlides] = useState<CourseSlide[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    repo.getFeaturedSlides()
      .then(data => { setSlides(data); setIsLoading(false) })
      .catch(err => { setError(err.message); setIsLoading(false) })
  }, [repo])

  const goNext = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % slides.length)
  }, [slides.length])

  const goPrev = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + slides.length) % slides.length)
  }, [slides.length])

  const goTo = useCallback((index: number) => {
    setCurrentIndex(index)
  }, [])

  useEffect(() => {
    if (slides.length === 0) return
    const timer = setInterval(goNext, 4000)
    return () => clearInterval(timer)
  }, [goNext, slides.length])

  return { slides, currentIndex, isLoading, error, goNext, goPrev, goTo }
}
