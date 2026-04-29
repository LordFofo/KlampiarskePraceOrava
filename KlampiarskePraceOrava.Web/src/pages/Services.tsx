import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

const services = [
  {
    image: '/sluzba-strecha.jpg',
    title: 'Pokrytie strechy',
    category: 'Pokrytie strechy',
    description: [
      'Strecha je najdôležitejšia ochrana vášho domu pred poveternostnými vplyvmi. Poskytujeme komplexné služby v oblasti pokrytia striech plechovou krytinou — od montáže novej strechy, cez opravu poškodených úsekov, až po kompletnú rekonštrukciu.',
      'Pracujeme so stojatou drážkou (falcovaný plech), trapézovými plechmi aj profilovými krytinami. Každá realizácia zahŕňa správne oplechovanie hrebeňa, úžľabí a okrajov strechy pre maximálnu odolnosť voči vode.',
      'Po dokončení prác odveziete odpad a pracovisko zanecháme v čistote.'
    ],
  },
  {
    image: '/sluzba-okno.jpg',
    title: 'Strešné okná',
    category: 'Strešné okná',
    description: [
      'Správna montáž strešného okna je kľúčová pre dlhodobú funkčnosť a zamedzenie zatekania. Zabezpečíme odborné zabudovanie strešných okien vrátane kompletného oplechovania okolia.',
      'Oplechovanie zahŕňa lemovanie okna, odvodnenie a tesnenie napojenia na krytinu. Používame kvalitné materiály odolné voči UV žiareniu a mrazu, ktoré udržia tesnosť po celú dobu životnosti okna.',
      'Realizujeme montáž okien Velux, Fakro, Roto a ďalších výrobcov.'
    ],
  },
  {
    image: '/sluzba-komin.jpg',
    title: 'Oplechovanie komína',
    category: 'Oplechovanie komína',
    description: [
      'Komín je jedno z najčastejších miest, kde dochádza k zatekaniu vody do strechy. Príčinou je väčšinou poškodené alebo nesprávne vyhotovené oplechovanie. Vykonávame nové oplechovanie komínov aj opravu existujúceho.',
      'Oplechovanie riešime pomocou tvaroviek z pozinkovaného alebo titánzinkového plechu, ktoré dokonale kopírujú tvar komína a napojenie na krytinu. Súčasťou je aj správne odvedenie vody od komína pomocou žľabového oplechovania.',
      'Po práci skontrolujeme tesnosť celého napojenia a odstraňujeme príčiny, nie len príznaky zatekania.'
    ],
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

      {/* Služby */}
      <div className="max-w-4xl mx-auto px-4 py-12 flex flex-col gap-8">
        {services.map((s) => (
          <div key={s.title} className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <img
              src={s.image}
              alt={s.title}
              className="w-full h-64 object-cover"
              loading="lazy"
            />
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">{s.title}</h2>
              <div className="flex flex-col gap-3 text-gray-600 leading-relaxed mb-6">
                {s.description.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <Link
                to={`/realizacie?kategoria=${encodeURIComponent(s.category)}`}
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
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
