const express = require('express')
const cors = require('cors')
require('dotenv').config({ path: '../.env' })
const Groq = require('groq-sdk')

const app = express()
app.use(cors())
app.use(express.json())

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

// ── Profile Analyzer ──────────────────────────────────────────
app.post('/api/analyze', async (req, res) => {
  const { fullName, niche, skills, experienceLevel, platform, portfolioUrl, bio } = req.body

  const prompt = `
You are an expert freelance profile coach. Analyze this freelancer profile and return ONLY a JSON object, no markdown, no extra text.

Profile:
- Name: ${fullName}
- Niche: ${niche}
- Skills: ${skills}
- Experience Level: ${experienceLevel}
- Platform: ${platform}
- Portfolio URL: ${portfolioUrl || 'Not provided'}
- Bio: ${bio || 'Not provided'}

Return this exact JSON format:
{
  "score": <number between 0 and 100>,
  "feedback": [
    "feedback point 1",
    "feedback point 2",
    "feedback point 3",
    "feedback point 4",
    "feedback point 5"
  ]
}
`

  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    })
    const text = completion.choices[0].message.content
    const clean = text.replace(/```json|```/g, '').trim()
    const parsed = JSON.parse(clean)
    res.json(parsed)
  } catch (err) {
    console.error('Analyze error:', err)
    res.status(500).json({ error: 'Failed to analyze profile' })
  }
})

// ── Proposal Generator ────────────────────────────────────────
app.post('/api/proposal', async (req, res) => {
  const { jobDescription, tone, profile, extraDetails } = req.body

  const prompt = `
You are an expert freelance proposal writer. Write a ${tone} tone proposal for this freelancer.

Freelancer Profile:
- Name: ${profile.full_name}
- Niche: ${profile.niche}
- Skills: ${profile.skills}
- Experience Level: ${profile.experience_level}
- Platform: ${profile.platform}
- Bio: ${profile.bio || ''}

Job Description:
${jobDescription}

${extraDetails ? `Extra details to include:\n${extraDetails}` : ''}

Write a personalized, compelling proposal in ${tone} tone. 
- Do NOT use placeholder brackets like [Your Name]
- Keep it under 200 words
- Sound human, not robotic
- Start directly with the proposal, no extra commentary
`

  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    })
    const text = completion.choices[0].message.content
    res.json({ proposal: text })
  } catch (err) {
    console.error('Proposal error:', err)
    res.status(500).json({ error: 'Failed to generate proposal' })
  }
})

app.listen(5000, () => console.log('Server running on port 5000'))