import { useNavigate } from 'react-router-dom'

function MyProfile() {
  const navigate = useNavigate()
  const raw = localStorage.getItem('gigready_user')
  const user = raw ? JSON.parse(raw) : null

  // Avatar letter from name
  const avatarLetter = user?.fullName ? user.fullName.charAt(0).toUpperCase() : '?'

  // Parse skills into tags
  const skillTags = user?.skills
    ? user.skills.split(',').map(s => s.trim()).filter(Boolean)
    : []

  const experienceColors = {
    Beginner: { bg: 'rgba(99,179,237,0.15)', border: 'rgba(99,179,237,0.3)', color: '#63B3ED' },
    Intermediate: { bg: 'rgba(243,159,90,0.15)', border: 'rgba(243,159,90,0.3)', color: '#F39F5A' },
    Experienced: { bg: 'rgba(72,187,120,0.15)', border: 'rgba(72,187,120,0.3)', color: '#68D391' },
  }
  const expStyle = experienceColors[user?.experienceLevel] || experienceColors['Beginner']

  if (!user) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '16px' }}>
        <div style={{ fontSize: '48px' }}>🙈</div>
        <h2 style={{ color: 'white', fontSize: '22px', fontWeight: 700 }}>No profile found</h2>
        <p style={{ color: '#E8BCB9', opacity: 0.6 }}>Create an account first to see your profile here.</p>
        <button onClick={() => navigate('/signup')} className="btn-primary" style={{ padding: '12px 28px' }}>
          Create Account →
        </button>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', padding: '40px 24px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto' }}>

        {/* Page Header */}
        <div style={{ marginBottom: '32px' }}>
          <p style={{ color: '#F39F5A', fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>My Account</p>
          <h1 style={{ fontSize: '32px', fontWeight: 800, color: 'white', margin: 0 }}>My Profile</h1>
          <p style={{ color: '#E8BCB9', opacity: 0.6, marginTop: '6px' }}>Your saved freelancer details</p>
        </div>

        {/* Hero card — name + avatar */}
        <div className="card" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          {/* Avatar */}
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg, #F39F5A, #AE445A)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '32px', fontWeight: 800, color: 'white',
            boxShadow: '0 0 0 4px rgba(243,159,90,0.2)'
          }}>
            {avatarLetter}
          </div>

          <div style={{ flex: 1 }}>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: 'white', margin: '0 0 4px' }}>
              {user.fullName}
            </h2>
            <p style={{ color: '#F39F5A', fontWeight: 600, fontSize: '15px', margin: '0 0 8px' }}>
              {user.niche || 'Freelancer'}
            </p>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', alignItems: 'center' }}>
              {user.experienceLevel && (
                <span style={{
                  fontSize: '12px', padding: '4px 12px', borderRadius: '999px', fontWeight: 600,
                  background: expStyle.bg, border: `1px solid ${expStyle.border}`, color: expStyle.color
                }}>
                  {user.experienceLevel}
                </span>
              )}
              {user.platform && (
                <span style={{
                  fontSize: '12px', padding: '4px 12px', borderRadius: '999px', fontWeight: 600,
                  background: 'rgba(174,68,90,0.15)', border: '1px solid rgba(174,68,90,0.3)', color: '#E8BCB9'
                }}>
                  📍 {user.platform}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => navigate('/profile')}
            className="btn-primary"
            style={{ padding: '10px 20px', fontSize: '14px', whiteSpace: 'nowrap' }}>
            Analyze Profile ✨
          </button>
        </div>

        {/* Info grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px', marginBottom: '20px' }}>

          {/* Contact */}
          <div className="card">
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#F39F5A', letterSpacing: '1px', marginBottom: '16px', margin: '0 0 16px' }}>
              CONTACT INFO
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <InfoRow icon="📧" label="Email" value={user.email || '—'} />
              <InfoRow
                icon="🌐"
                label="Portfolio / LinkedIn"
                value={user.portfolioUrl || '—'}
                isLink={!!user.portfolioUrl}
              />
            </div>
          </div>

          {/* Skills */}
          <div className="card">
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#F39F5A', letterSpacing: '1px', margin: '0 0 16px' }}>
              TOP SKILLS
            </h3>
            {skillTags.length > 0 ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {skillTags.map((skill, i) => (
                  <span key={i} style={{
                    background: 'rgba(243,159,90,0.12)',
                    border: '1px solid rgba(243,159,90,0.25)',
                    color: '#E8BCB9', fontSize: '13px', fontWeight: 500,
                    padding: '5px 14px', borderRadius: '999px'
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p style={{ color: '#E8BCB9', opacity: 0.4, fontSize: '14px' }}>No skills added yet.</p>
            )}
          </div>
        </div>

        {/* Bio */}
        {user.bio && (
          <div className="card" style={{ marginBottom: '20px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, color: '#F39F5A', letterSpacing: '1px', margin: '0 0 12px' }}>
              ABOUT ME
            </h3>
            <p style={{ color: '#E8BCB9', opacity: 0.8, lineHeight: 1.8, fontSize: '15px', margin: 0 }}>
              {user.bio}
            </p>
          </div>
        )}

        {/* Quick actions */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/dashboard')} style={{
            padding: '11px 22px', borderRadius: '12px', fontWeight: 600, fontSize: '14px',
            border: '1.5px solid rgba(232,188,185,0.2)', background: 'transparent',
            color: '#E8BCB9', cursor: 'pointer', transition: 'all 0.2s'
          }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.06)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            ← Back to Dashboard
          </button>
          <button onClick={() => navigate('/proposal')} className="btn-primary" style={{ padding: '11px 22px', fontSize: '14px' }}>
            Generate a Proposal →
          </button>
        </div>

      </div>
    </div>
  )
}

// Small reusable row component
function InfoRow({ icon, label, value, isLink }) {
  return (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
      <span style={{ fontSize: '16px', marginTop: '1px' }}>{icon}</span>
      <div>
        <p style={{ color: '#E8BCB9', fontSize: '11px', opacity: 0.5, margin: '0 0 2px', fontWeight: 600, letterSpacing: '0.5px' }}>
          {label.toUpperCase()}
        </p>
        {isLink ? (
          <a href={value} target="_blank" rel="noreferrer"
            style={{ color: '#F39F5A', fontSize: '14px', fontWeight: 500, textDecoration: 'none', wordBreak: 'break-all' }}>
            {value}
          </a>
        ) : (
          <p style={{ color: 'white', fontSize: '14px', fontWeight: 500, margin: 0, wordBreak: 'break-all' }}>{value}</p>
        )}
      </div>
    </div>
  )
}

export default MyProfile