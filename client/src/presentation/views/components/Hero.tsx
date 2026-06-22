'use client'

import { useHeroViewModel } from '@/presentation/viewmodels/useHeroViewModel'

export default function Hero() {
  const { containerRef } = useHeroViewModel()

  const images = [
    {
      src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&q=80',
      alt: 'Online learning',
      className: 'absolute top-0 right-0 w-72 h-72 rounded-3xl overflow-hidden shadow-2xl transform rotate-3',
    },
    {
      src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80',
      alt: 'Students collaborating',
      className: 'absolute bottom-20 left-0 w-64 h-64 rounded-3xl overflow-hidden shadow-2xl transform -rotate-3',
    },
    {
      src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&q=80',
      alt: 'Teacher',
      className: 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-3xl overflow-hidden shadow-2xl transform rotate-6 border-4 border-white/10',
    },
  ]

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-hero">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-1/2 -right-40 w-80 h-80 bg-pink-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute -bottom-40 left-1/3 w-72 h-72 bg-blue-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-16 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-gray-300">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Now enrolling for 2026
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight">
            Education{' '}
            <span className="text-gradient">Online</span>
            <br />
            &{' '}
            <span className="text-gradient" style={{ backgroundImage: 'linear-gradient(135deg, #00D2FF 0%, #FF6584 100%)' }}>
              Smart
            </span>
          </h1>

          <p className="text-xl text-gray-400 leading-relaxed max-w-lg">
            Empowering teachers and students with an intelligent learning platform. 
            AI-powered lessons, real-time collaboration, and personalized education for everyone.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-4 rounded-full bg-gradient-primary text-white font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105 glow">
              Start Learning Now
            </button>
            <button className="px-8 py-4 rounded-full glass text-white font-semibold text-lg hover:bg-white/10 transition-all duration-300">
              Watch Demo
            </button>
          </div>

          <div className="flex items-center gap-8 pt-4">
            <div className="flex -space-x-3">
              {['👩‍🏫', '👨‍🎓', '👩‍💻', '🧑‍🔬'].map((emoji, i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#0F0C29] bg-gradient-primary flex items-center justify-center text-xs font-bold">
                  {emoji}
                </div>
              ))}
            </div>
            <div>
              <p className="text-2xl font-bold">10K+</p>
              <p className="text-sm text-gray-400">Active Students</p>
            </div>
          </div>
        </div>

        <div ref={containerRef} className="relative hidden lg:block transition-transform duration-200 ease-out">
          <div className="relative w-full aspect-square">
            {images.map((img, i) => (
              <div key={i} className={img.className}>
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
              </div>
            ))}
            <div className="absolute bottom-40 right-10 w-20 h-20 rounded-2xl bg-gradient-accent flex items-center justify-center shadow-lg animate-bounce">
              <span className="text-3xl">🤖</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0F0C29] to-transparent" />
    </section>
  )
}
