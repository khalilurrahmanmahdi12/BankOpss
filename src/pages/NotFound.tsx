import {
  ArrowLeft,
  Home,
  SearchX,
} from 'lucide-react'

import {
  Link,
  useNavigate,
} from 'react-router-dom'

function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="w-full max-w-xl text-center">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-100 text-slate-600">
          <SearchX size={38} />
        </div>

        <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Error 404
        </p>

        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Halaman Tidak Ditemukan
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-500 sm:text-base">
          Halaman yang kamu cari tidak tersedia,
          sudah dipindahkan, atau alamat yang dimasukkan
          tidak sesuai.
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
      </div>
    </div>
  )
}

export default NotFound