import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { code } = req.body;

        const prompt = `Analyze the following code. Provide a score out of 10 based on functionality, style, optimizations, and security. Respond only with the score for each category in the format x/10.\n\nCode:\n${code}`;

        try {
            const response = await openai.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: [{ role: 'user', content: prompt }],
                max_tokens: 50,
            });

            const score = response.choices[0].message.content.trim();
            res.status(200).json({ score });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
