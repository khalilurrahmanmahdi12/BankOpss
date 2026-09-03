import {
  BadgeCheck,
  Mail,
  ShieldCheck,
  UserRound,
} from 'lucide-react'

import { useAuthStore } from '../store/authStore'

function getInitials(name: string) {
  return name
    .split(' ')
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

function Profile() {
  const user = useAuthStore(
    (state) => state.user,
  )

  if (!user) {
    return null
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Informasi Akun
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Informasi akun dan hak akses pengguna BankOps.
        </p>
      </div>

      {/* Profile Card */}
      <div className="max-w-3xl overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-slate-950 text-lg font-bold text-white">
              {getInitials(user.nama)}
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {user.nama}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {user.email}
              </p>

              <span className="mt-3 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                {user.role}
              </span>
            </div>
          </div>
        </div>

        {/* Detail Akun */}
        <div className="p-5 sm:p-6">
          <h3 className="text-sm font-semibold text-slate-900">
            Detail Akun
          </h3>

          <div className="mt-5 divide-y divide-slate-100">
            {/* Nama */}
            <div className="flex items-start gap-4 py-4 first:pt-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                <UserRound size={18} />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Nama
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {user.nama}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4 py-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                <Mail size={18} />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Email
                </p>

                <p className="mt-1 break-all text-sm font-semibold text-slate-900">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Role */}
            <div className="flex items-start gap-4 py-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                <ShieldCheck size={18} />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Peran
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-900">
                  {user.role}
                </p>
              </div>
            </div>

            {/* Status */}
            <div className="flex items-start gap-4 py-4 last:pb-0">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                <BadgeCheck size={18} />
              </div>

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  Status Akun
                </p>

                <div className="mt-1 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />

                  <p className="text-sm font-semibold text-emerald-600">
                    Aktif
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Informasi Sistem */}
      <div className="mt-6 max-w-3xl rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
        <h3 className="text-sm font-semibold text-slate-900">
          Hak Akses
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Hak akses pengguna ditentukan berdasarkan peran
          yang diberikan dalam sistem BankOps.
        </p>

        <div className="mt-4 rounded-lg bg-slate-50 p-4">
          <p className="text-sm text-slate-600">
            Peran aktif:
            <span className="ml-1 font-semibold text-slate-900">
              {user.role}
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Profile