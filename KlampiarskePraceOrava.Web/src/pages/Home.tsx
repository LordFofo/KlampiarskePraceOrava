import { Link } from 'react-router-dom'
import { ChevronRight, Phone } from 'lucide-react'

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section
        className="relative text-white min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 text-center bg-gray-900"
        style={{ backgroundImage: 'url(/uvod.jpg)', backgroundSize: 'cover', backgroundPosition: 'center top' }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent" />
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Klampiarske práce <span className="text-blue-400">Orava</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Odborné pokrytie striech plechom a montáž strešných okien priamo z Oravy. Kvalita, na ktorú sa môžete spoľahnúť.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/sluzby"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              Naše služby <ChevronRight size={18} />
            </Link>
            <Link
              to="/kontakt"
              className="border border-gray-400 hover:border-white text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <Phone size={16} /> Bezplatná obhliadka
            </Link>
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="bg-blue-600 py-14 px-4 text-center text-white">
        <h2 className="text-3xl font-bold mb-3">Záujem o bezplatnú obhliadku?</h2>
        <p className="text-blue-100 mb-8 text-lg">Prídeme sa pozrieť, poradíme a pripravíme cenovú ponuku — zadarmo.</p>
        <Link
          to="/kontakt"
          className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
        >
          Kontaktujte nás <ChevronRight size={18} />
        </Link>
      </section>
    </div>
  )
}
