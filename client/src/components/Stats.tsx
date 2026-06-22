'use client'

import { useEffect, useRef } from 'react'

const stats = [
  { value: '50K+', label: 'Students Enrolled', icon: '🎓' },
  { value: '10K+', label: 'Courses Available', icon: '📚' },
  { value: '5K+', label: 'Expert Teachers', icon: '👨‍🏫' },
  { value: '98%', label: 'Satisfaction Rate', icon: '⭐' },
]

export default function Stats() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.stat-item').forEach((el, i) => {
              setTimeout(() => {
                (el as HTMLElement).classList.add('opacity-100', 'scale-100')
                ;(el as HTMLElement).classList.remove('opacity-0', 'scale-75')
              }, i * 150)
            })
          }
        })
      },
      { threshold: 0.3 }
    )

    const el = containerRef.current
    if (el) observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-pink-500/10" />
      <div ref={containerRef} className="relative max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="stat-item opacity-0 scale-75 transition-all duration-500 text-center p-8 rounded-3xl glass hover:bg-white/10 group"
            >
              <span className="text-4xl mb-4 block group-hover:scale-110 transition-transform">{stat.icon}</span>
              <p className="text-4xl md:text-5xl font-extrabold text-gradient mb-2">{stat.value}</p>
              <p className="text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
