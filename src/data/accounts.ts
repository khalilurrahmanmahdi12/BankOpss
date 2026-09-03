export type AccountStatus = 'Aktif' | 'Diblokir' | 'Ditangguhkan'
export type AccountType = 'Tabungan' | 'Giro' | 'Deposito'

export interface Account {
  id: string
  customerId: string
  namaNasabah: string
  noRekening: string
  jenisRekening: AccountType
  saldo: number
  status: AccountStatus
  tanggalDibuka: string
}

export const accounts: Account[] = [
  {
    id: 'ACC-001',
    customerId: 'CST-001',
    namaNasabah: 'Andi Pratama',
    noRekening: '1234567890',
    jenisRekening: 'Tabungan',
    saldo: 12500000,
    status: 'Aktif',
    tanggalDibuka: '12 Januari 2024',
  },
  {
    id: 'ACC-002',
    customerId: 'CST-002',
    namaNasabah: 'Siti Rahmawati',
    noRekening: '2345678901',
    jenisRekening: 'Tabungan',
    saldo: 28750000,
    status: 'Aktif',
    tanggalDibuka: '03 Maret 2024',
  },
  {
    id: 'ACC-003',
    customerId: 'CST-003',
    namaNasabah: 'Budi Santoso',
    noRekening: '3456789012',
    jenisRekening: 'Giro',
    saldo: 45000000,
    status: 'Aktif',
    tanggalDibuka: '18 Mei 2024',
  },
  {
    id: 'ACC-004',
    customerId: 'CST-004',
    namaNasabah: 'Rizky Maulana',
    noRekening: '4567890123',
    jenisRekening: 'Tabungan',
    saldo: 7200000,
    status: 'Diblokir',
    tanggalDibuka: '09 Juli 2024',
  },
  {
    id: 'ACC-005',
    customerId: 'CST-005',
    namaNasabah: 'Nadia Putri',
    noRekening: '5678901234',
    jenisRekening: 'Deposito',
    saldo: 65000000,
    status: 'Aktif',
    tanggalDibuka: '22 September 2024',
  },
  {
    id: 'ACC-006',
    customerId: 'CST-006',
    namaNasabah: 'Dimas Saputra',
    noRekening: '6789012345',
    jenisRekening: 'Giro',
    saldo: 18300000,
    status: 'Ditangguhkan',
    tanggalDibuka: '14 November 2024',
  },
]