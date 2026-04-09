import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { profile, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  const displayName = profile?.full_name ? profile.full_name.split(' ')[0] : 'You'
  const avatarLetter = profile?.full_name ? profile.full_name.charAt(0).toUpperCase() : '?'

  const menuItems = [
    { icon: '🏠', label: 'Dashboard', path: '/dashboard' },
    { icon: '📊', label: 'Profile Analyzer', path: '/profile' },
    { icon: '✍️', label: 'Generate Proposal', path: '/proposal' },
  ]

  const isActive = (path) => location.pathname === path

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  const handleNav = (path) => {
    navigate(path)
    setIsOpen(false)
  }

  const sidebarContent = (
    <div style={{
      width: '240px', minHeight: '100vh',
      background: 'rgba(29,26,57,0.97)', backdropFilter: 'blur(16px)',
      borderRight: '1px solid rgba(232,188,185,0.1)',
      display: 'flex', flexDirection: 'column',
      padding: '24px 16px',
    }}>
      <div onClick={() => handleNav('/')} style={{ padding: '8px 12px', marginBottom: '32px', cursor: 'pointer' }}>
        <h1 className="gradient-text" style={{ fontSize: '22px', fontWeight: 800, margin: 0 }}>GigReady</h1>
        <p style={{ color: '#E8BCB9', fontSize: '11px', opacity: 0.5, margin: '2px 0 0' }}>AI Freelancer Toolkit</p>
      </div>

      <div onClick={() => handleNav('/myprofile')} style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        padding: '12px', borderRadius: '12px', marginBottom: '24px', cursor: 'pointer', transition: 'all 0.2s',
        background: location.pathname === '/myprofile' ? 'linear-gradient(135deg, rgba(243,159,90,0.18), rgba(174,68,90,0.18))' : 'rgba(255,255,255,0.05)',
        border: location.pathname === '/myprofile' ? '1px solid rgba(243,159,90,0.3)' : '1px solid transparent',
      }}>
        <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #F39F5A, #AE445A)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: '14px', flexShrink: 0 }}>
          {avatarLetter}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ color: 'white', fontSize: '13px', fontWeight: 600, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{displayName}</p>
          <p style={{ color: '#E8BCB9', fontSize: '11px', opacity: 0.5, margin: 0 }}>{profile?.niche || 'Freelancer'}</p>
        </div>
        <span style={{ color: '#F39F5A', fontSize: '12px', opacity: 0.7 }}>›</span>
      </div>

      <p style={{ color: '#E8BCB9', fontSize: '11px', fontWeight: 600, opacity: 0.4, letterSpacing: '1px', padding: '0 12px', marginBottom: '8px' }}>MENU</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
        {menuItems.map((item) => (
          <button key={item.path} onClick={() => handleNav(item.path)} style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '12px 14px', borderRadius: '12px', border: 'none',
            cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
            background: isActive(item.path) ? 'linear-gradient(135deg, rgba(243,159,90,0.2), rgba(174,68,90,0.2))' : 'transparent',
            borderLeft: isActive(item.path) ? '3px solid #F39F5A' : '3px solid transparent',
          }}>
            <span style={{ fontSize: '18px' }}>{item.icon}</span>
            <span style={{ color: isActive(item.path) ? '#F39F5A' : '#E8BCB9', fontSize: '14px', fontWeight: isActive(item.path) ? 700 : 500 }}>{item.label}</span>
          </button>
        ))}
      </div>

      <div style={{ borderTop: '1px solid rgba(232,188,185,0.1)', paddingTop: '16px' }}>
        <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 14px', borderRadius: '12px', border: 'none', cursor: 'pointer', background: 'transparent', transition: 'all 0.2s', width: '100%' }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
          <span style={{ fontSize: '18px' }}>🚪</span>
          <span style={{ color: '#E8BCB9', fontSize: '14px', fontWeight: 500 }}>Logout</span>
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <div className="desktop-sidebar" style={{ position: 'fixed', top: 0, left: 0, zIndex: 100, height: '100vh' }}>
        {sidebarContent}
      </div>

      {/* Mobile top bar */}
      <div className="mobile-topbar" style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
        background: 'rgba(29,26,57,0.97)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(232,188,185,0.1)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 20px',
      }}>
        <h1 className="gradient-text" style={{ fontSize: '20px', fontWeight: 800, margin: 0, cursor: 'pointer' }} onClick={() => navigate('/')}>GigReady</h1>
        <button onClick={() => setIsOpen(!isOpen)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '4px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <span style={{ display: 'block', width: '22px', height: '2px', background: '#F39F5A', borderRadius: '2px', transition: 'all 0.3s', transform: isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
          <span style={{ display: 'block', width: '22px', height: '2px', background: '#F39F5A', borderRadius: '2px', transition: 'all 0.3s', opacity: isOpen ? 0 : 1 }} />
          <span style={{ display: 'block', width: '22px', height: '2px', background: '#F39F5A', borderRadius: '2px', transition: 'all 0.3s', transform: isOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
        </button>
      </div>

      {/* Mobile drawer */}
      {isOpen && (
        <>
          <div onClick={() => setIsOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 150 }} />
          <div style={{ position: 'fixed', top: 0, left: 0, zIndex: 200, height: '100vh', overflowY: 'auto' }}>
            {sidebarContent}
          </div>
        </>
      )}
    </>
  )
}

export default Sidebar