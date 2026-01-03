import { neon } from '@neondatabase/serverless';
export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();
    const sql = neon(process.env.DATABASE_URL);
    try {
        const { lat, lng, content, image_url } = req.body;
        // Zkontroluj, zda v SQL příkazu máš i image_url
        await sql`INSERT INTO traces (lat, lng, content, image_url) VALUES (${lat}, ${lng}, ${content}, ${image_url})`;
        return res.status(200).json({ success: true });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: e.message });
    }
}
