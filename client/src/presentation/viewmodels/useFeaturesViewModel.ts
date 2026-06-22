import { useState, useEffect } from 'react'
import type { Feature } from '@/domain/models/Feature'
import type { IFeatureRepository } from '@/domain/repositories/IFeatureRepository'
import { getDIContainer } from '@/di/container'

interface FeaturesViewModel {
  features: Feature[]
  isLoading: boolean
  error: string | null
}

export function useFeaturesViewModel(
  repository?: IFeatureRepository
): FeaturesViewModel {
  const repo = repository ?? getDIContainer().featureRepository
  const [features, setFeatures] = useState<Feature[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    repo.getFeatures()
      .then(data => { setFeatures(data); setIsLoading(false) })
      .catch(err => { setError(err.message); setIsLoading(false) })
  }, [repo])

  return { features, isLoading, error }
}
