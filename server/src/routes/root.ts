'use strict'

import { FastifyInstance } from "fastify"

export async function rootRoutes(app: FastifyInstance) {
  app.get('/', async function(){ return { root: true }})
}
