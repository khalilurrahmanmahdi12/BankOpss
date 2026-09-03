import { Link, useParams } from 'react-router-dom'

import {
  ArrowDownLeft,
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  CreditCard,
  Hash,
  Landmark,
  User,
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

function TransactionDetail() {
  const { id } = useParams()

  const transaction = transactions.find(
    (transaction) => transaction.id === id,
  )

  if (!transaction) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
        <h1 className="text-xl font-bold text-slate-900">
          Transaksi tidak ditemukan
        </h1>

        <Link
          to="/transactions"
          className="mt-4 inline-flex text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          Kembali ke daftar transaksi
        </Link>
      </div>
    )
  }

  const isMasuk = transaction.tipe === 'masuk'

  return (
    <div>
      <Link
        to="/transactions"
        className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
      >
        <ArrowLeft size={17} />
        Kembali ke Transaksi
      </Link>

      <div className="mb-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm text-slate-500">
              Detail Transaksi
            </p>

            <h1 className="mt-1 text-2xl font-bold text-slate-900">
              {transaction.id}
            </h1>
          </div>

          <span
            className={`inline-flex w-fit rounded-full px-3 py-1.5 text-sm font-semibold ring-1 ring-inset ${getStatusStyle(
              transaction.status,
            )}`}
          >
            {transaction.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Ringkasan transaksi */}
        <div className="rounded-xl border border-slate-200 bg-slate-950 p-6 text-white">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-full ${
              isMasuk
                ? 'bg-emerald-500/10 text-emerald-400'
                : 'bg-slate-800 text-slate-300'
            }`}
          >
            {isMasuk ? (
              <ArrowDownLeft size={22} />
            ) : (
              <ArrowUpRight size={22} />
            )}
          </div>

          <p className="mt-5 text-sm text-slate-400">
            Nominal Transaksi
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {isMasuk ? '+' : '-'}
            {formatRupiah(transaction.jumlah)}
          </h2>

          <p className="mt-3 text-sm text-slate-400">
            {transaction.jenis}
          </p>
        </div>

        {/* Informasi */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 xl:col-span-2">
          <h2 className="text-base font-semibold text-slate-900">
            Informasi Transaksi
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="flex gap-3">
              <User size={18} className="text-slate-400" />

              <div>
                <p className="text-xs text-slate-400">
                  Nasabah
                </p>

                <p className="mt-1 text-sm font-medium text-slate-900">
                  {transaction.namaNasabah}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <CreditCard
                size={18}
                className="text-slate-400"
              />

              <div>
                <p className="text-xs text-slate-400">
                  Nomor Rekening
                </p>

                <p className="mt-1 text-sm font-medium text-slate-900">
                  {transaction.noRekening}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <CalendarDays
                size={18}
                className="text-slate-400"
              />

              <div>
                <p className="text-xs text-slate-400">
                  Waktu Transaksi
                </p>

                <p className="mt-1 text-sm font-medium text-slate-900">
                  {transaction.tanggal} • {transaction.waktu}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Landmark
                size={18}
                className="text-slate-400"
              />

              <div>
                <p className="text-xs text-slate-400">
                  Kanal Transaksi
                </p>

                <p className="mt-1 text-sm font-medium text-slate-900">
                  {transaction.channel}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Hash size={18} className="text-slate-400" />

              <div>
                <p className="text-xs text-slate-400">
                  Nomor Referensi
                </p>

                <p className="mt-1 text-sm font-medium text-slate-900">
                  {transaction.referensi}
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs text-slate-400">
                Keterangan
              </p>

              <p className="mt-1 text-sm font-medium text-slate-900">
                {transaction.keterangan}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Status proses */}
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="text-base font-semibold text-slate-900">
          Status Pemrosesan
        </h2>

        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-700">
              1
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-900">
                Transaksi Dibuat
              </p>

              <p className="text-xs text-slate-500">
                {transaction.waktu}
              </p>
            </div>
          </div>

          <div className="hidden h-px flex-1 bg-slate-200 sm:block" />

          <div className="flex items-center gap-3">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                transaction.status === 'Gagal'
                  ? 'bg-red-100 text-red-700'
                  : transaction.status === 'Ditinjau'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-emerald-100 text-emerald-700'
              }`}
            >
              2
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-900">
                {transaction.status === 'Ditinjau'
                  ? 'Menunggu Peninjauan'
                  : transaction.status === 'Gagal'
                    ? 'Transaksi Gagal'
                    : 'Transaksi Selesai'}
              </p>

              <p className="text-xs text-slate-500">
                Status saat ini
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransactionDetail