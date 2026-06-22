export default function handler(req, res) {
  // 1. Atur Header seketat mungkin agar mirip server backend asli
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Connection', 'keep-alive');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // 2. Buat tanggal dinamis (menghindari error expired/waktu tidak cocok)
  const sekarang = new Date();
  // Menambah 7 hari ke depan untuk tanggal expired agar selalu aktif
  const expired = new Date(sekarang.getTime() + (7 * 24 * 60 * 60 * 1000)); 
  
  const formatWaktu = (date) => {
    return date.toISOString().replace('T', ' ').substring(0, 19);
  };

  const waktuSekarang = formatWaktu(sekarang);
  const waktuExpired = formatWaktu(expired);

  // 3. Susun data dengan waktu dinamis
  const responseData = {
    "status": true,
    "data": {
      "real": "PUBG-Teamxcracking606-2c213b26-fbec-3f9b-99b2-22fe9117b75a-Vm8Lk7Uj2JmsjCPVPVjrLa7zgfx3uz9E",
      "token": "8f3a8c41e9a0941483f5e7f15b6f19e2",
      "modname": "Auto Draw V11 Pro VIP",
      "mod_status": "Safe",
      "credit": "Safe",
      "ESP": "off",
      "Item": "off",
      "AIM": "off",
      "SilentAim": "off",
      "BulletTrack": "off",
      "Floating": "on",
      "Memory": "off",
      "Setting": "on",
      "expired_date": waktuExpired,
      "EXP": waktuExpired,
      "ts": waktuSekarang,
      "exdate": waktuExpired,
      "device": "100",
      "rng": Math.floor(Math.random() * 2000000000), // Angka acak dinamis
      "realdata": "9+oM2gO0QLqDzaSOsBDiA4NTafcZALnZV9XBoWeAs68="
    }
  };

  // 4. Kirim sebagai string rapat (Minified) tanpa spasi/formatting
  return res.status(200).send(JSON.stringify(responseData));
}
