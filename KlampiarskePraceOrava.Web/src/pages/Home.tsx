import { Link } from 'react-router-dom'
import { ChevronRight, Home as HomeIcon, Eye, Flame } from 'lucide-react'

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section
        className="relative text-white py-24 px-4 text-center bg-gray-900"
        style={{ backgroundImage: 'url(/uvod.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Klampiarske práce <span className="text-orange-400">Orava</span>
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-8">
            Odborné zakrytie striech plechom a montáž strešných okien priamo z Oravy. Kvalita, na ktorú sa môžete spoľahnúť.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/projekty"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              Naše projekty <ChevronRight size={18} />
            </Link>
            <Link
              to="/kontakt"
              className="border border-gray-400 hover:border-white text-white px-6 py-3 rounded-lg transition-colors"
            >
              Kontaktujte nás
            </Link>
          </div>
        </div>
      </section>

      {/* Služby */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Naše služby</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex gap-4 p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-orange-100 text-orange-500 rounded-lg p-3 h-fit">
                <HomeIcon size={28} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Pokrytie strechy</h3>
                <p className="text-gray-600">
                  Profesionálne pokrytie strechy plechovou krytinou — montáž, oprava aj rekonštrukcia. Trvanlivé riešenie pre dlhodobú ochranu vášho domu pred poveternostnými vplyvmi.
                </p>
              </div>
            </div>
            <div className="flex gap-4 p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-orange-100 text-orange-500 rounded-lg p-3 h-fit">
                <Eye size={28} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Strešné okná</h3>
                <p className="text-gray-600">
                  Odborná montáž a oplechovanie strešných okien. Zabezpečíme správne tesnenie a oplechovanie okolia okna, aby nedochádzalo k zatekaniu.
                </p>
              </div>
            </div>
            <div className="flex gap-4 p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="bg-orange-100 text-orange-500 rounded-lg p-3 h-fit">
                <Flame size={28} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Oplechovanie komína</h3>
                <p className="text-gray-600">
                  Kvalitné oplechovanie komínov pre spoľahlivé odvedenie vody. Predídeme zatekaniu a poškodeniu okolia komína.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
