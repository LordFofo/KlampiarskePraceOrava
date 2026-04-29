import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Hammer } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  const links = [
    { to: '/', label: 'Úvod' },
    { to: '/projekty', label: 'Projekty' },
    { to: '/kontakt', label: 'Kontakt' },
  ]

  const active = (to: string) =>
    pathname === to ? 'text-orange-500 font-semibold' : 'text-gray-700 hover:text-orange-500'

  return (
    <nav className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 text-orange-500 font-bold text-lg">
          <Hammer size={22} />
          Klampiarske práce Orava
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex gap-8">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className={`transition-colors ${active(l.to)}`}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-gray-600" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t px-4 py-3 flex flex-col gap-3">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className={`transition-colors ${active(l.to)}`} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
