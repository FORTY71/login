export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Mengembalikan data sukses pesananmu
  return res.status(200).json({
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
      "expired_date": "2026-06-29 04:22:23",
      "EXP": "2026-06-29 04:22:23",
      "ts": "2026-06-29 04:22:23",
      "exdate": "2026-06-29 04:22:23",
      "device": "100",
      "rng": 1782151112,
      "realdata": "9+oM2gO0QLqDzaSOsBDiA4NTafcZALnZV9XBoWeAs68="
    }
  });
}
