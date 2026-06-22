import { useState, useEffect } from 'react'
import type { Testimonial } from '@/domain/models/User'
import type { ITestimonialRepository } from '@/domain/repositories/ITestimonialRepository'
import { getDIContainer } from '@/di/container'

interface TestimonialsViewModel {
  testimonials: Testimonial[]
  isLoading: boolean
  error: string | null
}

export function useTestimonialsViewModel(
  repository?: ITestimonialRepository
): TestimonialsViewModel {
  const repo = repository ?? getDIContainer().testimonialRepository
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    repo.getTestimonials()
      .then(data => { setTestimonials(data); setIsLoading(false) })
      .catch(err => { setError(err.message); setIsLoading(false) })
  }, [repo])

  return { testimonials, isLoading, error }
}
