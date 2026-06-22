import type { Stat } from '@/domain/models/Stats'
import type { IStatsRepository } from '@/domain/repositories/IStatsRepository'

const MOCK_STATS: Stat[] = [
  { id: '1', value: '50K+', label: 'Students Enrolled', icon: '🎓' },
  { id: '2', value: '10K+', label: 'Courses Available', icon: '📚' },
  { id: '3', value: '5K+', label: 'Expert Teachers', icon: '👨‍🏫' },
  { id: '4', value: '98%', label: 'Satisfaction Rate', icon: '⭐' },
]

export class StatsRepository implements IStatsRepository {
  async getStats(): Promise<Stat[]> {
    return MOCK_STATS
  }
}
