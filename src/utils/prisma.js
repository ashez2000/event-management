import { PrismaClient } from '@prisma/client'

const db = new PrismaClient()

export const dropDb = async () => {
  await db.user.deleteMany()
}

export default db
