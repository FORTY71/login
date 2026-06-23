const crypto = require('crypto');

module.exports = async (req, res) => {
    // 1. Mengaktifkan CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        // 2. Mengatur Timestamp (Waktu saat API dipanggil)
        const waktuSekarang = new Date();
        const aturFormatTanggal = (date) => {
            return date.toISOString().replace('T', ' ').substring(0, 19);
        };

        // 3. Set Expired Date Permanen ke Tahun 2099
        const expiredDate = "2099-12-31 23:59:59";

        // 4. Generate Token Unik Milik Sendiri (MD5)
        // Token ini akan selalu baru tiap kali endpoint dipanggil untuk menghindari deteksi
        const rawTokenString = "pradaxca_auth_" + waktuSekarang.getTime() + Math.random();
        const customToken = crypto.createHash('md5').update(rawTokenString).digest('hex');

        // 5. Generate Real Data Milik Kita Sendiri (Base64)
        // Ini menggantikan "9+oM2..." dengan data terenkripsi milik sistem Anda
        const payloadDataKita = JSON.stringify({
            owner: "pradaxca_system",
            status: "VIP_LIFETIME",
            auth_validation: "success"
        });
        const realDataEncoded = Buffer.from(payloadDataKita).toString('base64');

        // 6. Generate UUID dan RNG Acak untuk 'real'
        const randomUUID = crypto.randomUUID ? crypto.randomUUID() : '2c213b26-fbec-3f9b-99b2-22fe9117b75a';
        const randomRng = Math.floor(Math.random() * 2000000000);

        // 7. Struktur JSON Utama
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

        // 8. Kirim Response ke Client
        return res.status(200).json(responseData);

    } catch (error) {
        return res.status(500).json({ 
            status: false, 
            message: "Internal Server Error"
        });
    }
};
