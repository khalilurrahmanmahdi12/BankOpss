import {
  ArrowUpRight,
  ShieldAlert,
} from 'lucide-react'

const fraudAlerts = [
  {
    id: 'FRAUD-001',
    nasabah: 'Siti Rahmawati',
    transaksi: 'Rp 24.000.000',
    alasan: 'Nominal transaksi tidak biasa',
    risiko: 'Tinggi',
    waktu: '8 menit lalu',
  },
  {
    id: 'FRAUD-002',
    nasabah: 'Dimas Saputra',
    transaksi: 'Rp 18.750.000',
    alasan: 'Login dari perangkat baru',
    risiko: 'Sedang',
    waktu: '24 menit lalu',
  },
  {
    id: 'FRAUD-003',
    nasabah: 'Rina Lestari',
    transaksi: 'Rp 32.500.000',
    alasan: 'Lokasi transaksi tidak biasa',
    risiko: 'Tinggi',
    waktu: '41 menit lalu',
  },
]

function getRiskStyle(risiko: string) {
  switch (risiko) {
    case 'Tinggi':
      return 'bg-red-50 text-red-700 ring-red-600/20'

    case 'Sedang':
      return 'bg-amber-50 text-amber-700 ring-amber-600/20'

    default:
      return 'bg-slate-50 text-slate-700 ring-slate-600/20'
  }
}

function FraudAlertPanel() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert
              size={18}
              className="text-red-600"
            />

            <h2 className="text-base font-semibold text-slate-900">
              Peringatan Fraud
            </h2>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Transaksi yang membutuhkan pemeriksaan.
          </p>
        </div>

        <button
          type="button"
          className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
        >
          Lihat Semua
          <ArrowUpRight size={16} />
        </button>
      </div>

      {/* List */}
      <div className="divide-y divide-slate-100">
        {fraudAlerts.map((alert) => (
          <div
            key={alert.id}
            className="p-5 transition hover:bg-slate-50"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold text-slate-900">
                    {alert.nasabah}
                  </p>

                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${getRiskStyle(
                      alert.risiko,
                    )}`}
                  >
                    Risiko {alert.risiko}
                  </span>
                </div>

                <p className="mt-2 text-sm text-slate-600">
                  {alert.alasan}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                  <span>{alert.id}</span>
                  <span>{alert.waktu}</span>
                </div>
              </div>

              <p className="whitespace-nowrap text-sm font-semibold text-slate-900">
                {alert.transaksi}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FraudAlertPanel