import {
  ArrowLeftRight,
  Landmark,
  ShieldAlert,
  Users,
} from 'lucide-react'

import PageLoading from '../components/common/PageLoading'
import usePageLoading from '../hooks/usePageLoading'

import StatCard from '../components/dashboard/StatCard'
import TransactionChart from '../components/dashboard/TransactionChart'
import RecentTransactions from '../components/dashboard/RecentTransactions'
import FraudAlertPanel from '../components/dashboard/FraudAlertPanel'
import PendingApprovalPanel from '../components/dashboard/PendingApprovalPanel'

function Dashboard() {
  const loading = usePageLoading()

  if (loading) {
    return <PageLoading />
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Dashboard
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Pantau aktivitas operasional dan transaksi perbankan.
        </p>
      </div>

      {/* Statistik */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Volume Transaksi"
          value="Rp 4,28 M"
          change="8.2%"
          changeType="up"
          description="dari bulan lalu"
          icon={Landmark}
        />

        <StatCard
          title="Jumlah Transaksi"
          value="12.481"
          change="12.5%"
          changeType="up"
          description="dari bulan lalu"
          icon={ArrowLeftRight}
        />

        <StatCard
          title="Total Nasabah"
          value="3.420"
          change="5.7%"
          changeType="up"
          description="dari bulan lalu"
          icon={Users}
        />

        <StatCard
          title="Peringatan Fraud"
          value="17"
          change="3.1%"
          changeType="down"
          description="dari bulan lalu"
          icon={ShieldAlert}
        />
      </div>

      {/* Grafik Ringkasan Transaksi */}
      <div className="mt-6">
        <TransactionChart />
      </div>

      {/* Transaksi Terbaru */}
      <div className="mt-6">
        <RecentTransactions />
      </div>

      {/* Fraud & Persetujuan */}
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <FraudAlertPanel />
        <PendingApprovalPanel />
      </div>
    </div>
  )
}

export default Dashboard