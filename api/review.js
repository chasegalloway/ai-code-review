import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { code } = req.body;

        const prompt = `Analyze the following code. Provide a score out of 10 based on functionality, style, optimizations, and security. Respond only with the score for each category in the format:
Functionality: x/10
Style: x/10
Optimization: x/10
Security: x/10`;

        try {
            const response = await openai.chat.completions.create({
                model: 'gpt-4o-mini',
                messages: [{ role: 'user', content: `${prompt}\n\nCode:\n${code}` }],
            });

            const scores = response.choices[0].message.content.trim();

            const scoreLines = scores.split('\n'); 
            const functionality = scoreLines[0].split(': ')[1];
            const style = scoreLines[1].split(': ')[1];
            const optimization = scoreLines[2].split(': ')[1];
            const security = scoreLines[3].split(': ')[1];

            res.status(200).json({
                functionality,
                style,
                optimization,
                security,
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
