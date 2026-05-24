import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useEffect, useState } from 'react'
import { supabase } from '../supabaseClient'

function Dashboard() {
  const navigate = useNavigate()
  const { profile } = useAuth()
  const firstName = profile?.full_name ? profile.full_name.split(' ')[0] : 'there'
  const [proposals, setProposals] = useState([])

  useEffect(() => {
    const fetchProposals = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase
        .from('proposals')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(3)
      if (data) setProposals(data)
    }
    fetchProposals()
  }, [])

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diff = Math.floor((now - date) / (1000 * 60 * 60 * 24))
    if (diff === 0) return 'Today'
    if (diff === 1) return 'Yesterday'
    return `${diff} days ago`
  }

  return (
    <div style={{ minHeight: '100vh', padding: '40px 20px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        <div style={{ marginBottom: '36px' }}>
          <p style={{ color: '#F39F5A', fontSize: '14px', fontWeight: 600, marginBottom: '6px' }}>Good to see you</p>
          <h1 style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 800, color: 'white', marginBottom: '6px' }}>Welcome back, {firstName}</h1>
          <p style={{ color: 'white', opacity: 0.7 }}>Ready to win your next freelance project?</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          {[
            { value: proposals.length || '0', label: 'Proposals Generated' },
            { value: profile?.experience_level || '—', label: 'Experience Level' },
            { value: profile?.platform || '—', label: 'Platform' },
          ].map((stat, i) => (
            <div key={i} className="card" style={{ textAlign: 'center', padding: '20px' }}>
              <p className="gradient-text" style={{ fontSize: 'clamp(20px, 4vw, 32px)', fontWeight: 800, margin: '0 0 4px' }}>{stat.value}</p>
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
          {proposals.length === 0 ? (
            <p style={{ color: '#E8BCB9', opacity: 0.5, fontSize: '14px' }}>No proposals yet — generate your first one!</p>
          ) : (
            proposals.map((proposal, index) => (
              <div key={proposal.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', paddingBottom: index < proposals.length - 1 ? '16px' : '0', marginBottom: index < proposals.length - 1 ? '16px' : '0', borderBottom: index < proposals.length - 1 ? '1px solid rgba(232,188,185,0.1)' : 'none' }}>
                <div>
                  <p style={{ fontWeight: 600, color: 'white', marginBottom: '6px', fontSize: '14px' }}>{proposal.title}</p>
                  <span style={{ fontSize: '12px', padding: '3px 12px', borderRadius: '999px', fontWeight: 500, background: 'rgba(243,159,90,0.15)', color: '#F39F5A', border: '1px solid rgba(243,159,90,0.2)', textTransform: 'capitalize' }}>{proposal.tone}</span>
                </div>
                <span style={{ color: '#E8BCB9', fontSize: '12px', opacity: 0.5 }}>{formatDate(proposal.created_at)}</span>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  )
}

export default Dashboard