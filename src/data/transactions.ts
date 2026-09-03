export type TransactionStatus =
  | 'Berhasil'
  | 'Ditinjau'
  | 'Gagal'

export type TransactionType =
  | 'Transfer Masuk'
  | 'Transfer Keluar'
  | 'Pembayaran'
  | 'Top Up'

export interface Transaction {
  id: string
  customerId: string
  namaNasabah: string
  noRekening: string
  tanggal: string
  waktu: string
  jenis: TransactionType
  keterangan: string
  jumlah: number
  tipe: 'masuk' | 'keluar'
  status: TransactionStatus
  channel: string
  referensi: string
}

export const transactions: Transaction[] = [
  {
    id: 'TRX-001',
    customerId: 'CST-001',
    namaNasabah: 'Andi Pratama',
    noRekening: '1234567890',
    tanggal: '31 Agustus 2026',
    waktu: '08:21',
    jenis: 'Transfer Masuk',
    keterangan: 'Transfer dari Budi Santoso',
    jumlah: 2500000,
    tipe: 'masuk',
    status: 'Berhasil',
    channel: 'Mobile Banking',
    referensi: 'REF-20260831-001',
  },
  {
    id: 'TRX-002',
    customerId: 'CST-002',
    namaNasabah: 'Siti Rahmawati',
    noRekening: '2345678901',
    tanggal: '31 Agustus 2026',
    waktu: '08:15',
    jenis: 'Transfer Keluar',
    keterangan: 'Transfer antar bank',
    jumlah: 24000000,
    tipe: 'keluar',
    status: 'Ditinjau',
    channel: 'Internet Banking',
    referensi: 'REF-20260831-002',
  },
  {
    id: 'TRX-003',
    customerId: 'CST-003',
    namaNasabah: 'Budi Santoso',
    noRekening: '3456789012',
    tanggal: '30 Agustus 2026',
    waktu: '17:42',
    jenis: 'Transfer Masuk',
    keterangan: 'Transfer perusahaan',
    jumlah: 10000000,
    tipe: 'masuk',
    status: 'Berhasil',
    channel: 'Teller',
    referensi: 'REF-20260830-003',
  },
  {
    id: 'TRX-004',
    customerId: 'CST-004',
    namaNasabah: 'Rizky Maulana',
    noRekening: '4567890123',
    tanggal: '30 Agustus 2026',
    waktu: '15:18',
    jenis: 'Transfer Keluar',
    keterangan: 'Transfer antar rekening',
    jumlah: 7250000,
    tipe: 'keluar',
    status: 'Gagal',
    channel: 'Mobile Banking',
    referensi: 'REF-20260830-004',
  },
  {
    id: 'TRX-005',
    customerId: 'CST-005',
    namaNasabah: 'Nadia Putri',
    noRekening: '5678901234',
    tanggal: '30 Agustus 2026',
    waktu: '11:33',
    jenis: 'Top Up',
    keterangan: 'Top up dompet digital',
    jumlah: 1500000,
    tipe: 'keluar',
    status: 'Berhasil',
    channel: 'Mobile Banking',
    referensi: 'REF-20260830-005',
  },
  {
    id: 'TRX-006',
    customerId: 'CST-006',
    namaNasabah: 'Dimas Saputra',
    noRekening: '6789012345',
    tanggal: '29 Agustus 2026',
    waktu: '14:08',
    jenis: 'Pembayaran',
    keterangan: 'Pembayaran tagihan listrik',
    jumlah: 850000,
    tipe: 'keluar',
    status: 'Berhasil',
    channel: 'ATM',
    referensi: 'REF-20260829-006',
  },
]