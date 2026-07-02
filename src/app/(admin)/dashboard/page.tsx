import { prisma } from '@/lib/db/prisma'
import { Users, MapPin, Calendar, TrendingUp } from 'lucide-react'

async function getStats() {
  const [totalUsers, totalCenters, totalAppointments, pendingAppointments] = await Promise.all([
    prisma.user.count({ where: { isDeleted: false } }),
    prisma.cSCCenter.count({ where: { isDeleted: false } }),
    prisma.appointment.count({ where: { isDeleted: false } }),
    prisma.appointment.count({ where: { status: 'PENDING', isDeleted: false } }),
  ])
  return { totalUsers, totalCenters, totalAppointments, pendingAppointments }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  const cards = [
    { label: 'Total Users', value: stats.totalUsers, icon: Users, color: 'blue' },
    { label: 'CSC Centers', value: stats.totalCenters, icon: MapPin, color: 'green' },
    { label: 'Total Appointments', value: stats.totalAppointments, icon: Calendar, color: 'purple' },
    { label: 'Pending', value: stats.pendingAppointments, icon: TrendingUp, color: 'orange' },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Dashboard Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cards.map(card => (
          <div key={card.label} className="bg-white rounded-2xl p-6 shadow-sm border">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">{card.label}</span>
              <card.icon className={`h-5 w-5 text-${card.color}-500`} />
            </div>
            <p className="text-3xl font-bold text-gray-900">{card.value.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  )
}