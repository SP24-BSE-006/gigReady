import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Signup() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)

  // All form data in one state object
  const [form, setForm] = useState({
    fullName: '', email: '', password: '', confirmPassword: '',
    niche: '', skills: '', experienceLevel: '', platform: '',
    portfolioUrl: '', bio: '', agreedToTerms: false
  })

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const handleCreateAccount = () => {
    // Save profile to localStorage
    const profile = {
      fullName: form.fullName,
      email: form.email,
      niche: form.niche,
      skills: form.skills,
      experienceLevel: form.experienceLevel,
      platform: form.platform,
      portfolioUrl: form.portfolioUrl,
      bio: form.bio,
    }
    localStorage.setItem('gigready_user', JSON.stringify(profile))
    navigate('/dashboard')
  }

  const perks = [
    { icon: '📊', title: 'Profile Strength Analyzer', desc: 'Get an AI score on your profile with actionable tips to attract more clients.' },
    { icon: '✍️', title: 'AI Proposal Generator', desc: 'Generate personalized, ready-to-send proposals in seconds.' },
    { icon: '🎯', title: 'Tone Customization', desc: 'Match your voice to every client — Confident, Friendly, or Formal.' },
    { icon: '🚀', title: 'Win More Projects', desc: 'Freelancers using GigReady land clients faster and more consistently.' },
  ]

  const inputStyle = { width: '100%' }

  const selectStyle = {
    background: 'rgba(255,255,255,0.07)',
    border: '1.5px solid rgba(232,188,185,0.2)',
    color: 'white',
    borderRadius: '10px',
    padding: '12px 16px',
    width: '100%',
    fontSize: '15px',
    outline: 'none',
    cursor: 'pointer',
    appearance: 'none',
    WebkitAppearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23E8BCB9' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 14px center',
  }

  const labelStyle = { fontSize: '13px', fontWeight: 600, color: '#E8BCB9', display: 'block', marginBottom: '6px' }

  const stepDotStyle = (n) => ({
    width: '28px', height: '28px', borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: '13px', fontWeight: 700,
    background: step >= n ? 'linear-gradient(135deg, #F39F5A, #AE445A)' : 'rgba(255,255,255,0.08)',
    color: step >= n ? 'white' : 'rgba(232,188,185,0.4)',
    border: step >= n ? 'none' : '1.5px solid rgba(232,188,185,0.15)',
    transition: 'all 0.3s',
  })

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
      <div style={{ display: 'flex', gap: '60px', alignItems: 'center', maxWidth: '960px', width: '100%' }}>

        {/* Left — Value proposition */}
        <div style={{ flex: 1, display: 'none' }} className="hidden-mobile">
          <div style={{
            display: 'inline-block',
            background: 'rgba(243,159,90,0.15)',
            border: '1px solid rgba(243,159,90,0.3)',
            borderRadius: '999px', padding: '5px 16px', marginBottom: '20px'
          }}>
            <span style={{ color: '#F39F5A', fontSize: '13px', fontWeight: 600 }}>✨ Free to get started</span>
          </div>
          <h2 style={{ fontSize: '36px', fontWeight: 800, color: 'white', lineHeight: 1.2, marginBottom: '12px' }}>
            Your freelance career<br />starts <span className="gradient-text">here.</span>
          </h2>
          <p style={{ color: '#E8BCB9', opacity: 0.7, fontSize: '15px', lineHeight: 1.7, marginBottom: '36px' }}>
            Join thousands of freelancers who use GigReady to write better proposals and land more clients every week.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {perks.map((perk, i) => (
              <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '12px', flexShrink: 0,
                  background: 'rgba(243,159,90,0.15)', border: '1px solid rgba(243,159,90,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px'
                }}>{perk.icon}</div>
                <div>
                  <p style={{ color: 'white', fontWeight: 600, fontSize: '15px', marginBottom: '3px' }}>{perk.title}</p>
                  <p style={{ color: '#E8BCB9', opacity: 0.65, fontSize: '13px', lineHeight: 1.6 }}>{perk.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Signup form */}
        <div style={{ flex: 1, maxWidth: '420px', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'white', marginBottom: '6px' }}>Create Account</h2>
            <p style={{ color: '#E8BCB9', opacity: 0.7, fontSize: '14px' }}>Start winning more freelance projects today</p>
          </div>

          {/* Step indicator */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '24px' }}>
            <div style={stepDotStyle(1)}>1</div>
            <div style={{ height: '1.5px', width: '40px', background: step >= 2 ? '#F39F5A' : 'rgba(232,188,185,0.15)', transition: 'background 0.3s' }} />
            <div style={stepDotStyle(2)}>2</div>
            <div style={{ height: '1.5px', width: '40px', background: step >= 3 ? '#F39F5A' : 'rgba(232,188,185,0.15)', transition: 'background 0.3s' }} />
            <div style={stepDotStyle(3)}>3</div>
          </div>

          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

            {/* Step 1 — Personal Info */}
            {step === 1 && (
              <>
                <p style={{ color: '#F39F5A', fontSize: '12px', fontWeight: 700, letterSpacing: '1px', margin: 0 }}>
                  STEP 1 — PERSONAL INFO
                </p>
                <div>
                  <label style={labelStyle}>Full Name</label>
                  <input type="text" placeholder="Ahmed Khan" style={inputStyle}
                    value={form.fullName} onChange={e => update('fullName', e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>Email Address</label>
                  <input type="email" placeholder="ahmed@email.com" style={inputStyle}
                    value={form.email} onChange={e => update('email', e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>Password</label>
                  <input type="password" placeholder="Min. 8 characters" style={inputStyle}
                    value={form.password} onChange={e => update('password', e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>Confirm Password</label>
                  <input type="password" placeholder="Repeat your password" style={inputStyle}
                    value={form.confirmPassword} onChange={e => update('confirmPassword', e.target.value)} />
                </div>
                <button onClick={() => setStep(2)} className="btn-primary w-full"
                  style={{ padding: '14px', fontSize: '15px', marginTop: '4px' }}>
                  Continue →
                </button>
              </>
            )}

            {/* Step 2 — Freelancer Info */}
            {step === 2 && (
              <>
                <p style={{ color: '#F39F5A', fontSize: '12px', fontWeight: 700, letterSpacing: '1px', margin: 0 }}>
                  STEP 2 — FREELANCER PROFILE
                </p>
                <div>
                  <label style={labelStyle}>Your Niche / Title</label>
                  <input type="text" placeholder="e.g. Full Stack Developer, Graphic Designer" style={inputStyle}
                    value={form.niche} onChange={e => update('niche', e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>Top Skills</label>
                  <input type="text" placeholder="e.g. React, Figma, Python, WordPress" style={inputStyle}
                    value={form.skills} onChange={e => update('skills', e.target.value)} />
                  <p style={{ color: '#E8BCB9', fontSize: '11px', opacity: 0.5, marginTop: '5px' }}>Separate skills with commas</p>
                </div>
                <div>
                  <label style={labelStyle}>Experience Level</label>
                  <select style={selectStyle} value={form.experienceLevel}
                    onChange={e => update('experienceLevel', e.target.value)}>
                    <option value="" disabled style={{ background: '#1D1A39' }}>Select your level</option>
                    <option value="Beginner" style={{ background: '#1D1A39' }}>Beginner — just starting out</option>
                    <option value="Intermediate" style={{ background: '#1D1A39' }}>Intermediate — 1–3 years of experience</option>
                    <option value="Experienced" style={{ background: '#1D1A39' }}>Experienced — 3+ years of experience</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Which platform(s) do you freelance on?</label>
                  <select style={selectStyle} value={form.platform}
                    onChange={e => update('platform', e.target.value)}>
                    <option value="" disabled style={{ background: '#1D1A39' }}>Select primary platform</option>
                    <option value="Upwork" style={{ background: '#1D1A39' }}>Upwork</option>
                    <option value="Fiverr" style={{ background: '#1D1A39' }}>Fiverr</option>
                    <option value="Freelancer.com" style={{ background: '#1D1A39' }}>Freelancer.com</option>
                    <option value="Toptal" style={{ background: '#1D1A39' }}>Toptal</option>
                    <option value="Other" style={{ background: '#1D1A39' }}>Other / Not yet on any</option>
                  </select>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => setStep(1)} style={{
                    flex: 1, padding: '13px', border: '2px solid rgba(232,188,185,0.2)',
                    color: '#E8BCB9', borderRadius: '12px', fontWeight: 600, fontSize: '14px',
                    background: 'transparent', cursor: 'pointer'
                  }}>← Back</button>
                  <button onClick={() => setStep(3)} className="btn-primary" style={{ flex: 2, padding: '13px', fontSize: '15px' }}>
                    Continue →
                  </button>
                </div>
              </>
            )}

            {/* Step 3 — Optional extras */}
            {step === 3 && (
              <>
                <p style={{ color: '#F39F5A', fontSize: '12px', fontWeight: 700, letterSpacing: '1px', margin: 0 }}>
                  STEP 3 — FINISHING UP
                </p>
                <div>
                  <label style={labelStyle}>
                    Portfolio / LinkedIn URL
                    <span style={{ color: 'rgba(232,188,185,0.4)', fontWeight: 400, marginLeft: '6px' }}>(optional)</span>
                  </label>
                  <input type="text" placeholder="https://yourportfolio.com" style={inputStyle}
                    value={form.portfolioUrl} onChange={e => update('portfolioUrl', e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>
                    Brief Bio
                    <span style={{ color: 'rgba(232,188,185,0.4)', fontWeight: 400, marginLeft: '6px' }}>(optional)</span>
                  </label>
                  <textarea rows={3}
                    placeholder="Tell clients a bit about yourself — your background, what you love working on, and what makes you different."
                    style={{ width: '100%', resize: 'vertical' }}
                    value={form.bio} onChange={e => update('bio', e.target.value)} />
                  <p style={{ color: '#E8BCB9', fontSize: '11px', opacity: 0.5, marginTop: '5px' }}>
                    This will be used when generating your proposals
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <input type="checkbox" id="terms"
                    style={{ width: '16px', height: '16px', marginTop: '2px', flexShrink: 0, cursor: 'pointer' }}
                    checked={form.agreedToTerms} onChange={e => update('agreedToTerms', e.target.checked)} />
                  <label htmlFor="terms" style={{ fontSize: '13px', color: '#E8BCB9', opacity: 0.7, lineHeight: 1.5, cursor: 'pointer' }}>
                    I agree to the{' '}
                    <span style={{ color: '#F39F5A', fontWeight: 600 }}>Terms of Service</span>
                    {' '}and{' '}
                    <span style={{ color: '#F39F5A', fontWeight: 600 }}>Privacy Policy</span>
                  </label>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => setStep(2)} style={{
                    flex: 1, padding: '13px', border: '2px solid rgba(232,188,185,0.2)',
                    color: '#E8BCB9', borderRadius: '12px', fontWeight: 600, fontSize: '14px',
                    background: 'transparent', cursor: 'pointer'
                  }}>← Back</button>
                  <button onClick={handleCreateAccount} className="btn-primary"
                    style={{ flex: 2, padding: '13px', fontSize: '15px' }}>
                    Create Account →
                  </button>
                </div>
              </>
            )}
          </div>

          <p style={{ textAlign: 'center', color: '#E8BCB9', opacity: 0.6, fontSize: '13px', marginTop: '16px' }}>
            Already have an account?{' '}
            <span onClick={() => navigate('/login')}
              style={{ color: '#F39F5A', fontWeight: 700, cursor: 'pointer' }}>Login</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
