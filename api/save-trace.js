import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    
    const sql = neon(process.env.DATABASE_URL);
    const { lat, lng, content, image_url } = req.body;

    try {
        await sql`
            INSERT INTO traces (lat, lng, content, image_url) 
            VALUES (${lat}, ${lng}, ${content}, ${image_url})
        `;
        return res.status(200).json({ success: true });
    } catch (error) {
        console.error('Database Error:', error);
        return res.status(500).json({ error: 'Chyba při ukládání do Neonu' });
    }
}
