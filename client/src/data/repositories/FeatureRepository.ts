import type { Feature } from '@/domain/models/Feature'
import type { IFeatureRepository } from '@/domain/repositories/IFeatureRepository'

const MOCK_FEATURES: Feature[] = [
  { id: '1', icon: '🎯', title: 'Smart Learning', desc: 'AI adapts to each students pace, ensuring no one falls behind', gradient: 'from-purple-500 to-pink-500' },
  { id: '2', icon: '👨‍🏫', title: 'Expert Teachers', desc: 'Learn from qualified educators with real-world experience', gradient: 'from-blue-500 to-cyan-500' },
  { id: '3', icon: '🤖', title: 'AI Tutor 24/7', desc: 'Get instant help anytime with our intelligent tutoring system', gradient: 'from-emerald-500 to-teal-500' },
  { id: '4', icon: '📊', title: 'Progress Tracking', desc: 'Detailed analytics and insights into learning performance', gradient: 'from-orange-500 to-red-500' },
  { id: '5', icon: '🎮', title: 'Gamified Learning', desc: 'Earn badges, compete on leaderboards, stay motivated', gradient: 'from-yellow-500 to-orange-500' },
  { id: '6', icon: '🌍', title: 'Global Community', desc: 'Connect with students and teachers from around the world', gradient: 'from-indigo-500 to-purple-500' },
]

export class FeatureRepository implements IFeatureRepository {
  async getFeatures(): Promise<Feature[]> {
    return MOCK_FEATURES
  }
}
