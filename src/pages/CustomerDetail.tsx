import {
  ArrowDownLeft,
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  CreditCard,
  Mail,
  MapPin,
  Phone,
  User,
  Wallet,
} from 'lucide-react'

import { Link, useParams } from 'react-router-dom'

import { customers } from '../data/customers'
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
    case 'Aktif':
      return 'bg-emerald-50 text-emerald-700 ring-emerald-600/20'

    case 'Diblokir':
      return 'bg-red-50 text-red-700 ring-red-600/20'

    case 'Ditangguhkan':
      return 'bg-amber-50 text-amber-700 ring-amber-600/20'

    default:
      return 'bg-slate-50 text-slate-700 ring-slate-600/20'
  }
}

function getTransactionStatusStyle(status: string) {
  switch (status) {
    case 'Berhasil':
      return 'bg-emerald-50 text-emerald-700'

    case 'Ditinjau':
      return 'bg-amber-50 text-amber-700'

    case 'Gagal':
      return 'bg-red-50 text-red-700'

    default:
      return 'bg-slate-50 text-slate-700'
  }
}

function CustomerDetail() {
  const { id } = useParams()

  const customer = customers.find(
    (customer) => customer.id === id,
  )

  if (!customer) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
        <h1 className="text-xl font-bold text-slate-900">
          Nasabah tidak ditemukan
        </h1>

        <Link
          to="/customers"
          className="mt-4 inline-flex text-sm font-medium text-slate-600 hover:text-slate-900"
        >
          Kembali ke daftar nasabah
        </Link>
      </div>
    )
  }

  const customerTransactions = transactions.filter(
    (transaction) => transaction.customerId === customer.id,
  )

  return (
    <div>
      {/* Kembali */}
      <Link
        to="/customers"
        className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
      >
        <ArrowLeft size={17} />
        Kembali ke Nasabah
      </Link>

      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-xl font-bold text-white">
            {customer.nama
              .split(' ')
              .map((nama) => nama[0])
              .slice(0, 2)
              .join('')}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900">
                {customer.nama}
              </h1>

              <span
                className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${getStatusStyle(
                  customer.status,
                )}`}
              >
                {customer.status}
              </span>
            </div>

            <p className="mt-1 text-sm text-slate-500">
              ID Nasabah: {customer.id}
            </p>
          </div>
        </div>
      </div>

      {/* Informasi utama */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Identitas */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 xl:col-span-2">
          <h2 className="text-base font-semibold text-slate-900">
            Informasi Nasabah
          </h2>

          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div className="flex gap-3">
              <User
                size={18}
                className="mt-0.5 text-slate-400"
              />

              <div>
                <p className="text-xs text-slate-400">
                  Nama Lengkap
                </p>

                <p className="mt-1 text-sm font-medium text-slate-900">
                  {customer.nama}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Mail
                size={18}
                className="mt-0.5 text-slate-400"
              />

              <div>
                <p className="text-xs text-slate-400">
                  Email
                </p>

                <p className="mt-1 text-sm font-medium text-slate-900">
                  {customer.email}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Phone
                size={18}
                className="mt-0.5 text-slate-400"
              />

              <div>
                <p className="text-xs text-slate-400">
                  Nomor Telepon
                </p>

                <p className="mt-1 text-sm font-medium text-slate-900">
                  {customer.noHp}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <MapPin
                size={18}
                className="mt-0.5 text-slate-400"
              />

              <div>
                <p className="text-xs text-slate-400">
                  Alamat
                </p>

                <p className="mt-1 text-sm font-medium text-slate-900">
                  {customer.alamat}
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <CalendarDays
                size={18}
                className="mt-0.5 text-slate-400"
              />

              <div>
                <p className="text-xs text-slate-400">
                  Bergabung Sejak
                </p>

                <p className="mt-1 text-sm font-medium text-slate-900">
                  {customer.tanggalBergabung}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Rekening */}
        <div className="rounded-xl border border-slate-200 bg-slate-950 p-5 text-white">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-400">
              Saldo Rekening
            </p>

            <Wallet size={20} className="text-slate-400" />
          </div>

          <h2 className="mt-3 text-2xl font-bold">
            {formatRupiah(customer.saldo)}
          </h2>

          <div className="mt-8 border-t border-slate-800 pt-4">
            <div className="flex items-center gap-2">
              <CreditCard
                size={17}
                className="text-slate-400"
              />

              <span className="text-sm text-slate-300">
                {customer.jenisRekening}
              </span>
            </div>

            <p className="mt-3 font-mono text-lg tracking-wider">
              {customer.noRekening}
            </p>
          </div>
        </div>
      </div>

      {/* Riwayat transaksi */}
      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-4">
          <h2 className="text-base font-semibold text-slate-900">
            Riwayat Transaksi
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Aktivitas transaksi terbaru nasabah.
          </p>
        </div>

        {customerTransactions.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {customerTransactions.map((transaction) => {
              const isMasuk = transaction.tipe === 'masuk'

              return (
                <div
                  key={transaction.id}
                  className="flex flex-col gap-4 p-5 transition hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                        isMasuk
                          ? 'bg-emerald-50 text-emerald-600'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {isMasuk ? (
                        <ArrowDownLeft size={19} />
                      ) : (
                        <ArrowUpRight size={19} />
                      )}
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {transaction.jenis}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {transaction.keterangan}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {transaction.tanggal} • {transaction.id}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 sm:block sm:text-right">
                    <p
                      className={`text-sm font-bold ${
                        isMasuk
                          ? 'text-emerald-600'
                          : 'text-slate-900'
                      }`}
                    >
                      {isMasuk ? '+' : '-'}
                      {formatRupiah(transaction.jumlah)}
                    </p>

                    <span
                      className={`mt-2 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getTransactionStatusStyle(
                        transaction.status,
                      )}`}
                    >
                      {transaction.status}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="p-10 text-center text-sm text-slate-500">
            Belum ada riwayat transaksi.
          </div>
        )}
      </div>
    </div>
  )
}

export default CustomerDetail