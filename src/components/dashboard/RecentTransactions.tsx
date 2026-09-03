import { ArrowUpRight } from 'lucide-react'

const transaksiTerbaru = [
  {
    id: 'TRX-20260831-001',
    nasabah: 'Andi Pratama',
    jenis: 'Transfer',
    jumlah: 'Rp 2.500.000',
    waktu: '08:21',
    status: 'Berhasil',
  },
  {
    id: 'TRX-20260831-002',
    nasabah: 'Siti Rahmawati',
    jenis: 'Transfer',
    jumlah: 'Rp 24.000.000',
    waktu: '08:15',
    status: 'Ditinjau',
  },
  {
    id: 'TRX-20260831-003',
    nasabah: 'Budi Santoso',
    jenis: 'Pembayaran',
    jumlah: 'Rp 850.000',
    waktu: '08:02',
    status: 'Berhasil',
  },
  {
    id: 'TRX-20260831-004',
    nasabah: 'Rizky Maulana',
    jenis: 'Transfer',
    jumlah: 'Rp 7.250.000',
    waktu: '07:48',
    status: 'Gagal',
  },
  {
    id: 'TRX-20260831-005',
    nasabah: 'Nadia Putri',
    jenis: 'Top Up',
    jumlah: 'Rp 1.500.000',
    waktu: '07:31',
    status: 'Berhasil',
  },
]

function getStatusStyle(status: string) {
  switch (status) {
    case 'Berhasil':
      return 'bg-emerald-50 text-emerald-700 ring-emerald-600/20'

    case 'Ditinjau':
      return 'bg-amber-50 text-amber-700 ring-amber-600/20'

    case 'Gagal':
      return 'bg-red-50 text-red-700 ring-red-600/20'

    default:
      return 'bg-slate-50 text-slate-700 ring-slate-600/20'
  }
}

function RecentTransactions() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Transaksi Terbaru
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Aktivitas transaksi terbaru pada sistem.
          </p>
        </div>

        <button
          type="button"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
        >
          Lihat Semua
          <ArrowUpRight size={16} />
        </button>
      </div>

      {/* Tabel */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px]">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/70">
              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                ID Transaksi
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Nasabah
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Jenis
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Jumlah
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Waktu
              </th>

              <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {transaksiTerbaru.map((transaksi) => (
              <tr
                key={transaksi.id}
                className="transition hover:bg-slate-50"
              >
                <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-slate-700">
                  {transaksi.id}
                </td>

                <td className="whitespace-nowrap px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-700">
                      {transaksi.nasabah
                        .split(' ')
                        .map((nama) => nama[0])
                        .slice(0, 2)
                        .join('')}
                    </div>

                    <span className="text-sm font-medium text-slate-900">
                      {transaksi.nasabah}
                    </span>
                  </div>
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-600">
                  {transaksi.jenis}
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-sm font-semibold text-slate-900">
                  {transaksi.jumlah}
                </td>

                <td className="whitespace-nowrap px-5 py-4 text-sm text-slate-500">
                  {transaksi.waktu}
                </td>

                <td className="whitespace-nowrap px-5 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${getStatusStyle(
                      transaksi.status,
                    )}`}
                  >
                    {transaksi.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default RecentTransactions