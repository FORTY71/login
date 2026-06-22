export default function handler(req, res) {
  // 1. Mengatur Header Universal untuk Klien Android
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store, max-age=0, no-cache');

  // Menangani Preflight Request jika ada
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // 2. Format Waktu Dinamis (Real-time)
  const date = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const waktuSekarang = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
  
  // 3. Angka Acak Dinamis (Nonce)
  const angkaAcak = Math.floor(Math.random() * 1000000000);

  // 4. Mengembalikan Respons dengan Struktur JSON Standar
  return res.status(200).json({
    "status": false,
    "reason": "Invalid Key Connection"
  });
}
