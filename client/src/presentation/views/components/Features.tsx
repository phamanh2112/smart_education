'use client'

import { useEffect, useRef } from 'react'
import { useFeaturesViewModel } from '@/presentation/viewmodels/useFeaturesViewModel'

export default function Features() {
  const { features, isLoading, error } = useFeaturesViewModel()
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0')
            entry.target.classList.remove('opacity-0', 'translate-y-10')
          }
        })
      },
      { threshold: 0.1 }
    )
    const cards = cardsRef.current?.querySelectorAll('.feature-card')
    cards?.forEach(card => observer.observe(card))
    return () => observer.disconnect()
  }, [features])

  if (isLoading) {
    return (
      <section className="py-24 bg-[#0F0C29]">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-400">Loading features...</div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-24 bg-[#0F0C29]">
        <div className="max-w-7xl mx-auto px-6 text-center text-red-400">{error}</div>
      </section>
    )
  }

  return (
    <section id="features" className="relative py-24 bg-gradient-to-b from-[#0F0C29] via-[#1a1440] to-[#0F0C29]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <span className="text-sm font-semibold tracking-widest text-transparent bg-clip-text bg-gradient-primary uppercase">
            Why Choose Us
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mt-4">
            Built for{' '}
            <span className="text-gradient">Modern</span> Education
          </h2>
        </div>

        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, i) => (
            <div
              key={feat.id}
              className="feature-card opacity-0 translate-y-10 transition-all duration-700 group"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="relative h-full p-8 rounded-3xl glass hover:bg-white/10 transition-all duration-500 group-hover:scale-[1.02] group-hover:glow">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feat.gradient} flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform`}>
                  {feat.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
