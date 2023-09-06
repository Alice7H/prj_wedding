'use client'
import { Footer } from "@/components/Footer"
import { getUser } from "@/lib/auth";
import { useEffect, useState } from "react";
import Image from "next/image";
import { EmptyCart } from "@/components/EmptyCart";
import { useRouter } from "next/navigation";
import { Cart } from "@/types/Cart";
import { Transportation } from "@/containers/Transportation";

export default function Cart() {
  const [cart, setCart] = useState<Cart[]>([]);
  const router = useRouter();
  const [loadingLocalStorage, setLoadingLocalStorage] = useState(true);

  useEffect(() => {
    function getProduct() {
      try{
        setLoadingLocalStorage(true);
        const data = JSON.parse(localStorage.getItem('product') as string);
        const user = getUser();
        // get available product
        if(data[0] != undefined){
          if(user.sub != data[0].userId) alert('Compra não autorizada');
          setCart(data);
        }
        setLoadingLocalStorage(false);
      }catch(error){
        router.push('/login');
      }
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

  const totalArray = cart?.map((element) => element.price)
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
        <table className="table-auto my-4 w-full">
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
                <tr className="border border-main" key={index}>
                  <td className="flex justify-center">{
                    element?.coverUrl &&
                    <Image src={element.coverUrl} alt="Produto da loja"
                      rel="preload" priority
                      width="0" height="0" sizes="100px"
                      className="w-[50%] h-auto"
                    />
                  }
                  </td>
                  <td> {element.name} </td>
                  <td> {element.size} </td>
                  <td> R${element.price} </td>
                  <td>
                    <button
                      onClick={()=>handleRemoveProduct(element)}
                      type="button"
                      className="m-2 rounded-lg border border-main text-main font-bold px-4 py-2"
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

        <Transportation/>

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