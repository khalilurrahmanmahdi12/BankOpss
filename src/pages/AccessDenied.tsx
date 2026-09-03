import {
  ArrowLeft,
  Home,
  ShieldBan,
} from 'lucide-react'

import {
  Link,
  useNavigate,
} from 'react-router-dom'

function AccessDenied() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-xl text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-red-50 text-red-600">
          <ShieldBan size={38} />
        </div>

        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-red-600">
          Error 403
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Akses Ditolak
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-500 sm:text-base">
          Akun yang sedang digunakan tidak memiliki
          hak akses untuk membuka halaman ini.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            <ArrowLeft size={17} />
            Kembali
          </button>

          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            <Home size={17} />
            Ke Dashboard
          </Link>
        </div>

        <div className="mt-10 rounded-xl border border-slate-200 bg-white p-4 text-left">
          <p className="text-sm font-semibold text-slate-900">
            Mengapa akses dibatasi?
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            BankOps menggunakan kontrol akses berbasis
            peran untuk membatasi modul sesuai tanggung
            jawab Administrator, Supervisor, dan Fraud
            Analyst.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AccessDenied