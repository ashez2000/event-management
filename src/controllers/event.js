import db from '../utils/prisma.js'
import { AppError } from '../utils/app-error.js'
import { sendEmail } from '../utils/email.js'
import { eventSchema } from '../schemas/event.js'

export const findMany = async (req, res) => {
  const events = await db.event.findMany()
  res.status(200).json({ events })
}

export const findById = async (req, res) => {
  const event = await db.event.findUnique({
    where: {
      id: req.params.id,
    },
  })

  if (!event) {
    throw new AppError('Event not found', 404)
  }

  res.status(200).json({ event })
}

export const create = async (req, res) => {
  const { name, description, date } = eventSchema.parse(req.body)

  const event = await db.event.create({
    data: {
      name,
      description,
      date,
    },
  })

  res.status(201).json({ event })
}

export const update = async (req, res) => {
  const { name, description, date } = req.body

  const found = await db.event.findUnique({ where: { id: req.params.id } })
  if (!found) {
    throw new AppError('Event not found', 404)
  }

  if (found.organizerId !== req.user.id) {
    throw new AppError('Unauthorized', 403)
  }

  const event = await db.event.update({
    where: {
      id: req.params.id,
    },
    data: {
      name,
      description,
      date,
    },
  })

  res.status(200).json({ event })
}

export const remove = async (req, res) => {
  const found = await db.event.findUnique({ where: { id: req.params.id } })
  if (!found) {
    throw new AppError('Event not found', 404)
  }

  if (found.organizerId !== req.user.id) {
    throw new AppError('Unauthorized', 403)
  }

  const event = await db.event.delete({
    where: {
      id: req.params.id,
    },
  })

  res.status(200).json({ event })
}

export const register = async (req, res) => {
  const eventId = req.params.eventId
  const userId = req.user.id

  const event = await db.event.findUnique({
    where: {
      id: eventId,
    },
  })

  if (!event) {
    throw new AppError('Event not found', 404)
  }

  const registered = await db.eventRegister.findUnique({
    where: {
      eventId_userId: {
        eventId,
        userId,
      },
    },
  })

  if (registered) {
    throw new AppError('Already registered', 400)
  }

  await db.eventRegister.create({
    data: {
      eventId,
      userId,
    },
  })

  const user = await db.user.findUnique({
    where: {
      id: req.user.id,
    },
  })

  const info = await sendEmail(
    user.email,
    'Registration successful',
    'Successfully registered for event: ' + event.name
  )

  console.log('email: ', info)

  res.status(201).json({
    message: 'Registered to event successfully',
  })
}
