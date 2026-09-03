import type { ReactNode } from 'react'

import {
  Navigate,
  useLocation,
} from 'react-router-dom'

import { useAuthStore } from '../../store/authStore'

interface ProtectedRouteProps {
  children: ReactNode
}

function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const location = useLocation()

  const user = useAuthStore(
    (state) => state.user,
  )

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          from: location.pathname,
        }}
      />
    )
  }

  return children
}

export default ProtectedRoute