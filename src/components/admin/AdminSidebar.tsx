'use client'

import Link from 'next/link'
import { LayoutDashboard, Users, Building2, FileText, Settings } from 'lucide-react'

const menuItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    name: 'Users',
    href: '/dashboard/users',
    icon: Users,
  },
  {
    name: 'CSC Centers',
    href: '/dashboard/csc-centers',
    icon: Building2,
  },
  {
    name: 'Services',
    href: '/dashboard/services',
    icon: FileText,
  },
  {
    name: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
]

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-white border-r shadow-sm">
      <div className="p-6">
        <h2 className="text-xl font-bold text-blue-600">CSC Admin</h2>
      </div>

      <nav className="px-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon

          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-4 py-3 hover:bg-gray-100 transition"
            >
              <Icon className="h-5 w-5" />
              <span>{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}