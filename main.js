import './style.css'
// import OpenAI from "openai"

const translateBtn = document.querySelector('.translate-btn')

translateBtn.addEventListener('click', translateText)

async function translateText() {
  const textToTranslate = document.getElementById('textarea').value
  const selectedLanguage = document.querySelector('input[name=language]:checked').value;

  console.log(textToTranslate, selectedLanguage)
}