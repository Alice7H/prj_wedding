import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { User } from '@prisma/client'

export async function usersRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async(request) => {
    await request.jwtVerify()
    // app.rateLimit()
  })

  app.get('/users', async () => {
    const users = await prisma.user.findMany()
    return users.map((user: User) => {
      return {
        id: user.id,
        avatarUrl: user.avatarUrl,
        name: user.name,
        email: user.email,
      }
    })
  })

  app.get('/user/:id', async (request, reply) => {
    const paramsSchema = z.object({ id: z.string().uuid()})
    const { id } = paramsSchema.parse(request.params)
    const user = await prisma.user.findUniqueOrThrow({where: { id }})
    if(!user.id){
      return reply.status(401).send()
    }
    return user
  })
}