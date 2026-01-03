import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  // 1. Kontrola, zda jde o POST požadavek (odesílání dat)
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metoda není povolena' });
  }

  // 2. Připojení k databázi pomocí proměnné prostředí
  // DATABASE_URL musíš vložit do Vercel Settings -> Environment Variables
  const sql = neon(process.env.DATABASE_URL);

  try {
    const { lat, lng, content, media } = req.body;

    // 3. Vložení dat do tabulky traces, kterou máš na fotce z Neonu
    await sql`
      INSERT INTO traces (lat, lng, content, media)
      VALUES (${lat}, ${lng}, ${content}, ${media})
    `;

    return res.status(200).json({ message: 'Data byla úspěšně uložena do Neonu!' });
  } catch (error) {
    console.error('Chyba databáze:', error);
    return res.status(500).json({ error: 'Chyba při ukládání: ' + error.message });
  }
}

