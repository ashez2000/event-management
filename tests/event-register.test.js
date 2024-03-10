import { describe, test, assert, beforeEach } from 'vitest'
import supertest from 'supertest'
import bcrypt from 'bcryptjs'
import app from '../src/app.js'
import db, { dropDb } from '../src/utils/prisma.js'

beforeEach(() => {
  dropDb()
})

describe('Event registration', async () => {
  test('Auth is required to register for an event', async () => {
    const res = await supertest(app).post('/api/events/some-valid-id/register')
    assert(res.status, 401)
  })
})
