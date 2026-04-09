import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

function Signup() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    fullName: '', email: '', password: '', confirmPassword: '',
    niche: '', skills: '', experienceLevel: '', platform: '',
    portfolioUrl: '', bio: '', agreedToTerms: false
  })

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const handleStep1 = () => {
    if (!form.fullName || !form.email || !form.password) return setError('Please fill in all fields.')
    if (form.password.length < 8) return setError('Password must be at least 8 characters.')
    if (form.password !== form.confirmPassword) return setError('Passwords do not match.')
    setError(''); setStep(2)
  }

  const handleStep2 = () => {
    if (!form.niche || !form.experienceLevel || !form.platform) return setError('Please fill in all fields.')
    setError(''); setStep(3)
  }

  const handleCreateAccount = async () => {
    if (!form.agreedToTerms) return setError('Please agree to the Terms of Service.')
    setLoading(true); setError('')
    const { data, error: signUpError } = await supabase.auth.signUp({ email: form.email, password: form.password })
    if (signUpError) { setError(signUpError.message); setLoading(false); return }
    const { error: profileError } = await supabase.from('profiles').insert({
      id: data.user.id, full_name: form.fullName, email: form.email,
      niche: form.niche, skills: form.skills, experience_level: form.experienceLevel,
      platform: form.platform, portfolio_url: form.portfolioUrl, bio: form.bio,
    })
    if (profileError) { setError(profileError.message); setLoading(false); return }
    setLoading(false); navigate('/dashboard')
  }

  const perks = [
    { icon: '📊', title: 'Profile Strength Analyzer', desc: 'Get an AI score on your profile with actionable tips.' },
    { icon: '✍️', title: 'AI Proposal Generator', desc: 'Generate personalized proposals in seconds.' },
    { icon: '🎯', title: 'Tone Customization', desc: 'Match your voice to every client.' },
    { icon: '🚀', title: 'Win More Projects', desc: 'Land clients faster and more consistently.' },
  ]

  const inputStyle = { width: '100%' }
  const selectStyle = {
    background: 'rgba(255,255,255,0.07)', border: '1.5px solid rgba(232,188,185,0.2)',
    color: 'white', borderRadius: '10px', padding: '12px 16px', width: '100%',
    fontSize: '15px', outline: 'none', cursor: 'pointer', appearance: 'none', WebkitAppearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23E8BCB9' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center',
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
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 16px' }}>
      <div style={{ display: 'flex', gap: '60px', alignItems: 'center', maxWidth: '960px', width: '100%', justifyContent: 'center' }}>

        {/* Left perks — desktop only */}
        <div className="hidden-mobile" style={{ flex: 1 }}>
          <div style={{ display: 'inline-block', background: 'rgba(243,159,90,0.15)', border: '1px solid rgba(243,159,90,0.3)', borderRadius: '999px', padding: '5px 16px', marginBottom: '20px' }}>
            <span style={{ color: '#F39F5A', fontSize: '13px', fontWeight: 600 }}>✨ Free to get started</span>
          </div>
          <h2 style={{ fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 800, color: 'white', lineHeight: 1.2, marginBottom: '12px' }}>
            Your freelance career<br />starts <span className="gradient-text">here.</span>
          </h2>
          <p style={{ color: 'white', opacity: 0.7, fontSize: '15px', lineHeight: 1.7, marginBottom: '36px' }}>
            Join thousands of freelancers who use GigReady to write better proposals and land more clients every week.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {perks.map((perk, i) => (
              <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', flexShrink: 0, background: 'rgba(243,159,90,0.15)', border: '1px solid rgba(243,159,90,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>{perk.icon}</div>
                <div>
                  <p style={{ color: 'white', fontWeight: 600, fontSize: '15px', marginBottom: '3px' }}>{perk.title}</p>
                  <p style={{ color: '#E8BCB9', opacity: 0.65, fontSize: '13px', lineHeight: 1.6 }}>{perk.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right form */}
        <div style={{ flex: 1, maxWidth: '420px', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: 800, color: 'white', marginBottom: '6px' }}>Create Account</h2>
            <p style={{ color: 'white', opacity: 0.7, fontSize: '14px' }}>Start winning more freelance projects today</p>
          </div>

          {/* Step indicator */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '24px' }}>
            <div style={stepDotStyle(1)}>1</div>
            <div style={{ height: '1.5px', width: '40px', background: step >= 2 ? '#F39F5A' : 'rgba(232,188,185,0.15)', transition: 'background 0.3s' }} />
            <div style={stepDotStyle(2)}>2</div>
            <div style={{ height: '1.5px', width: '40px', background: step >= 3 ? '#F39F5A' : 'rgba(232,188,185,0.15)', transition: 'background 0.3s' }} />
            <div style={stepDotStyle(3)}>3</div>
          </div>

          {error && (
            <div style={{ background: 'rgba(252,129,129,0.15)', border: '1px solid rgba(252,129,129,0.3)', borderRadius: '10px', padding: '12px 16px', marginBottom: '16px' }}>
              <p style={{ color: '#FC8181', fontSize: '14px', margin: 0 }}>⚠️ {error}</p>
            </div>
          )}

          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px', padding: 'clamp(20px, 4vw, 32px)' }}>

            {step === 1 && (
              <>
                <p style={{ color: '#F39F5A', fontSize: '12px', fontWeight: 700, letterSpacing: '1px', margin: 0 }}>STEP 1 — PERSONAL INFO</p>
                <div>
                  <label style={labelStyle}>Full Name</label>
                  <input type="text" placeholder="Ahmed Khan" style={inputStyle} value={form.fullName} onChange={e => update('fullName', e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>Email Address</label>
                  <input type="email" placeholder="ahmed@email.com" style={inputStyle} value={form.email} onChange={e => update('email', e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>Password</label>
                  <input type="password" placeholder="Min. 8 characters" style={inputStyle} value={form.password} onChange={e => update('password', e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>Confirm Password</label>
                  <input type="password" placeholder="Repeat your password" style={inputStyle} value={form.confirmPassword} onChange={e => update('confirmPassword', e.target.value)} />
                </div>
                <button onClick={handleStep1} className="btn-primary" style={{ padding: '14px', fontSize: '15px', width: '100%' }}>Continue →</button>
              </>
            )}

            {step === 2 && (
              <>
                <p style={{ color: '#F39F5A', fontSize: '12px', fontWeight: 700, letterSpacing: '1px', margin: 0 }}>STEP 2 — FREELANCER PROFILE</p>
                <div>
                  <label style={labelStyle}>Your Niche / Title</label>
                  <input type="text" placeholder="e.g. Full Stack Developer" style={inputStyle} value={form.niche} onChange={e => update('niche', e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>Top Skills</label>
                  <input type="text" placeholder="e.g. React, Figma, Python" style={inputStyle} value={form.skills} onChange={e => update('skills', e.target.value)} />
                  <p style={{ color: '#E8BCB9', fontSize: '11px', opacity: 0.5, marginTop: '5px' }}>Separate skills with commas</p>
                </div>
                <div>
                  <label style={labelStyle}>Experience Level</label>
                  <select style={selectStyle} value={form.experienceLevel} onChange={e => update('experienceLevel', e.target.value)}>
                    <option value="" disabled style={{ background: '#1D1A39' }}>Select your level</option>
                    <option value="Beginner" style={{ background: '#1D1A39' }}>Beginner — just starting out</option>
                    <option value="Intermediate" style={{ background: '#1D1A39' }}>Intermediate — 1–3 years</option>
                    <option value="Experienced" style={{ background: '#1D1A39' }}>Experienced — 3+ years</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Primary Platform</label>
                  <select style={selectStyle} value={form.platform} onChange={e => update('platform', e.target.value)}>
                    <option value="" disabled style={{ background: '#1D1A39' }}>Select primary platform</option>
                    <option value="Upwork" style={{ background: '#1D1A39' }}>Upwork</option>
                    <option value="Fiverr" style={{ background: '#1D1A39' }}>Fiverr</option>
                    <option value="Freelancer.com" style={{ background: '#1D1A39' }}>Freelancer.com</option>
                    <option value="Toptal" style={{ background: '#1D1A39' }}>Toptal</option>
                    <option value="Other" style={{ background: '#1D1A39' }}>Other</option>
                  </select>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => setStep(1)} style={{ flex: 1, padding: '13px', border: '2px solid rgba(232,188,185,0.2)', color: '#E8BCB9', borderRadius: '12px', fontWeight: 600, fontSize: '14px', background: 'transparent', cursor: 'pointer' }}>← Back</button>
                  <button onClick={handleStep2} className="btn-primary" style={{ flex: 2, padding: '13px', fontSize: '15px' }}>Continue →</button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <p style={{ color: '#F39F5A', fontSize: '12px', fontWeight: 700, letterSpacing: '1px', margin: 0 }}>STEP 3 — FINISHING UP</p>
                <div>
                  <label style={labelStyle}>Portfolio / LinkedIn URL <span style={{ color: 'rgba(232,188,185,0.4)', fontWeight: 400 }}>(optional)</span></label>
                  <input type="text" placeholder="https://yourportfolio.com" style={inputStyle} value={form.portfolioUrl} onChange={e => update('portfolioUrl', e.target.value)} />
                </div>
                <div>
                  <label style={labelStyle}>Brief Bio <span style={{ color: 'rgba(232,188,185,0.4)', fontWeight: 400 }}>(optional)</span></label>
                  <textarea rows={3} placeholder="Tell clients a bit about yourself..." style={{ width: '100%', resize: 'vertical' }} value={form.bio} onChange={e => update('bio', e.target.value)} />
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                  <input type="checkbox" id="terms" style={{ width: '16px', height: '16px', marginTop: '2px', flexShrink: 0, cursor: 'pointer' }} checked={form.agreedToTerms} onChange={e => update('agreedToTerms', e.target.checked)} />
                  <label htmlFor="terms" style={{ fontSize: '13px', color: '#E8BCB9', opacity: 0.7, lineHeight: 1.5, cursor: 'pointer' }}>
                    I agree to the <span style={{ color: '#F39F5A', fontWeight: 600 }}>Terms of Service</span> and <span style={{ color: '#F39F5A', fontWeight: 600 }}>Privacy Policy</span>
                  </label>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => setStep(2)} style={{ flex: 1, padding: '13px', border: '2px solid rgba(232,188,185,0.2)', color: '#E8BCB9', borderRadius: '12px', fontWeight: 600, fontSize: '14px', background: 'transparent', cursor: 'pointer' }}>← Back</button>
                  <button onClick={handleCreateAccount} disabled={loading} className="btn-primary" style={{ flex: 2, padding: '13px', fontSize: '15px', opacity: loading ? 0.7 : 1 }}>
                    {loading ? 'Creating...' : 'Create Account →'}
                  </button>
                </div>
              </>
            )}
          </div>

          <p style={{ textAlign: 'center', color: '#E8BCB9', opacity: 0.6, fontSize: '13px', marginTop: '16px' }}>
            Already have an account?{' '}
            <span onClick={() => navigate('/login')} style={{ color: '#F39F5A', fontWeight: 700, cursor: 'pointer' }}>Login</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup