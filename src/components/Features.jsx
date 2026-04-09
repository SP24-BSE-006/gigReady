function Features() {
  const features = [
    { icon: "📊", title: "Profile Strength Analyzer", description: "Get an AI-powered score on your freelancer profile with specific actionable tips to attract more clients." },
    { icon: "✍️", title: "AI Proposal Generator", description: "Paste any job description and get a personalized, ready-to-send proposal generated from your own profile." },
    { icon: "🎯", title: "Tone Selector", description: "Choose Confident, Friendly, or Formal — and let AI match your voice perfectly to every client." }
  ]

  return (
    <div style={{ padding: 'clamp(40px, 6vw, 60px) 20px clamp(50px, 8vw, 80px)' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h2 style={{ fontSize: 'clamp(26px, 5vw, 40px)', fontWeight: 800, color: 'white', marginBottom: '12px' }}>
            Everything You Need to <span className="gradient-text">Win</span>
          </h2>
          <p style={{ color: 'white', opacity: 0.75, fontSize: 'clamp(14px, 2vw, 17px)' }}>
            Three powerful tools built specifically for freelancers
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {features.map((feature, index) => (
            <div key={index} className="card" style={{ transition: 'transform 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-6px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, rgba(243,159,90,0.2), rgba(174,68,90,0.2))', border: '1px solid rgba(243,159,90,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', marginBottom: '16px' }}>
                {feature.icon}
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'white', marginBottom: '10px' }}>{feature.title}</h3>
              <p style={{ color: 'white', lineHeight: 1.7, opacity: 0.75, fontSize: '14px' }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Features
