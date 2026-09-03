import { useMemo, useState } from 'react'

import {
  CheckCircle2,
  Search,
  ShieldAlert,
  ShieldCheck,
  Siren,
} from 'lucide-react'

import {
  fraudAlerts as initialFraudAlerts,
  type FraudAlert,
  type FraudStatus,
} from '../data/fraudAlerts'

function formatRupiah(value: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value)
}

function getRiskStyle(level: string) {
  switch (level) {
    case 'Tinggi':
      return 'bg-red-50 text-red-700 ring-red-600/20'

    case 'Sedang':
      return 'bg-amber-50 text-amber-700 ring-amber-600/20'

    case 'Rendah':
      return 'bg-emerald-50 text-emerald-700 ring-emerald-600/20'

    default:
      return 'bg-slate-50 text-slate-700 ring-slate-600/20'
  }
}

function getStatusStyle(status: FraudStatus) {
  switch (status) {
    case 'Baru':
      return 'bg-blue-50 text-blue-700 ring-blue-600/20'

    case 'Ditinjau':
      return 'bg-amber-50 text-amber-700 ring-amber-600/20'

    case 'Aman':
      return 'bg-emerald-50 text-emerald-700 ring-emerald-600/20'

    case 'Fraud':
      return 'bg-red-50 text-red-700 ring-red-600/20'
  }
}

