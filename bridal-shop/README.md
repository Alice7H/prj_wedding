# Bridal Shop

É um projeto front-end apresentando vestidos e acessórios para noivas com suas respectivas descrições, preços, sendo possível adicioná-los a um carrinho de compras e favoritar os produtos.

## Inicializando

Primeiro, rode o servidor em modo de desenvolvimento:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Abra em [http://localhost:3000](http://localhost:3000) com seu navegador e você verá o resultado.

![Banner](../bridal-shop/public/banner.png)

## Páginas

- Landing Page
- Galeria de vestidos
- Galeria de acessórios
- Sobre nós
- Login
- Cadastro de usuários

## Concluído

- Filtro de vestidos: ofertas, alta costura, clássico, romântico e moderno.
- Filtro de acessórios: ofertas, tiara, videira, véu, luva.
- Exibir detalhes de vestidos
- Selecionar o tamanho do vestido
- Exibir detalhes de acessórios
- Rota de logout
- Salvar token nos cookies
- Favoritar itens do usuário
- Exibir lista com itens favoritos
- Lógica dos formulários de login.
- Salvar produtos no localStorage / no carrinho de compras
- Exibir página de compras ou "carrinho de compras"
- Exibir produtos e total no carrinho de compras
- Remover produtos do carrinho de compras
- Usuário não autenticados não podem comprar ou favoritar produtos
- Barrar a ação de favoritar o produto mais de uma vez
- Middleware de autenticação
- Lógica dos formulários de cadastro do usuário.
- Adicionar modal para as imagens do carrossel
- Possibilitar zoom nas imagens
- Arrumar botão de ir ao topo (está sobrescrevendo parte do rodapé)
- Navegar da página de favoritos para os detalhes dos produtos
- Verificar se os produtos estão disponíveis para compra
- Adicionar o Correios Brasil (para consultar informações sobre o CEP).
- Uso do puppeteer para pegar informações de cálculo de frete com prazo e valor de sedex e pac, usando informações do site 'cepcerto'.
- Salvar o endereço para entrega do cliente.
- Calcular o valor total da compra (produtos + frete).
- Remover endereço (manter o endereço no pedido)
- Mudar o local de endereço para envio

## Em construção

- Salvar pedido
- Registrar pagamento
- Calcular frete
- Salvar o tipo de entrega do cliente (SEDEX ou PAC, quando possível).
- Melhorar o sistema.

## Possíveis mudanças

- Usar a nova api dos correios, o antigo será desativado em breve. O acesso a ele deve ser feito através do perfil criado no Meu Correios, para criar credenciais e utilizar a API dos Correios.
- Modificação de medidas (measurements), exibindo uma imagem de tabela com medidas mais detalhadas de vestido e dos acessórios.
- Adição do campo de tamanho (size) que atualmente usa as informações de medidas (PP, P, M, G, GG e único).
