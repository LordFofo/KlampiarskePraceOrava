import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import Login from './admin/Login'
import AdminLayout from './admin/AdminLayout'
import Dashboard from './admin/Dashboard'
import ProjectForm from './admin/ProjectForm'

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {children}
      <footer className="bg-gray-800 text-gray-400 text-center text-sm py-6 mt-auto">
        © {new Date().getFullYear()} Klampiarske práce Orava. Všetky práva vyhradené.
      </footer>
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
          <Route path="/projekty" element={<PublicLayout><Projects /></PublicLayout>} />
          <Route path="/kontakt" element={<PublicLayout><Contact /></PublicLayout>} />

          {/* Admin */}
          <Route path="/admin" element={<Login />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="projekty/novy" element={<ProjectForm />} />
            <Route path="projekty/:id" element={<ProjectForm />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
