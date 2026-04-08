import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>

        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 800, color: 'white', marginBottom: '8px' }}>
            Welcome Back
          </h2>
          <p style={{ color: '#E8BCB9', opacity: 0.7 }}>Login to continue to GigReady</p>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* Email */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#E8BCB9', display: 'block', marginBottom: '6px' }}>
              Email
            </label>
            <input type="email" placeholder="ahmed@email.com" />
          </div>

          {/* Password + Forgot Password */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: 600, color: '#E8BCB9' }}>
                Password
              </label>
              <span
                style={{ fontSize: '12px', color: '#F39F5A', fontWeight: 600, cursor: 'pointer', opacity: 0.85 }}
                onMouseEnter={e => e.currentTarget.style.opacity = '1'}
                onMouseLeave={e => e.currentTarget.style.opacity = '0.85'}
                onClick={() => alert('Password reset link will be sent to your email.')}
              >
                Forgot password?
              </span>
            </div>
            <input type="password" placeholder="••••••••" />
          </div>

          <button
            onClick={() => navigate('/dashboard')}
            className="btn-primary w-full"
            style={{ padding: '14px', fontSize: '16px', marginTop: '4px' }}>
            Login →
          </button>
        </div>

        <p style={{ textAlign: 'center', color: '#E8BCB9', opacity: 0.7, fontSize: '14px', marginTop: '20px' }}>
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/signup')}
            style={{ color: '#F39F5A', fontWeight: 700, cursor: 'pointer' }}>
            Sign Up
          </span>
        </p>

      </div>
    </div>
  )
}

export default Login