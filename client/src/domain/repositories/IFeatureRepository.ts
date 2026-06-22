import type { Feature } from '@/domain/models/Feature'

export interface IFeatureRepository {
  getFeatures(): Promise<Feature[]>
}
