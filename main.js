import './style.css'
import OpenAI from 'openai'

// Variables
const translateBtn = document.querySelector('.translate-btn')
const restartBtn = document.querySelector('.restart-btn')
const inputPage = document.querySelector('.input-page')
const inputText = document.getElementById('input-text')
const languageRadios = document.getElementsByName('language')
const outputPage = document.querySelector('.output-page')
const outputOriginalText = document.getElementById('output-original-text')
const outputTranslatedText = document.getElementById('output-translated-text')

// Event Listeners 
translateBtn.addEventListener('click', translateText)
restartBtn.addEventListener('click', startOver)

// Functions
async function translateText() {
  const textToTranslate = inputText.value
  let selectedLanguage

  for (var i = 0, length = languageRadios.length; i < length; i++) {
    if (languageRadios[i].checked) {
      selectedLanguage = languageRadios[i].value
      break
    }
  }

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

  if (textToTranslate && selectedLanguage) {
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
  } else {
    alert('Please enter text and select a language.')
  }
}

function renderText(text) {
  inputPage.style.display = 'none'
  outputPage.style.display = 'inline'
  outputOriginalText.textContent = inputText.value
  outputOriginalText.disabled = true
  outputTranslatedText.textContent = text
  outputTranslatedText.disabled = true
}

function startOver() {
  outputPage.style.display = 'none'
  inputPage.style.display = 'inline'
  inputText.value = ''
  languageRadios.forEach(radio => radio.checked = false)
}