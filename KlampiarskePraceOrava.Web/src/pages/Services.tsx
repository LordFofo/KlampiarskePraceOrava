import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

const services = [
  {
    image: '/sluzba-strecha.jpg',
    title: 'Pokrytie strechy',
    category: 'Pokrytie strechy',
    description:
      'Komplexné pokrytie striech plechovou krytinou — od montáže novej strechy, cez opravu poškodených úsekov, až po kompletnú rekonštrukciu. Pracujeme so stojatou drážkou (falcovaný plech), trapézovými plechmi aj profilovými krytinami vrátane správneho oplechovania hrebeňa, úžľabí a okrajov strechy.',
  },
  {
    image: '/sluzba-okno.jpg',
    title: 'Strešné okná',
    category: 'Strešné okná',
    description:
      'Odborná montáž strešných okien vrátane kompletného oplechovania okolia — lemovanie okna, odvodnenie a tesnenie napojenia na krytinu. Používame kvalitné materiály odolné voči UV žiareniu a mrazu. Realizujeme montáž okien Velux, Fakro, Roto a ďalších výrobcov.',
  },
  {
    image: '/sluzba-komin.jpg',
    title: 'Oplechovanie komína',
    category: 'Oplechovanie komína',
    description:
      'Nové oplechovanie komínov aj oprava existujúceho pomocou tvaroviek z pozinkovaného alebo titánzinkového plechu. Dokonale kopírujeme tvar komína a napojenie na krytinu vrátane žľabového odvedenia vody. Po práci skontrolujeme tesnosť celého napojenia.',
  },
]

export default function Services() {
  return (
    <div className="bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Naše služby</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Špecializujeme sa na klampiarske práce v regióne Orava. Každú zákazku realizujeme s dôrazom na kvalitu a dlhodobú odolnosť.
        </p>
      </div>

      {/* Alternating sections */}
      <div className="max-w-5xl mx-auto px-4 py-12 flex flex-col gap-8">
        {services.map((s, i) => (
          <div
            key={s.title}
            className="flex flex-col md:flex-row bg-white rounded-2xl shadow-sm overflow-hidden"
          >
            {/* Obrázok — na mobile vždy hore, na desktop sa strieda pozícia */}
            <div className={`md:w-1/2 shrink-0 ${i % 2 === 1 ? 'md:order-2' : ''}`}>
              <img
                src={s.image}
                alt={s.title}
                className="w-full h-56 md:h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Text */}
            <div className={`md:w-1/2 p-6 md:p-10 flex flex-col justify-center gap-4 ${i % 2 === 1 ? 'md:order-1' : ''}`}>
              <h2 className="text-2xl font-bold text-gray-800">{s.title}</h2>
              <p className="text-gray-600 leading-relaxed">{s.description}</p>
              <Link
                to={`/realizacie?kategoria=${encodeURIComponent(s.category)}`}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg transition-colors self-start text-sm"
              >
                Pozrieť realizácie <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-blue-600 py-12 px-4 text-center text-white">
        <h2 className="text-2xl font-bold mb-2">Máte otázku alebo záujem o cenovú ponuku?</h2>
        <p className="text-blue-100 mb-6">Obhliadka je bezplatná — ozvite sa nám.</p>
        <Link
          to="/kontakt"
          className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
        >
          Kontaktujte nás <ChevronRight size={18} />
        </Link>
      </div>
    </div>
  )
}
