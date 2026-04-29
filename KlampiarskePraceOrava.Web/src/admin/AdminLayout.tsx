import { Navigate, Outlet, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Hammer, FolderOpen, LogOut, MessageSquare, Star } from 'lucide-react'

export default function AdminLayout() {
  const { isAuthenticated, logout } = useAuth()
  const { pathname } = useLocation()

  if (!isAuthenticated) return <Navigate to="/admin" replace />

  const navLink = (to: string, label: string, icon: React.ReactNode) => (
    <Link
      to={to}
      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
        pathname.startsWith(to) ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {icon} {label}
    </Link>
  )

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r flex flex-col">
        <div className="flex items-center gap-2 px-4 py-5 border-b">
          <Hammer size={20} className="text-blue-600" />
          <span className="font-bold text-gray-800 text-sm">Admin panel</span>
        </div>
        <nav className="flex-1 p-3 flex flex-col gap-1">
          {navLink('/admin/dashboard', 'Projekty', <FolderOpen size={16} />)}
          {navLink('/admin/ponuky', 'Ponuky', <MessageSquare size={16} />)}
          {navLink('/admin/recenzie', 'Recenzie', <Star size={16} />)}
        </nav>
        <div className="p-3 border-t">
          <button
            onClick={logout}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-500 hover:bg-red-50 hover:text-red-500 w-full transition-colors"
          >
            <LogOut size={16} /> Odhlásiť
          </button>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
