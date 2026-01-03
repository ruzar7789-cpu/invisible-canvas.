import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  // Základní nastavení pro prohlížeč
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // Kontrola, zda máme adresu databáze
  if (!process.env.DATABASE_URL) {
    console.error("CHYBA: Chybí DATABASE_URL v nastavení Vercelu!");
    return res.status(500).json({ error: "Konfigurace databáze chybí." });
  }

  try {
    const sql = neon(process.env.DATABASE_URL);
    const { lat, lng, content, media } = req.body;

    // Zápis do tabulky traces, kterou máš na snímku
    await sql`
      INSERT INTO traces (lat, lng, content, media)
      VALUES (${lat}, ${lng}, ${content}, ${media})
    `;

    return res.status(200).json({ success: true, message: "Uloženo!" });
  } catch (error) {
    console.error("Detail chyby:", error);
    return res.status(500).json({ error: "Databáze odmítla zápis: " + error.message });
  }
}
