import { useNavigate } from 'react-router-dom'

function Hero() {
  const navigate = useNavigate()

  return (
    <div style={{ padding: 'clamp(40px, 8vw, 80px) 20px clamp(50px, 10vw, 100px)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '10%', left: '10%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, #AE445A44, transparent)', filter: 'blur(40px)', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: '250px', height: '250px', borderRadius: '50%', background: 'radial-gradient(circle, #F39F5A33, transparent)', filter: 'blur(40px)', zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'inline-block', background: 'rgba(243,159,90,0.15)', border: '1px solid rgba(243,159,90,0.3)', borderRadius: '999px', padding: '6px 20px', marginBottom: '24px' }}>
        </div>

        <h1 style={{ fontSize: 'clamp(32px, 7vw, 58px)', fontWeight: 800, color: 'white', lineHeight: 1.15, marginBottom: '20px', maxWidth: '680px', margin: '0 auto 20px' }}>
          Win More <span className="gradient-text">Freelance</span> Projects
        </h1>

        <p style={{ color: 'white', fontSize: 'clamp(15px, 2.5vw, 18px)', maxWidth: '500px', margin: '0 auto 36px', lineHeight: 1.7, opacity: 0.85 }}>
          GigReady analyzes your profile and generates personalized proposals using AI — helping you land clients in under 5 minutes.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', padding: '0 16px' }}>
          <button onClick={() => navigate('/signup')} className="btn-primary" style={{ fontSize: 'clamp(14px, 2vw, 16px)', padding: '13px 28px' }}>
            Start For Free →
          </button>
          <button onClick={() => navigate('/login')} style={{ border: '2px solid rgba(232,188,185,0.3)', color: '#E8BCB9', padding: '13px 28px', borderRadius: '12px', fontWeight: 600, fontSize: 'clamp(14px, 2vw, 16px)', background: 'transparent', cursor: 'pointer' }}>
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hero