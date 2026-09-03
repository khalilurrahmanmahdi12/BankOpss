import { useMemo, useState } from 'react'

import {
  Ban,
  Landmark,
  LockOpen,
  Search,
  SlidersHorizontal,
} from 'lucide-react'

import {
  accounts as initialAccounts,
  type Account,
} from '../data/accounts'

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

function Accounts() {
  const [accounts, setAccounts] =
    useState<Account[]>(initialAccounts)

  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('Semua')
  const [jenis, setJenis] = useState('Semua')

  const filteredAccounts = useMemo(() => {
    return accounts.filter((account) => {
      const query = search.toLowerCase()

      const cocokPencarian =
        account.namaNasabah.toLowerCase().includes(query) ||
        account.noRekening.includes(search) ||
        account.id.toLowerCase().includes(query)

      const cocokStatus =
        status === 'Semua' ||
        account.status === status

      const cocokJenis =
        jenis === 'Semua' ||
        account.jenisRekening === jenis

      return (
        cocokPencarian &&
        cocokStatus &&
        cocokJenis
      )
    })
  }, [accounts, search, status, jenis])

  function toggleBlokir(accountId: string) {
    setAccounts((currentAccounts) =>
      currentAccounts.map((account) => {
        if (account.id !== accountId) {
          return account
        }

        if (account.status === 'Ditangguhkan') {
          return account
        }

        return {
          ...account,
          status:
            account.status === 'Diblokir'
              ? 'Aktif'
              : 'Diblokir',
        }
      }),
    )
  }

  const totalSaldo = accounts.reduce(
    (total, account) => total + account.saldo,
    0,
  )

  const rekeningAktif = accounts.filter(
    (account) => account.status === 'Aktif',
  ).length

  const rekeningDiblokir = accounts.filter(
    (account) => account.status === 'Diblokir',
  ).length

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Rekening
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Pantau rekening nasabah, saldo, jenis rekening,
          dan status rekening.
        </p>
      </div>

      {/* Ringkasan */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-500">
              Total Rekening
            </p>

            <Landmark
              size={20}
              className="text-slate-400"
            />
          </div>

          <p className="mt-3 text-2xl font-bold text-slate-900">
            {accounts.length}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-medium text-slate-500">
            Rekening Aktif
          </p>

          <p className="mt-3 text-2xl font-bold text-slate-900">
            {rekeningAktif}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-medium text-slate-500">
            Rekening Diblokir
          </p>

          <p className="mt-3 text-2xl font-bold text-slate-900">
            {rekeningDiblokir}
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm font-medium text-slate-500">
            Total Saldo
          </p>

          <p className="mt-3 text-xl font-bold text-slate-900">
            {formatRupiah(totalSaldo)}
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
              placeholder="Cari nama atau nomor rekening..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:bg-white"
            />
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
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
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-slate-400 sm:w-auto"
              >
                <option value="Semua">
                  Semua Jenis
                </option>

                <option value="Tabungan">
                  Tabungan
                </option>

                <option value="Giro">
                  Giro
                </option>

                <option value="Deposito">
                  Deposito
                </option>
              </select>
            </div>

            <select
              value={status}
              onChange={(event) =>
                setStatus(event.target.value)
              }
              className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-600 outline-none focus:border-slate-400"
            >
              <option value="Semua">
                Semua Status
              </option>

              <option value="Aktif">
                Aktif
              </option>

              <option value="Diblokir">
                Diblokir
              </option>

              <option value="Ditangguhkan">
                Ditangguhkan
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Tabel */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1150px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Rekening
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Nasabah
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Jenis
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Saldo
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Dibuka
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
              {filteredAccounts.length > 0 ? (
                filteredAccounts.map((account) => (
                  <tr
                    key={account.id}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <p className="text-sm font-semibold text-slate-900">
                        {account.noRekening}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {account.id}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-sm font-medium text-slate-900">
                        {account.namaNasabah}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        {account.customerId}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {account.jenisRekening}
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-slate-900">
                      {formatRupiah(account.saldo)}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-500">
                      {account.tanggalDibuka}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${getStatusStyle(
                          account.status,
                        )}`}
                      >
                        {account.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      {account.status === 'Ditangguhkan' ? (
                        <button
                          type="button"
                          disabled
                          className="inline-flex cursor-not-allowed items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-400"
                        >
                          Ditangguhkan
                        </button>
                      ) : account.status === 'Diblokir' ? (
                        <button
                          type="button"
                          onClick={() =>
                            toggleBlokir(account.id)
                          }
                          className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 transition hover:bg-emerald-100"
                        >
                          <LockOpen size={16} />
                          Buka Blokir
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() =>
                            toggleBlokir(account.id)
                          }
                          className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700 transition hover:bg-red-100"
                        >
                          <Ban size={16} />
                          Blokir
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-12 text-center text-sm text-slate-500"
                  >
                    Data rekening tidak ditemukan.
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

export default Accounts