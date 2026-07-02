import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false,
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
})

export async function sendAppointmentConfirmation(to: string, data: {
  name: string
  appointmentNo: string
  service: string
  date: string
  cscName: string
}) {
  await transporter.sendMail({
    from: `"CSC Connect" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Appointment Confirmed – ${data.appointmentNo}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
        <h2 style="color:#2563EB">Appointment Confirmed!</h2>
        <p>Dear ${data.name},</p>
        <p>Your appointment has been confirmed.</p>
        <table style="width:100%;border-collapse:collapse;margin:20px 0;">
          <tr><td style="padding:8px;border:1px solid #e5e7eb;color:#6b7280">Appointment No</td>
              <td style="padding:8px;border:1px solid #e5e7eb;font-weight:bold">${data.appointmentNo}</td></tr>
          <tr><td style="padding:8px;border:1px solid #e5e7eb;color:#6b7280">Service</td>
              <td style="padding:8px;border:1px solid #e5e7eb">${data.service}</td></tr>
          <tr><td style="padding:8px;border:1px solid #e5e7eb;color:#6b7280">Date & Time</td>
              <td style="padding:8px;border:1px solid #e5e7eb">${data.date}</td></tr>
          <tr><td style="padding:8px;border:1px solid #e5e7eb;color:#6b7280">CSC Center</td>
              <td style="padding:8px;border:1px solid #e5e7eb">${data.cscName}</td></tr>
        </table>
        <p style="color:#6b7280">Please carry all required documents.</p>
      </div>
    `,
  })
}