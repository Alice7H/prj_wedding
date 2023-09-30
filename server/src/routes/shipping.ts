import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function shippingRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async(request) => {
    await request.jwtVerify()
    app.rateLimit()
  })

  // create shipping
  app.post('/shipping', async (request) => {
    const bodySchema = z.object({
      trackShippingValue: z.string().nonempty(),
      shippingMethod: z.string().nonempty(),
      shippingValue: z.number().nonnegative(),
      shippingRegion: z.string().nonempty(),
      shippingDate: z.coerce.date().default(new Date()),
      shippingZipCode: z.string().nonempty(),
    })
    const {trackShippingValue, shippingMethod, shippingZipCode,shippingValue, shippingRegion, shippingDate } = bodySchema.parse(request.body)
    const shipping = await prisma.shipping.create({
      data: {
        trackShippingValue,
        shippingMethod,
        shippingZipCode,
        shippingValue,
        shippingRegion,
        shippingDate,
      },

    })
    return shipping;
  })

  // update shipping
  app.put('/shipping/:id', async (request ) => {
    const paramsSchema = z.object({ id: z.string().uuid() })
    const { id } = paramsSchema.parse(request.params)
    const bodySchema = z.object({
      trackShippingValue: z.string().nonempty(),
      shippingMethod: z.string().nonempty(),
      shippingValue: z.number().nonnegative(),
      shippingRegion: z.string().nonempty(),
      shippingDate: z.coerce.date().default(new Date()),
    })
    const {trackShippingValue, shippingMethod, shippingValue, shippingRegion, shippingDate} = bodySchema.parse(request.body)

    let shipping = await prisma.shipping.findUniqueOrThrow({where: { id }})
    shipping = await prisma.shipping.update({
      where: { id },
      data: {
        trackShippingValue,
        shippingMethod,
        shippingValue,
        shippingRegion,
        shippingDate
      },
    })
    return shipping;
  })
}