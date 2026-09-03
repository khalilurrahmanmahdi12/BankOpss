export type NotificationType =
  | 'Fraud'
  | 'Transaksi'
  | 'Persetujuan'
  | 'Sistem'

export interface Notification {
  id: string
  title: string
  message: string
  time: string
  type: NotificationType
  read: boolean
  path?: string
}

export const notifications: Notification[] = [
  {
    id: 'NTF-001',
    title: 'Peringatan Fraud Baru',
    message:
      'Transaksi TRX-002 memiliki skor risiko tinggi sebesar 92.',
    time: '5 menit lalu',
    type: 'Fraud',
    read: false,
    path: '/fraud-alerts',
  },
  {
    id: 'NTF-002',
    title: 'Transaksi Perlu Ditinjau',
    message:
      'Transaksi milik Siti Rahmawati senilai Rp24.000.000 membutuhkan pemeriksaan.',
    time: '12 menit lalu',
    type: 'Transaksi',
    read: false,
    path: '/transactions/TRX-002',
  },
  {
    id: 'NTF-003',
    title: 'Persetujuan Tertunda',
    message:
      'Transfer senilai Rp45.000.000 menunggu persetujuan supervisor.',
    time: '24 menit lalu',
    type: 'Persetujuan',
    read: false,
    path: '/approvals',
  },
  {
    id: 'NTF-004',
    title: 'Rekening Diblokir',
    message:
      'Rekening 4567890123 berhasil diblokir oleh Administrator.',
    time: '1 jam lalu',
    type: 'Sistem',
    read: true,
    path: '/accounts',
  },
]