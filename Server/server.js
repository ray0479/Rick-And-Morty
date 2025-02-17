import express from 'express'
import {GoogleGenerativeAI} from '@google/generative-ai'
import bodyParser from 'body-parser';
import cors from 'cors'

const app = express();
const PORT = 3000;


app.use(express.json());
app.use(bodyParser.json());
app.use(cors())

const genAI = new GoogleGenerativeAI("AIzaSyCBHcP4Seer76nBjvy9vOciNxHumZg7eFE");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
const basePrompt = `
Eres un chatbot integrado en una página web sobre Rick y Morty. Los usuarios solo pueden hacer preguntas relacionadas con la serie Rick y Morty. 
Si te hacen una pregunta fuera de este tema, responde con: "No conozco la respuesta a eso, haz otra pregunta."
`;
app.post('/bot', async (req, res) => {
    const result = await model.generateContent(basePrompt + req.body.msg);
    res.json({ text: result.response.text() });
});


app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});