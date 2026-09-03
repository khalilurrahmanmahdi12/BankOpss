import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const dataTransaksi = [
  {
    bulan: 'Jan',
    masuk: 320,
    keluar: 210,
  },
  {
    bulan: 'Feb',
    masuk: 380,
    keluar: 250,
  },
  {
    bulan: 'Mar',
    masuk: 350,
    keluar: 230,
  },
  {
    bulan: 'Apr',
    masuk: 470,
    keluar: 310,
  },
  {
    bulan: 'Mei',
    masuk: 520,
    keluar: 360,
  },
  {
    bulan: 'Jun',
    masuk: 490,
    keluar: 330,
  },
  {
    bulan: 'Jul',
    masuk: 610,
    keluar: 410,
  },
  {
    bulan: 'Agu',
    masuk: 680,
    keluar: 450,
  },
]

function TransactionChart() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            Ringkasan Transaksi
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Perbandingan transaksi masuk dan keluar tahun 2026.
          </p>
        </div>

        <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600 outline-none focus:border-slate-400">
          <option>2026</option>
          <option>2025</option>
          <option>2024</option>
        </select>
      </div>

      {/* Legenda */}
      <div className="mb-5 flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-900" />
          <span className="text-sm text-slate-500">
            Transaksi Masuk
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-400" />
          <span className="text-sm text-slate-500">
            Transaksi Keluar
          </span>
        </div>
      </div>

      {/* Grafik */}
      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={dataTransaksi}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient
                id="warnaMasuk"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#0f172a"
                  stopOpacity={0.18}
                />

                <stop
                  offset="95%"
                  stopColor="#0f172a"
                  stopOpacity={0}
                />
              </linearGradient>

              <linearGradient
                id="warnaKeluar"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#94a3b8"
                  stopOpacity={0.18}
                />

                <stop
                  offset="95%"
                  stopColor="#94a3b8"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke="#e2e8f0"
            />

            <XAxis
              dataKey="bulan"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: '#64748b',
                fontSize: 12,
              }}
              dy={10}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: '#64748b',
                fontSize: 12,
              }}
            />

            <Tooltip
              contentStyle={{
                borderRadius: '10px',
                border: '1px solid #e2e8f0',
                backgroundColor: '#ffffff',
              }}
              labelStyle={{
                fontWeight: 600,
                color: '#0f172a',
              }}
            />

            <Area
              type="monotone"
              dataKey="masuk"
              name="Transaksi Masuk"
              stroke="#0f172a"
              strokeWidth={2}
              fill="url(#warnaMasuk)"
            />

            <Area
              type="monotone"
              dataKey="keluar"
              name="Transaksi Keluar"
              stroke="#94a3b8"
              strokeWidth={2}
              fill="url(#warnaKeluar)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default TransactionChart