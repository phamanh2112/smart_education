'use client'

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Mathematics Teacher',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    text: 'EduSmart transformed how I teach. The AI grading feature saves me 10 hours per week, and my students love the interactive lessons.',
    rating: 5,
  },
  {
    name: 'James Chen',
    role: 'High School Student',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    text: 'The AI tutor helped me understand calculus concepts I struggled with for months. My grades improved from C to A in just one semester!',
    rating: 5,
  },
  {
    name: 'Dr. Maria Lopez',
    role: 'University Professor',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    text: 'The analytics dashboard gives me real-time insights into student performance. I can identify struggling students before they fall behind.',
    rating: 5,
  },
]

export default function Testimonials() {
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
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="p-8 rounded-3xl glass hover:bg-white/10 transition-all duration-500 hover:scale-[1.02] group"
            >
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>
              <p className="text-gray-300 leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-purple-500/50"
                />
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
