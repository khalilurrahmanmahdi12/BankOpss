import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string
  change: string
  changeType?: 'up' | 'down'
  icon: LucideIcon
  description: string
}

function StatCard({
  title,
  value,
  change,
  changeType = 'up',
  icon: Icon,
  description,
}: StatCardProps) {
  const isUp = changeType === 'up'

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h3 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            {value}
          </h3>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
          <Icon size={21} />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <span
          className={`text-sm font-semibold ${
            isUp ? 'text-emerald-600' : 'text-red-600'
          }`}
        >
          {isUp ? '↑' : '↓'} {change}
        </span>

        <span className="text-sm text-slate-400">
          {description}
        </span>
      </div>
    </div>
  )
}

export default StatCard