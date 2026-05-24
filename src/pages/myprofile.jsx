import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function MyProfile() {
  const navigate = useNavigate()
  const { profile } = useAuth()

  const avatarLetter = profile?.full_name ? profile.full_name.charAt(0).toUpperCase() : '?'
  const skillTags = profile?.skills ? profile.skills.split(',').map(s => s.trim()).filter(Boolean) : []

  const experienceColors = {
    Beginner: { bg: 'rgba(99,179,237,0.15)', border: 'rgba(99,179,237,0.3)', color: '#63B3ED' },
    Intermediate: { bg: 'rgba(243,159,90,0.15)', border: 'rgba(243,159,90,0.3)', color: '#F39F5A' },
    Experienced: { bg: 'rgba(72,187,120,0.15)', border: 'rgba(72,187,120,0.3)', color: '#68D391' },
  }
  const expStyle = experienceColors[profile?.experience_level] || experienceColors['Beginner']

  if (!profile) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px', padding: '24px' }}>
        <div style={{ fontSize: '48px' }}>🙈</div>
        <h2 style={{ color: 'white', fontSize: '22px', fontWeight: 700, textAlign: 'center' }}>No profile found</h2>
        <p style={{ color: '#E8BCB9', opacity: 0.6, textAlign: 'center' }}>Create an account first to see your profile here.</p>
        <button onClick={() => navigate('/signup')} className="btn-primary" style={{ padding: '12px 28px' }}>Create Account →</button>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', padding: 'clamp(24px, 4vw, 40px) clamp(16px, 3vw, 24px)' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>

        <div style={{ marginBottom: '28px' }}>
          <p style={{ color: '#F39F5A', fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>My Account</p>
          <h1 style={{ fontSize: 'clamp(24px, 5vw, 32px)', fontWeight: 800, color: 'white', margin: 0 }}>My Profile</h1>
          <p style={{ color: 'white', opacity: 0.6, marginTop: '6px' }}>Your saved freelancer details</p>
        </div>

        {/* Hero card */}
        <div className="card" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ width: '70px', height: '70px', borderRadius: '50%', flexShrink: 0, background: 'linear-gradient(135deg, #F39F5A, #AE445A)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: 800, color: 'white', boxShadow: '0 0 0 4px rgba(243,159,90,0.2)' }}>
            {avatarLetter}
          </div>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <h2 style={{ fontSize: 'clamp(18px, 3vw, 24px)', fontWeight: 800, color: 'white', margin: '0 0 4px' }}>{profile.full_name}</h2>
            <p style={{ color: '#F39F5A', fontWeight: 600, fontSize: '15px', margin: '0 0 8px' }}>{profile.niche || 'Freelancer'}</p>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
              {profile.experience_level && (
                <span style={{ fontSize: '12px', padding: '4px 12px', borderRadius: '999px', fontWeight: 600, background: expStyle.bg, border: `1px solid ${expStyle.border}`, color: expStyle.color }}>
                  {profile.experience_level}
                </span>
              )}
              {profile.platform && (
                <span style={{ fontSize: '12px', padding: '4px 12px', borderRadius: '999px', fontWeight: 600, background: 'rgba(174,68,90,0.15)', border: '1px solid rgba(174,68,90,0.3)', color: '#E8BCB9' }}>
                   {profile.platform}
                </span>
              )}
            </div>
          </div>
          <button onClick={() => navigate('/profile')} className="btn-primary" style={{ padding: '10px 18px', fontSize: '14px', whiteSpace: 'nowrap', width: '100%', maxWidth: '180px' }}>
            Analyze Profile 
          </button>
        </div>

        {/* Info grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '16px' }}>
          <div className="card">
            <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#F39F5A', letterSpacing: '1px', margin: '0 0 16px' }}>CONTACT INFO</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <InfoRow icon="📧" label="Email" value={profile.email || '—'} />
              <InfoRow icon="🌐" label="Portfolio / LinkedIn" value={profile.portfolio_url || '—'} isLink={!!profile.portfolio_url} />
            </div>
          </div>
          <div className="card">
            <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#F39F5A', letterSpacing: '1px', margin: '0 0 16px' }}>TOP SKILLS</h3>
            {skillTags.length > 0 ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {skillTags.map((skill, i) => (
                  <span key={i} style={{ background: 'rgba(243,159,90,0.12)', border: '1px solid rgba(243,159,90,0.25)', color: '#E8BCB9', fontSize: '13px', fontWeight: 500, padding: '5px 14px', borderRadius: '999px' }}>{skill}</span>
                ))}
              </div>
            ) : (
              <p style={{ color: '#E8BCB9', opacity: 0.4, fontSize: '14px' }}>No skills added yet.</p>
            )}
          </div>
        </div>

        {profile.bio && (
          <div className="card" style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#F39F5A', letterSpacing: '1px', margin: '0 0 12px' }}>ABOUT ME</h3>
            <p style={{ color: 'white', opacity: 0.8, lineHeight: 1.8, fontSize: '15px', margin: 0 }}>{profile.bio}</p>
          </div>
        )}

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/dashboard')} style={{ padding: '11px 22px', borderRadius: '12px', fontWeight: 600, fontSize: '14px', border: '1.5px solid rgba(232,188,185,0.2)', background: 'transparent', color: '#E8BCB9', cursor: 'pointer', transition: 'all 0.2s', flex: '1', minWidth: '140px' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            ← Dashboard
          </button>
          <button onClick={() => navigate('/proposal')} className="btn-primary" style={{ padding: '11px 22px', fontSize: '14px', flex: '2', minWidth: '160px' }}>
            Generate a Proposal →
          </button>
        </div>

      </div>
    </div>
  )
}

function InfoRow({ icon, label, value, isLink }) {
  return (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
      <span style={{ fontSize: '16px', marginTop: '1px' }}>{icon}</span>
      <div style={{ minWidth: 0, flex: 1 }}>
        <p style={{ color: '#E8BCB9', fontSize: '11px', opacity: 0.5, margin: '0 0 2px', fontWeight: 600, letterSpacing: '0.5px' }}>{label.toUpperCase()}</p>
        {isLink ? (
          <a href={value} target="_blank" rel="noreferrer" style={{ color: '#F39F5A', fontSize: '14px', fontWeight: 500, textDecoration: 'none', wordBreak: 'break-all' }}>{value}</a>
        ) : (
          <p style={{ color: 'white', fontSize: '14px', fontWeight: 500, margin: 0, wordBreak: 'break-all' }}>{value}</p>
        )}
      </div>
    </div>
  )
}

export default MyProfile