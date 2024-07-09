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

    renderText(response.choices[0].message.content)

  } catch (err) {
      console.log(err)
  }
}

function renderText(text) {
  const languagesContainer = document.querySelector('.languages')
  languagesContainer.style.display = 'none'
  document.getElementById('translate-title').textContent = ('Original text 👇')
  document.getElementById('language-title').textContent = ('Your translation 👇')
  translateBtn.textContent = ('Start Over')
  const outputArea = document.querySelector('.output-section')
  const outputText = document.createElement('textarea')
  outputArea.appendChild(outputText)
  outputText.textContent = text
  outputText.classList.add('section-textarea')
  document.querySelector('.section-textarea').disabled = true
  outputText.disabled = true
}