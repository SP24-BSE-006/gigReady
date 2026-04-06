import { useNavigate, useLocation } from 'react-router-dom'

function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  const menuItems = [
    { icon: '🏠', label: 'Dashboard', path: '/dashboard' },
    { icon: '📊', label: 'Profile Analyzer', path: '/profile' },
    { icon: '✍️', label: 'Generate Proposal', path: '/proposal' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <div style={{
      width: '240px',
      minHeight: '100vh',
      background: 'rgba(29,26,57,0.9)',
      backdropFilter: 'blur(16px)',
      borderRight: '1px solid rgba(232,188,185,0.1)',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 16px',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 100
    }}>

      {/* Logo */}
      <div
        onClick={() => navigate('/')}
        style={{ padding: '8px 12px', marginBottom: '32px', cursor: 'pointer' }}>
        <h1 className="gradient-text" style={{ fontSize: '22px', fontWeight: 800, margin: 0 }}>
          GigReady
        </h1>
        <p style={{ color: '#E8BCB9', fontSize: '11px', opacity: 0.5, margin: '2px 0 0' }}>
          AI Freelancer Toolkit
        </p>
      </div>

      {/* User info */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        padding: '12px', borderRadius: '12px',
        background: 'rgba(255,255,255,0.05)',
        marginBottom: '24px'
      }}>
        <div style={{
          width: '36px', height: '36px', borderRadius: '50%',
          background: 'linear-gradient(135deg, #F39F5A, #AE445A)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: 'white', fontWeight: 700, fontSize: '14px', flexShrink: 0
        }}>A</div>
        <div>
          <p style={{ color: 'white', fontSize: '13px', fontWeight: 600, margin: 0 }}>Ahmed</p>
          <p style={{ color: '#E8BCB9', fontSize: '11px', opacity: 0.5, margin: 0 }}>Freelancer</p>
        </div>
      </div>

      {/* Nav label */}
      <p style={{ color: '#E8BCB9', fontSize: '11px', fontWeight: 600, opacity: 0.4, 
        letterSpacing: '1px', padding: '0 12px', marginBottom: '8px' }}>
        MENU
      </p>

      {/* Menu items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '12px 14px', borderRadius: '12px', border: 'none',
              cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s',
              background: isActive(item.path)
                ? 'linear-gradient(135deg, rgba(243,159,90,0.2), rgba(174,68,90,0.2))'
                : 'transparent',
              borderLeft: isActive(item.path) ? '3px solid #F39F5A' : '3px solid transparent',
            }}
            onMouseEnter={e => {
              if (!isActive(item.path))
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
            }}
            onMouseLeave={e => {
              if (!isActive(item.path))
                e.currentTarget.style.background = 'transparent'
            }}>
            <span style={{ fontSize: '18px' }}>{item.icon}</span>
            <span style={{
              color: isActive(item.path) ? '#F39F5A' : '#E8BCB9',
              fontSize: '14px', fontWeight: isActive(item.path) ? 700 : 500
            }}>
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {/* Bottom */}
      <div style={{ borderTop: '1px solid rgba(232,188,185,0.1)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '12px 14px', borderRadius: '12px', border: 'none',
            cursor: 'pointer', background: 'transparent', transition: 'all 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
          <span style={{ fontSize: '18px' }}>🚪</span>
          <span style={{ color: '#E8BCB9', fontSize: '14px', fontWeight: 500 }}>Logout</span>
        </button>
      </div>

    </div>
  )
}

export default Sidebar