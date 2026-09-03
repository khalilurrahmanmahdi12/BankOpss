import {
  ArrowUpRight,
  CircleCheckBig,
  Clock3,
} from 'lucide-react'

const pendingApprovals = [
  {
    id: 'APR-001',
    nasabah: 'Andi Pratama',
    jenis: 'Transfer Antar Bank',
    jumlah: 'Rp 45.000.000',
    diajukan: '09:15',
  },
  {
    id: 'APR-002',
    nasabah: 'Nadia Putri',
    jenis: 'Perubahan Limit',
    jumlah: 'Rp 25.000.000',
    diajukan: '08:46',
  },
  {
    id: 'APR-003',
    nasabah: 'Rizky Maulana',
    jenis: 'Transfer Antar Bank',
    jumlah: 'Rp 31.750.000',
    diajukan: '08:12',
  },
]

function PendingApprovalPanel() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
        <div>
          <div className="flex items-center gap-2">
            <CircleCheckBig
              size={18}
              className="text-amber-600"
            />

            <h2 className="text-base font-semibold text-slate-900">
              Persetujuan Tertunda
            </h2>
          </div>

          <p className="mt-1 text-sm text-slate-500">
            Permintaan yang menunggu otorisasi.
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
        {pendingApprovals.map((approval) => (
          <div
            key={approval.id}
            className="p-5 transition hover:bg-slate-50"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="font-semibold text-slate-900">
                  {approval.nasabah}
                </p>

                <p className="mt-1 text-sm text-slate-600">
                  {approval.jenis}
                </p>

                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                  <span>{approval.id}</span>

                  <span className="flex items-center gap-1">
                    <Clock3 size={13} />
                    {approval.diajukan}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <p className="whitespace-nowrap text-sm font-semibold text-slate-900">
                  {approval.jumlah}
                </p>

                <span className="mt-2 inline-flex rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700 ring-1 ring-inset ring-amber-600/20">
                  Menunggu
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PendingApprovalPanel