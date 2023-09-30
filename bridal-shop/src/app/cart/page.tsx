'use client'
import Image from "next/image";
import { EmptyCart } from "@/components/EmptyCart";
import { useRouter } from "next/navigation";
import { Cart } from "@/types/Cart";
import { useCart } from "@/hooks/cart";

export default function Cart() {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    getCartTotal
  } = useCart();
  const router = useRouter();
  const shipping = 21.00;

  if(cartItems.length == 0) return <EmptyCart />

  function handleCustomerOrder(){
    const date = new Date();
    const shippingDate = new Date(date.getTime() + 2*24*60*60*1000);
      localStorage.setItem('shipping', JSON.stringify({
      shippingMethod: 'sedex',
      shippingDate: shippingDate,
      shippingValue: shipping,
      total: (getCartTotal() + shipping),
    }))
    router.push('/cart/buying');
  }

  return(
    <main className="flex flex-col px-8 justify-center items-center w-full gap-2 text-center">
      <button type="button" onClick={()=>clearCart()}
        className="border border-danger px-4 py-2 rounded-lg text-danger font-bold self-end"
      >Limpar carrinho</button>
      <h1 className="text-main text-title font-bold">Carrinho de compras</h1>
      <table className="table-auto my-4 w-full text-main">
        <thead>
          <tr className="border border-main">
            <th>Imagem</th>
            <th>Nome</th>
            <th>Tamanho</th>
            <th>Preço</th>
            <th>Quantidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {
            cartItems.map((element, index) =>
              <tr className={`border border-main ${(element.available == false && "text-danger bg-danger bg-opacity-20")}`} key={index}>
                <td className="flex justify-center">{
                  element?.coverUrl &&
                  <Image src={element.coverUrl} alt="Produto da loja"
                    rel="preload" priority
                    width="0" height="0" sizes="100px"
                    className="w-[50%] h-auto"
                  />
                }
                </td>
                <td> {element.name} {element.available == false ? '- Não disponível' : '' } </td>
                <td> {element.size} </td>
                <td> R${element.price} </td>
                <td> {element.quantity}</td>
                <td>
                  <button
                    onClick={()=>removeFromCart(element)}
                    type="button"
                    className="m-2 rounded-lg border border-main font-bold px-4 py-2"
                  >
                    Remover
                  </button>
                </td>
              </tr>
            )
          }
        </tbody>
      </table>
      <p className="text-main self-end sm:mr-8">Subtotal: R${getCartTotal()}</p>

      <div className="text-main border border-main p-4 rounded-lg mb-2">
        <h2 className="font-bold text-xl"> Informações de entrega:</h2>
        <p>**Prazo de entrega para SP: 2 dias</p>
        <p>Valor de entrega: ${shipping.toFixed(2)}</p>
        <p>Tipo de entrega: sedex</p>
        <br /><br />
        <p>**Prazo a partir da data de confirmação do pagamento</p>
      </div>

      <div>
        <button type="button" onClick={handleCustomerOrder} className="border border-main px-4 py-2 rounded-lg text-main font-bold">
          Continuar compra
        </button>
      </div>
    </main>
  )
}