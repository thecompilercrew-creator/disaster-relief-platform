const express = require('express');
const router = express.Router();

router.post('/chat', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.json({
        reply: 'Please describe what is happening so I can help.'
      });
    }

    const enrichedPrompt = `
You are an advanced disaster relief assistant.

Your role:
- Help people during emergencies and crises
- Stay calm, empathetic, and precise
- Give practical, step-by-step guidance
- Adapt tone based on urgency
- Never repeat generic phrases
- Always provide meaningful, specific information

Rules:
- If the situation is unclear, ask clarifying questions
- If people may be in danger, prioritize safety advice
- If emotional distress is present, be reassuring

User message:
"${prompt}"

Respond as a highly capable emergency-response assistant:
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{ text: enrichedPrompt }]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topP: 0.95,
            maxOutputTokens: 700
          }
        })
      }
    );

    const data = await response.json();

   let reply = '';

if (data?.candidates?.length > 0) {
  const parts = data.candidates[0]?.content?.parts || [];

  reply = parts
    .map(p => (typeof p.text === 'string' ? p.text : ''))
    .join('\n')
    .trim();
}

// Log once to verify (REMOVE after testing)
console.log('🧠 Gemini raw reply:', reply);

if (!reply) {
  reply =
    'I’m here to help. Can you tell me what’s happening right now?';
}

    res.json({ reply });

  } catch (err) {
    console.error('Gemini error:', err);
    res.status(500).json({
      reply:
        'I’m unable to respond right now. If this is an emergency, please contact local emergency services immediately.'
    });
  }
});

module.exports = router;
