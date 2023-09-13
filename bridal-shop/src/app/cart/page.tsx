'use client'
import { Footer } from "@/components/Footer"
import { getUser } from "@/lib/auth";
import { useEffect, useState } from "react";
import Image from "next/image";
import { EmptyCart } from "@/components/EmptyCart";
import { useRouter } from "next/navigation";
import { Cart } from "@/types/Cart";
import { verifyAvailableProduct } from "@/lib/api";

export default function Cart() {
  const [cart, setCart] = useState<Cart[]>([]);
  const router = useRouter();
  const [loadingLocalStorage, setLoadingLocalStorage] = useState(true);

  useEffect(() => {
    async function getProduct() {
      try{
        setLoadingLocalStorage(true);
        const data = JSON.parse(localStorage.getItem('product') as string);
        const user = getUser();
        setLoadingLocalStorage(false);

        if(data[0] == undefined) return;
        if(user.sub != data[0].userId) return;
        if(data.length == 0) return;
        await getAvailableProducts(data as Cart[]);
      }catch(error){
        router.push('/login');
      }
    }

    async function getAvailableProducts(cart: Cart[]){
      const tempProducts = [];
      for(let i = 0; i < cart.length; i++){
        const product = await verifyAvailableProduct(cart[i]);
        tempProducts.push(product as Cart)
      }
      setCart([...tempProducts]);
    }

    getProduct();
  }, [router])

  if(loadingLocalStorage) return  (
    <main className="flex flex-col px-8 text-center">
      <h1 className="text-main text-title font-bold">Carrinho de compras</h1>
      <p>Carregando...</p>
    </main>
  )

  if(cart.length == 0 && !loadingLocalStorage) return <EmptyCart />

  const availableCart = cart?.filter((element) => element.available)
  const totalArray = availableCart?.map((element) => element.price)
  const total = totalArray?.reduce((total, element) => total + parseFloat(element), 0)

  function handleRemoveProduct(element: Cart){
    const aux = cart?.filter((item) => item !== element);
    setCart(aux as Cart[]);
    localStorage.setItem('product', JSON.stringify(aux));
  }

  return(
    <>
      <main className="flex flex-col px-8 justify-center items-center w-full gap-2 text-center">
        <h1 className="text-main text-title font-bold">Carrinho de compras</h1>
        <table className="table-auto my-4 w-full text-main">
          <thead>
            <tr className="border border-main">
              <th>Imagem</th>
              <th>Nome</th>
              <th>Tamanho</th>
              <th>Preço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {
              cart && cart.map((element, index) =>
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
                  <td>
                    <button
                      onClick={()=>handleRemoveProduct(element)}
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
        {/* <p className="self-end sm:mr-8">Frete: R$00.00</p> */}
        <p className="self-end sm:mr-8">Total: R${total?.toFixed(2)}</p>

        <div>
          <button type="button" className="border border-main px-4 py-2 rounded-lg text-main font-bold">
            Confirmar compra
          </button>
        </div>
      </main>
      <Footer />
    </>
  )
}