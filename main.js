import './style.css'
import OpenAI from 'openai'

const translateBtn = document.querySelector('.translate-btn')

translateBtn.addEventListener('click', translateText)

async function translateText() {
  const textToTranslate = document.getElementById('textarea').value
  const selectedLanguage = document.querySelector('input[name=language]:checked').value

  const messages = [
    {
      role: 'system',
      content: `You can translate english text to ${selectedLanguage} like an expert.`
    },
    {
      role: 'user',
      content: `${textToTranslate}`
    }
  ]

  try {
    const openai = new OpenAI({
      dangerouslyAllowBrowser: true,
      apiKey: import.meta.env.VITE_OPENAI_API_KEY
    })
  
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: messages,
      temperature: 1,
      max_tokens: 256,
    })

    console.log(response.choices[0].message.content)

  } catch (err) {
      console.log(err)
  }
}