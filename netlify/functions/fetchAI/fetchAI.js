import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY
})

const handler = async (event) => {
  try {
    const {textToTranslate, selectedLanguage} = JSON.parse(event.body)
    const response = await translate(textToTranslate, selectedLanguage)

    return {
      statusCode: 200,
      body: JSON.stringify({response})
    }
    
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

async function translate(textToTranslate, selectedLanguage) {
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
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: messages,
      temperature: 1,
      max_tokens: 256,
    })

    const translationResponse = response.choices[0].message.content
    return translationResponse

  } catch (err) {
    console.log(err)
  }
}

export { handler }