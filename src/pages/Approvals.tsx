import { useMemo, useState } from 'react'

import {
  CheckCircle2,
  Clock3,
  Search,
  ShieldCheck,
  XCircle,
} from 'lucide-react'

import {
  approvals as initialApprovals,
  type Approval,
  type ApprovalStatus,
} from '../data/approvals'

function formatRupiah(value: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value)
}

function getStatusStyle(status: ApprovalStatus) {
  switch (status) {
    case 'Menunggu':
      return 'bg-amber-50 text-amber-700 ring-amber-600/20'

    case 'Disetujui':
      return 'bg-emerald-50 text-emerald-700 ring-emerald-600/20'

    case 'Ditolak':
      return 'bg-red-50 text-red-700 ring-red-600/20'
  }
}

function Approvals() {
  const [approvals, setApprovals] =
    useState<Approval[]>(initialApprovals)

  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('Semua')

  const [selectedApproval, setSelectedApproval] =
    useState<Approval | null>(null)

  const [decisionType, setDecisionType] =
    useState<'Disetujui' | 'Ditolak' | null>(null)

  const [alasan, setAlasan] = useState('')

  const filteredApprovals = useMemo(() => {
    return approvals.filter((approval) => {
      const query = search.toLowerCase()

      const cocokPencarian =
        approval.id.toLowerCase().includes(query) ||
        approval.transactionId.toLowerCase().includes(query) ||
        approval.namaNasabah.toLowerCase().includes(query) ||
        approval.noRekening.includes(search)

      const cocokStatus =
        status === 'Semua' ||
        approval.status === status

      return cocokPencarian && cocokStatus
    })
  }, [approvals, search, status])

  const totalMenunggu = approvals.filter(
    (approval) => approval.status === 'Menunggu',
  ).length

  const totalDisetujui = approvals.filter(
    (approval) => approval.status === 'Disetujui',
  ).length

  const totalDitolak = approvals.filter(
    (approval) => approval.status === 'Ditolak',
  ).length

  const totalNominalMenunggu = approvals
    .filter((approval) => approval.status === 'Menunggu')
    .reduce(
      (total, approval) => total + approval.jumlah,
      0,
    )

  function openDecision(
    approval: Approval,
    decision: 'Disetujui' | 'Ditolak',
  ) {
    setSelectedApproval(approval)
    setDecisionType(decision)
    setAlasan('')
  }

  function closeDecision() {
    setSelectedApproval(null)
    setDecisionType(null)
    setAlasan('')
  }

  function submitDecision() {
    if (
      !selectedApproval ||
      !decisionType ||
      !alasan.trim()
    ) {
      return
    }

    setApprovals((currentApprovals) =>
      currentApprovals.map((approval) =>
        approval.id === selectedApproval.id
          ? {
              ...approval,
              status: decisionType,
              alasanKeputusan: alasan.trim(),
              diputuskanOleh:
                'Supervisor Operasional',
            }
          : approval,
      ),
    )

    closeDecision()
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Persetujuan
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Tinjau transaksi yang membutuhkan otorisasi
          sebelum diproses.
        </p>
      </div>

      {/* Statistik */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">
              Menunggu Persetujuan
            </p>

            <Clock3
              size={20}
              className="text-slate-400"
            />
          </div>

          <p className="mt-3 text-2xl font-bold text-amber-600">
            {totalMenunggu}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-medium text-slate-500">
            Disetujui
          </p>

          <p className="mt-3 text-2xl font-bold text-emerald-600">
            {totalDisetujui}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-medium text-slate-500">
            Ditolak
          </p>

          <p className="mt-3 text-2xl font-bold text-red-600">
            {totalDitolak}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-medium text-slate-500">
            Nominal Menunggu
          </p>

          <p className="mt-3 text-xl font-bold text-slate-900">
            {formatRupiah(totalNominalMenunggu)}
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="mb-5 rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Cari persetujuan, transaksi, nasabah..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:bg-white"
            />
          </div>

          <select
            value={status}
            onChange={(event) =>
              setStatus(event.target.value)
            }
            className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none"
          >
            <option value="Semua">
              Semua Status
            </option>

            <option value="Menunggu">
              Menunggu
            </option>

            <option value="Disetujui">
              Disetujui
            </option>

            <option value="Ditolak">
              Ditolak
            </option>
          </select>
        </div>
      </div>

      {/* Daftar Persetujuan */}
      <div className="space-y-4">
        {filteredApprovals.length > 0 ? (
          filteredApprovals.map((approval) => (
            <div
              key={approval.id}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-base font-semibold text-slate-900">
                      {approval.namaNasabah}
                    </h2>

                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${getStatusStyle(
                        approval.status,
                      )}`}
                    >
                      {approval.status}
                    </span>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
                    <span>{approval.id}</span>
                    <span>{approval.transactionId}</span>
                    <span>{approval.noRekening}</span>
                  </div>

                  <p className="mt-4 text-sm font-medium text-slate-600">
                    {approval.jenisTransaksi}
                  </p>

                  <p className="mt-1 text-2xl font-bold text-slate-900">
                    {formatRupiah(approval.jumlah)}
                  </p>

                  <p className="mt-2 text-xs text-slate-400">
                    {approval.tanggal} • {approval.waktu}
                  </p>

                  {approval.alasanKeputusan && (
                    <div className="mt-4 rounded-lg bg-slate-50 p-3">
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Alasan Keputusan
                      </p>

                      <p className="mt-1 text-sm text-slate-600">
                        {approval.alasanKeputusan}
                      </p>

                      {approval.diputuskanOleh && (
                        <p className="mt-2 text-xs text-slate-400">
                          Oleh: {approval.diputuskanOleh}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {approval.status === 'Menunggu' ? (
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <button
                      type="button"
                      onClick={() =>
                        openDecision(
                          approval,
                          'Disetujui',
                        )
                      }
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
                    >
                      <CheckCircle2 size={17} />
                      Setujui
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        openDecision(
                          approval,
                          'Ditolak',
                        )
                      }
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-100"
                    >
                      <XCircle size={17} />
                      Tolak
                    </button>
                  </div>
                ) : approval.status === 'Disetujui' ? (
                  <div className="inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                    <ShieldCheck size={17} />
                    Telah Disetujui
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                    <XCircle size={17} />
                    Telah Ditolak
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-xl border border-slate-200 bg-white p-12 text-center text-sm text-slate-500">
            Data persetujuan tidak ditemukan.
          </div>
        )}
      </div>

      {/* Modal Keputusan */}
      {selectedApproval && decisionType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                {decisionType === 'Disetujui'
                  ? 'Setujui Transaksi'
                  : 'Tolak Transaksi'}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {selectedApproval.namaNasabah} •{' '}
                {selectedApproval.transactionId}
              </p>
            </div>

            <div className="mt-5 rounded-xl bg-slate-50 p-4">
              <p className="text-sm text-slate-500">
                Nominal
              </p>

              <p className="mt-1 text-xl font-bold text-slate-900">
                {formatRupiah(
                  selectedApproval.jumlah,
                )}
              </p>
            </div>

            <div className="mt-5">
              <label
                htmlFor="alasan-keputusan"
                className="text-sm font-semibold text-slate-700"
              >
                Alasan Keputusan
              </label>

              <textarea
                id="alasan-keputusan"
                value={alasan}
                onChange={(event) =>
                  setAlasan(event.target.value)
                }
                rows={4}
                placeholder={
                  decisionType === 'Disetujui'
                    ? 'Contoh: Data dan transaksi telah diverifikasi...'
                    : 'Contoh: Transaksi tidak memenuhi hasil verifikasi...'
                }
                className="mt-2 w-full resize-none rounded-lg border border-slate-200 p-3 text-sm text-slate-700 outline-none transition focus:border-slate-400"
              />

              {!alasan.trim() && (
                <p className="mt-2 text-xs text-slate-400">
                  Alasan wajib diisi sebelum menyimpan keputusan.
                </p>
              )}
            </div>

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={closeDecision}
                className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Batal
              </button>

              <button
                type="button"
                disabled={!alasan.trim()}
                onClick={submitDecision}
                className={`rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition ${
                  !alasan.trim()
                    ? 'cursor-not-allowed bg-slate-300'
                    : decisionType === 'Disetujui'
                      ? 'bg-emerald-600 hover:bg-emerald-700'
                      : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {decisionType === 'Disetujui'
                  ? 'Konfirmasi Persetujuan'
                  : 'Konfirmasi Penolakan'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Approvals