import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom'

import DashboardLayout from './layouts/DashboardLayout'

import ProtectedRoute from './components/common/ProtectedRoute'
import RoleRoute from './components/common/RoleRoute'

import Login from './pages/Login'

import Dashboard from './pages/Dashboard'
import Customers from './pages/Customers'
import CustomerDetail from './pages/CustomerDetail'
import Accounts from './pages/Accounts'
import Transactions from './pages/Transactions'
import TransactionDetail from './pages/TransactionDetail'
import FraudAlerts from './pages/FraudAlerts'
import Approvals from './pages/Approvals'
import Reports from './pages/Reports'
import AuditLogs from './pages/AuditLogs'
import Profile from './pages/Profile'

import AccessDenied from './pages/AccessDenied'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Area Terproteksi */}
        <Route
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          {/* Dashboard */}
          <Route
            path="/"
            element={<Dashboard />}
          />

          {/* Profil */}
          <Route
            path="/profile"
            element={<Profile />}
          />

          {/* Nasabah */}
          <Route
            path="/customers"
            element={
              <RoleRoute
                roles={[
                  'Administrator',
                  'Supervisor',
                ]}
              >
                <Customers />
              </RoleRoute>
            }
          />

          <Route
            path="/customers/:id"
            element={
              <RoleRoute
                roles={[
                  'Administrator',
                  'Supervisor',
                ]}
              >
                <CustomerDetail />
              </RoleRoute>
            }
          />

          {/* Rekening */}
          <Route
            path="/accounts"
            element={
              <RoleRoute
                roles={[
                  'Administrator',
                  'Supervisor',
                ]}
              >
                <Accounts />
              </RoleRoute>
            }
          />

          {/* Transaksi */}
          <Route
            path="/transactions"
            element={
              <RoleRoute
                roles={[
                  'Administrator',
                  'Supervisor',
                  'Fraud Analyst',
                ]}
              >
                <Transactions />
              </RoleRoute>
            }
          />

          <Route
            path="/transactions/:id"
            element={
              <RoleRoute
                roles={[
                  'Administrator',
                  'Supervisor',
                  'Fraud Analyst',
                ]}
              >
                <TransactionDetail />
              </RoleRoute>
            }
          />

          {/* Fraud */}
          <Route
            path="/fraud-alerts"
            element={
              <RoleRoute
                roles={[
                  'Administrator',
                  'Fraud Analyst',
                ]}
              >
                <FraudAlerts />
              </RoleRoute>
            }
          />

          {/* Persetujuan */}
          <Route
            path="/approvals"
            element={
              <RoleRoute
                roles={[
                  'Administrator',
                  'Supervisor',
                ]}
              >
                <Approvals />
              </RoleRoute>
            }
          />

          {/* Laporan */}
          <Route
            path="/reports"
            element={
              <RoleRoute
                roles={[
                  'Administrator',
                  'Supervisor',
                ]}
              >
                <Reports />
              </RoleRoute>
            }
          />

          {/* Log Audit */}
          <Route
            path="/audit-logs"
            element={
              <RoleRoute
                roles={[
                  'Administrator',
                ]}
              >
                <AuditLogs />
              </RoleRoute>
            }
          />

          {/* 403 */}
          <Route
            path="/403"
            element={<AccessDenied />}
          />

          {/* 404 */}
          <Route
            path="*"
            element={<NotFound />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App