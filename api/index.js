module.exports = (req, res) => {
    // 1. Set Header Bypass Terkuat (Meniru Server PHP Apache Kosongan)
    res.setHeader('Content-Type', 'application/json; charset=UTF-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Connection', 'close');

    // Jika aplikasi melakukan tes koneksi awal lewat method OPTIONS
    if (req.method === 'OPTIONS') {
        res.setHeader('Content-Length', '0');
        return res.status(200).end();
    }

    // 2. Kunci Tanggal Permanen ke 2099 (Menghindari bug timezone internal aplikasi)
    const expiredDate = "2099-06-29 04:22:23";
    const tsDate = "2026-06-23 12:31:22"; // Kita sesuaikan dengan timestamp di screenshot kamu

    // 3. Format Data Inti (Menggunakan key pradaxca & data yang terbukti sukses sebelumnya)
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
        "ts": tsDate,
        "exdate": expiredDate,
        "device": "100",
        "rng": 1782151112,
        "realdata": "9+oM2gO0QLqDzaSOsBDiA4NTafcZALnZV9XBoWeAs68="
    };

    // Struktur gabungan agar fleksibel dibaca oleh parser aplikasi model apapun
    const responseData = {
        "status": true,
        "data": coreData,
        ...coreData
    };

    // 4. Ubah ke JSON rapat (Minified) tanpa spasi se-byte pun
    const jsonMurni = JSON.stringify(responseData);

    // Kunci Content-Length agar pembacaan Stream HTTP di Android tidak menggantung
    res.setHeader('Content-Length', Buffer.byteLength(jsonMurni));

    // 5. SELALU KIRIM RESPON 200 OK BERISI DATA SUKSES (Tidak ada celah error)
    return res.status(200).send(jsonMurni);
};
