import { useState, useEffect } from 'react'
import type { Stat } from '@/domain/models/Stats'
import type { IStatsRepository } from '@/domain/repositories/IStatsRepository'
import { getDIContainer } from '@/di/container'

interface StatsViewModel {
  stats: Stat[]
  isLoading: boolean
  error: string | null
}

export function useStatsViewModel(
  repository?: IStatsRepository
): StatsViewModel {
  const repo = repository ?? getDIContainer().statsRepository
  const [stats, setStats] = useState<Stat[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    repo.getStats()
      .then(data => { setStats(data); setIsLoading(false) })
      .catch(err => { setError(err.message); setIsLoading(false) })
  }, [repo])

  return { stats, isLoading, error }
}
