const crypto = require('crypto');

module.exports = (req, res) => {
    // 1. Set Header Persis seperti Server PHP Apache/Nginx
    res.setHeader('Content-Type', 'application/json; charset=UTF-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    
    // Matikan chunked encoding bawaan Vercel yang sering bikin aplikasi C++/Java bingung
    res.setHeader('Connection', 'close'); 

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // 2. Setup Waktu WIB & Expired 2099
    const waktuSekarang = new Date();
    // Menyesuaikan ke timezone Asia/Jakarta (WIB) manual agar sama seperti PHP date()
    const wib = new Date(waktuSekarang.getTime() + (7 * 60 * 60 * 1000)); 
    const formatTanggalPHP = wib.toISOString().replace('T', ' ').substring(0, 19);
    
    const expiredDate = "2099-12-31 23:59:59";

    // 3. Generate Token & Data (Fallback Kebal Error)
    let randomUUID = "2c213b26-fbec-3f9b-99b2-22fe9117b75a";
    let randomRng = Math.floor(Math.random() * (2000000000 - 1000000000) + 1000000000);
    let customToken = "8f3a8c41e9a0941483f5e7f15b6f19e2";
    let realDataEncoded = "9+oM2gO0QLqDzaSOsBDiA4NTafcZALnZV9XBoWeAs68=";

    try {
        const rawTokenString = "pradaxca_auth_" + waktuSekarang.getTime() + Math.random();
        customToken = crypto.createHash('md5').update(rawTokenString).digest('hex');

        const payloadKita = JSON.stringify({ owner: "pradaxca_system", status: "VIP_LIFETIME" });
        realDataEncoded = Buffer.from(payloadKita).toString('base64');
        randomUUID = crypto.randomUUID ? crypto.randomUUID() : '2c213b26-fbec-3f9b-99b2-22fe9117b75a';
    } catch (e) {
        // Tetap aman menggunakan fallback jika ada crash internal
    }

    // 4. Struktur Data Inti (Gabungan format ROOT + OBJECT)
    const coreData = {
        "real": `pradaxca-${randomUUID}-Vm8Lk7Uj2JmsjCPVPVjrLa7zgfx3uz9E`,
        "token": customToken,
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
        "ts": formatTanggalPHP,
        "exdate": expiredDate,
        "device": "100",
        "rng": randomRng,
        "realdata": realDataEncoded
    };

    const responseData = {
        "status": true,
        "data": coreData,
        ...coreData // Menyuntikkan langsung ke root level seperti json_encode PHP murni
    };

    // 5. CRITICAL: Injector Android membenci spasi rapi (pretty-print) bawaan Node.js.
    // Kita paksa konversi ke String Minified (Rapat/Tanpa Spasi) persis hasil fungsi json_encode() PHP.
    const jsonMurniAlaPHP = JSON.stringify(responseData);

    // Kirim Content-Length pasti agar aplikasi tahu data tidak korup/terpotong
    res.setHeader('Content-Length', Buffer.byteLength(jsonMurniAlaPHP));

    // Kirim respons sukses status 200
    return res.status(200).send(jsonMurniAlaPHP);
};
