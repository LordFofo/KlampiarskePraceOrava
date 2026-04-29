import { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Upload, Trash2, ImageIcon, Video, CheckCircle, Star, Loader2 } from 'lucide-react'
import api, { type ProjectDetail, CATEGORIES } from '../services/api'

type ImageItem = ProjectDetail['images'][number]

export default function ProjectForm() {
  const { id } = useParams()
  const isNew = !id
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [isPublished, setIsPublished] = useState(true)
  const [detail, setDetail] = useState<ProjectDetail | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [projectId, setProjectId] = useState<number | null>(id ? parseInt(id) : null)

  const [savedTitle, setSavedTitle] = useState('')
  const [savedDescription, setSavedDescription] = useState('')
  const [savedCategory, setSavedCategory] = useState(CATEGORIES[0])
  const [savedIsPublished, setSavedIsPublished] = useState(true)

  const [uploadingImages, setUploadingImages] = useState(false)
  const [uploadingVideo, setUploadingVideo] = useState(false)
  const [imagePreviews, setImagePreviews] = useState<string[]>([])

  // Lokálne poradie pre drag & drop
  const [localImages, setLocalImages] = useState<ImageItem[]>([])
  const dragIndex = useRef<number | null>(null)

  const imgRef = useRef<HTMLInputElement>(null)
  const vidRef = useRef<HTMLInputElement>(null)

  const hasChanges = isNew
    ? title.trim() !== ''
    : title !== savedTitle || description !== savedDescription ||
      category !== savedCategory || isPublished !== savedIsPublished

  useEffect(() => {
    if (!isNew && id) {
      api.get<ProjectDetail>(`/admin/projects/${id}`).then((r) => {
        const d = r.data
        setDetail(d)
        setLocalImages(d.images)
        setTitle(d.title)
        setDescription(d.description ?? '')
        setCategory(d.category)
        setIsPublished(d.isPublished)
        setSavedTitle(d.title)
        setSavedDescription(d.description ?? '')
        setSavedCategory(d.category)
        setSavedIsPublished(d.isPublished)
      })
    }
  }, [id, isNew])

  const refreshDetail = () => {
    if (projectId) {
      api.get<ProjectDetail>(`/admin/projects/${projectId}`).then((r) => {
        setDetail(r.data)
        setLocalImages(r.data.images)
      })
    }
  }

  const showSaved = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      if (isNew) {
        const { data } = await api.post<{ id: number }>('/admin/projects', { title, description, category })
        setProjectId(data.id)
        navigate(`/admin/projekty/${data.id}`, { replace: true })
      } else {
        await api.put(`/admin/projects/${projectId}`, { title, description, category, isPublished })
        setSavedTitle(title)
        setSavedDescription(description)
        setSavedCategory(category)
        setSavedIsPublished(isPublished)
        refreshDetail()
        showSaved()
      }
    } finally {
      setSaving(false)
    }
  }

  const handleSelectImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return
    const previews = Array.from(files).map(f => URL.createObjectURL(f))
    setImagePreviews(previews)
    handleUploadImages(files, e)
  }

  const handleUploadImages = async (files: FileList, e: React.ChangeEvent<HTMLInputElement>) => {
    if (!projectId) return
    setUploadingImages(true)
    try {
      await Promise.all(Array.from(files).map(file => {
        const form = new FormData()
        form.append('file', file)
        return api.post(`/admin/projects/${projectId}/images`, form)
      }))
    } finally {
      setUploadingImages(false)
      setImagePreviews([])
      refreshDetail()
      e.target.value = ''
    }
  }

  const handleDeleteImage = async (imageId: number) => {
    if (!projectId) return
    await api.delete(`/admin/projects/${projectId}/images/${imageId}`)
    refreshDetail()
  }

  const handleSetCover = async (imageId: number) => {
    if (!projectId) return
    await api.put(`/admin/projects/${projectId}/cover/${imageId}`, {})
    refreshDetail()
  }

  // Drag & drop
  const handleDragStart = (index: number) => { dragIndex.current = index }

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault()
    if (dragIndex.current === null || dragIndex.current === index) return
    const reordered = [...localImages]
    const [moved] = reordered.splice(dragIndex.current, 1)
    reordered.splice(index, 0, moved)
    dragIndex.current = index
    setLocalImages(reordered)
  }

  const handleDragEnd = async () => {
    if (!projectId) return
    const orders = localImages.map((img, i) => ({ imageId: img.id, order: i }))
    await api.put(`/admin/projects/${projectId}/images/reorder`, orders)
    dragIndex.current = null
    refreshDetail()
  }

  const handleUploadVideo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !projectId) return
    setUploadingVideo(true)
    try {
      const form = new FormData()
      form.append('file', file)
      await api.post(`/admin/projects/${projectId}/videos`, form)
      refreshDetail()
    } finally {
      setUploadingVideo(false)
      e.target.value = ''
    }
  }

  const handleDeleteVideo = async (videoId: number) => {
    if (!projectId) return
    await api.delete(`/admin/projects/${projectId}/videos/${videoId}`)
    refreshDetail()
  }

  return (
    <div className="p-8 max-w-3xl">
      <button onClick={() => navigate('/admin/dashboard')} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6 text-sm">
        <ArrowLeft size={16} /> Späť na zoznam
      </button>

      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {isNew ? 'Nový projekt' : 'Upraviť projekt'}
      </h1>

      <form onSubmit={handleSave} className="bg-white rounded-xl shadow-sm p-6 flex flex-col gap-5 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Názov *</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Popis</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={4}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Kategória</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
        {!isNew && (
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} className="w-4 h-4 accent-blue-600" />
            <span className="text-sm font-medium text-gray-700">Zverejniť projekt</span>
          </label>
        )}
        <div className="flex items-center gap-3">
          <button type="submit" disabled={saving || !hasChanges}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold py-2.5 px-6 rounded-lg transition-colors">
            {saving ? 'Ukladám...' : isNew ? 'Vytvoriť projekt' : 'Uložiť zmeny'}
          </button>
          {saved && (
            <span className="flex items-center gap-1.5 text-green-600 text-sm font-medium">
              <CheckCircle size={18} /> Zmeny boli uložené
            </span>
          )}
        </div>
      </form>

      {projectId && (
        <>
          {/* Obrázky */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                  <ImageIcon size={18} className="text-blue-600" /> Obrázky
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">Ukladajú sa automaticky · Potiahnutím zmeníš poradie</p>
              </div>
              <button onClick={() => imgRef.current?.click()} disabled={uploadingImages}
                className="text-sm bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-gray-700 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors">
                {uploadingImages ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                {uploadingImages ? 'Nahrávam...' : 'Nahrať'}
              </button>
              <input ref={imgRef} type="file" accept="image/*" multiple className="hidden" onChange={handleSelectImages} />
            </div>

            {/* Náhľady pred uploadom */}
            {imagePreviews.length > 0 && (
              <div className="grid grid-cols-3 gap-3 mb-3">
                {imagePreviews.map((url, i) => (
                  <div key={i} className="relative">
                    <img src={url} className="w-full h-28 object-cover rounded-lg opacity-60" alt="" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader2 size={24} className="animate-spin text-blue-600" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {localImages.length === 0 && imagePreviews.length === 0 && (
              <p className="text-gray-400 text-sm">Zatiaľ žiadne obrázky.</p>
            )}

            <div className="grid grid-cols-3 gap-3">
              {localImages.map((img, index) => {
                const isCover = detail?.coverImageId === img.id
                return (
                  <div
                    key={img.id}
                    className="relative group cursor-grab active:cursor-grabbing"
                    draggable
                    onDragStart={() => handleDragStart(index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragEnd={handleDragEnd}
                  >
                    <img src={`/api/projects/images/${img.id}`} className={`w-full h-28 object-cover rounded-lg ${isCover ? 'ring-2 ring-blue-600' : ''}`} alt="" />
                    {isCover && (
                      <span className="absolute top-1 left-1 bg-blue-600 text-white text-xs font-medium px-1.5 py-0.5 rounded flex items-center gap-0.5">
                        <Star size={10} fill="white" /> Cover
                      </span>
                    )}
                    {!isCover && (
                      <button title="Nastaviť ako cover" onClick={() => handleSetCover(img.id)}
                        className="absolute top-1 left-1 bg-white/80 hover:bg-blue-600 hover:text-white text-gray-500 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-all">
                        <Star size={14} />
                      </button>
                    )}
                    <button onClick={() => handleDeleteImage(img.id)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 size={14} />
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Videá */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                  <Video size={18} className="text-blue-600" /> Videá
                </h2>
                <p className="text-xs text-gray-400 mt-0.5">Ukladajú sa automaticky po výbere</p>
              </div>
              <button onClick={() => vidRef.current?.click()} disabled={uploadingVideo}
                className="text-sm bg-gray-100 hover:bg-gray-200 disabled:opacity-50 text-gray-700 px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors">
                {uploadingVideo ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                {uploadingVideo ? 'Nahrávam...' : 'Nahrať'}
              </button>
              <input ref={vidRef} type="file" accept="video/*" className="hidden" onChange={handleUploadVideo} />
            </div>
            {uploadingVideo && (
              <div className="flex items-center gap-2 text-blue-600 text-sm mb-3">
                <Loader2 size={16} className="animate-spin" /> Nahrávam video, prosím čakajte...
              </div>
            )}
            {detail?.videos.length === 0 && !uploadingVideo && (
              <p className="text-gray-400 text-sm">Zatiaľ žiadne videá.</p>
            )}
            <div className="flex flex-col gap-3">
              {detail?.videos.map((vid) => (
                <div key={vid.id} className="relative group">
                  <video controls className="w-full rounded-lg max-h-48">
                    <source src={`/api/projects/videos/${vid.id}`} />
                  </video>
                  <button onClick={() => handleDeleteVideo(vid.id)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
