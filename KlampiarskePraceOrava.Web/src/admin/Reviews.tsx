import { useEffect, useState } from 'react'
import { Trash2, CheckCircle, User } from 'lucide-react'
import api from '../services/api'

interface Review {
  id: number
  name: string
  text: string
  createdAt: string
  isApproved: boolean
}

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    api.get<Review[]>('/reviews/admin')
      .then((r) => setReviews(r.data))
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  const handleApprove = async (id: number) => {
    await api.put(`/reviews/${id}/approve`, {})
    load()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Naozaj zmazať túto recenziu?')) return
    await api.delete(`/reviews/${id}`)
    load()
  }

  const pendingCount = reviews.filter((r) => !r.isApproved).length

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Recenzie</h1>
        {pendingCount > 0 && (
          <span className="bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            {pendingCount} čakajú
          </span>
        )}
      </div>

      {loading ? (
        <div className="text-gray-400 py-12 text-center">Načítavam...</div>
      ) : reviews.length === 0 ? (
        <div className="text-gray-400 py-12 text-center">Zatiaľ žiadne recenzie.</div>
      ) : (
        <div className="flex flex-col gap-3">
          {reviews.map((r) => (
            <div
              key={r.id}
              className={`bg-white rounded-xl shadow-sm p-5 border-l-4 ${r.isApproved ? 'border-green-400' : 'border-blue-500'}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-2 flex-1">
                  <div className="flex flex-wrap gap-3 text-sm items-center">
                    <span className="flex items-center gap-1.5 font-semibold text-gray-800">
                      <User size={14} className="text-blue-600" /> {r.name}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {new Date(r.createdAt).toLocaleString('sk-SK')}
                    </span>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${r.isApproved ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                      {r.isApproved ? 'Schválená' : 'Čaká na schválenie'}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{r.text}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {!r.isApproved && (
                    <button
                      title="Schváliť"
                      onClick={() => handleApprove(r.id)}
                      className="text-gray-400 hover:text-green-500 transition-colors"
                    >
                      <CheckCircle size={18} />
                    </button>
                  )}
                  <button
                    title="Zmazať"
                    onClick={() => handleDelete(r.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
