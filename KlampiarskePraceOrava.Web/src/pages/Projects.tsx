import { useEffect, useRef, useState } from 'react'
import { Wrench } from 'lucide-react'
import api, { type ProjectList, CATEGORIES } from '../services/api'

export default function Projects() {
  const [projects, setProjects] = useState<ProjectList[]>([])
  const [category, setCategory] = useState('')
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<ProjectList | null>(null)

  useEffect(() => {
    setLoading(true)
    const params = category ? { category } : {}
    api.get<ProjectList[]>('/projects', { params })
      .then((r) => setProjects(r.data))
      .finally(() => setLoading(false))
  }, [category])

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Naše projekty</h1>

      {/* Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setCategory('')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            category === '' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Všetky
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              category === c ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-20 text-gray-400">Načítavam...</div>
      ) : projects.length === 0 ? (
        <div className="text-center py-20 text-gray-400">Žiadne projekty.</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md hover:scale-[1.02] transition-all duration-200 cursor-pointer"
              onClick={() => setSelected(p)}
            >
              {p.coverImageId ? (
                <img
                  src={`/api/projects/images/${p.coverImageId}`}
                  alt={p.title}
                  className="w-full h-52 object-cover"
                />
              ) : (
                <div className="w-full h-52 bg-gray-100 flex items-center justify-center text-gray-300">
                  <Wrench size={48} />
                </div>
              )}
              <div className="p-4">
                <span className="text-xs text-blue-600 font-medium uppercase tracking-wide">{p.category}</span>
                <h3 className="font-semibold text-gray-800 mt-1 text-lg">{p.title}</h3>
                {(p.imageCount > 0 || p.videoCount > 0) && (
                  <p className="text-xs text-gray-400 mt-2">
                    {p.imageCount > 0 && `${p.imageCount} foto`}
                    {p.imageCount > 0 && p.videoCount > 0 && ' · '}
                    {p.videoCount > 0 && `${p.videoCount} video`}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {selected && (
        <ProjectModal projectId={selected.id} onClose={() => setSelected(null)} />
      )}
    </div>
  )
}

function ProjectModal({ projectId, onClose }: { projectId: number; onClose: () => void }) {
  const [detail, setDetail] = useState<import('../services/api').ProjectDetail | null>(null)
  const [imgIndex, setImgIndex] = useState(0)
  const touchStartX = useRef<number | null>(null)

  useEffect(() => {
    api.get(`/projects/${projectId}`).then((r) => setDetail(r.data))
  }, [projectId])

  if (!detail) return null

  const prev = () => setImgIndex(i => (i - 1 + detail.images.length) % detail.images.length)
  const next = () => setImgIndex(i => (i + 1) % detail.images.length)

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev()
    touchStartX.current = null
  }

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {detail.images.length > 0 && (
          <div
            className="relative select-none"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <img
              src={`/api/projects/images/${detail.images[imgIndex].id}`}
              alt=""
              className="w-full h-72 object-cover rounded-t-2xl"
            />
            {detail.images.length > 1 && (
              <>
                {/* Šípky (desktop) */}
                <button
                  onClick={prev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center hidden md:flex"
                >‹</button>
                <button
                  onClick={next}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full w-8 h-8 flex items-center justify-center hidden md:flex"
                >›</button>
                {/* Bodky */}
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                  {detail.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIndex(i)}
                      className={`w-2 h-2 rounded-full transition-colors ${i === imgIndex ? 'bg-white' : 'bg-white/50'}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}
        <div className="p-6">
          <span className="text-xs text-blue-600 font-medium uppercase tracking-wide">{detail.category}</span>
          <h2 className="text-2xl font-bold text-gray-800 mt-1 mb-3">{detail.title}</h2>
          {detail.description && <p className="text-gray-600 mb-4">{detail.description}</p>}
          {detail.videos.length > 0 && (
            <div className="flex flex-col gap-3 mt-4">
              {detail.videos.map((v) => (
                <video key={v.id} controls className="w-full rounded-lg">
                  <source src={`/api/projects/videos/${v.id}`} />
                </video>
              ))}
            </div>
          )}
          <button
            onClick={onClose}
            className="mt-6 w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 rounded-lg transition-colors"
          >
            Zavrieť
          </button>
        </div>
      </div>
    </div>
  )
}
