module.exports = (req, res) => {
    // 1. Header Tiruan Server PHP Apache/Nginx (Sangat Ketat)
    res.setHeader('Content-Type', 'application/json; charset=UTF-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
    
    // Mematikan optimasi cloud/CDN yang sering memotong data injector
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Connection', 'close');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // 2. Setup Waktu (Gunakan format string statis/dinamis yang dijamin aman)
    const waktuSekarang = new Date();
    const wib = new Date(waktuSekarang.getTime() + (7 * 60 * 60 * 1000)); 
    const formatTanggalPHP = wib.toISOString().replace('T', ' ').substring(0, 19);
    
    const expiredDate = "2099-06-29 04:22:23";

    // 3. Struktur JSON Super Rapat (Kombinasi Root + Object Data)
    // Menggunakan key "pradaxca" dan UUID asli agar tidak ditolak oleh aplikasi
    const coreData = {
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
        "expired_date": expiredDate,
        "EXP": expiredDate,
        "ts": formatTanggalPHP,
        "exdate": expiredDate,
        "device": "100",
        "rng": 1782151112,
        "realdata": "9+oM2gO0QLqDzaSOsBDiA4NTafcZALnZV9XBoWeAs68="
    };

    const responseData = {
        "status": true,
        "data": coreData,
        ...coreData
    };

    // 4. Kirim sebagai text mentah tanpa spasi rapi bawaan Vercel (Format Minified PHP)
    const jsonMurniAlaPHP = JSON.stringify(responseData);

    // Paksa set ukuran byte agar stream data di Android tidak mengira timeout
    res.setHeader('Content-Length', Buffer.byteLength(jsonMurniAlaPHP));

    return res.status(200).send(jsonMurniAlaPHP);
};
