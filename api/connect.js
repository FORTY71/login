module.exports = (req, res) => {
    // 1. Header Bypass Tingkat Tinggi
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Server', 'cloudflare');
    res.setHeader('X-Turbo-Charged-By', 'LiteSpeed');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // 2. MENGAMBIL DATA POST (Lebih Aman dan Tangguh)
    let game = "PUBG";
    let user_key = "Teamxcracking606";
    let serial = "2c213b26-fbec-3f9b-99b2-22fe9117b75a";

    if (req.body) {
        // Handle Form URL-Encoded string di Vercel
        if (typeof req.body === 'string') {
            const parsedParams = new URLSearchParams(req.body);
            game = parsedParams.get('game') || game;
            user_key = parsedParams.get('user_key') || user_key;
            serial = parsedParams.get('serial') || serial;
        } else {
            // Handle JSON object
            game = req.body.game || game;
            user_key = req.body.user_key || user_key;
            serial = req.body.serial || serial;
        }
    }

    // 3. Merakit ulang kecocokan `real` sesuai dengan HP/Login kamu
    const realValue = `${game}-${user_key}-${serial}-Vm8Lk7Uj2JmsjCPVPVjrLa7zgfx3uz9E`;

    // 4. Struktur Data Inti (TIDAK BOLEH MENGUBAH TANGGAL & REALDATA DI SINI)
    const responseData = {
        "status": true,
        "data": {
            "real": realValue,
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
            "rng": 1782190046, // Sesuai dengan Proxyman
            "realdata": "MIX/uyk/rttB9AfplsavcojT49+YO5G2WHdg008aASE=" // Kunci dekripsi rahasia
        }
    };

    const jsonMurni = JSON.stringify(responseData);
    res.setHeader('Content-Length', Buffer.byteLength(jsonMurni));

    return res.status(200).send(jsonMurni);
};
