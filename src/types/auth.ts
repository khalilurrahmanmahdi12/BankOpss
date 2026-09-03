export type UserRole =
  | 'Administrator'
  | 'Supervisor'
  | 'Fraud Analyst'

export interface AuthUser {
  id: string
  nama: string
  email: string
  role: UserRole
}