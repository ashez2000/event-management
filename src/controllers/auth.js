import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../utils/prisma.js'

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '8h',
  })
}

export const register = async (req, res) => {
  const { name, email, password } = req.body
  const hash = bcrypt.hashSync(password)

  const user = await db.user.create({
    data: {
      name,
      email,
      password: hash,
    },
  })

  const token = signToken(user.id)

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

  const token = signToken(user.id)

  res.status(200).json({ token })
}
