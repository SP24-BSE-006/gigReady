function Features() {
  const features = [
    { icon: "📊", title: "Profile Strength Analyzer", description: "Get an AI-powered score on your freelancer profile with specific actionable tips to attract more clients." },
    { icon: "✍️", title: "AI Proposal Generator", description: "Paste any job description and get a personalized, ready-to-send proposal generated from your own profile." },
    { icon: "🎯", title: "Tone Selector", description: "Choose Confident, Friendly, or Formal — and let AI match your voice perfectly to every client." }
  ]

  return (
    <div style={{ padding: '60px 24px 80px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <h2 style={{ fontSize: '40px', fontWeight: 800, color: 'white', marginBottom: '12px' }}>
            Everything You Need to <span className="gradient-text">Win</span>
          </h2>
          <p style={{ color: '#E8BCB9', opacity: 0.7, fontSize: '17px' }}>
            Three powerful tools built specifically for freelancers
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
          {features.map((feature, index) => (
            <div key={index} className="card"
              style={{ transition: 'transform 0.2s, box-shadow 0.2s' }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-6px)'
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(174,68,90,0.25)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}>
              <div style={{
                width: '52px', height: '52px', borderRadius: '14px',
                background: 'linear-gradient(135deg, rgba(243,159,90,0.2), rgba(174,68,90,0.2))',
                border: '1px solid rgba(243,159,90,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '26px', marginBottom: '18px'
              }}>
                {feature.icon}
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'white', marginBottom: '10px' }}>
                {feature.title}
              </h3>
              <p style={{ color: '#E8BCB9', lineHeight: 1.7, opacity: 0.75, fontSize: '15px' }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Features
