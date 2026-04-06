import { useNavigate } from 'react-router-dom'

function Signup() {
  const navigate = useNavigate()

  const perks = [
    { icon: '📊', title: 'Profile Strength Analyzer', desc: 'Get an AI score on your profile with actionable tips to attract more clients.' },
    { icon: '✍️', title: 'AI Proposal Generator', desc: 'Generate personalized, ready-to-send proposals in seconds.' },
    { icon: '🎯', title: 'Tone Customization', desc: 'Match your voice to every client — Confident, Friendly, or Formal.' },
    { icon: '🚀', title: 'Win More Projects', desc: 'Freelancers using GigReady land clients faster and more consistently.' },
  ]

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
                }}>
                  {perk.icon}
                </div>
                <div>
                  <p style={{ color: 'white', fontWeight: 600, fontSize: '15px', marginBottom: '3px' }}>{perk.title}</p>
                  <p style={{ color: '#E8BCB9', opacity: 0.65, fontSize: '13px', lineHeight: 1.6 }}>{perk.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Signup form */}
        <div style={{ flex: 1, maxWidth: '400px', width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '28px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 800, color: 'white', marginBottom: '6px' }}>
              Create Account
            </h2>
            <p style={{ color: '#E8BCB9', opacity: 0.7, fontSize: '14px' }}>
              Start winning more freelance projects today
            </p>
          </div>

          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {[
              { label: 'Full Name', type: 'text', placeholder: 'Ahmed Khan' },
              { label: 'Email', type: 'email', placeholder: 'ahmed@email.com' },
              { label: 'Password', type: 'password', placeholder: '••••••••' },
            ].map((field) => (
              <div key={field.label}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#E8BCB9', display: 'block', marginBottom: '6px' }}>
                  {field.label}
                </label>
                <input type={field.type} placeholder={field.placeholder} />
              </div>
            ))}

            <button className="btn-primary w-full" style={{ padding: '14px', fontSize: '15px', marginTop: '4px' }}>
              Create Account →
            </button>
          </div>

          <p style={{ textAlign: 'center', color: '#E8BCB9', opacity: 0.6, fontSize: '13px', marginTop: '16px' }}>
            Already have an account?{' '}
            <span onClick={() => navigate('/login')}
              style={{ color: '#F39F5A', fontWeight: 700, cursor: 'pointer' }}>
              Login
            </span>
          </p>
        </div>

      </div>
    </div>
  )
}

export default Signup
