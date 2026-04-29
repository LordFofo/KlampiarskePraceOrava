import { useEffect, useState } from 'react'
import { Send, CheckCircle, User } from 'lucide-react'
import api from '../services/api'

interface Review {
  id: number
  name: string
  text: string
  createdAt: string
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [name, setName] = useState('')
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)

  useEffect(() => {
    api.get<Review[]>('/reviews').then((r) => setReviews(r.data))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    try {
      await api.post('/reviews', { name, text })
      setSent(true)
      setName('')
      setText('')
    } finally {
      setSending(false)
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white border-b px-4 py-12 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Recenzie</h1>
        <p className="text-gray-500 max-w-xl mx-auto">
          Čo hovoria naši zákazníci. Podeľte sa aj vy o svoju skúsenosť.
        </p>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8 items-start">

        {/* Formulár */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h2 className="font-semibold text-gray-800 mb-4">Napísať recenziu</h2>
          {sent ? (
            <div className="flex flex-col items-center gap-3 py-8 text-green-600">
              <CheckCircle size={44} />
              <p className="font-semibold">Ďakujeme za recenziu!</p>
              <p className="text-gray-400 text-sm text-center">Po schválení sa zobrazí na stránke.</p>
              <button onClick={() => setSent(false)} className="text-sm text-blue-600 hover:underline mt-1">
                Pridať ďalšiu
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meno *</label>
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Recenzia *</label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  required
                  rows={5}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  placeholder="Vaša skúsenosť s našimi službami..."
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Send size={16} />
                {sending ? 'Odosielam...' : 'Odoslať recenziu'}
              </button>
            </form>
          )}
        </div>

        {/* Zoznam recenzií */}
        <div className="flex flex-col gap-4">
          {reviews.length === 0 ? (
            <p className="text-gray-400 text-center py-12">Zatiaľ žiadne recenzie.</p>
          ) : (
            reviews.map((r) => (
              <div key={r.id} className="bg-white rounded-2xl shadow-sm p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="bg-blue-100 text-blue-600 rounded-full p-1.5">
                    <User size={16} />
                  </div>
                  <span className="font-semibold text-gray-800 text-sm">{r.name}</span>
                  <span className="text-gray-400 text-xs ml-auto">
                    {new Date(r.createdAt).toLocaleDateString('sk-SK')}
                  </span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{r.text}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
