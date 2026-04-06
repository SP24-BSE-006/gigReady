function Footer() {
  return (
    <footer style={{
      background: 'rgba(29,26,57,0.8)',
      borderTop: '1px solid rgba(232,188,185,0.1)',
      padding: '48px 24px',
      textAlign: 'center'
    }}>
      <h2 className="gradient-text" style={{ fontSize: '26px', fontWeight: 800, marginBottom: '8px' }}>
        GigReady
      </h2>
      <p style={{ color: '#E8BCB9', opacity: 0.6, marginBottom: '20px' }}>
        Helping freelancers win more projects with AI.
      </p>
      <div style={{ width: '40px', height: '2px', background: 'linear-gradient(135deg, #F39F5A, #AE445A)', margin: '0 auto 20px' }} />
      <p style={{ color: '#E8BCB9', opacity: 0.4, fontSize: '13px' }}>
        © 2025 GigReady. Built with React & Gemini AI.
      </p>
    </footer>
  )
}

export default Footer