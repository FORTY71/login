const querystring = require('querystring');

module.exports = (req, res) => {
    // 1. Header Bypass Tingkat Tinggi (Identik dengan Cloudflare/LiteSpeed Asli)
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Server', 'cloudflare');
    res.setHeader('X-Turbo-Charged-By', 'LiteSpeed');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Connection', 'close');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // 2. MENGAMBIL DATA POST DARI APLIKASI (KUNCI UTAMA)
    let body = req.body || {};

    // Vercel kadang membaca Form URL-Encoded sebagai string mentah, kita harus parse
    if (typeof req.body === 'string') {
        body = querystring.parse(req.body);
    }

    // Ambil variabel yang dikirim HP kamu (dengan fallback aman)
    const game = body.game || "PUBG";
    const user_key = body.user_key || "pradaxca"; 
    const serial = body.serial || "2c213b26-fbec-3f9b-99b2-22fe9117b75a";

    // 3. MERAKIT STRING VALIDASI 'real' SECARA DINAMIS
    // Ini yang akan membodohi sistem keamanan APK agar merespons sukses!
    const realValue = `${game}-${user_key}-${serial}-Vm8Lk7Uj2JmsjCPVPVjrLa7zgfx3uz9E`;

    const expiredDate = "2099-12-31 23:59:59";
    const tsDate = new Date().toISOString().replace('T', ' ').substring(0, 19);

    // 4. Struktur Data Inti
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
            "expired_date": expiredDate,
            "EXP": expiredDate,
            "ts": tsDate,
            "exdate": expiredDate,
            "device": "100",
            "rng": 1782190046, // Diambil dari screenshot terbaru
            "realdata": "MIX/uyk/rttB9AfplsavcojT49+YO5G2WHdg008aASE=" // Data terbaru
        }
    };

    // 5. Cetak ke JSON Minified dan Kirim Length yang Pas
    const jsonMurni = JSON.stringify(responseData);
    res.setHeader('Content-Length', Buffer.byteLength(jsonMurni));

    return res.status(200).send(jsonMurni);
};
