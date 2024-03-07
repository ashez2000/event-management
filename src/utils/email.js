import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
})

export const sendEmail = async (email, subject, text) => {
  const info = await transporter.sendMail({
    from: 'Event Management API <eventmanagement@exmaple.com>',
    to: email,
    subject,
    text,
  })

  return info
}
