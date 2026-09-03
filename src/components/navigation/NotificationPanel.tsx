import {
  ArrowLeftRight,
  CheckCheck,
  CircleCheckBig,
  Info,
  ShieldAlert,
} from 'lucide-react'

import { useNavigate } from 'react-router-dom'

import type {
  Notification,
  NotificationType,
} from '../../data/notifications'

interface NotificationPanelProps {
  notifications: Notification[]
  onMarkAsRead: (id: string) => void
  onMarkAllAsRead: () => void
  onClose: () => void
}

function getNotificationIcon(
  type: NotificationType,
) {
  switch (type) {
    case 'Fraud':
      return ShieldAlert

    case 'Transaksi':
      return ArrowLeftRight

    case 'Persetujuan':
      return CircleCheckBig

    default:
      return Info
  }
}

function getIconStyle(
  type: NotificationType,
) {
  switch (type) {
    case 'Fraud':
      return 'bg-red-50 text-red-600'

    case 'Transaksi':
      return 'bg-blue-50 text-blue-600'

    case 'Persetujuan':
      return 'bg-amber-50 text-amber-600'

    default:
      return 'bg-slate-100 text-slate-600'
  }
}

function NotificationPanel({
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onClose,
}: NotificationPanelProps) {
  const navigate = useNavigate()

  const unreadCount = notifications.filter(
    (notification) => !notification.read,
  ).length

  function handleNotificationClick(
    notification: Notification,
  ) {
    onMarkAsRead(notification.id)

    onClose()

    if (notification.path) {
      navigate(notification.path)
    }
  }

  return (
    <div className="fixed left-4 right-4 top-20 z-50 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg sm:absolute sm:left-auto sm:right-0 sm:top-full sm:mt-2 sm:w-96">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <div className="min-w-0">
          <h3 className="text-sm font-semibold text-slate-900">
            Notifikasi
          </h3>

          <p className="mt-0.5 truncate text-xs text-slate-500">
            {unreadCount > 0
              ? `${unreadCount} notifikasi belum dibaca`
              : 'Semua notifikasi sudah dibaca'}
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={onMarkAllAsRead}
            className="ml-3 flex shrink-0 items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="Tandai semua notifikasi sebagai dibaca"
          >
            <CheckCheck size={16} />

            <span className="hidden sm:inline">
              Tandai Semua
            </span>
          </button>
        )}
      </div>

      {/* Daftar Notifikasi */}
      <div className="max-h-[60vh] overflow-y-auto sm:max-h-[420px]">
        {notifications.length > 0 ? (
          notifications.map(
            (notification) => {
              const Icon =
                getNotificationIcon(
                  notification.type,
                )

              return (
                <button
                  key={notification.id}
                  type="button"
                  onClick={() =>
                    handleNotificationClick(
                      notification,
                    )
                  }
                  className={`flex w-full items-start gap-3 border-b border-slate-100 px-4 py-4 text-left transition last:border-b-0 hover:bg-slate-50 ${
                    !notification.read
                      ? 'bg-slate-50/70'
                      : 'bg-white'
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${getIconStyle(
                      notification.type,
                    )}`}
                  >
                    <Icon size={18} />
                  </div>

                  {/* Isi */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="min-w-0 text-sm font-semibold leading-5 text-slate-900">
                        {notification.title}
                      </p>

                      {!notification.read && (
                        <span
                          className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-blue-600"
                          aria-label="Belum dibaca"
                        />
                      )}
                    </div>

                    <p className="mt-1 break-words text-sm leading-5 text-slate-500">
                      {notification.message}
                    </p>

                    <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                      <p className="text-xs text-slate-400">
                        {notification.time}
                      </p>

                      <span className="text-[11px] font-medium text-slate-400">
                        {notification.type}
                      </span>
                    </div>
                  </div>
                </button>
              )
            },
          )
        ) : (
          <div className="px-4 py-10 text-center">
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <Info size={18} />
            </div>

            <p className="mt-3 text-sm font-medium text-slate-700">
              Belum ada notifikasi
            </p>

            <p className="mt-1 text-xs text-slate-400">
              Notifikasi aktivitas BankOps akan muncul di sini.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default NotificationPanel