import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import {
  Eye,
  Search,
  SlidersHorizontal,
  Users,
} from 'lucide-react'

import { customers } from '../data/customers'

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

function Customers() {
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('Semua')

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const cocokPencarian =
        customer.nama
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        customer.email
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        customer.noRekening.includes(search)

      const cocokStatus =
        status === 'Semua' ||
        customer.status === status

      return cocokPencarian && cocokStatus
    })
  }, [search, status])

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Nasabah
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Kelola dan pantau informasi nasabah.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2">
          <Users
            size={18}
            className="text-slate-500"
          />

          <span className="text-sm text-slate-500">
            Total Nasabah
          </span>

          <span className="font-semibold text-slate-900">
            {customers.length}
          </span>
        </div>
      </div>

      {/* Filter */}
      <div className="mb-5 flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 md:flex-row md:items-center md:justify-between">
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
            placeholder="Cari nama, email, atau nomor rekening..."
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2">
          <SlidersHorizontal
            size={17}
            className="text-slate-400"
          />

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

      {/* Tabel */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px]">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50">
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Nasabah
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Nomor Rekening
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Jenis Rekening
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Saldo
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
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => (
                  <tr
                    key={customer.id}
                    className="transition hover:bg-slate-50"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold text-slate-700">
                          {customer.nama
                            .split(' ')
                            .map((nama) => nama[0])
                            .slice(0, 2)
                            .join('')}
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-slate-900">
                            {customer.nama}
                          </p>

                          <p className="mt-0.5 text-xs text-slate-500">
                            {customer.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-sm font-medium text-slate-700">
                      {customer.noRekening}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {customer.jenisRekening}
                    </td>

                    <td className="px-5 py-4 text-sm font-semibold text-slate-900">
                      {formatRupiah(
                        customer.saldo,
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${getStatusStyle(
                          customer.status,
                        )}`}
                      >
                        {customer.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right">
                      <Link
                        to={`/customers/${customer.id}`}
                        className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                      >
                        <Eye size={16} />
                        Detail
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-12 text-center text-sm text-slate-500"
                  >
                    Data nasabah tidak ditemukan.
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

export default Customers