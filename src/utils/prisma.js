import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

export const dropDb = async () => {
  await db.eventRegister.deleteMany()
  await db.event.deleteMany()
  await db.user.deleteMany()
}

export default db
