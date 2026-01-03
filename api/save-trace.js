import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
    // Podpora pro volání z mobilu
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method !== 'POST') return res.status(405).json({ error: 'Pouze POST' });

    try {
        // Tady kód použije tu proměnnou, kterou právě opravuješ ve Vercelu
        const sql = neon(process.env.DATABASE_URL);
        const { lat, lng, content } = req.body;

        await sql`
            INSERT INTO traces (lat, lng, content, media)
            VALUES (${lat}, ${lng}, ${content}, '')
        `;

        return res.status(200).json({ success: true });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}
