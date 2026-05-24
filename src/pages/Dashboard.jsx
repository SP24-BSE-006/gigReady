import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Dashboard() {
  const navigate = useNavigate()
  const { profile } = useAuth()
  const firstName = profile?.full_name ? profile.full_name.split(' ')[0] : 'there'

  return (
    <div style={{ minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        <div style={{ marginBottom: '36px' }}>
          <p style={{ color: '#F39F5A', fontSize: '14px', fontWeight: 600, marginBottom: '6px' }}>Good to see you </p>
          <h1 style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 800, color: 'white', marginBottom: '6px' }}>Welcome back, {firstName}</h1>
          <p style={{ color: 'white', opacity: 0.7 }}>Ready to win your next freelance project?</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          {[
            { value: '73', label: 'Profile Score' },
            { value: '12', label: 'Proposals Generated' },
            { value: '3', label: 'Sent Today' },
          ].map((stat, i) => (
            <div key={i} className="card" style={{ textAlign: 'center', padding: '20px' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>{stat.icon}</div>
              <p className="gradient-text" style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: 800, margin: '0 0 4px' }}>{stat.value}</p>
              <p style={{ color: 'white', fontSize: '13px', opacity: 0.8 }}>{stat.label}</p>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          {[
            { icon: '📊', title: 'Profile Analyzer', desc: 'See how strong your freelancer profile is and get AI suggestions to improve it.', path: '/profile', btn: 'Analyze My Profile' },
            { icon: '✍️', title: 'Generate Proposal', desc: 'Paste a job description and get a personalized AI proposal ready to send.', path: '/proposal', btn: 'Generate Now' },
          ].map((card, i) => (
            <div key={i} className="card">
              <div style={{ width: '46px', height: '46px', borderRadius: '14px', background: 'linear-gradient(135deg, rgba(243,159,90,0.2), rgba(174,68,90,0.2))', border: '1px solid rgba(243,159,90,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', marginBottom: '14px' }}>{card.icon}</div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'white', marginBottom: '8px' }}>{card.title}</h3>
              <p style={{ color: 'white', opacity: 0.75, marginBottom: '18px', lineHeight: 1.6, fontSize: '14px' }}>{card.desc}</p>
              <button onClick={() => navigate(card.path)} className="btn-primary" style={{ width: '100%' }}>{card.btn}</button>
            </div>
          ))}
        </div>

        <div className="card">
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'white', marginBottom: '20px' }}>Recent Proposals</h3>
          {[
            { title: "Logo Design for Bakery", tone: "Friendly", date: "Today" },
            { title: "React Website for Startup", tone: "Confident", date: "Yesterday" },
            { title: "WordPress Blog Setup", tone: "Formal", date: "3 days ago" },
          ].map((proposal, index) => (
            <div key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', paddingBottom: index < 2 ? '16px' : '0', marginBottom: index < 2 ? '16px' : '0', borderBottom: index < 2 ? '1px solid rgba(232,188,185,0.1)' : 'none' }}>
              <div>
                <p style={{ fontWeight: 600, color: 'white', marginBottom: '6px', fontSize: '14px' }}>{proposal.title}</p>
                <span style={{ fontSize: '12px', padding: '3px 12px', borderRadius: '999px', fontWeight: 500, background: 'rgba(243,159,90,0.15)', color: '#F39F5A', border: '1px solid rgba(243,159,90,0.2)' }}>{proposal.tone}</span>
              </div>
              <span style={{ color: '#E8BCB9', fontSize: '12px', opacity: 0.5 }}>{proposal.date}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
export default Dashboard