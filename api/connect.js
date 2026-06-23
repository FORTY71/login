module.exports = (req, res) => {
    // 1. Meniru Header Server Asli (Sangat Penting untuk Bypass)
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Server', 'cloudflare');
    res.setHeader('X-Turbo-Charged-By', 'LiteSpeed');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Connection', 'close');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // 2. Data VIP 2099 milik Pradaxca
    const responseData = {
        "status": true,
        "data": {
            "real": "pradaxca-2c213b26-fbec-3f9b-99b2-22fe9117b75a-Vm8Lk7Uj2JmsjCPVPVjrLa7zgfx3uz9E",
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
            "expired_date": "2099-06-29 04:22:23",
            "EXP": "2099-06-29 04:22:23",
            "ts": "2026-06-23 12:31:22",
            "exdate": "2099-06-29 04:22:23",
            "device": "100",
            "rng": 1782151112,
            "realdata": "9+oM2gO0QLqDzaSOsBDiA4NTafcZALnZV9XBoWeAs68="
        }
    };

    // 3. Render ke JSON Mentah
    const jsonMurni = JSON.stringify(responseData);

    // Kunci ukuran byte agar sesuai dengan pembacaan HTTP Client di aplikasi
    res.setHeader('Content-Length', Buffer.byteLength(jsonMurni));

    // Selalu paksa status 200 OK
    return res.status(200).send(jsonMurni);
};
