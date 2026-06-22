import type { Stat } from '@/domain/models/Stats'

export interface IStatsRepository {
  getStats(): Promise<Stat[]>
}
