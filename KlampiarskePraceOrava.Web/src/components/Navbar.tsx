import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Hammer, Phone } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  const links = [
    { to: '/', label: 'Úvod' },
    { to: '/realizacie', label: 'Realizácie' },
    { to: '/kontakt', label: 'Kontakt' },
  ]

  const active = (to: string) =>
    pathname === to ? 'text-blue-600 font-semibold' : 'text-gray-700 hover:text-blue-600'

  return (
    <nav className="bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 text-blue-600 font-bold text-lg">
          <Hammer size={22} />
          Klampiarske práce Orava
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className={`transition-colors ${active(l.to)}`}>
              {l.label}
            </Link>
          ))}
          <a
            href="tel:+421907656735"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            <Phone size={15} />
            +421 907 656 735
          </a>
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
          <a
            href="tel:+421907656735"
            className="flex items-center gap-2 text-blue-600 font-semibold text-sm"
            onClick={() => setOpen(false)}
          >
            <Phone size={15} />
            +421 907 656 735
          </a>
        </div>
      )}
    </nav>
  )
}
