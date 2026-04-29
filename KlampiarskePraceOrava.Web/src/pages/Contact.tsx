import { ExternalLink, User } from 'lucide-react'

const contacts = [
  { name: 'Tomáš Babčeka' },
  { name: 'Peter Romaňák' },
]

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-16">
      <div className="bg-white rounded-2xl shadow-sm p-10 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Kontakt</h1>
        <p className="text-gray-500 mb-8">Nájdite nás na Facebooku alebo nás kontaktujte priamo.</p>

        <div className="flex flex-col gap-3 mb-6">
          {contacts.map((c) => (
            <div key={c.name} className="flex items-center gap-3 bg-gray-50 rounded-xl px-5 py-4">
              <div className="bg-orange-100 text-orange-500 rounded-full p-2">
                <User size={18} />
              </div>
              <span className="font-medium text-gray-800">{c.name}</span>
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
