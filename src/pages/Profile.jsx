import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Profile() {
  const navigate = useNavigate()
  const [score, setScore] = useState(null)

  return (
    <div style={{ minHeight: '100vh', padding: '40px 24px' }}>
      <div style={{ maxWidth: '580px', margin: '0 auto' }}>

        <h2 style={{ fontSize: '32px', fontWeight: 800, color: 'white', marginBottom: '6px' }}>
          My Profile
        </h2>
        <p style={{ color: '#E8BCB9', opacity: 0.7, marginBottom: '28px' }}>
          Fill in your details to get an AI-powered profile score
        </p>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {[
            { label: 'Your Name', type: 'text', placeholder: 'Ahmed Khan' },
            { label: 'Your Niche / Title', type: 'text', placeholder: 'e.g. Full Stack Web Developer' },
            { label: 'Skills', type: 'text', placeholder: 'e.g. React, Node.js, MongoDB' },
            { label: 'Portfolio Link', type: 'text', placeholder: 'https://yourportfolio.com' },
          ].map((field) => (
            <div key={field.label}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#E8BCB9', display: 'block', marginBottom: '6px' }}>
                {field.label}
              </label>
              <input type={field.type} placeholder={field.placeholder} />
            </div>
          ))}

          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#E8BCB9', display: 'block', marginBottom: '6px' }}>
              Experience
            </label>
            <textarea rows={3} placeholder="Briefly describe your experience..." />
          </div>

          <button onClick={() => setScore(73)} className="btn-primary w-full"
            style={{ padding: '14px', fontSize: '16px' }}>
            Analyze My Profile ✨
          </button>
        </div>

        {score && (
          <div className="card" style={{ marginTop: '24px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'white', marginBottom: '16px' }}>
              Your Profile Score
            </h3>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', marginBottom: '24px' }}>
              <span className="gradient-text" style={{ fontSize: '72px', fontWeight: 800, lineHeight: 1 }}>
                {score}
              </span>
              <span style={{ color: '#E8BCB9', fontSize: '24px', marginBottom: '8px', opacity: 0.5 }}>/100</span>
            </div>

            {[
              { icon: '❌', text: "Your bio doesn't clearly mention your niche" },
              { icon: '⚠️', text: "Add at least 3 specific skills instead of general ones" },
              { icon: '✅', text: "Portfolio link is present — great for credibility" },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex', gap: '10px', padding: '12px 16px',
                background: 'rgba(255,255,255,0.05)', borderRadius: '10px', marginBottom: '8px'
              }}>
                <span>{item.icon}</span>
                <p style={{ color: '#E8BCB9', fontSize: '14px', margin: 0 }}>{item.text}</p>
              </div>
            ))}

            <button onClick={() => navigate('/proposal')} className="btn-primary w-full"
              style={{ padding: '14px', marginTop: '16px' }}>
              Now Generate a Proposal →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
