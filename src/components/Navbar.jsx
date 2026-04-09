import { useNavigate } from 'react-router-dom'

function Navbar() {
  const navigate = useNavigate()

  return (
    <nav style={{
      background: 'rgba(29, 26, 57, 0.8)', backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(232,188,185,0.1)',
      padding: '14px 20px', display: 'flex',
      justifyContent: 'space-between', alignItems: 'center',
      position: 'sticky', top: 0, zIndex: 50
    }}>
      <h1 className="gradient-text" style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 800, cursor: 'pointer', margin: 0 }} onClick={() => navigate('/')}>
        GigReady
      </h1>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <button onClick={() => navigate('/login')} style={{ color: '#E8BCB9', fontWeight: 600, padding: '8px 16px', background: 'transparent', border: 'none', cursor: 'pointer', borderRadius: '10px', fontSize: 'clamp(13px, 2vw, 15px)' }}>
          Login
        </button>
        <button onClick={() => navigate('/signup')} className="btn-primary" style={{ padding: '10px 18px', fontSize: 'clamp(13px, 2vw, 15px)' }}>
          Get Started →
        </button>
      </div>
    </nav>
  )
}

export default Navbar