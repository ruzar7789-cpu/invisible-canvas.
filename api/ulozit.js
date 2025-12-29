import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  // Povolíme přístup z tvého webu
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Povolen je pouze POST' });
  }

  try {
    // Vercel si vezme DATABASE_URL z toho nastavení, co jsme dělali
    const sql = neon(process.env.DATABASE_URL);
    const { obsah, lat, lon } = req.body;

    // Uložíme to do tabulky stopy
    await sql`INSERT INTO stopy (obsah, lat, lon) VALUES (${obsah}, ${lat}, ${lon})`;
    
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Chyba databáze:', error);
    return res.status(500).json({ error: error.message });
  }
}
