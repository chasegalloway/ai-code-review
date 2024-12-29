import express from 'express';
import bodyParser from 'body-parser';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function analysis(code) {
    const prompt = `Analyze the following code snippet. Provide a score out of 10 based on functionality, style, optimizations, and security. Respond only with the score in the format x/10. There should be no 'Score: ' before the actual score. \n\nCode:\n${code}`;

    const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 3,
    });

    return response.choices[0].message.content.trim();
}

app.post('/review', async (req, res) => {
    try {
        const { code } = req.body;

        const score = await analysis(code);

        res.json({ score: score });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
