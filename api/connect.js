export default function handler(req, res) {
  // Mengatur response header berupa JSON dan CORS origin agar bisa diakses mod/aplikasi
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Menangani preflight request dari aplikasi jika ada
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Membuat tanggal dinamis otomatis agar selalu sukses dan anti-expired
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 30); // Otomatis aktif sampai 30 hari ke depan
  const formattedDate = targetDate.toISOString().replace('T', ' ').substring(0, 19);

  // Payload data response sesuai dengan struktur awal yang kamu minta
  const successResponse = {
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
      "expired_date": formattedDate,
      "EXP": formattedDate,
      "ts": formattedDate,
      "exdate": formattedDate,
      "device": "100",
      "rng": 1782151112,
      "realdata": "9+oM2gO0QLqDzaSOsBDiA4NTafcZALnZV9XBoWeAs68="
    }
  };

  return res.status(200).json(successResponse);
}
