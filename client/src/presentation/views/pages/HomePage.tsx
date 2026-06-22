'use client'

import Navbar from '@/presentation/views/components/Navbar'
import Hero from '@/presentation/views/components/Hero'
import Slider from '@/presentation/views/components/Slider'
import Features from '@/presentation/views/components/Features'
import Stats from '@/presentation/views/components/Stats'
import Testimonials from '@/presentation/views/components/Testimonials'
import CTA from '@/presentation/views/components/CTA'
import Footer from '@/presentation/views/components/Footer'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Slider />
      <Features />
      <Stats />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}
