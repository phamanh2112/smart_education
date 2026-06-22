'use client'

import { useState, useEffect, useCallback } from 'react'

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&q=80',
    title: 'Interactive Online Classes',
    desc: 'Real-time video sessions with smart whiteboards and AI assistance',
    tag: 'Live Learning',
  },
  {
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80',
    title: 'Personalized Learning Paths',
    desc: 'AI adapts course content to each student unique learning style',
    tag: 'AI Powered',
  },
  {
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
    title: 'Smart Assignment Grading',
    desc: 'Automated grading with detailed feedback saves teachers hours',
    tag: 'Automation',
  },
  {
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80',
    title: 'Global Student Community',
    desc: 'Connect with learners worldwide in collaborative study groups',
    tag: 'Community',
  },
]

export default function Slider() {
  const [current, setCurrent] = useState(0)

  const next = useCallback(() => {
    setCurrent(prev => (prev + 1) % slides.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent(prev => (prev - 1 + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(next, 4000)
    return () => clearInterval(timer)
  }, [next])

  return (
    <section id="courses" className="relative py-24 bg-[#0F0C29]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <span className="text-sm font-semibold tracking-widest text-transparent bg-clip-text bg-gradient-primary uppercase">
            Featured Courses
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold mt-4">
            Explore Our{' '}
            <span className="text-gradient">Popular</span> Courses
          </h2>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-3xl">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {slides.map((slide, i) => (
                <div key={i} className="min-w-full relative">
                  <div className="relative h-[400px] md:h-[500px]">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0F0C29]/90 via-[#0F0C29]/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
                      <span className="inline-block px-4 py-1.5 rounded-full bg-gradient-primary text-sm font-semibold mb-4">
                        {slide.tag}
                      </span>
                      <h3 className="text-3xl md:text-4xl font-bold mb-3">{slide.title}</h3>
                      <p className="text-lg text-gray-300 max-w-xl">{slide.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-all text-xl hover:scale-110"
          >
            ‹
          </button>
          <button
            onClick={next}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full glass flex items-center justify-center hover:bg-white/20 transition-all text-xl hover:scale-110"
          >
            ›
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-3 mt-8">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current ? 'w-10 bg-gradient-primary' : 'w-2 bg-gray-600 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
