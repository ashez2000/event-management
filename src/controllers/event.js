import db from '../utils/prisma.js'
import { AppError } from '../utils/app-error.js'

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
  const { name, description } = req.body

  const event = await db.event.create({
    data: {
      name,
      description,
    },
  })

  res.status(201).json({ event })
}

export const update = async (req, res) => {
  const { name, description } = req.body

  const found = await db.event.findUnique({ where: { id: req.params.id } })
  if (!found) {
    throw new AppError('Event not found', 404)
  }

  const event = await db.event.update({
    where: {
      id: req.params.id,
    },
    data: {
      name,
      description,
    },
  })

  res.status(200).json({ event })
}

export const remove = async (req, res) => {
  const found = await db.event.findUnique({ where: { id: req.params.id } })
  if (!found) {
    throw new AppError('Event not found', 404)
  }

  const event = await db.event.delete({
    where: {
      id: req.params.id,
    },
  })

  res.status(200).json({ event })
}
