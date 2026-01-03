import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
    const sql = neon(process.env.DATABASE_URL);
    try {
        const traces = await sql`SELECT * FROM traces ORDER BY id DESC`;
        return res.status(200).json(traces);
    } catch (error) {
        return res.status(500).json({ error: 'Nelze načíst data' });
    }
}
