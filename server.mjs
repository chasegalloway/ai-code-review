// For local testing only
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
    const prompt = `Analyze the following code. Provide a score out of 10 based on functionality, style, optimizations, and security. Do not start the response with 'Score: ' no matter what. Respond only with the score for each category in the format x/10. Do not include the word Score: before you give the actual score, just the category name. The exact format should start with Functionality: x/10 end line, Style: x/10 end line, Optimization: x/10 end line, Security: x/10 end line, Score: , which is the average score.  \n\nCode:\n${code}`;

    const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 50,
    });

    return response.choices[0].message.content.trim();
}

async function stylizeCode(code, selectedStyle) {
    const prompt = `Reformat the following code snippet to match the ${selectedStyle} style guide. Only return the entire reformatted code and no additional text. If the style is Stylize, do not make any changes and just output the inputted text\n\nCode:\n${code}`;

    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
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

app.post('/stylize', async (req, res) => {
    try {
        const { code, style } = req.body;

        const stylizedCode = await stylizeCode(code, style);

        res.json({ stylizedCode: stylizedCode });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
