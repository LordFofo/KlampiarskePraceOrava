import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom'
import { Hammer, ExternalLink } from 'lucide-react'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import Login from './admin/Login'
import AdminLayout from './admin/AdminLayout'
import Dashboard from './admin/Dashboard'
import ProjectForm from './admin/ProjectForm'
import Inquiries from './admin/Inquiries'
import Services from './pages/Services'
import Reviews from './pages/Reviews'
import AdminReviews from './admin/Reviews'

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 pt-12 pb-6 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-lg mb-3">
              <Hammer size={20} className="text-blue-400" />
              Klampiarske práce Orava
            </div>
            <p className="text-sm text-gray-500">Odborné klampiarske práce v regióne Orava s dlhoročnou tradíciou.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Stránky</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li><Link to="/" className="hover:text-blue-400 transition-colors">Úvod</Link></li>
              <li><Link to="/sluzby" className="hover:text-blue-400 transition-colors">Služby</Link></li>
              <li><Link to="/realizacie" className="hover:text-blue-400 transition-colors">Realizácie</Link></li>
              <li><Link to="/recenzie" className="hover:text-blue-400 transition-colors">Recenzie</Link></li>
              <li><Link to="/kontakt" className="hover:text-blue-400 transition-colors">Kontakt</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Sledujte nás</h4>
            <a
              href="https://www.facebook.com/groups/1478324683950260/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm bg-[#1877F2]/20 hover:bg-[#1877F2]/40 text-blue-400 px-4 py-2 rounded-lg transition-colors"
            >
              <ExternalLink size={15} /> Facebook skupina
            </a>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 text-center text-sm text-gray-600">
          © {new Date().getFullYear()} Klampiarske práce Orava. Všetky práva vyhradené.
        </div>
      </div>
    </footer>
  )
}

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/sluzby" element={<PublicLayout><Services /></PublicLayout>} />
          <Route path="/realizacie" element={<PublicLayout><Projects /></PublicLayout>} />
          <Route path="/recenzie" element={<PublicLayout><Reviews /></PublicLayout>} />
          <Route path="/projekty" element={<Navigate to="/realizacie" replace />} />
          <Route path="/kontakt" element={<PublicLayout><Contact /></PublicLayout>} />

          {/* Admin */}
          <Route path="/admin" element={<Login />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="ponuky" element={<Inquiries />} />
            <Route path="recenzie" element={<AdminReviews />} />
            <Route path="projekty/novy" element={<ProjectForm />} />
            <Route path="projekty/:id" element={<ProjectForm />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
