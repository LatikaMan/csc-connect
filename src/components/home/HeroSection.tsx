'use client'
import { motion } from 'framer-motion'
import { Search, MapPin, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function HeroSection() {
  const [search, setSearch] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (search.trim()) {
      router.push(`/csc-finder?q=${encodeURIComponent(search)}`)
    }
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-sm font-medium px-4 py-2 rounded-full mb-6">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              India's Smartest CSC Platform
            </span>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Find CSC Centers{' '}
              <span className="text-blue-600">Near You</span>{' '}
              Instantly
            </h1>

            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Book appointments, track applications, and access 50+ government
              services from your nearest Common Service Centre.
            </p>

            <form onSubmit={handleSearch} className="flex gap-2 max-w-xl mx-auto mb-8">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Enter city, village or PIN code..."
                  className="pl-10 h-12"
                />
              </div>
              <Button type="submit" size="lg" className="h-12 px-6">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </form>

            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <Link href="/csc-finder" className="flex items-center gap-1 hover:text-blue-600">
                <MapPin className="h-4 w-4" /> Use My Location
              </Link>
              <Link href="/appointments" className="flex items-center gap-1 hover:text-blue-600">
                Book Appointment <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}