import { useState } from 'react'
import { ExternalLink, Phone, User, Send, CheckCircle } from 'lucide-react'
import api from '../services/api'

const contacts = [
  { name: 'Tomáš Babečka', phone: '+421 948 383 532' },
  { name: 'Peter Romaňák', phone: '+421 907 656 735' },
]

export default function Contact() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    try {
      await api.post('/contact', { name, phone, message })
      setSent(true)
      setName('')
      setPhone('')
      setMessage('')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="bg-gray-50 px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">Kontakt</h1>
        <p className="text-gray-500 mb-10 text-center">Zavolajte nám alebo pošlite nezáväznú dopyt.</p>

        <div className="grid md:grid-cols-2 gap-8">

          {/* Kontaktné údaje */}
          <div className="flex flex-col gap-6">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="font-semibold text-gray-800 mb-4">Kontaktné osoby</h2>
              <div className="flex flex-col gap-3">
                {contacts.map((c) => (
                  <div key={c.name} className="bg-gray-50 rounded-xl px-5 py-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-blue-100 text-blue-600 rounded-full p-2">
                        <User size={18} />
                      </div>
                      <span className="font-semibold text-gray-800">{c.name}</span>
                    </div>
                    <a
                      href={`tel:${c.phone.replace(/\s/g, '')}`}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium ml-11 transition-colors"
                    >
                      <Phone size={15} />
                      {c.phone}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="font-semibold text-gray-800 mb-4">Sledujte nás</h2>
              <a
                href="https://www.facebook.com/groups/1478324683950260/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-[#1877F2] hover:bg-[#1565D8] text-white font-semibold px-6 py-3 rounded-xl transition-colors w-full"
              >
                <ExternalLink size={20} />
                Facebook skupina
              </a>
            </div>
          </div>

          {/* Formulár */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <h2 className="font-semibold text-gray-800 mb-4">Nezáväzná dopyt</h2>

            {sent ? (
              <div className="flex flex-col items-center justify-center gap-3 py-10 text-green-600">
                <CheckCircle size={48} />
                <p className="font-semibold text-lg">Dopyt bol odoslaný!</p>
                <p className="text-gray-500 text-sm text-center">Ozveme sa vám čo najskôr.</p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-2 text-sm text-blue-600 hover:underline"
                >
                  Odoslať ďalší dopyt
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meno a priezvisko *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Ján Novák"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefón *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="+421 900 000 000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Správa</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Opíšte čo potrebujete..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Send size={16} />
                  {sending ? 'Odosielam...' : 'Odoslať dopyt'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
