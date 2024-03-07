import { z } from 'zod'

export const registerSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.enum(['organizer', 'user']).default('user'),
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})
