import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [resetSent, setResetSent] = useState(false)

  const handleLogin = async () => {
    if (!email || !password) return setError('Please enter your email and password.')
    setLoading(true)
    setError('')
    const { error: loginError } = await supabase.auth.signInWithPassword({ email, password })
    if (loginError) { setError(loginError.message); setLoading(false); return }
    setLoading(false)
    navigate('/dashboard')
  }

  const handleForgotPassword = async () => {
    if (!email) return setError('Enter your email above first, then click Forgot Password.')
    setError('')
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    if (resetError) setError(resetError.message)
    else setResetSent(true)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px 16px' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>

        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <h2 style={{ fontSize: 'clamp(24px, 5vw, 32px)', fontWeight: 800, color: 'white', marginBottom: '8px' }}>Welcome Back</h2>
          <p style={{ color: 'white', opacity: 0.7 }}>Login to continue to GigReady</p>
        </div>

        {error && (
          <div style={{ background: 'rgba(252,129,129,0.15)', border: '1px solid rgba(252,129,129,0.3)', borderRadius: '10px', padding: '12px 16px', marginBottom: '16px' }}>
            <p style={{ color: '#FC8181', fontSize: '14px', margin: 0 }}>⚠️ {error}</p>
          </div>
        )}

        {resetSent && (
          <div style={{ background: 'rgba(104,211,145,0.15)', border: '1px solid rgba(104,211,145,0.3)', borderRadius: '10px', padding: '12px 16px', marginBottom: '16px' }}>
            <p style={{ color: '#68D391', fontSize: '14px', margin: 0 }}>✅ Password reset email sent! Check your inbox.</p>
          </div>
        )}

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '18px', padding: 'clamp(20px, 4vw, 32px)' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#E8BCB9', display: 'block', marginBottom: '6px' }}>Email</label>
            <input type="email" placeholder="ahmed@email.com" value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#E8BCB9' }}>Password</label>
              <span style={{ fontSize: '12px', color: '#F39F5A', fontWeight: 600, cursor: 'pointer' }} onClick={handleForgotPassword}>
                Forgot password?
              </span>
            </div>
            <input type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()} />
          </div>
          <button onClick={handleLogin} disabled={loading} className="btn-primary"
            style={{ padding: '14px', fontSize: '16px', width: '100%', marginTop: '4px', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Logging in...' : 'Login →'}
          </button>
        </div>

        <p style={{ textAlign: 'center', color: '#E8BCB9', opacity: 0.7, fontSize: '14px', marginTop: '20px' }}>
          Don't have an account?{' '}
          <span onClick={() => navigate('/signup')} style={{ color: '#F39F5A', fontWeight: 700, cursor: 'pointer' }}>Sign Up</span>
        </p>
      </div>
    </div>
  )
}

export default Login