import { useEffect, useState } from 'react'
import { Trash2, MailOpen, Phone, User, MessageSquare } from 'lucide-react'
import api from '../services/api'

interface Inquiry {
  id: number
  name: string
  phone: string
  message?: string
  createdAt: string
  isRead: boolean
}

export default function Inquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)

  const load = () => {
    setLoading(true)
    api.get<Inquiry[]>('/admin/inquiries')
      .then((r) => setInquiries(r.data))
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  const handleRead = async (id: number) => {
    await api.put(`/admin/inquiries/${id}/read`, {})
    load()
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Naozaj zmazať túto ponuku?')) return
    await api.delete(`/admin/inquiries/${id}`)
    load()
  }

  const unreadCount = inquiries.filter((i) => !i.isRead).length

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Ponuky</h1>
        {unreadCount > 0 && (
          <span className="bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
            {unreadCount} nové
          </span>
        )}
      </div>

      {loading ? (
        <div className="text-gray-400 py-12 text-center">Načítavam...</div>
      ) : inquiries.length === 0 ? (
        <div className="text-gray-400 py-12 text-center">Zatiaľ žiadne ponuky.</div>
      ) : (
        <div className="flex flex-col gap-3">
          {inquiries.map((i) => (
            <div
              key={i.id}
              className={`bg-white rounded-xl shadow-sm p-5 border-l-4 ${i.isRead ? 'border-gray-200' : 'border-blue-500'}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-2 flex-1">
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="flex items-center gap-1.5 font-semibold text-gray-800">
                      <User size={15} className="text-blue-600" /> {i.name}
                    </span>
                    <a href={`tel:${i.phone.replace(/\s/g, '')}`} className="flex items-center gap-1.5 text-blue-600 hover:underline">
                      <Phone size={15} /> {i.phone}
                    </a>
                    <span className="text-gray-400">
                      {new Date(i.createdAt).toLocaleString('sk-SK')}
                    </span>
                  </div>
                  {i.message && (
                    <p className="text-gray-600 text-sm flex gap-2">
                      <MessageSquare size={15} className="text-gray-400 mt-0.5 shrink-0" />
                      {i.message}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {!i.isRead && (
                    <button
                      title="Označiť ako prečítané"
                      onClick={() => handleRead(i.id)}
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <MailOpen size={18} />
                    </button>
                  )}
                  <button
                    title="Zmazať"
                    onClick={() => handleDelete(i.id)}
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
