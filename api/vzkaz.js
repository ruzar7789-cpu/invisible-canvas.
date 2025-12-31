import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
    const sql = neon(process.env.DATABASE_URL);

    if (req.method === 'POST') {
        try {
            const { txt, type, lat, lng, autor } = req.body;
            // Zápis do vaší tabulky 'stopy', kterou jste už v Neonu vytvořil
            await sql`INSERT INTO stopy (txt, type, lat, lng, autor) 
                      VALUES (${txt}, ${type}, ${lat}, ${lng}, ${autor})`;
            return res.status(200).json({ success: true });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    } else {
        try {
            // Načtení vzkazů pro mapu
            const data = await sql`SELECT * FROM stopy ORDER BY id DESC LIMIT 100`;
            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}
