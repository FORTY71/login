export default function handler(req, res) {
  // 1. Atur Header CORS dan Tipe Konten agar diterima oleh semua klien Android
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store, max-age=0, no-cache');

  // Menangani preflight request dari klien jika ada
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // 2. Ambil parameter dengan fallback aman jika req.body kosong
  let dataRequest = {};
  if (req.body) {
    // Jika data berupa string (belum ter-parse), gunakan objek kosong sebagai fallback
    dataRequest = typeof req.body === 'string' ? {} : req.body;
  }

  const token = dataRequest.token || "8f3a8c41e9a0941483f5e7f15b6f19e2";
  const hwid = dataRequest.hwid || "2c213b26-fbec-3f9b-99b2-22fe9117b75a-Vm8Lk7Uj2JmsjCPVPVjrLa7zgfx3uz9E";

  // 3. Logika Pembuat Waktu Dinamis
  const date = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const waktuSekarang = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;

  // 4. Angka acak murni
  const angkaAcak = Math.floor(Math.random() * 1000000000);

  // 5. Kirim Respons HTTP 200 OK
  res.status(200).json({
    "status": true,
    "data": {
      "real": `PUBG-Teamxcracking606-${hwid}`,
      "token": token,
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
      "expired_date": "2026-12-31 23:59:59",
      "EXP": "2026-12-31 23:59:59",
      "ts": waktuSekarang,
      "exdate": "2026-12-31 23:59:59",
      "device": "100",
      "rng": angkaAcak,
      "realdata": "9+oM2gO0QLqDzaSOsBDiA4NTafcZALnZV9XBoWeAs68="
    }
  });
}
