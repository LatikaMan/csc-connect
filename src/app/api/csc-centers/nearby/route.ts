import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

function getDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const lat = parseFloat(searchParams.get('lat') || '0')
    const lng = parseFloat(searchParams.get('lng') || '0')
    const radius = parseFloat(searchParams.get('radius') || '10')
    const city = searchParams.get('city')
    const pincode = searchParams.get('pincode')

    const where: any = { isActive: true, isDeleted: false, isVerified: true }
    if (city) where.city = { contains: city, mode: 'insensitive' }
    if (pincode) where.pincode = pincode

    const centers = await prisma.cSCCenter.findMany({
      where,
      include: { services: { include: { service: true } } },
    })

    let result = centers
    if (lat && lng) {
      result = centers
        .map(c => ({
          ...c,
          distance: getDistanceKm(lat, lng, c.latitude, c.longitude),
        }))
        .filter(c => c.distance <= radius)
        .sort((a, b) => a.distance - b.distance)
    }

    return NextResponse.json({ centers: result })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch CSC centers' }, { status: 500 })
  }
}