import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const category = searchParams.get('category')
    const search = searchParams.get('q')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')

    const where: any = { isActive: true, isDeleted: false }
    if (category) where.category = { name: category }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { nameHindi: { contains: search, mode: 'insensitive' } },
      ]
    }

    const [services, total] = await Promise.all([
      prisma.service.findMany({
        where,
        include: { category: true, requiredDocuments: true },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: { name: 'asc' },
      }),
      prisma.service.count({ where }),
    ])

    return NextResponse.json({
      services,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 })
  }
}