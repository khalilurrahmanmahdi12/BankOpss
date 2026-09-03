import { useMemo, useState } from 'react'

import {
  AlertTriangle,
  Download,
  Search,
  ShieldCheck,
  TerminalSquare,
} from 'lucide-react'

import {
  auditLogs,
  type AuditLevel,
  type AuditStatus,
} from '../data/auditLogs'

function getLevelStyle(level: AuditLevel) {
  switch (level) {
    case 'Informasi':
      return 'bg-blue-50 text-blue-700 ring-blue-600/20'

    case 'Peringatan':
      return 'bg-amber-50 text-amber-700 ring-amber-600/20'

    case 'Kritis':
      return 'bg-red-50 text-red-700 ring-red-600/20'
  }
}

function getStatusStyle(status: AuditStatus) {
  switch (status) {
    case 'Berhasil':
      return 'bg-emerald-50 text-emerald-700 ring-emerald-600/20'

    case 'Ditinjau':
      return 'bg-amber-50 text-amber-700 ring-amber-600/20'

    case 'Ditolak':
      return 'bg-red-50 text-red-700 ring-red-600/20'
  }
}

function AuditLogs() {
  const [search, setSearch] = useState('')
  const [modul, setModul] = useState('Semua')
  const [level, setLevel] = useState('Semua')

  const filteredLogs = useMemo(() => {
    return auditLogs.filter((log) => {
      const query = search.toLowerCase()

      const cocokPencarian =
        log.id.toLowerCase().includes(query) ||
        log.user.toLowerCase().includes(query) ||
        log.aktivitas.toLowerCase().includes(query) ||
        log.detail.toLowerCase().includes(query) ||
        log.ipAddress.includes(search)

      const cocokModul =
        modul === 'Semua' ||
        log.modul === modul

      const cocokLevel =
        level === 'Semua' ||
        log.level === level

      return (
        cocokPencarian &&
        cocokModul &&
        cocokLevel
      )
    })
  }, [search, modul, level])

  const totalAktivitas = auditLogs.length

  const totalInformasi = auditLogs.filter(
    (log) => log.level === 'Informasi',
  ).length

  const totalPeringatan = auditLogs.filter(
    (log) => log.level === 'Peringatan',
  ).length

  const totalKritis = auditLogs.filter(
    (log) => log.level === 'Kritis',
  ).length

  function exportCSV() {
    const headers = [
      'ID',
      'Pengguna',
      'Role',
      'Aktivitas',
      'Modul',
      'Detail',
      'Tanggal',
      'Waktu',
      'IP Address',
      'Level',
      'Status',
    ]

    const rows = filteredLogs.map((log) => [
      log.id,
      log.user,
      log.role,
      log.aktivitas,
      log.modul,
      log.detail,
      log.tanggal,
      log.waktu,
      log.ipAddress,
      log.level,
      log.status,
    ])

    const csvContent = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map((value) => {
            const text = String(value)

            return `"${text.replace(/"/g, '""')}"`
          })
          .join(','),
      )
      .join('\n')

    const blob = new Blob(
      ['\uFEFF' + csvContent],
      {
        type: 'text/csv;charset=utf-8;',
      },
    )

    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')

    link.href = url

    link.setAttribute(
      'download',
      'audit-log-bankops.csv',
    )

    document.body.appendChild(link)

    link.click()

    document.body.removeChild(link)

    URL.revokeObjectURL(url)
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Log Audit
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Pantau aktivitas pengguna dan perubahan penting dalam sistem.
          </p>
        </div>

        <button
          type="button"
          onClick={exportCSV}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          <Download size={17} />

          Ekspor CSV
        </button>
      </div>

      {/* Statistik */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">
              Total Aktivitas
            </p>

            <TerminalSquare
              size={20}
              className="text-slate-400"
            />
          </div>

          <p className="mt-3 text-2xl font-bold text-slate-900">
            {totalAktivitas}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">
              Informasi
            </p>

            <ShieldCheck
              size={20}
              className="text-blue-500"
            />
          </div>

          <p className="mt-3 text-2xl font-bold text-blue-600">
            {totalInformasi}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">
              Peringatan
            </p>

            <AlertTriangle
              size={20}
              className="text-amber-500"
            />
          </div>

          <p className="mt-3 text-2xl font-bold text-amber-600">
            {totalPeringatan}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">
              Aktivitas Kritis
            </p>

            <AlertTriangle
              size={20}
              className="text-red-500"
            />
          </div>

          <p className="mt-3 text-2xl font-bold text-red-600">
            {totalKritis}
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
              placeholder="Cari pengguna, aktivitas, ID, atau IP..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:bg-white"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <select
              value={modul}
              onChange={(event) =>
                setModul(event.target.value)
              }
              className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none"
            >
              <option value="Semua">
                Semua Modul
              </option>

              <option value="Autentikasi">
                Autentikasi
              </option>

              <option value="Nasabah">
                Nasabah
              </option>

              <option value="Rekening">
                Rekening
              </option>

              <option value="Persetujuan">
                Persetujuan
              </option>

              <option value="Fraud">
                Fraud
              </option>

              <option value="Keamanan">
                Keamanan
              </option>
            </select>

            <select
              value={level}
              onChange={(event) =>
                setLevel(event.target.value)
              }
              className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none"
            >
              <option value="Semua">
                Semua Level
              </option>

              <option value="Informasi">
                Informasi
              </option>

              <option value="Peringatan">
                Peringatan
              </option>

              <option value="Kritis">
                Kritis
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabel */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="text-base font-semibold text-slate-900">
            Riwayat Aktivitas Sistem
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Menampilkan {filteredLogs.length} aktivitas.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1250px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Aktivitas
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Pengguna
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Modul
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Waktu
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  IP Address
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Level
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredLogs.length > 0 ? (
                filteredLogs.map((log) => (
                  <tr
                    key={log.id}
                    className="align-top transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-slate-900">
                        {log.aktivitas}
                      </p>

                      <p className="mt-1 max-w-md text-sm text-slate-500">
                        {log.detail}
                      </p>

                      <p className="mt-2 text-xs text-slate-400">
                        {log.id}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-slate-900">
                        {log.user}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {log.role}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {log.modul}
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm text-slate-600">
                        {log.tanggal}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {log.waktu}
                      </p>
                    </td>

                    <td className="px-5 py-4 font-mono text-sm text-slate-600">
                      {log.ipAddress}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${getLevelStyle(
                          log.level,
                        )}`}
                      >
                        {log.level}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${getStatusStyle(
                          log.status,
                        )}`}
                      >
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-12 text-center text-sm text-slate-500"
                  >
                    Log audit tidak ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AuditLogs