import { z } from 'zod'

export const eventSchema = z.object({
  name: z.string(),
  description: z.string(),
  date: z.date().min(Date.now()),
})
