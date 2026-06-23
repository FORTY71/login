const crypto = require('crypto');

module.exports = async (req, res) => {
    // 1. Mengaktifkan CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // 2. Setup Waktu dan Tanggal (ts hari ini, exp 2099)
    const waktuSekarang = new Date();
    const aturFormatTanggal = (date) => {
        return date.toISOString().replace('T', ' ').substring(0, 19);
    };
    const expiredDate = "2099-12-31 23:59:59";

    // 3. Deklarasi Variabel Dinamis
    let customToken = "";
    let realDataEncoded = "";
    let randomUUID = "";
    let randomRng = 0;

    try {
        // Coba generate token dan enkripsi secara dinamis
        const rawTokenString = "pradaxca_auth_" + waktuSekarang.getTime() + Math.random();
        customToken = crypto.createHash('md5').update(rawTokenString).digest('hex');

        const payloadDataKita = JSON.stringify({
            owner: "pradaxca_system",
            status: "VIP_LIFETIME",
            auth_validation: "success"
        });
        realDataEncoded = Buffer.from(payloadDataKita).toString('base64');

        randomUUID = crypto.randomUUID ? crypto.randomUUID() : '2c213b26-fbec-3f9b-99b2-22fe9117b75a';
        randomRng = Math.floor(Math.random() * 2000000000);
    } catch (e) {
        // JIKA SERVER ERROR, TETAP PAKSA NILAI MENJADI SUKSES (Fallback)
        // Klien tidak akan pernah menerima status: false
        customToken = "8f3a8c41e9a0941483f5e7f15b6f19e2"; 
        realDataEncoded = "9+oM2gO0QLqDzaSOsBDiA4NTafcZALnZV9XBoWeAs68=";
        randomUUID = "2c213b26-fbec-3f9b-99b2-22fe9117b75a";
        randomRng = 1782151112;
    }

    // 4. Struktur Output JSON yang SELALU SUKSES
    const responseData = {
        "status": true,
        "data": {
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
            "ts": aturFormatTanggal(waktuSekarang),
            "exdate": expiredDate,
            "device": "100",
            "rng": randomRng,
            "realdata": realDataEncoded
        }
    };

    // 5. Kirim HTTP Status 200 (OK) dan Data JSON
    return res.status(200).json(responseData);
};
