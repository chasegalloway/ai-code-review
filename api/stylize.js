import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { code, style } = req.body; 

        const prompt = `Reformat the following code snippet to match the ${style} style guide. Only return the entire reformatted code and no additional text. If the style is Stylize, do not make any changes\n\nCode:\n${code}`;

        try {
            const response = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: prompt }],
            });

            const stylizedCode = response.choices[0].message.content.trim();
            res.status(200).json({ stylizedCode });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
}
