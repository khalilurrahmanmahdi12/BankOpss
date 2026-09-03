import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Search,
  UserRound,
} from 'lucide-react'

import {
  useEffect,
  useRef,
  useState,
} from 'react'

import { useNavigate } from 'react-router-dom'

import { useAuthStore } from '../../store/authStore'

import {
  notifications as initialNotifications,
  type Notification,
} from '../../data/notifications'

import NotificationPanel from './NotificationPanel'

interface NavbarProps {
  onOpenSidebar: () => void
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

function Navbar({
  onOpenSidebar,
}: NavbarProps) {
  const navigate = useNavigate()

  const user = useAuthStore(
    (state) => state.user,
  )

  const logout = useAuthStore(
    (state) => state.logout,
  )

  const [profileOpen, setProfileOpen] =
    useState(false)

  const [
    notificationOpen,
    setNotificationOpen,
  ] = useState(false)

  const [
    notificationItems,
    setNotificationItems,
  ] = useState<Notification[]>(
    initialNotifications,
  )

  const profileRef =
    useRef<HTMLDivElement>(null)

  const notificationRef =
    useRef<HTMLDivElement>(null)

  const unreadCount =
    notificationItems.filter(
      (notification) =>
        !notification.read,
    ).length

  function handleLogout() {
    setProfileOpen(false)
    setNotificationOpen(false)

    logout()

    navigate('/login')
  }

  function handleProfileToggle() {
    setProfileOpen(
      (current) => !current,
    )

    setNotificationOpen(false)
  }

  function handleNotificationToggle() {
    setNotificationOpen(
      (current) => !current,
    )

    setProfileOpen(false)
  }

  function markAsRead(id: string) {
    setNotificationItems(
      (currentNotifications) =>
        currentNotifications.map(
          (notification) =>
            notification.id === id
              ? {
                  ...notification,
                  read: true,
                }
              : notification,
        ),
    )
  }

  function markAllAsRead() {
    setNotificationItems(
      (currentNotifications) =>
        currentNotifications.map(
          (notification) => ({
            ...notification,
            read: true,
          }),
        ),
    )
  }

  useEffect(() => {
    function handleClickOutside(
      event: MouseEvent,
    ) {
      const target =
        event.target as Node

      if (
        profileRef.current &&
        !profileRef.current.contains(target)
      ) {
        setProfileOpen(false)
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(
          target,
        )
      ) {
        setNotificationOpen(false)
      }
    }

    document.addEventListener(
      'mousedown',
      handleClickOutside,
    )

    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside,
      )
    }
  }, [])

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center border-b border-slate-200 bg-white px-4 sm:h-20 sm:px-6">
      {/* Hamburger Mobile */}
      <button
        type="button"
        onClick={onOpenSidebar}
        className="mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 lg:hidden"
        aria-label="Buka menu navigasi"
      >
        <Menu size={21} />
      </button>

      {/* Judul Desktop */}
      <div className="hidden lg:block">
        <h2 className="text-sm font-medium text-slate-500">
          Sistem Operasional Perbankan
        </h2>
      </div>

      {/* Logo Mobile */}
      <div className="lg:hidden">
        <p className="font-bold tracking-tight text-slate-900">
          BankOps
        </p>

        <p className="hidden text-xs text-slate-400 sm:block">
          Sistem Operasional Perbankan
        </p>
      </div>

      {/* Kanan */}
      <div className="ml-auto flex min-w-0 items-center gap-2 sm:gap-3">
        {/* Pencarian Desktop */}
        <div className="relative hidden xl:block">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Cari..."
            className="w-64 rounded-lg border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm outline-none transition focus:border-slate-400 focus:bg-white"
          />
        </div>

        {/* Notifikasi */}
        <div
          ref={notificationRef}
          className="relative"
        >
          <button
            type="button"
            onClick={
              handleNotificationToggle
            }
            className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="Notifikasi"
            aria-expanded={
              notificationOpen
            }
          >
            <Bell size={20} />

            {unreadCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white ring-2 ring-white">
                {unreadCount > 9
                  ? '9+'
                  : unreadCount}
              </span>
            )}
          </button>

          {notificationOpen && (
            <NotificationPanel
              notifications={
                notificationItems
              }
              onMarkAsRead={
                markAsRead
              }
              onMarkAllAsRead={
                markAllAsRead
              }
              onClose={() =>
                setNotificationOpen(
                  false,
                )
              }
            />
          )}
        </div>

        <div className="hidden h-8 w-px bg-slate-200 sm:block" />

        {/* Profil */}
        {user && (
          <div
            ref={profileRef}
            className="relative"
          >
            <button
              type="button"
              onClick={
                handleProfileToggle
              }
              className="flex items-center gap-2 rounded-lg p-1.5 transition hover:bg-slate-100 sm:gap-3"
              aria-expanded={
                profileOpen
              }
              aria-haspopup="menu"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white sm:h-10 sm:w-10 sm:text-sm">
                {getInitials(
                  user.nama,
                )}
              </div>

              <div className="hidden min-w-0 text-left md:block">
                <p className="max-w-40 truncate text-sm font-semibold text-slate-900">
                  {user.nama}
                </p>

                <p className="text-xs text-slate-500">
                  {user.role}
                </p>
              </div>

              <ChevronDown
                size={16}
                className={`hidden text-slate-400 transition-transform md:block ${
                  profileOpen
                    ? 'rotate-180'
                    : ''
                }`}
              />
            </button>

            {/* Dropdown Profil */}
            {profileOpen && (
              <div className="absolute right-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
                <div className="border-b border-slate-100 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
                      {getInitials(
                        user.nama,
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {user.nama}
                      </p>

                      <p className="mt-0.5 truncate text-xs text-slate-500">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3">
                    <span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
                      {user.role}
                    </span>
                  </div>
                </div>

                <div className="p-2">
                  <button
                    type="button"
                    onClick={() =>
                      setProfileOpen(
                        false,
                      )
                    }
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                  >
                    <UserRound
                      size={17}
                    />
                    Informasi Akun
                  </button>

                  <button
                    type="button"
                    onClick={
                      handleLogout
                    }
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                  >
                    <LogOut size={17} />
                    Keluar
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

export default Navbar