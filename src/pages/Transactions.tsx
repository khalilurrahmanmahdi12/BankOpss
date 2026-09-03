import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import {
  ArrowDownLeft,
  ArrowUpRight,
  Eye,
  Search,
  SlidersHorizontal,
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

function Transactions() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('Semua')
  const [jenis, setJenis] = useState('Semua')
  const [nominal, setNominal] = useState('Semua')

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const query = search.toLowerCase()

      const cocokPencarian =
        transaction.id.toLowerCase().includes(query) ||
        transaction.namaNasabah
          .toLowerCase()
          .includes(query) ||
        transaction.noRekening.includes(search) ||
        transaction.referensi
          .toLowerCase()
          .includes(query)

      const cocokStatus =
        status === 'Semua' ||
        transaction.status === status

      const cocokJenis =
        jenis === 'Semua' ||
        transaction.jenis === jenis

      let cocokNominal = true

      if (nominal === 'Kecil') {
        cocokNominal = transaction.jumlah < 1000000
      }

      if (nominal === 'Sedang') {
        cocokNominal =
          transaction.jumlah >= 1000000 &&
          transaction.jumlah <= 10000000
      }

      if (nominal === 'Besar') {
        cocokNominal = transaction.jumlah > 10000000
      }

      return (
        cocokPencarian &&
        cocokStatus &&
        cocokJenis &&
        cocokNominal
      )
    })
  }, [search, status, jenis, nominal])

  const totalVolume = transactions.reduce(
    (total, transaction) => total + transaction.jumlah,
    0,
  )

  const totalBerhasil = transactions.filter(
    (transaction) => transaction.status === 'Berhasil',
  ).length

  const totalDitinjau = transactions.filter(
    (transaction) => transaction.status === 'Ditinjau',
  ).length

  const totalGagal = transactions.filter(
    (transaction) => transaction.status === 'Gagal',
  ).length

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Transaksi
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Pantau seluruh aktivitas transaksi perbankan.
        </p>
      </div>

      {/* Statistik */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">
              Total Volume
            </p>

            <WalletCards size={20} className="text-slate-400" />
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
            Ditinjau
          </p>

          <p className="mt-3 text-2xl font-bold text-amber-600">
            {totalDitinjau}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-medium text-slate-500">
            Gagal
          </p>

          <p className="mt-3 text-2xl font-bold text-red-600">
            {totalGagal}
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
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Cari transaksi, nasabah, rekening..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:bg-white"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <div className="flex items-center gap-2">
              <SlidersHorizontal
                size={17}
                className="text-slate-400"
              />

              <select
                value={jenis}
                onChange={(event) =>
                  setJenis(event.target.value)
                }
                className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none"
              >
                <option value="Semua">
                  Semua Jenis
                </option>

                <option value="Transfer Masuk">
                  Transfer Masuk
                </option>

                <option value="Transfer Keluar">
                  Transfer Keluar
                </option>

                <option value="Pembayaran">
                  Pembayaran
                </option>

                <option value="Top Up">
                  Top Up
                </option>
              </select>
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

              <option value="Berhasil">
                Berhasil
              </option>

              <option value="Ditinjau">
                Ditinjau
              </option>

              <option value="Gagal">
                Gagal
              </option>
            </select>

            <select
              value={nominal}
              onChange={(event) =>
                setNominal(event.target.value)
              }
              className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none"
            >
              <option value="Semua">
                Semua Nominal
              </option>

              <option value="Kecil">
                &lt; Rp1 Juta
              </option>

              <option value="Sedang">
                Rp1 - 10 Juta
              </option>

              <option value="Besar">
                &gt; Rp10 Juta
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabel */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1200px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Transaksi
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
                  Waktu
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>

                <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => {
                  const isMasuk =
                    transaction.tipe === 'masuk'

                  return (
                    <tr
                      key={transaction.id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-9 w-9 items-center justify-center rounded-full ${
                              isMasuk
                                ? 'bg-emerald-50 text-emerald-600'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {isMasuk ? (
                              <ArrowDownLeft size={18} />
                            ) : (
                              <ArrowUpRight size={18} />
                            )}
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-slate-900">
                              {transaction.id}
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                              {transaction.referensi}
                            </p>
                          </div>
                        </div>
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

                      <td
                        className={`px-5 py-4 text-sm font-semibold ${
                          isMasuk
                            ? 'text-emerald-600'
                            : 'text-slate-900'
                        }`}
                      >
                        {isMasuk ? '+' : '-'}
                        {formatRupiah(transaction.jumlah)}
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm text-slate-600">
                          {transaction.tanggal}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {transaction.waktu}
                        </p>
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

                      <td className="px-5 py-4 text-right">
                        <Link
                          to={`/transactions/${transaction.id}`}
                          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                        >
                          <Eye size={16} />
                          Detail
                        </Link>
                      </td>
                    </tr>
                  )
                })
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-12 text-center text-sm text-slate-500"
                  >
                    Data transaksi tidak ditemukan.
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

export default Transactions