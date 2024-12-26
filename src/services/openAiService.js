const { OpenAI } = require("openai");
require("dotenv").config();
if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OpenAI API key in .env");
}
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Generar una respuesta usando OpenAI
const generateResponse = async (message) => {
  const prompt = `Un cliente pregunta: "${message}". Si el cliente solicita el menú, responde con la URL del menú PDF: http://localhost:3000/menu`;

  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }],
  });

  return response.choices[0].message.content.trim();
};

module.exports = { generateResponse };
