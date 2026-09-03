import {
  Eye,
  EyeOff,
  Landmark,
  LockKeyhole,
  Mail,
} from 'lucide-react'

import {
  type FormEvent,
  useState,
} from 'react'

import {
  Navigate,
  useNavigate,
} from 'react-router-dom'

import { useAuthStore } from '../store/authStore'

function Login() {
  const navigate = useNavigate()

  const user = useAuthStore(
    (state) => state.user,
  )

  const login = useAuthStore(
    (state) => state.login,
  )

  const [email, setEmail] = useState('')
  const [password, setPassword] =
    useState('')

  const [showPassword, setShowPassword] =
    useState(false)

  const [error, setError] = useState('')

  if (user) {
    return <Navigate to="/" replace />
  }

  function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault()

    setError('')

    if (!email || !password) {
      setError(
        'Email dan password wajib diisi.',
      )

      return
    }

    const berhasil = login(
      email,
      password,
    )

    if (!berhasil) {
      setError(
        'Email atau password tidak sesuai.',
      )

      return
    }

    navigate('/')
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sisi kiri */}
      <div className="hidden w-1/2 bg-slate-950 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-slate-950">
              <Landmark size={22} />
            </div>

            <div>
              <h1 className="text-xl font-bold">
                BankOps
              </h1>

              <p className="text-xs text-slate-400">
                Sistem Operasional Perbankan
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-lg">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-400">
            Banking Operations
          </p>

          <h2 className="mt-4 text-4xl font-bold leading-tight">
            Kelola aktivitas operasional bank dalam satu sistem.
          </h2>

          <p className="mt-5 text-base leading-7 text-slate-400">
            Pantau nasabah, rekening,
            transaksi, fraud, persetujuan,
            laporan, dan aktivitas sistem
            melalui dashboard terintegrasi.
          </p>
        </div>

        <p className="text-xs text-slate-500">
          BankOps • Sistem simulasi untuk
          portfolio
        </p>
      </div>

      {/* Form login */}
      <div className="flex w-full items-center justify-center p-6 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-950 text-white">
                <Landmark size={20} />
              </div>

              <div>
                <h1 className="font-bold text-slate-900">
                  BankOps
                </h1>

                <p className="text-xs text-slate-500">
                  Operasional Perbankan
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Masuk ke BankOps
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Gunakan akun yang sesuai
              dengan peran pengguna.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8"
          >
            <div>
              <label
                htmlFor="email"
                className="text-sm font-semibold text-slate-700"
              >
                Email
              </label>

              <div className="relative mt-2">
                <Mail
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) =>
                    setEmail(
                      event.target.value,
                    )
                  }
                  placeholder="nama@bankops.id"
                  className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-slate-400"
                />
              </div>
            </div>

            <div className="mt-5">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-slate-700"
              >
                Password
              </label>

              <div className="relative mt-2">
                <LockKeyhole
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="password"
                  type={
                    showPassword
                      ? 'text'
                      : 'password'
                  }
                  value={password}
                  onChange={(event) =>
                    setPassword(
                      event.target.value,
                    )
                  }
                  placeholder="Masukkan password"
                  className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-10 pr-12 text-sm text-slate-700 outline-none transition focus:border-slate-400"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword,
                    )
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-700"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="mt-6 w-full rounded-lg bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Masuk
            </button>
          </form>

         
        </div>
      </div>
    </div>
  )
}

export default Login