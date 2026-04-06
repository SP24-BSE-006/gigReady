import { useNavigate } from 'react-router-dom'

function Hero() {
  const navigate = useNavigate()

  return (
    <div style={{ padding: '80px 24px 100px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>

      {/* Glow effects */}
      <div style={{
        position: 'absolute', top: '10%', left: '20%',
        width: '300px', height: '300px', borderRadius: '50%',
        background: 'radial-gradient(circle, #AE445A44, transparent)',
        filter: 'blur(40px)', zIndex: 0
      }} />
      <div style={{
        position: 'absolute', bottom: '10%', right: '20%',
        width: '250px', height: '250px', borderRadius: '50%',
        background: 'radial-gradient(circle, #F39F5A33, transparent)',
        filter: 'blur(40px)', zIndex: 0
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'inline-block',
          background: 'rgba(243, 159, 90, 0.15)',
          border: '1px solid rgba(243,159,90,0.3)',
          borderRadius: '999px', padding: '6px 20px', marginBottom: '28px'
        }}>
          <span style={{ color: '#F39F5A', fontSize: '14px', fontWeight: 600 }}>
            ✨ AI-Powered Freelancer Toolkit
          </span>
        </div>

        <h1 style={{
          fontSize: '58px', fontWeight: 800, color: 'white',
          lineHeight: 1.15, marginBottom: '20px', maxWidth: '680px', margin: '0 auto 20px'
        }}>
          Win More <span className="gradient-text">Freelance</span> Projects
        </h1>

        <p style={{
          color: '#E8BCB9', fontSize: '18px', maxWidth: '500px',
          margin: '0 auto 40px', lineHeight: 1.7, opacity: 0.85
        }}>
          GigReady analyzes your profile and generates personalized proposals using AI — helping you land clients in under 5 minutes.
        </p>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/signup')} className="btn-primary"
            style={{ fontSize: '16px', padding: '14px 32px' }}>
            Start For Free →
          </button>
          <button onClick={() => navigate('/login')}
            style={{
              border: '2px solid rgba(232,188,185,0.3)', color: '#E8BCB9',
              padding: '14px 32px', borderRadius: '12px', fontWeight: 600,
              fontSize: '16px', background: 'transparent', cursor: 'pointer', transition: 'all 0.2s'
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#F39F5A'}
            onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(232,188,185,0.3)'}>
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hero
