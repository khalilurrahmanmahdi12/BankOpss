import { create } from 'zustand'

import type {
  AuthUser,
  UserRole,
} from '../types/auth'

import { users } from '../data/users'

interface AuthState {
  user: AuthUser | null
  login: (
    email: string,
    password: string,
  ) => boolean
  logout: () => void
  hasRole: (roles: UserRole[]) => boolean
}

function getStoredUser(): AuthUser | null {
  const stored = localStorage.getItem(
    'bankops-user',
  )

  if (!stored) {
    return null
  }

  try {
    return JSON.parse(stored)
  } catch {
    return null
  }
}

export const useAuthStore =
  create<AuthState>((set, get) => ({
    user: getStoredUser(),

    login: (email, password) => {
      const matchedUser = users.find(
        (user) =>
          user.email === email &&
          user.password === password,
      )

      if (!matchedUser) {
        return false
      }

      const authUser: AuthUser = {
        id: matchedUser.id,
        nama: matchedUser.nama,
        email: matchedUser.email,
        role: matchedUser.role,
      }

      localStorage.setItem(
        'bankops-user',
        JSON.stringify(authUser),
      )

      set({
        user: authUser,
      })

      return true
    },

    logout: () => {
      localStorage.removeItem(
        'bankops-user',
      )

      set({
        user: null,
      })
    },

    hasRole: (roles) => {
      const user = get().user

      if (!user) {
        return false
      }

      return roles.includes(user.role)
    },
  }))