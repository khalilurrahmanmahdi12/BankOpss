export type AuditLevel =
  | 'Informasi'
  | 'Peringatan'
  | 'Kritis'

export type AuditStatus =
  | 'Berhasil'
  | 'Ditolak'
  | 'Ditinjau'

export interface AuditLog {
  id: string
  user: string
  role: string
  aktivitas: string
  modul: string
  detail: string
  tanggal: string
  waktu: string
  ipAddress: string
  level: AuditLevel
  status: AuditStatus
}

export const auditLogs: AuditLog[] = [
  {
    id: 'AUD-001',
    user: 'Khalil',
    role: 'Administrator',
    aktivitas: 'Login ke sistem',
    modul: 'Autentikasi',
    detail: 'Login berhasil melalui halaman administrator.',
    tanggal: '01 September 2026',
    waktu: '08:02',
    ipAddress: '192.168.1.10',
    level: 'Informasi',
    status: 'Berhasil',
  },
  {
    id: 'AUD-002',
    user: 'Khalil',
    role: 'Administrator',
    aktivitas: 'Melihat detail nasabah',
    modul: 'Nasabah',
    detail: 'Membuka profil nasabah CST-002 - Siti Rahmawati.',
    tanggal: '01 September 2026',
    waktu: '08:16',
    ipAddress: '192.168.1.10',
    level: 'Informasi',
    status: 'Berhasil',
  },
  {
    id: 'AUD-003',
    user: 'Khalil',
    role: 'Administrator',
    aktivitas: 'Memblokir rekening',
    modul: 'Rekening',
    detail: 'Rekening 4567890123 milik Rizky Maulana diblokir.',
    tanggal: '01 September 2026',
    waktu: '08:28',
    ipAddress: '192.168.1.10',
    level: 'Peringatan',
    status: 'Berhasil',
  },
  {
    id: 'AUD-004',
    user: 'Supervisor Operasional',
    role: 'Supervisor',
    aktivitas: 'Menyetujui transaksi',
    modul: 'Persetujuan',
    detail: 'Transaksi TRX-007 senilai Rp45.000.000 disetujui.',
    tanggal: '01 September 2026',
    waktu: '08:44',
    ipAddress: '192.168.1.15',
    level: 'Informasi',
    status: 'Berhasil',
  },
  {
    id: 'AUD-005',
    user: 'Fraud Analyst',
    role: 'Fraud Analyst',
    aktivitas: 'Meninjau peringatan fraud',
    modul: 'Fraud',
    detail: 'Peringatan FRD-001 dengan skor risiko 92 sedang ditinjau.',
    tanggal: '01 September 2026',
    waktu: '08:51',
    ipAddress: '192.168.1.20',
    level: 'Peringatan',
    status: 'Ditinjau',
  },
  {
    id: 'AUD-006',
    user: 'Fraud Analyst',
    role: 'Fraud Analyst',
    aktivitas: 'Konfirmasi fraud',
    modul: 'Fraud',
    detail: 'Transaksi mencurigakan dikonfirmasi sebagai fraud.',
    tanggal: '01 September 2026',
    waktu: '09:03',
    ipAddress: '192.168.1.20',
    level: 'Kritis',
    status: 'Berhasil',
  },
  {
    id: 'AUD-007',
    user: 'Khalil',
    role: 'Administrator',
    aktivitas: 'Percobaan akses',
    modul: 'Keamanan',
    detail: 'Percobaan membuka modul dengan hak akses terbatas.',
    tanggal: '01 September 2026',
    waktu: '09:11',
    ipAddress: '192.168.1.10',
    level: 'Kritis',
    status: 'Ditolak',
  },
]