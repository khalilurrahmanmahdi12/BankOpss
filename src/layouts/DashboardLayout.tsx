import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import Sidebar from '../components/navigation/Sidebar'
import Navbar from '../components/navigation/Navbar'

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  function openSidebar() {
    setSidebarOpen(true)
  }

  function closeSidebar() {
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={closeSidebar}
      />

      <div className="lg:pl-64">
        <Navbar onOpenSidebar={openSidebar} />

        <main className="p-4 sm:p-5 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout