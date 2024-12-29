const express = require('express');
const bodyParser = require('body-parser');
const { Configuration, OpenAIApi } = require('openai');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function analysis(code) {
    const prompt = `Analyze the following code snippet. Provide a score out of 10 based on functionality, style, optimizations, and security. Respond only with the score in the format x/10.\n\nCode:\n${code}`;

    const response = await openai.createChatCompletion({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
    });

    return response.data.choices[0].message.content.trim();
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
