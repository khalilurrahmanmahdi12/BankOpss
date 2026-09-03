export type ApprovalStatus =
  | 'Menunggu'
  | 'Disetujui'
  | 'Ditolak'

export interface Approval {
  id: string
  transactionId: string
  customerId: string
  namaNasabah: string
  noRekening: string
  jenisTransaksi: string
  jumlah: number
  tanggal: string
  waktu: string
  status: ApprovalStatus
  alasanKeputusan?: string
  diputuskanOleh?: string
}

export const approvals: Approval[] = [
  {
    id: 'APR-001',
    transactionId: 'TRX-002',
    customerId: 'CST-002',
    namaNasabah: 'Siti Rahmawati',
    noRekening: '2345678901',
    jenisTransaksi: 'Transfer Antar Bank',
    jumlah: 24000000,
    tanggal: '31 Agustus 2026',
    waktu: '08:15',
    status: 'Menunggu',
  },
  {
    id: 'APR-002',
    transactionId: 'TRX-007',
    customerId: 'CST-001',
    namaNasabah: 'Andi Pratama',
    noRekening: '1234567890',
    jenisTransaksi: 'Transfer Antar Bank',
    jumlah: 45000000,
    tanggal: '31 Agustus 2026',
    waktu: '09:15',
    status: 'Menunggu',
  },
  {
    id: 'APR-003',
    transactionId: 'TRX-008',
    customerId: 'CST-005',
    namaNasabah: 'Nadia Putri',
    noRekening: '5678901234',
    jenisTransaksi: 'Perubahan Limit',
    jumlah: 25000000,
    tanggal: '31 Agustus 2026',
    waktu: '09:48',
    status: 'Menunggu',
  },
  {
    id: 'APR-004',
    transactionId: 'TRX-009',
    customerId: 'CST-003',
    namaNasabah: 'Budi Santoso',
    noRekening: '3456789012',
    jenisTransaksi: 'Transfer Bisnis',
    jumlah: 78000000,
    tanggal: '30 Agustus 2026',
    waktu: '16:22',
    status: 'Disetujui',
    alasanKeputusan: 'Dokumen dan sumber dana telah diverifikasi.',
    diputuskanOleh: 'Supervisor Operasional',
  },
]