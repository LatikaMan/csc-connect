'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/csc-finder', label: 'Find CSC' },
  { href: '/schemes', label: 'Schemes' },
  { href: '/status', label: 'Track Status' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <MapPin className="h-6 w-6 text-blue-600" />
            <span className="font-bold text-xl text-gray-900">CSC Connect</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href}
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors">
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
           <div className="flex items-center gap-3">
  <Button variant="ghost" asChild>
    <Link href="/sign-in">Sign In</Link>
  </Button>

  <Button asChild>
    <Link href="/sign-up">Get Started</Link>
  </Button>
</div>
          </div>

          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {open && (
          <div className="md:hidden py-4 border-t">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href}
                className="block py-2 text-gray-600"
                onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}