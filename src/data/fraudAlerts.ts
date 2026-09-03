export type FraudRisk = 'Rendah' | 'Sedang' | 'Tinggi'
export type FraudStatus =
  | 'Baru'
  | 'Ditinjau'
  | 'Aman'
  | 'Fraud'

export interface FraudAlert {
  id: string
  transactionId: string
  customerId: string
  namaNasabah: string
  noRekening: string
  jumlah: number
  riskScore: number
  riskLevel: FraudRisk
  alasan: string[]
  status: FraudStatus
  waktu: string
}

export const fraudAlerts: FraudAlert[] = [
  {
    id: 'FRD-001',
    transactionId: 'TRX-002',
    customerId: 'CST-002',
    namaNasabah: 'Siti Rahmawati',
    noRekening: '2345678901',
    jumlah: 24000000,
    riskScore: 92,
    riskLevel: 'Tinggi',
    alasan: [
      'Nominal transaksi tidak biasa',
      'Login dari perangkat baru',
      'Lokasi transaksi berbeda',
    ],
    status: 'Baru',
    waktu: '8 menit lalu',
  },
  {
    id: 'FRD-002',
    transactionId: 'TRX-004',
    customerId: 'CST-004',
    namaNasabah: 'Rizky Maulana',
    noRekening: '4567890123',
    jumlah: 7250000,
    riskScore: 76,
    riskLevel: 'Tinggi',
    alasan: [
      'Percobaan transaksi berulang',
      'Rekening sedang diblokir',
    ],
    status: 'Ditinjau',
    waktu: '21 menit lalu',
  },
  {
    id: 'FRD-003',
    transactionId: 'TRX-005',
    customerId: 'CST-005',
    namaNasabah: 'Nadia Putri',
    noRekening: '5678901234',
    jumlah: 1500000,
    riskScore: 58,
    riskLevel: 'Sedang',
    alasan: [
      'Perangkat baru terdeteksi',
    ],
    status: 'Baru',
    waktu: '43 menit lalu',
  },
]