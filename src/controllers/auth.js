import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import { AppError } from '../utils/app-error.js'
import db from '../utils/prisma.js'

const signToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: '8h',
  })
}

export const register = async (req, res) => {
  const { name, email, password, role } = req.body
  const hash = bcrypt.hashSync(password)

  const emailTaken = await db.user.findUnique({ where: { email } })
  if (emailTaken) {
    throw new AppError('Email already exists', 400)
  }

  const user = await db.user.create({
    data: {
      name,
      email,
      password: hash,
      role,
    },
  })

  const token = signToken(user.id, user.role)

  res.status(201).json({ token })
}

export const login = async (req, res) => {
  const { email, password } = req.body

  const user = await db.user.findUnique({
    where: {
      email,
    },
  })

  if (!user) {
    return res.status(401).json({
      message: 'Invalid email or password',
    })
  }

  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({
      message: 'Invalid email or password',
    })
  }

  const token = signToken(user.id, user.role)

  res.status(200).json({ token })
}
