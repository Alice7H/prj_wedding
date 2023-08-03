import 'dotenv/config'
import fastify from 'fastify'
import jwt from '@fastify/jwt'
// import cors from '@fastify/cors'
// import { resolve } from 'node:path'
import { rootRoutes } from './routes/root'
import { authRoutes } from './routes/auth'
import { productsRoutes } from './routes/products'
import { usersRoutes } from './routes/user'
import {userProductsRoutes } from './routes/favorites'
import 'dotenv/config'

const app = fastify()

// app.register(multipart)

// app.register(require('@fastify/static'), {
//   root: resolve(__dirname, '../uploads'),
//   prefix: '/uploads',
// })

// app.register(cors, {
//   origin: true, // all URLs are allowed. other example - origin: ['http://localhost:3000']
// })

const secretKey = process.env.JWT_SECRET_KEY as string;
app.register(jwt, { secret: secretKey})

app.register(rootRoutes)
app.register(authRoutes)
app.register(usersRoutes)
app.register(productsRoutes)
app.register(userProductsRoutes)

app
  .listen({ port: 3333, host: '0.0.0.0' })
  .then(() => {
    console.log('🚀 HTTP server running on http://localhost:3333')
  })