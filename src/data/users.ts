import type { AuthUser } from '../types/auth'

export interface LoginUser extends AuthUser {
  password: string
}

export const users: LoginUser[] = [
  {
    id: 'USR-001',
    nama: 'Khalil',
    email: 'admin@bankops.id',
    password: 'admin123',
    role: 'Administrator',
  },
  {
    id: 'USR-002',
    nama: 'Supervisor Operasional',
    email: 'supervisor@bankops.id',
    password: 'supervisor123',
    role: 'Supervisor',
  },
  {
    id: 'USR-003',
    nama: 'Fraud Analyst',
    email: 'fraud@bankops.id',
    password: 'fraud123',
    role: 'Fraud Analyst',
  },
]