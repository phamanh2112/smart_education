'use client'

import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Slider from '@/components/Slider'
import Features from '@/components/Features'
import Stats from '@/components/Stats'
import Testimonials from '@/components/Testimonials'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
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
