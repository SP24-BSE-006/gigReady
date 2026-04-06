import { useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()

  return (
    <nav style={{
      background: 'rgba(29, 26, 57, 0.8)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(232,188,185,0.1)',
      padding: '16px 32px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <h1
        className="gradient-text"
        style={{ fontSize: '24px', fontWeight: 800, cursor: 'pointer', margin: 0 }}
        onClick={() => navigate('/')}>
        GigReady
      </h1>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
        <button
          onClick={() => navigate('/login')}
          style={{
            color: '#E8BCB9', fontWeight: 600, padding: '10px 20px',
            background: 'transparent', border: 'none', cursor: 'pointer',
            borderRadius: '10px', transition: 'background 0.2s'
          }}
          onMouseEnter={e => e.target.style.background = 'rgba(232,188,185,0.1)'}
          onMouseLeave={e => e.target.style.background = 'transparent'}>
          Login
        </button>
        <button onClick={() => navigate('/signup')} className="btn-primary">
          Get Started →
        </button>
      </div>
    </nav>
  )
}

export default Navbar
