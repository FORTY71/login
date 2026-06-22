export default function handler(req, res) {
  // Mengatur header respons
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store, max-age=0, no-cache');

  // 1. Ambil data yang dikirim oleh aplikasi target
  // Misalnya aplikasi mengirimkan parameter 'key' atau 'username'
  const { username, token, hwid } = req.body;

  // 2. Buat logika penanganan waktu (Timestamp Dinamis)
  // Ini berguna jika aplikasi mengecek apakah waktu server sinkron dengan HP
  const formatWaktu = () => {
    const date = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    
    const yyyy = date.getFullYear();
    const mm = pad(date.getMonth() + 1);
    const dd = pad(date.getDate());
    const hh = pad(date.getHours());
    const min = pad(date.getMinutes());
    const ss = pad(date.getSeconds());
    
    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
  };

  const waktuSekarang = formatWaktu();

  // 3. Buat angka acak dinamis (RNG) jika aplikasi membutuhkannya
  const angkaAcak = Math.floor(Math-random() * 1000000000);

  // 4. Kirim respons balik ke aplikasi
  res.status(200).json({
    "status": true,
    "data": {
      "real": `PUBG-Teamxcracking606-${hwid || 'default-hwid'}`,
      "token": token || "8f3a8c41e9a0941483f5e7f15b6f19e2",
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
      "expired_date": "2026-12-31 23:59:59", // Mengatur masa aktif ke masa depan
      "EXP": "2026-12-31 23:59:59",
      "ts": waktuSekarang, // Mengikuti waktu saat request dibuat
      "exdate": "2026-12-31 23:59:59",
      "device": "100",
      "rng": angkaAcak, // Angka acak baru setiap kali diklik
      "realdata": "9+oM2gO0QLqDzaSOsBDiA4NTafcZALnZV9XBoWeAs68=" 
    }
  });
}
