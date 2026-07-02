'use client'
import { useState } from 'react'
import { MapPin, Navigation } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export default function CSCFinderPage() {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null)
  const [city, setCity] = useState('')
  const [radius, setRadius] = useState(10)

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['csc-centers', coords, city, radius],
    queryFn: async () => {
      const params = new URLSearchParams({ radius: String(radius) })
      if (coords) { params.set('lat', String(coords.lat)); params.set('lng', String(coords.lng)) }
      if (city) params.set('city', city)
      const res = await axios.get(`/api/csc-centers/nearby?${params}`)
      return res.data
    },
    enabled: !!(coords || city),
  })

  const useMyLocation = () => {
    navigator.geolocation.getCurrentPosition(
      pos => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      err => alert('Location access denied. Please enter your city manually.')
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Find CSC Near You</h1>
        <p className="text-gray-600 mb-8">Search for Common Service Centres in your area</p>

        <div className="bg-white rounded-2xl p-6 shadow-sm border mb-8">
          <div className="flex gap-4 flex-wrap">
            <Button onClick={useMyLocation} variant="outline" className="gap-2">
              <Navigation className="h-4 w-4" /> Use My Location
            </Button>
            <Input
              placeholder="Enter city name..."
              value={city}
              onChange={e => setCity(e.target.value)}
              className="max-w-xs"
            />
            <select
              value={radius}
              onChange={e => setRadius(Number(e.target.value))}
              className="border rounded-lg px-3 py-2 text-sm"
            >
              {[2, 5, 10, 25, 50].map(r => (
                <option key={r} value={r}>Within {r} km</option>
              ))}
            </select>
          </div>
        </div>

        {isLoading && <p className="text-center text-gray-500">Searching nearby centers...</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.centers?.map((center: any) => (
            <div key={center.id} className="bg-white rounded-2xl p-6 shadow-sm border hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-gray-900 text-lg mb-1">{center.name}</h3>
              <p className="text-sm text-gray-500 flex items-center gap-1 mb-3">
                <MapPin className="h-3 w-3" /> {center.address}, {center.city}
              </p>
              {center.distance !== undefined && (
                <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-full">
                  {center.distance.toFixed(1)} km away
                </span>
              )}
              <div className="mt-4 flex gap-2">
                <Button size="sm" className="flex-1">Book Appointment</Button>
                <Button size="sm" variant="outline">Directions</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}