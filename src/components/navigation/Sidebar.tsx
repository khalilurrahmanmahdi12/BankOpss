import {
  ArrowLeftRight,
  CircleCheckBig,
  FileText,
  Landmark,
  LayoutDashboard,
  ScrollText,
  ShieldAlert,
  Users,
  X,
} from 'lucide-react'

import { NavLink } from 'react-router-dom'

import { useAuthStore } from '../../store/authStore'
import type { UserRole } from '../../types/auth'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

interface MenuItem {
  name: string
  path: string
  icon: typeof LayoutDashboard
  roles: UserRole[]
}

const menuItems: MenuItem[] = [
  {
    name: 'Dashboard',
    path: '/',
    icon: LayoutDashboard,
    roles: [
      'Administrator',
      'Supervisor',
      'Fraud Analyst',
    ],
  },
  {
    name: 'Nasabah',
    path: '/customers',
    icon: Users,
    roles: [
      'Administrator',
      'Supervisor',
    ],
  },
  {
    name: 'Rekening',
    path: '/accounts',
    icon: Landmark,
    roles: [
      'Administrator',
      'Supervisor',
    ],
  },
  {
    name: 'Transaksi',
    path: '/transactions',
    icon: ArrowLeftRight,
    roles: [
      'Administrator',
      'Supervisor',
      'Fraud Analyst',
    ],
  },
  {
    name: 'Peringatan Fraud',
    path: '/fraud-alerts',
    icon: ShieldAlert,
    roles: [
      'Administrator',
      'Fraud Analyst',
    ],
  },
  {
    name: 'Persetujuan',
    path: '/approvals',
    icon: CircleCheckBig,
    roles: [
      'Administrator',
      'Supervisor',
    ],
  },
  {
    name: 'Laporan',
    path: '/reports',
    icon: FileText,
    roles: [
      'Administrator',
      'Supervisor',
    ],
  },
  {
    name: 'Log Audit',
    path: '/audit-logs',
    icon: ScrollText,
    roles: ['Administrator'],
  },
]

function Sidebar({
  isOpen,
  onClose,
}: SidebarProps) {
  const user = useAuthStore(
    (state) => state.user,
  )

  const visibleMenuItems = menuItems.filter(
    (item) =>
      user
        ? item.roles.includes(user.role)
        : false,
  )

  return (
    <>
      {/* Overlay Mobile */}
      {isOpen && (
        <button
          type="button"
          aria-label="Tutup sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/50 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-800 bg-slate-950 transition-transform duration-300 lg:translate-x-0 ${
          isOpen
            ? 'translate-x-0'
            : '-translate-x-full'
        }`}
      >
        {/* Header Sidebar */}
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-slate-800 px-5">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              BankOps
            </h1>

            <p className="text-xs text-slate-400">
              Operasional Perbankan
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-800 hover:text-white lg:hidden"
            aria-label="Tutup menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigasi */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-1">
            {visibleMenuItems.map((item) => {
              const Icon = item.icon

              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.path === '/'}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                      isActive
                        ? 'bg-slate-800 text-white'
                        : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                    }`
                  }
                >
                  <Icon
                    size={19}
                    className="shrink-0"
                  />

                  <span>
                    {item.name}
                  </span>
                </NavLink>
              )
            })}
          </div>
        </nav>

        {/* User Mobile */}
        {user && (
          <div className="shrink-0 border-t border-slate-800 p-4 lg:hidden">
            <p className="truncate text-sm font-semibold text-white">
              {user.nama}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              {user.role}
            </p>
          </div>
        )}
      </aside>
    </>
  )
}

export default Sidebar