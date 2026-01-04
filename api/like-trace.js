import { neon } from '@neondatabase/serverless';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { id } = req.body;
    const sql = neon(process.env.DATABASE_URL);
    // Příkaz, který k danému vzkazu přičte +1 lajk
    await sql('UPDATE traces SET likes = likes + 1 WHERE id = $1', [id]);
    res.status(200).json({ success: true });
  } else {
    res.status(405).send('Metoda není povolena');
  }
}
