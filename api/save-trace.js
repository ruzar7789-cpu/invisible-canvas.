import { neon } from '@neondatabase/serverless';
export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();
    const sql = neon(process.env.DATABASE_URL);
    try {
        const { lat, lng, content } = req.body;
        await sql`INSERT INTO traces (lat, lng, content) VALUES (${lat}, ${lng}, ${content})`;
        return res.status(200).json({ success: true });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}
