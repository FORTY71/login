export default function handler(req, res) {
  // Mengatur agar header mengembalikan format JSON
  res.setHeader('Content-Type', 'application/json');
  
  // Set tanggal expired otomatis selalu +7 hari dari sekarang agar tidak repot ganti manual
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + 7);
  const formattedDate = futureDate.toISOString().replace('T', ' ').substring(0, 19);

  // Payload JSON yang selalu sukses/aktif
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

  // Kirim response status 200 OK
  return res.status(200).json(successResponse);
}
