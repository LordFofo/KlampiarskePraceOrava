import { useState } from 'react'
import { Navigate, Outlet, Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Hammer, FolderOpen, LogOut, MessageSquare, Star, Menu, X } from 'lucide-react'

export default function AdminLayout() {
  const { isAuthenticated, logout } = useAuth()
  const { pathname } = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  if (!isAuthenticated) return <Navigate to="/admin" replace />

  const navLink = (to: string, label: string, icon: React.ReactNode) => (
    <Link
      to={to}
      onClick={() => setSidebarOpen(false)}
      className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
        pathname.startsWith(to) ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'
      }`}
    >
      {icon} {label}
    </Link>
  )

  const sidebarContent = (
    <>
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
    </>
  )

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Mobile top bar */}
      <div className="md:hidden sticky top-0 z-30 bg-white border-b px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-gray-800 text-sm">
          <Hammer size={18} className="text-blue-600" />
          Admin panel
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-gray-600 p-2 -mr-2"
          aria-label="Menu"
        >
          {sidebarOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div className="flex flex-1">
        {/* Desktop sidebar */}
        <aside className="hidden md:flex w-56 bg-white border-r flex-col">
          {sidebarContent}
        </aside>

        {/* Mobile sidebar drawer */}
        {sidebarOpen && (
          <>
            <div
              className="fixed inset-0 bg-black/40 z-40 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <aside className="fixed top-14 bottom-0 left-0 w-56 bg-white border-r flex flex-col z-50 md:hidden">
              {sidebarContent}
            </aside>
          </>
        )}

        {/* Content */}
        <main className="flex-1 min-w-0 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
