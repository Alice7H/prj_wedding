# Getting Started with [Fastify-CLI](https://www.npmjs.com/package/fastify-cli)

This project was bootstrapped with Fastify-CLI.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

To start the app in dev mode.\
Open [http://localhost:3333](http://localhost:3333) to view it in the browser.

## Learn More

To learn Fastify, check out the [Fastify documentation](https://www.fastify.io/docs/latest/).

## API Routes

Example: `http://localhost:3333/products` => get a list of products

- Get products: `/products`
- Get dresses: `/product/dresses`
- Get accessories: `/product/accessories`
- Get product by id: `/product/:id`
- Post product: `/product`
- Update product: `/product/:id`

- Get users: `/users`
- Get users by id: `/users/:id`
- Post user: `/register`
- Login user: `/login`

- Get favorite products by user id: `/user/favorite_prod/:id`
- Post favorite product: `/favorite_prod`
- Delete favorite product: `/favorite_prod`

## Possíveis mudanças

Adicionar tabela de:

- Cliente : 'id, name, address, phone'
- Endereço: 'id, cep, street, complement, district, city, state, phone, email, full_name, ship_to'
- Pagamento: 'id, type, datePay, total, details'
- Tipos de Pagamento: 'credit, debit, payment_invoice, pix'
- Pedido: 'id, dateOrdered, status, shippingId, userId, total'
- Pedido-Produto: 'nameProd, quantity, subtotal, unityPrice, prodId, orderId'
- Entrega: 'shippingDate, shippingMethod,shippingValue, cep'
- Status de Pedido: 'new, hold, shipped, delivered, closed, canceled'

Adicionar campo tamanho (size) e categoria de tamanho" (size_category or classification_size).
Exemplo:

- U => único
- PP => extra pequeno
- P => pequeno
- M => médio
- G => grande
- GG => extra grande
- XG => extra extra grande

Ou em inglês:

- OSFA => One-Size-Fits-All (tamanho único)
- XS => extra small (extra pequeno)
- S => small (pequeno)
- M => medium (médio)
- L => large (grande)
- XL => extra large (extra grande)
- XXL => extra extra large (extra extra grande)
