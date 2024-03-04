import { describe, test, assert, beforeEach } from 'vitest'
import supertest from 'supertest'
import bcrypt from 'bcryptjs'
import app from '../src/app.js'
import db, { dropDb } from '../src/utils/prisma.js'

describe('Register user', () => {
  beforeEach(async () => {
    await dropDb()
  })

  test('Successful registration', async () => {
    const res = await supertest(app).post('/api/auth/register').send({
      name: 'John Doe',
      email: 'john@gmail.com',
      password: '123456',
    })

    assert.equal(res.statusCode, 201)
  })
})

describe('Login user', () => {
  beforeEach(async () => {
    await dropDb()
  })

  test('Successful login', async () => {
    await db.user.create({
      data: {
        name: 'John Doe',
        email: 'john@gmail.com',
        password: bcrypt.hashSync('123456'),
      },
    })

    const res = await supertest(app).post('/api/auth/login').send({
      email: 'john@gmail.com',
      password: '123456',
    })

    assert.equal(res.statusCode, 200)
  })

  test('Invalid email login', async () => {
    const res = await supertest(app).post('/api/auth/login').send({
      email: 'john@gmail.com',
      password: '123456',
    })

    assert.equal(res.statusCode, 401)
  })

  test('Invalid password login', async () => {
    await db.user.create({
      data: {
        name: 'John Doe',
        email: 'john@gmail.com',
        password: bcrypt.hashSync('123456'),
      },
    })

    const res = await supertest(app).post('/api/auth/login').send({
      email: 'john@gmail.com',
      password: 'invalid password',
    })

    assert.equal(res.statusCode, 401)
  })
})
