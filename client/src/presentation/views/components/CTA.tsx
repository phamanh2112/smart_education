'use client'

export default function CTA() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 border border-white/10 rounded-full animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 border border-white/5 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-6xl font-extrabold mb-6">
          Ready to Transform{' '}
          <span className="text-gradient">Education</span>?
        </h2>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Join thousands of teachers and students already using EduSmart. Start your journey today.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="px-10 py-4 rounded-full bg-gradient-primary text-white font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105 glow">
            Start Free Trial
          </button>
          <button className="px-10 py-4 rounded-full glass text-white font-semibold text-lg hover:bg-white/10 transition-all duration-300">
            Schedule Demo
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-6">No credit card required. Free 14-day trial.</p>
      </div>
    </section>
  )
}
