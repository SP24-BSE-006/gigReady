import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Sidebar from './components/sidebar'
import Landing from './pages/landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Proposal from './pages/Proposal'

function App() {
  const location = useLocation()
  const isAppPage = location.pathname === '/dashboard' || 
                    location.pathname === '/profile' || 
                    location.pathname === '/proposal'

  return (
    <div style={{ display: 'flex' }}>

      {isAppPage && <Sidebar />}

      <div style={{
        flex: 1,
        marginLeft: isAppPage ? '240px' : '0',
        minHeight: '100vh'
      }}>
        {!isAppPage && <Navbar />}

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/proposal" element={<Proposal />} />
        </Routes>

      </div>
    </div>
  )
}

export default App