import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/sidebar'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Proposal from './pages/Proposal'
import MyProfile from './pages/myprofile'
import { useAuth } from './context/AuthContext'

function PrivateRoute({ children }) {
  const auth = useAuth()
  if (!auth) return null
  const { user, loading } = auth
  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#F39F5A', fontSize: '18px', fontWeight: 600 }}>Loading...</p>
    </div>
  )
  return user ? children : <Navigate to="/login" />
}

function App() {
  const location = useLocation()
  const isAppPage = ['/dashboard', '/profile', '/proposal', '/myprofile'].includes(location.pathname)

  return (
    <div style={{ display: 'flex' }}>
      {isAppPage && <Sidebar />}
      <div className={isAppPage ? 'app-main-content' : ''} style={{ flex: 1, minHeight: '100vh' }}>
        {!isAppPage && <Navbar />}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/proposal" element={<PrivateRoute><Proposal /></PrivateRoute>} />
          <Route path="/myprofile" element={<PrivateRoute><MyProfile /></PrivateRoute>} />
        </Routes>
      </div>
    </div>
  )
}

export default App