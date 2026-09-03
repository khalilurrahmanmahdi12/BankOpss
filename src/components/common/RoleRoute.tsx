import type { ReactNode } from 'react'

import { Navigate } from 'react-router-dom'

import { useAuthStore } from '../../store/authStore'
import type { UserRole } from '../../types/auth'

interface RoleRouteProps {
  roles: UserRole[]
  children: ReactNode
}

function RoleRoute({
  roles,
  children,
}: RoleRouteProps) {
  const user = useAuthStore(
    (state) => state.user,
  )

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
      />
    )
  }

  if (!roles.includes(user.role)) {
    return (
      <Navigate
        to="/403"
        replace
      />
    )
  }

  return children
}

export default RoleRoute