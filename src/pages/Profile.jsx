/*
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

*/


import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Profile() {
  const navigate = useNavigate()
  const [score, setScore] = useState(null)
  const [form, setForm] = useState({
    fullName: '', niche: '', skills: '', experienceLevel: '', platform: '', portfolioUrl: '', bio: ''
  })

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  // Autofill from localStorage on mount
  useEffect(() => {
    const raw = localStorage.getItem('gigready_user')
    if (raw) {
      const user = JSON.parse(raw)
      setForm({
        fullName: user.fullName || '',
        niche: user.niche || '',
        skills: user.skills || '',
        experienceLevel: user.experienceLevel || '',
        platform: user.platform || '',
        portfolioUrl: user.portfolioUrl || '',
        bio: user.bio || '',
      })
    }
  }, [])

  const handleAnalyze = () => {
    // Save updated profile back to localStorage
    const existing = JSON.parse(localStorage.getItem('gigready_user') || '{}')
    localStorage.setItem('gigready_user', JSON.stringify({ ...existing, ...form }))
    setScore(73)
  }

  const inputStyle = { width: '100%' }

  const selectStyle = {
    background: 'rgba(255,255,255,0.07)',
    border: '1.5px solid rgba(232,188,185,0.2)',
    color: 'white', borderRadius: '10px',
    padding: '12px 16px', width: '100%', fontSize: '15px',
    outline: 'none', cursor: 'pointer', appearance: 'none',
    WebkitAppearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23E8BCB9' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center',
  }

  const labelStyle = {
    fontSize: '13px', fontWeight: 600, color: '#E8BCB9', display: 'block', marginBottom: '6px'
  }

  const skillTags = form.skills
    ? form.skills.split(',').map(s => s.trim()).filter(Boolean)
    : []

  return (
    <div style={{ minHeight: '100vh', padding: '40px 24px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: '28px' }}>
          <p style={{ color: '#F39F5A', fontSize: '13px', fontWeight: 600, marginBottom: '4px' }}>
            AI-Powered
          </p>
          <h2 style={{ fontSize: '32px', fontWeight: 800, color: 'white', marginBottom: '6px' }}>
            Profile Analyzer
          </h2>
          <p style={{ color: '#E8BCB9', opacity: 0.6 }}>
            Your saved profile is loaded below — update anything and run the analysis.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: score ? '1fr 1fr' : '1fr',
          gap: '24px',
          alignItems: 'start'
        }}>

          {/* Left — Form */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            <p style={{ color: '#F39F5A', fontSize: '12px', fontWeight: 700, letterSpacing: '1px', margin: 0 }}>
              YOUR PROFILE
            </p>

            {/* Two column grid for short fields */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Full Name</label>
                <input type="text" placeholder="Ahmed Khan" style={inputStyle}
                  value={form.fullName} onChange={e => update('fullName', e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Niche / Title</label>
                <input type="text" placeholder="e.g. Full Stack Developer" style={inputStyle}
                  value={form.niche} onChange={e => update('niche', e.target.value)} />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Top Skills</label>
              <input type="text" placeholder="e.g. React, Node.js, Figma" style={inputStyle}
                value={form.skills} onChange={e => update('skills', e.target.value)} />
              <p style={{ color: '#E8BCB9', fontSize: '11px', opacity: 0.4, marginTop: '5px' }}>
                Separate with commas
              </p>
              {/* Skill tags preview */}
              {skillTags.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '10px' }}>
                  {skillTags.map((skill, i) => (
                    <span key={i} style={{
                      background: 'rgba(243,159,90,0.12)',
                      border: '1px solid rgba(243,159,90,0.25)',
                      color: '#E8BCB9', fontSize: '12px', fontWeight: 500,
                      padding: '4px 12px', borderRadius: '999px'
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label style={labelStyle}>Experience Level</label>
                <select style={selectStyle} value={form.experienceLevel}
                  onChange={e => update('experienceLevel', e.target.value)}>
                  <option value="" disabled style={{ background: '#1D1A39' }}>Select level</option>
                  <option value="Beginner" style={{ background: '#1D1A39' }}>Beginner</option>
                  <option value="Intermediate" style={{ background: '#1D1A39' }}>Intermediate</option>
                  <option value="Experienced" style={{ background: '#1D1A39' }}>Experienced</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>Primary Platform</label>
                <select style={selectStyle} value={form.platform}
                  onChange={e => update('platform', e.target.value)}>
                  <option value="" disabled style={{ background: '#1D1A39' }}>Select platform</option>
                  <option value="Upwork" style={{ background: '#1D1A39' }}>Upwork</option>
                  <option value="Fiverr" style={{ background: '#1D1A39' }}>Fiverr</option>
                  <option value="Freelancer.com" style={{ background: '#1D1A39' }}>Freelancer.com</option>
                  <option value="Toptal" style={{ background: '#1D1A39' }}>Toptal</option>
                  <option value="Other" style={{ background: '#1D1A39' }}>Other</option>
                </select>
              </div>
            </div>

            <div>
              <label style={labelStyle}>Portfolio / LinkedIn URL</label>
              <input type="text" placeholder="https://yourportfolio.com" style={inputStyle}
                value={form.portfolioUrl} onChange={e => update('portfolioUrl', e.target.value)} />
            </div>

            <div>
              <label style={labelStyle}>Brief Bio</label>
              <textarea rows={3} placeholder="Tell clients about yourself..."
                style={{ width: '100%', resize: 'vertical' }}
                value={form.bio} onChange={e => update('bio', e.target.value)} />
            </div>

            <button onClick={handleAnalyze} className="btn-primary w-full"
              style={{ padding: '14px', fontSize: '16px' }}>
              Analyze My Profile ✨
            </button>

          </div>

          {/* Right — Score Result (only shows after analysis) */}
          {score && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* Score card */}
              <div className="card">
                <p style={{ color: '#F39F5A', fontSize: '12px', fontWeight: 700, letterSpacing: '1px', marginBottom: '16px' }}>
                  YOUR SCORE
                </p>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', marginBottom: '20px' }}>
                  <span className="gradient-text" style={{ fontSize: '80px', fontWeight: 800, lineHeight: 1 }}>
                    {score}
                  </span>
                  <span style={{ color: '#E8BCB9', fontSize: '28px', marginBottom: '10px', opacity: 0.4 }}>/100</span>
                </div>

                {/* Score bar */}
                <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '999px', height: '8px', marginBottom: '20px' }}>
                  <div style={{
                    width: `${score}%`, height: '100%', borderRadius: '999px',
                    background: 'linear-gradient(135deg, #F39F5A, #AE445A)',
                    transition: 'width 1s ease'
                  }} />
                </div>

                <p style={{ color: '#E8BCB9', fontSize: '13px', opacity: 0.6, lineHeight: 1.6 }}>
                  Your profile is <strong style={{ color: '#F39F5A' }}>good</strong> but has room for improvement. Fix the issues below to increase your score and attract more clients.
                </p>
              </div>

              {/* Feedback items */}
              <div className="card">
                <p style={{ color: '#F39F5A', fontSize: '12px', fontWeight: 700, letterSpacing: '1px', marginBottom: '16px' }}>
                  FEEDBACK
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {[
                    { icon: '❌', text: "Your bio doesn't clearly mention your niche or target client.", color: '#FC8181' },
                    { icon: '⚠️', text: "Add at least 3 specific skills instead of general ones.", color: '#F6AD55' },
                    { icon: '⚠️', text: "Mention one specific past project result in your bio.", color: '#F6AD55' },
                    { icon: '✅', text: "Portfolio link is present — great for credibility.", color: '#68D391' },
                    { icon: '✅', text: "Experience level is set — helps match you to the right jobs.", color: '#68D391' },
                  ].map((item, i) => (
                    <div key={i} style={{
                      display: 'flex', gap: '10px', padding: '12px 14px',
                      background: 'rgba(255,255,255,0.04)', borderRadius: '10px'
                    }}>
                      <span>{item.icon}</span>
                      <p style={{ color: '#E8BCB9', fontSize: '13px', lineHeight: 1.6, margin: 0 }}>
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <button onClick={() => navigate('/proposal')} className="btn-primary w-full"
                style={{ padding: '14px', fontSize: '15px' }}>
                Now Generate a Proposal →
              </button>

            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile