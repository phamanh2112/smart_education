import type { ICourseRepository } from '@/domain/repositories/ICourseRepository'
import type { ITestimonialRepository } from '@/domain/repositories/ITestimonialRepository'
import type { IFeatureRepository } from '@/domain/repositories/IFeatureRepository'
import type { IStatsRepository } from '@/domain/repositories/IStatsRepository'
import { CourseRepository } from '@/data/repositories/CourseRepository'
import { TestimonialRepository } from '@/data/repositories/TestimonialRepository'
import { FeatureRepository } from '@/data/repositories/FeatureRepository'
import { StatsRepository } from '@/data/repositories/StatsRepository'

interface DIContainer {
  courseRepository: ICourseRepository
  testimonialRepository: ITestimonialRepository
  featureRepository: IFeatureRepository
  statsRepository: IStatsRepository
}

const container: DIContainer = {
  courseRepository: new CourseRepository(),
  testimonialRepository: new TestimonialRepository(),
  featureRepository: new FeatureRepository(),
  statsRepository: new StatsRepository(),
}

export function getDIContainer(): DIContainer {
  return container
}
