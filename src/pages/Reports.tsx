import { useMemo, useState } from 'react'

import {
  CalendarDays,
  Download,
  FileText,
  Search,
  WalletCards,
} from 'lucide-react'

import { transactions } from '../data/transactions'

function formatRupiah(value: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value)
}

function Reports() {
  const [search, setSearch] = useState('')
  const [periode, setPeriode] = useState('Semua')

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const query = search.toLowerCase()

      const cocokPencarian =
        transaction.id.toLowerCase().includes(query) ||
        transaction.namaNasabah.toLowerCase().includes(query) ||
        transaction.noRekening.includes(search) ||
        transaction.jenis.toLowerCase().includes(query)

      let cocokPeriode = true

      if (periode === 'Hari Ini') {
        cocokPeriode =
          transaction.tanggal === '31 Agustus 2026'
      }

      if (periode === '2 Hari Terakhir') {
        cocokPeriode =
          transaction.tanggal === '31 Agustus 2026' ||
          transaction.tanggal === '30 Agustus 2026'
      }

      if (periode === '3 Hari Terakhir') {
        cocokPeriode =
          transaction.tanggal === '31 Agustus 2026' ||
          transaction.tanggal === '30 Agustus 2026' ||
          transaction.tanggal === '29 Agustus 2026'
      }

      return cocokPencarian && cocokPeriode
    })
  }, [search, periode])

  const totalTransaksi = filteredTransactions.length

  const totalVolume = filteredTransactions.reduce(
    (total, transaction) =>
      total + transaction.jumlah,
    0,
  )

  const totalBerhasil = filteredTransactions.filter(
    (transaction) =>
      transaction.status === 'Berhasil',
  ).length

  const totalDitinjau = filteredTransactions.filter(
    (transaction) =>
      transaction.status === 'Ditinjau',
  ).length

  const totalGagal = filteredTransactions.filter(
    (transaction) =>
      transaction.status === 'Gagal',
  ).length

  function exportCSV() {
    const headers = [
      'ID Transaksi',
      'Nasabah',
      'Nomor Rekening',
      'Jenis',
      'Nominal',
      'Tanggal',
      'Waktu',
      'Status',
      'Channel',
      'Referensi',
    ]

    const rows = filteredTransactions.map(
      (transaction) => [
        transaction.id,
        transaction.namaNasabah,
        transaction.noRekening,
        transaction.jenis,
        transaction.jumlah,
        transaction.tanggal,
        transaction.waktu,
        transaction.status,
        transaction.channel,
        transaction.referensi,
      ],
    )

    const csvContent = [
      headers,
      ...rows,
    ]
      .map((row) =>
        row
          .map((value) => {
            const stringValue = String(value)

            return `"${stringValue.replace(
              /"/g,
              '""',
            )}"`
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
      'laporan-transaksi-bankops.csv',
    )

    document.body.appendChild(link)

    link.click()

    document.body.removeChild(link)

    URL.revokeObjectURL(url)
  }

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

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Laporan
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Analisis dan ekspor laporan transaksi
            perbankan.
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

      {/* Filter */}
      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-md">
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
              placeholder="Cari transaksi atau nasabah..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-2">
            <CalendarDays
              size={17}
              className="text-slate-400"
            />

            <select
              value={periode}
              onChange={(event) =>
                setPeriode(event.target.value)
              }
              className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none"
            >
              <option value="Semua">
                Semua Periode
              </option>

              <option value="Hari Ini">
                Hari Ini
              </option>

              <option value="2 Hari Terakhir">
                2 Hari Terakhir
              </option>

              <option value="3 Hari Terakhir">
                3 Hari Terakhir
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Ringkasan */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">
              Total Transaksi
            </p>

            <FileText
              size={20}
              className="text-slate-400"
            />
          </div>

          <p className="mt-3 text-2xl font-bold text-slate-900">
            {totalTransaksi}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">
              Volume Transaksi
            </p>

            <WalletCards
              size={20}
              className="text-slate-400"
            />
          </div>

          <p className="mt-3 text-xl font-bold text-slate-900">
            {formatRupiah(totalVolume)}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-medium text-slate-500">
            Berhasil
          </p>

          <p className="mt-3 text-2xl font-bold text-emerald-600">
            {totalBerhasil}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-medium text-slate-500">
            Perlu Penanganan
          </p>

          <p className="mt-3 text-2xl font-bold text-amber-600">
            {totalDitinjau + totalGagal}
          </p>
        </div>
      </div>

      {/* Komposisi Status */}
      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-5">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Komposisi Status Transaksi
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Distribusi status dari hasil filter saat ini.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-lg bg-emerald-50 p-4">
            <p className="text-sm font-medium text-emerald-700">
              Berhasil
            </p>

            <p className="mt-2 text-2xl font-bold text-emerald-800">
              {totalBerhasil}
            </p>

            <p className="mt-1 text-xs text-emerald-600">
              dari {totalTransaksi} transaksi
            </p>
          </div>

          <div className="rounded-lg bg-amber-50 p-4">
            <p className="text-sm font-medium text-amber-700">
              Ditinjau
            </p>

            <p className="mt-2 text-2xl font-bold text-amber-800">
              {totalDitinjau}
            </p>

            <p className="mt-1 text-xs text-amber-600">
              dari {totalTransaksi} transaksi
            </p>
          </div>

          <div className="rounded-lg bg-red-50 p-4">
            <p className="text-sm font-medium text-red-700">
              Gagal
            </p>

            <p className="mt-2 text-2xl font-bold text-red-800">
              {totalGagal}
            </p>

            <p className="mt-1 text-xs text-red-600">
              dari {totalTransaksi} transaksi
            </p>
          </div>
        </div>

        {/* Progress */}
        {totalTransaksi > 0 && (
          <div className="mt-6">
            <div className="flex h-3 overflow-hidden rounded-full bg-slate-100">
              <div
                className="bg-emerald-500"
                style={{
                  width: `${
                    (totalBerhasil /
                      totalTransaksi) *
                    100
                  }%`,
                }}
              />

              <div
                className="bg-amber-500"
                style={{
                  width: `${
                    (totalDitinjau /
                      totalTransaksi) *
                    100
                  }%`,
                }}
              />

              <div
                className="bg-red-500"
                style={{
                  width: `${
                    (totalGagal /
                      totalTransaksi) *
                    100
                  }%`,
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Tabel */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="text-base font-semibold text-slate-900">
            Data Laporan Transaksi
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Menampilkan {filteredTransactions.length}{' '}
            transaksi.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
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
                  Nominal
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Tanggal
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Channel
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map(
                  (transaction) => (
                    <tr
                      key={transaction.id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-5 py-4">
                        <p className="text-sm font-semibold text-slate-900">
                          {transaction.id}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {transaction.referensi}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-medium text-slate-900">
                          {transaction.namaNasabah}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {transaction.noRekening}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {transaction.jenis}
                      </td>

                      <td className="px-5 py-4 text-sm font-semibold text-slate-900">
                        {formatRupiah(
                          transaction.jumlah,
                        )}
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm text-slate-600">
                          {transaction.tanggal}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {transaction.waktu}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {transaction.channel}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${getStatusStyle(
                            transaction.status,
                          )}`}
                        >
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ),
                )
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-12 text-center text-sm text-slate-500"
                  >
                    Data laporan tidak ditemukan.
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

export default Reports