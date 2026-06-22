import Link from 'next/link'

const footerLinks = {
  Platform: ['Courses', 'Features', 'Pricing', 'FAQ'],
  Company: ['About', 'Blog', 'Careers', 'Contact'],
  Support: ['Help Center', 'Privacy Policy', 'Terms of Service', 'Cookie Policy'],
}

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#0F0C29]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center font-bold text-lg">
                E
              </div>
              <span className="text-xl font-bold">
                Edu<span className="text-gradient">Smart</span>
              </span>
            </Link>
            <p className="text-gray-400 max-w-sm leading-relaxed">
              Empowering the future of education through smart technology. 
              Connecting teachers and students worldwide.
            </p>
            <div className="flex gap-4 mt-6">
              {['𝕏', 'in', 'f', '📺'].map((icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full glass flex items-center justify-center text-sm hover:bg-white/20 transition-all hover:scale-110"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold mb-6 text-white">{title}</h4>
              <ul className="space-y-4">
                {links.map(link => (
                  <li key={link}>
                    <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>© 2026 EduSmart. All rights reserved.</p>
          <p>Made with ❤️ for education</p>
        </div>
      </div>
    </footer>
  )
}