function FraudAlerts() {
  const [alerts, setAlerts] =
    useState<FraudAlert[]>(initialFraudAlerts)

  const [search, setSearch] = useState('')
  const [risk, setRisk] = useState('Semua')
  const [status, setStatus] = useState('Semua')

  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      const query = search.toLowerCase()

      const cocokPencarian =
        alert.id.toLowerCase().includes(query) ||
        alert.transactionId.toLowerCase().includes(query) ||
        alert.namaNasabah.toLowerCase().includes(query) ||
        alert.noRekening.includes(search)

      const cocokRisk =
        risk === 'Semua' ||
        alert.riskLevel === risk

      const cocokStatus =
        status === 'Semua' ||
        alert.status === status

      return (
        cocokPencarian &&
        cocokRisk &&
        cocokStatus
      )
    })
  }, [alerts, search, risk, status])

  function updateStatus(
    alertId: string,
    newStatus: FraudStatus,
  ) {
    setAlerts((currentAlerts) =>
      currentAlerts.map((alert) =>
        alert.id === alertId
          ? {
              ...alert,
              status: newStatus,
            }
          : alert,
      ),
    )
  }

  const totalAlert = alerts.length

  const risikoTinggi = alerts.filter(
    (alert) => alert.riskLevel === 'Tinggi',
  ).length

  const sedangDitinjau = alerts.filter(
    (alert) => alert.status === 'Ditinjau',
  ).length

  const fraudTerkonfirmasi = alerts.filter(
    (alert) => alert.status === 'Fraud',
  ).length

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Peringatan Fraud
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Pantau dan investigasi transaksi yang terindikasi mencurigakan.
        </p>
      </div>

      {/* Statistik */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">
              Total Peringatan
            </p>

            <ShieldAlert
              size={20}
              className="text-slate-400"
            />
          </div>

          <p className="mt-3 text-2xl font-bold text-slate-900">
            {totalAlert}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-medium text-slate-500">
            Risiko Tinggi
          </p>

          <p className="mt-3 text-2xl font-bold text-red-600">
            {risikoTinggi}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-medium text-slate-500">
            Sedang Ditinjau
          </p>

          <p className="mt-3 text-2xl font-bold text-amber-600">
            {sedangDitinjau}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-medium text-slate-500">
            Fraud Terkonfirmasi
          </p>

          <p className="mt-3 text-2xl font-bold text-red-700">
            {fraudTerkonfirmasi}
          </p>
        </div>
      </div>

      {/* Filter */}
      <div className="mb-5 rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div className="relative w-full xl:max-w-md">
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
              placeholder="Cari alert, transaksi, nasabah..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:bg-white"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <select
              value={risk}
              onChange={(event) =>
                setRisk(event.target.value)
              }
              className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none"
            >
              <option value="Semua">
                Semua Risiko
              </option>

              <option value="Tinggi">
                Tinggi
              </option>

              <option value="Sedang">
                Sedang
              </option>

              <option value="Rendah">
                Rendah
              </option>
            </select>

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

              <option value="Baru">
                Baru
              </option>

              <option value="Ditinjau">
                Ditinjau
              </option>

              <option value="Aman">
                Aman
              </option>

              <option value="Fraud">
                Fraud
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Daftar Alert */}
      <div className="space-y-4">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                {/* Kiri */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-base font-semibold text-slate-900">
                      {alert.namaNasabah}
                    </h2>

                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${getRiskStyle(
                        alert.riskLevel,
                      )}`}
                    >
                      Risiko {alert.riskLevel}
                    </span>

                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${getStatusStyle(
                        alert.status,
                      )}`}
                    >
                      {alert.status}
                    </span>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
                    <span>{alert.id}</span>
                    <span>{alert.transactionId}</span>
                    <span>{alert.noRekening}</span>
                    <span>{alert.waktu}</span>
                  </div>

                  <p className="mt-4 text-2xl font-bold text-slate-900">
                    {formatRupiah(alert.jumlah)}
                  </p>

                  {/* Risk Score */}
                  <div className="mt-5 max-w-md">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-600">
                        Skor Risiko
                      </span>

                      <span className="text-sm font-bold text-slate-900">
                        {alert.riskScore}/100
                      </span>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className={`h-full rounded-full ${
                          alert.riskScore >= 75
                            ? 'bg-red-500'
                            : alert.riskScore >= 50
                              ? 'bg-amber-500'
                              : 'bg-emerald-500'
                        }`}
                        style={{
                          width: `${alert.riskScore}%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Alasan */}
                  <div className="mt-5">
                    <p className="text-sm font-semibold text-slate-900">
                      Alasan Deteksi
                    </p>

                    <ul className="mt-3 space-y-2">
                      {alert.alasan.map((alasan) => (
                        <li
                          key={alasan}
                          className="flex items-start gap-2 text-sm text-slate-600"
                        >
                          <Siren
                            size={16}
                            className="mt-0.5 shrink-0 text-red-500"
                          />

                          {alasan}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Aksi */}
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row xl:flex-col">
                  {alert.status !== 'Aman' &&
                    alert.status !== 'Fraud' && (
                      <>
                        <button
                          type="button"
                          onClick={() =>
                            updateStatus(
                              alert.id,
                              'Ditinjau',
                            )
                          }
                          className="inline-flex items-center justify-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2.5 text-sm font-semibold text-amber-700 transition hover:bg-amber-100"
                        >
                          <ShieldAlert size={16} />
                          Tinjau
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            updateStatus(
                              alert.id,
                              'Aman',
                            )
                          }
                          className="inline-flex items-center justify-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
                        >
                          <ShieldCheck size={16} />
                          Tandai Aman
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            updateStatus(
                              alert.id,
                              'Fraud',
                            )
                          }
                          className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-100"
                        >
                          <Siren size={16} />
                          Konfirmasi Fraud
                        </button>
                      </>
                    )}

                  {alert.status === 'Aman' && (
                    <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                      <CheckCircle2 size={17} />
                      Transaksi Aman
                    </div>
                  )}

                  {alert.status === 'Fraud' && (
                    <div className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                      <Siren size={17} />
                      Fraud Terkonfirmasi
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-xl border border-slate-200 bg-white p-12 text-center text-sm text-slate-500">
            Peringatan fraud tidak ditemukan.
          </div>
        )}
      </div>
    </div>
  )
}

export default FraudAlerts