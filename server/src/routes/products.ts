import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { Product } from '@prisma/client'

export async function productsRoutes(app: FastifyInstance) {
  app.get('/products', async () => {
    const products = await prisma.product.findMany({ orderBy: { createdAt: 'asc'}})
    return products.map((product: Product) => {
      return {
        id: product.id,
        coverUrl: product.coverUrl,
        name: product.name,
        price:  product.price,
        quantity: product.quantity,
      }
    })
  })

  app.get('/product/:id', async (request, reply) => {
    const paramsSchema = z.object({ id: z.string().uuid()})
    const { id } = paramsSchema.parse(request.params)
    const product = await prisma.product.findUniqueOrThrow({where: { id }})
    if(!product.id){
      return reply.status(401).send()
    }
    return product
  })

  app.post('/product', async (request) => {
    await request.jwtVerify();
    const bodySchema = z.object({
      name: z.string(),
      description: z.string(),
      price:  z.string(),
      quantity: z.number().int().nonnegative(),
      coverUrl: z.string().url(),
      category: z.string(),
      composition: z.string(),
      color: z.string(),
      length: z.string(),
      measurements: z.string(),
      createdAt: z.coerce.date().default(new Date()),
    })
    const {
      name, description, price, quantity, coverUrl, category,
      createdAt, composition, color, length, measurements
    } = bodySchema.parse(request.body)

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        quantity,
        coverUrl,
        category,
        composition,
        color,
        length,
        measurements,
        createdAt,
      },
    })
    return product;
  })

  app.put('/product/:id', async (request, reply) => {
    await request.jwtVerify();
    const paramsSchema = z.object({ id: z.string().uuid() })
    const { id } = paramsSchema.parse(request.params)

    const bodySchema = z.object({
      name: z.string(),
      description: z.string(),
      price:  z.string(),
      quantity: z.number().int().nonnegative(),
      coverUrl: z.string().url(),
      category: z.string(),
      composition: z.string(),
      color: z.string(),
      length: z.string(),
      measurements: z.string(),
      createdAt: z.coerce.date().default(new Date()),
    })
    const { name, description, price, quantity, coverUrl, category,
      createdAt, composition, color, length, measurements } = bodySchema.parse(request.body)
    let product = await prisma.product.findUniqueOrThrow({where: { id }})

    product = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price,
        quantity,
        coverUrl,
        category,
        composition,
        color,
        length,
        measurements,
        createdAt,
      },
    })
    return product
  })
}