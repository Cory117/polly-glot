import './style.css'

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
translateBtn.addEventListener('click', getTranslation)
restartBtn.addEventListener('click', startOver)

// Functions
async function getTranslation() {
  const textToTranslate = inputText.value
  let selectedLanguage

  for (var i = 0, length = languageRadios.length; i < length; i++) {
    if (languageRadios[i].checked) {
      selectedLanguage = languageRadios[i].value
      break
    }
  }

  if (textToTranslate && selectedLanguage) {
    try {
      const response = await fetch('/.netlify/functions/fetchAI', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain'
        },
        body: JSON.stringify({
          textToTranslate, selectedLanguage
        })
      })

      if (response.ok) {
        const data = await response.json()
        const translation = data.response
        renderText(translation)
      }

    } catch (err) {
        console.log(err)
    }
  } else {
    alert('Please enter text and select a language.')
  }
}

function renderText(translation) {
  inputPage.style.display = 'none'
  outputPage.style.display = 'inline'
  outputOriginalText.textContent = inputText.value
  outputOriginalText.disabled = true
  outputTranslatedText.textContent = translation
  outputTranslatedText.disabled = true
}

function startOver() {
  outputPage.style.display = 'none'
  inputPage.style.display = 'inline'
  inputText.value = ''
  languageRadios.forEach(radio => radio.checked = false)
}