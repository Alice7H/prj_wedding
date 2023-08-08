import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { generateHash, verifyPassword } from '../helper/hashPassword'

export async function authRoutes(app: FastifyInstance) {

  app.post('/register', async (request) => {
    const userSchema = z.object({
      email: z.string(),
      name: z.string(),
      avatar_url: z.string().url(),
      password: z.string(),
    })
    const userInfo = userSchema.parse(request.body)
    let user = await prisma.user.findUnique({ where: { email: userInfo.email } })
    const hashPassword = await generateHash(userInfo.password);
    if(!user) {
      user = await prisma.user.create({
        data: {
          email: userInfo.email,
          hashPassword: hashPassword,
          name: userInfo.name,
          avatarUrl: userInfo.avatar_url,
        }
      })
    }

    const token = app.jwt.sign({
      name: user.name,
      avatarUrl: user.avatarUrl,
    },{
      sub: user.id,
      expiresIn: '1 day',
    })

    return { token }
  })

  app.post('/login', async (request, reply) => {
    app.rateLimit()
    const userSchema = z.object({
      email: z.string(),
      password: z.string(),
    })
    const userInfo = userSchema.parse(request.body)
    let user = await prisma.user.findFirstOrThrow({ where: { email: userInfo.email} })
    const isPasswordValid = await verifyPassword(userInfo.password, user.hashPassword);
    if(!isPasswordValid){
      return reply.status(401).send()
    }
    const token = app.jwt.sign({
      name: user.name,
      avatarUrl: user.avatarUrl,
    },{
      sub: user.id,
      expiresIn: '1 day',
    })
    return { token }
  })
}