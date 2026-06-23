import crypto from 'crypto';

export default function handler(req, res) {
  // Hanya menerima method POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { key } = req.body;

  // 1. Validasi Key (Contoh hardcode, nantinya cek ke Database/KV)
  if (key !== 'GHOST-VIP-KEY') {
    return res.status(401).json({ status: 'failed', message: 'Key tidak valid atau expired' });
  }

  // 2. Deteksi Nama Perangkat dari Header User-Agent
  // Ini menggantikan kebutuhan membaca info hardware langsung
  const userAgent = req.headers['user-agent'] || 'Unknown Device';
  let deviceName = 'Unknown Device';
  if (userAgent.includes('(') && userAgent.includes(')')) {
     // Mengambil string di dalam kurung pertama (biasanya info OS/Model HP)
     deviceName = userAgent.split('(')[1].split(')')[0]; 
  }

  // 3. Generate Session ID (Pengganti Device ID)
  const sessionId = crypto.randomUUID().split('-')[0]; // Ambil potongan pendek UUID agar mirip format aslimu

  // 4. Format Waktu Login (WIB)
  const now = new Date().toLocaleString("en-GB", { 
    timeZone: "Asia/Jakarta",
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  }).replace(',', '');

  // 5. Susun JSON Response sesuai formatmu
  const responseData = {
    access: "∞",
    credit: "30",
    device: sessionId, // Set device/session ID yang baru login
    devices: {
      [sessionId]: {
        last_login: now,
        name: deviceName,
        registered_at: now
      }
    },
    rgtime: "23-06-2026 13:49", // Data dummy, nanti ambil dari DB
    status: "active",
    username: "GHOST",
    validity: "24-06-2026 13:49" // Data dummy, nanti ambil dari DB
  };

  // Kirim Response
  return res.status(200).json(responseData);
}
