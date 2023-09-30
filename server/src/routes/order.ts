import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import { Prisma } from '@prisma/client'

export async function ordersRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async(request) => {
    await request.jwtVerify()
  })

  // get order
  app.get('/order/:id', async (request, reply) => {
    const paramsSchema = z.object({ id: z.string().uuid()})
    const { id } = paramsSchema.parse(request.params)
    const order = await prisma.order.findUniqueOrThrow({where: { id }})
    if(!order.id){
      return reply.status(401).send()
    }
    return order
  })

  // get orders by user id
  app.get('/order/user/:id', async(request) => {
    const paramsSchema = z.object({ id: z.string().uuid() })
    const { id } = paramsSchema.parse(request.params)
    const orderByUser = await prisma.order.findMany({
      where: { userId: id},
      include: {
        user: true,
        shipping: true,
        productOrder: true,
      },
    })
    return orderByUser;
  })

  // create order
  app.post('/order', async (request) => {
    const bodySchema = z.object({
      dateOrdered: z.coerce.date().default(new Date()),
      shippingId: z.string().nonempty(),
      status: z.string().nonempty(),
      address: z.string().nonempty(),
      userId: z.string().nonempty(),
    })
    const {dateOrdered, shippingId, address, status, userId} = bodySchema.parse(request.body)

    const order = await prisma.order.create({
      data: {
        dateOrdered,
        shippingId,
        total: 0,
        address,
        status,
        userId,
      },
    })
    return order;
  })

  // create productOrder
  app.post('/product_order', async (request) => {
    const bodySchema = z.object({
      quantity: z.number().nonnegative().int(),
      unityPrice: z.number().nonnegative(),
      prodId: z.string().nonempty(),
      orderId: z.string().nonempty(),
    })
    const {quantity, unityPrice, prodId, orderId} = bodySchema.parse(request.body)
    const productOrder = await prisma.productOrder.create({
      data: {
        quantity,
        unityPrice,
        subtotal: quantity * unityPrice,
        prodId,
        orderId,
      }
    })
      // modificar a quantidade do produto
    let product = await prisma.product.findFirstOrThrow({where: { id: prodId}})
    await prisma.product.update({
      where: { id: prodId },
      data: { quantity: product.quantity - quantity }
    })

    // modificar o total do pedido
    let order = await prisma.order.findFirstOrThrow({where: { id: orderId}})
    let totalAmount = +order.total + (quantity * unityPrice)
    await prisma.order.update({
      where: { id: orderId },
      data: {total: new Prisma.Decimal(totalAmount) }
    })
    return productOrder;
  })

  // update order status
  app.patch('/order/:id', async (request) => {
    const paramsSchema = z.object({ id: z.string().uuid() })
    const { id } = paramsSchema.parse(request.params)
    let order = await prisma.order.findUniqueOrThrow({where: { id }})

    const bodySchema = z.object({status: z.string().nonempty()})
    const { status } = bodySchema.parse(request.body)
    order = await prisma.order.update({
      where: { id },
      data: { status }
    })
    return order
  })

  // update productOrder
  // app.put('/product_order', async (request) => {
  //   const paramsSchema = z.object({ id: z.string().uuid() })
  //   const { id } = paramsSchema.parse(request.params)
  //   let productOrder = await prisma.productOrder.findUniqueOrThrow({where: { id }})

  //   const bodySchema = z.object({
  //     quantity: z.number().nonnegative().int(),
  //     unityPrice: z.number().nonnegative(),
  //     prodId: z.string().nonempty(),
  //     orderId: z.string().nonempty(),
  //   })
  //   const {quantity, unityPrice, prodId, orderId} = bodySchema.parse(request.body)
  //   productOrder = await prisma.productOrder.update({
  //     where: { id },
  //     data: {
  //       quantity,
  //       unityPrice,
  //       subtotal: quantity * unityPrice,
  //       orderId,
  //       prodId,
  //     },
  //   })
  //   return productOrder;
  // })

}