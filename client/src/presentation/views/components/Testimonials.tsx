'use client'

import { useTestimonialsViewModel } from '@/presentation/viewmodels/useTestimonialsViewModel'

export default function Testimonials() {
  const { testimonials, isLoading, error } = useTestimonialsViewModel()

  if (isLoading) {
    return (
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 text-center text-gray-400">Loading testimonials...</div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 text-center text-red-400">{error}</div>
      </section>
    )
  }

  return (
    <section className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <span className="text-sm font-semibold tracking-widest text-transparent bg-clip-text bg-gradient-primary uppercase">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mt-4">
            What Our{' '}
            <span className="text-gradient">Users</span> Say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map(t => (
            <div key={t.id} className="p-8 rounded-3xl glass hover:bg-white/10 transition-all duration-500 hover:scale-[1.02] group">
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-4">
                <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-purple-500/50" />
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-gray-400">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
