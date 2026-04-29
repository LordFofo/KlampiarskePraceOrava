import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Pencil, Trash2, Eye, EyeOff } from 'lucide-react'
import api, { type ProjectList } from '../services/api'

export default function Dashboard() {
  const [projects, setProjects] = useState<ProjectList[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const load = () => {
    setLoading(true)
    api.get<ProjectList[]>('/admin/projects')
      .then((r) => setProjects(r.data))
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  const handleDelete = async (id: number, title: string) => {
    if (!confirm(`Naozaj chcete zmazať projekt "${title}"?`)) return
    await api.delete(`/admin/projects/${id}`)
    load()
  }

  const handleTogglePublish = async (p: ProjectList) => {
    await api.put(`/admin/projects/${p.id}`, {
      title: p.title,
      category: p.category,
      isPublished: !p.isPublished,
    })
    load()
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Projekty</h1>
        <button
          onClick={() => navigate('/admin/projekty/novy')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus size={18} /> Nový projekt
        </button>
      </div>

      {loading ? (
        <div className="text-gray-400 py-12 text-center">Načítavam...</div>
      ) : projects.length === 0 ? (
        <div className="text-gray-400 py-12 text-center">Zatiaľ žiadne projekty.</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
              <tr>
                <th className="text-left px-6 py-3">Názov</th>
                <th className="text-left px-6 py-3">Kategória</th>
                <th className="text-left px-6 py-3">Médiá</th>
                <th className="text-left px-6 py-3">Stav</th>
                <th className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-800">{p.title}</td>
                  <td className="px-6 py-4 text-gray-500 text-sm">{p.category}</td>
                  <td className="px-6 py-4 text-gray-400 text-sm">
                    {p.imageCount} foto · {p.videoCount} video
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                      p.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {p.isPublished ? 'Zverejnený' : 'Skrytý'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        title={p.isPublished ? 'Skryť' : 'Zverejniť'}
                        onClick={() => handleTogglePublish(p)}
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        {p.isPublished ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                      <button
                        title="Upraviť"
                        onClick={() => navigate(`/admin/projekty/${p.id}`)}
                        className="text-gray-400 hover:text-blue-500 transition-colors"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        title="Zmazať"
                        onClick={() => handleDelete(p.id, p.title)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
