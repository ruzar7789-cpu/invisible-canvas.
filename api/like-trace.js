import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();
    const sql = neon(process.env.DATABASE_URL);
    const { id } = req.body;
    try {
        // Tento příkaz najde stopu podle ID a přičte k lajkům +1
        await sql`UPDATE traces SET likes = COALESCE(likes, 0) + 1 WHERE id = ${id}`;
        res.status(200).json({ success: true });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}
