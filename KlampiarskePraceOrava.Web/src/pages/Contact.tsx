import { ExternalLink, Phone, User } from 'lucide-react'

const contacts = [
  { name: 'Tomáš Babčeka', phone: '+421 948 383 532' },
  { name: 'Peter Romaňák', phone: '+421 907 656 735' },
]

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
      <div className="bg-white rounded-2xl shadow-sm p-10 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Kontakt</h1>
        <p className="text-gray-500 mb-8">Zavolajte nám alebo nás nájdite na Facebooku.</p>

        <div className="flex flex-col gap-3 mb-6">
          {contacts.map((c) => (
            <div key={c.name} className="bg-gray-50 rounded-xl px-5 py-4 text-left">
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-orange-100 text-orange-500 rounded-full p-2">
                  <User size={18} />
                </div>
                <span className="font-semibold text-gray-800">{c.name}</span>
              </div>
              <a
                href={`tel:${c.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium ml-11 transition-colors"
              >
                <Phone size={15} />
                {c.phone}
              </a>
            </div>
          ))}
        </div>

        <a
          href="https://www.facebook.com/groups/1478324683950260/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-3 bg-[#1877F2] hover:bg-[#1565D8] text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg w-full"
        >
          <ExternalLink size={22} />
          Navštíviť Facebook skupinu
        </a>
      </div>
    </div>
  )
}
