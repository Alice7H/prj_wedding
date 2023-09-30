import { FastifyInstance } from "fastify"
import { z } from "zod"
import { prisma } from "../lib/prisma"

export async function addressRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async(request) => {
    await request.jwtVerify()
  })

  // create address
  app.post('/address', async(request) => {
    const addressSchema = z.object({
      street: z.string().nonempty(),
      complement: z.string().nonempty(),
      district: z.string().nonempty(),
      zipCode: z.string().nonempty(),
      city: z.string().nonempty(),
      state: z.string().nonempty(),
      phone: z.string().nonempty(),
      email: z.string().email(),
      ship_to: z.boolean(),
      full_name: z.string().nonempty(),
      userId: z.string().uuid().nonempty(),
    })
    const {userId, street, complement, district, ship_to, zipCode, city, state, phone, email, full_name} = addressSchema.parse(request.body)

    const address = await prisma.address.create({
      data: { userId, street, complement, district, ship_to, zipCode, city, state, phone, email, full_name }
    })
    return address
  })

  // get shipping address by user id
  app.get('/address/shipping/:id', async (request) => {
    const paramsSchema = z.object({ id: z.string().uuid()})
    const { id } = paramsSchema.parse(request.params)
    const address = await prisma.address.findFirstOrThrow({
      where: { userId: id, ship_to: true },
      include: { user: true }
    })
    return address;
  })

  // get all address by user id
  app.get('/address/:id', async (request) => {
    const paramsSchema = z.object({ id: z.string().uuid()})
    const { id } = paramsSchema.parse(request.params)
    const addressesByUser = await prisma.address.findMany({ where: { userId: id } })
    return addressesByUser;
  })

  // update address
  app.put('/address/:id', async (request) => {
    const paramsSchema = z.object({id: z.string().uuid()})
    const { id } = paramsSchema.parse(request.params)

    const bodySchema = z.object({
      street: z.string().nonempty(),
      complement: z.string().nonempty(),
      district: z.string().nonempty(),
      zipCode: z.string().nonempty(),
      city: z.string().nonempty(),
      state: z.string().nonempty(),
      phone: z.string().nonempty(),
      email: z.string().email(),
      full_name: z.string().nonempty(),
      userId: z.string().uuid().nonempty(),
      ship_to: z.boolean(),
    })
    const {userId, ship_to, street, complement, district, zipCode, city, state, phone, email, full_name} = bodySchema.parse(request.body)
    const updateAddress = await prisma.address.update({
      where: { id },
      data: { userId, ship_to, street, complement, district, zipCode, city, state, phone, email, full_name },
    })
    return updateAddress
  })

  // update only ship_to
  app.patch('/address/shipping/:id', async (request) => {
    const paramsSchema = z.object({ id: z.string().uuid()})
    const { id } = paramsSchema.parse(request.params)

    const bodyParams = z.object({ userId: z.string().uuid()})
    const { userId } = bodyParams.parse(request.body)
    await prisma.address.updateMany({
      where: { userId, ship_to: true,},
      data: { ship_to: false}
    })
    const updateAddress = await prisma.address.update({
      where: { id },
      data: { ship_to: true }
    })
    return updateAddress
  })

  // delete address
  app.delete('/address/:id', async (request) => {
    const paramsSchema = z.object({ id: z.string().uuid()})
    const { id } = paramsSchema.parse(request.params)
    const deletedAddress = await prisma.address.delete({
      where: { id },
    })
    return deletedAddress
  })
}
