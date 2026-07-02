import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/db/prisma'

function generateAppointmentNo() {
  const date = new Date()
  const prefix = 'APT'
  const timestamp = date.getTime().toString().slice(-6)
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
  return `${prefix}${timestamp}${random}`
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const { serviceId, cscId, scheduledAt, customerName, customerPhone, customerEmail, notes } = body

    const user = await prisma.user.findUnique({ where: { clerkId: userId } })
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    const appointment = await prisma.appointment.create({
      data: {
        appointmentNo: generateAppointmentNo(),
        userId: user.id,
        serviceId,
        cscId,
        scheduledAt: new Date(scheduledAt),
        customerName,
        customerPhone,
        customerEmail,
        notes,
        status: 'PENDING',
      },
      include: { service: true, cscCenter: true },
    })

    return NextResponse.json({ appointment }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create appointment' }, { status: 500 })
  }
}