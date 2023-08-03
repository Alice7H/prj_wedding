import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { Product, UserProduct } from '@prisma/client'

export async function userProductsRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async(request) => {
    await request.jwtVerify()
  })

  app.get('/user/favorite_prod/:id', async(request) => {
    const paramsSchema = z.object({ id: z.string().uuid() })
    const { id } = paramsSchema.parse(request.params)
    const userProduct = await prisma.userProduct.findMany({
      where: { userId: id },
      include: {
        product: true,
      },
    })
    return userProduct;
  })

  app.post('/favorite_prod/:id', async (request) => {
    const paramsSchema = z.object({ id: z.string().uuid() })
    const { id } = paramsSchema.parse(request.params)

    const bodySchema = z.object({userId: z.string() })
    const { userId } = bodySchema.parse(request.body)

    const response = await prisma.userProduct.create({ data: { userId, productId: id }})
    return response
  })

  app.delete('/favorite_prod/:id', async (request) => {
    const paramsSchema = z.object({ id: z.string().uuid() })
    const { id } = paramsSchema.parse(request.params)

    const bodySchema = z.object({userId: z.string() })
    const { userId } = bodySchema.parse(request.body)

    const response = await prisma.userProduct.deleteMany({ where: { productId: id, userId: userId } })
    return response
  })
}