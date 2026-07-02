import twilio from 'twilio'

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

export async function sendSMS(to: string, message: string) {
  await client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: `+91${to}`,
  })
}

export async function sendAppointmentSMS(phone: string, appointmentNo: string, service: string, date: string) {
  await sendSMS(phone,
    `CSC Connect: Your appointment ${appointmentNo} for ${service} is confirmed on ${date}. Carry all documents.`
  )
}