import { useState } from 'react'

function Proposal() {
  const [jobDescription, setJobDescription] = useState('')
  const [tone, setTone] = useState('friendly')
  const [proposal, setProposal] = useState(null)
  const [activeTab, setActiveTab] = useState('profile')
  const [extraDetails, setExtraDetails] = useState('')

  const handleGenerate = () => {
    setProposal(`Hi! I came across your job post and I'm genuinely excited about this opportunity.

Based on my experience and the specific requirements you've mentioned, I believe I'm a strong fit for this project. I've worked on similar projects before and understand exactly what you're looking for.

I'd love to discuss this further and share some relevant examples of my past work. I'm available to start immediately and can deliver within your timeline.

Looking forward to hearing from you!`)
  }

  const tabStyle = (tab) => ({
    flex: 1, padding: '11px', borderRadius: '10px', border: 'none',
    cursor: 'pointer', fontWeight: 600, fontSize: '14px', transition: 'all 0.2s',
    background: activeTab === tab ? 'linear-gradient(135deg, rgba(243,159,90,0.25), rgba(174,68,90,0.25))' : 'transparent',
    color: activeTab === tab ? '#F39F5A' : '#E8BCB9',
    borderBottom: activeTab === tab ? '2px solid #F39F5A' : '2px solid transparent',
  })

  return (
    <div style={{ minHeight: '100vh', padding: '40px 24px' }}>
      <div style={{ maxWidth: '580px', margin: '0 auto' }}>

        <h2 style={{ fontSize: '32px', fontWeight: 800, color: 'white', marginBottom: '6px' }}>Generate Proposal</h2>
        <p style={{ color: '#E8BCB9', opacity: 0.7, marginBottom: '28px' }}>Paste a job description and get a personalized AI proposal</p>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#E8BCB9', display: 'block', marginBottom: '6px' }}>Job Description</label>
            <textarea rows={6} value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} placeholder="Paste the job description here..." />
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#E8BCB9', display: 'block', marginBottom: '10px' }}>About You</label>
            <div style={{ display: 'flex', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '4px', marginBottom: '14px', border: '1px solid rgba(232,188,185,0.1)' }}>
              <button onClick={() => setActiveTab('profile')} style={tabStyle('profile')}> Use My Profile</button>
              <button onClick={() => setActiveTab('extra')} style={tabStyle('extra')}> Anything New About You?</button>
            </div>
         {activeTab === 'extra' && (
          <textarea
           rows={4}
            value={extraDetails}
           onChange={(e) => setExtraDetails(e.target.value)}
            placeholder="Learnt something new? Just finished a relevant project? Have a special offer for this client? Tell us anything you'd like included in this proposal..."/>
              )}
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#E8BCB9', display: 'block', marginBottom: '10px' }}>Select Tone</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {[
                { value: 'confident', label: ' Confident' },
                { value: 'friendly', label: ' Friendly' },
                { value: 'formal', label: ' Formal' },
              ].map((option) => (
                <button key={option.value} onClick={() => setTone(option.value)}
                  style={{
                    padding: '12px', borderRadius: '10px', fontWeight: 600, fontSize: '14px', cursor: 'pointer', transition: 'all 0.2s',
                    border: tone === option.value ? '2px solid #F39F5A' : '2px solid rgba(232,188,185,0.15)',
                    background: tone === option.value ? 'rgba(243,159,90,0.15)' : 'rgba(255,255,255,0.04)',
                    color: tone === option.value ? '#F39F5A' : '#E8BCB9',
                  }}>
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <button onClick={handleGenerate} className="btn-primary w-full" style={{ padding: '14px', fontSize: '16px' }}>
            Generate Proposal 
          </button>
        </div>

        {proposal && (
          <div className="card" style={{ marginTop: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'white', margin: 0 }}>Your Proposal</h3>
              <span style={{ fontSize: '12px', padding: '4px 12px', borderRadius: '999px', fontWeight: 600, background: 'rgba(243,159,90,0.15)', color: '#F39F5A', border: '1px solid rgba(243,159,90,0.3)', textTransform: 'capitalize' }}>{tone} tone</span>
            </div>
            <p style={{ color: '#E8BCB9', lineHeight: 1.8, whiteSpace: 'pre-line', fontSize: '15px' }}>{proposal}</p>
            <button onClick={() => navigator.clipboard.writeText(proposal)}
              style={{ marginTop: '20px', width: '100%', padding: '14px', border: '2px solid rgba(243,159,90,0.4)', color: '#F39F5A', borderRadius: '12px', fontWeight: 600, fontSize: '15px', background: 'transparent', cursor: 'pointer', transition: 'all 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(243,159,90,0.1)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
              Copy Proposal 📋
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Proposal