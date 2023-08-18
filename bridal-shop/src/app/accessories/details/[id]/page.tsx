'use client'
import { Footer } from "@/components/Footer";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Product } from "@/types/Products";
import { api } from "@/lib/api";
import { AddFavoriteProduct } from "@/containers/AddFavoriteProduct";

export default function AccessoriesDetails() {
  const params = useParams();
  const {id} = params;
  const [product, setProduct] = useState<Product| null>(null);

  useEffect(()=> {
    async function getProduct(){
      const res = await api.get(`/product/${id}`)
      if(res.status !== 200 ) throw new Error('Erro 404, acessório não encontrado')
      const data = await res.data as Product;
      setProduct(data);
    }
    getProduct()
  },[id])

  return (
    <>
      <main className="px-8">
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-main">
        <div className="leading-loose">
          <h1 className="text-title">{product?.name}</h1>
          <span className="text-sm">Ref: {product?.id}</span>
          <p className="text-2xl">Preço: {product?.price}</p>
          <div className="border border-bottom border-b-main w-[50vw] sm:w-[35vw] my-4"></div>
          <p className="max-w-[50vw] mb-4">{product?.description}</p>
          <p>Comprimento: {product?.length}</p>
          <p>Medidas: {product?.measurements}</p>
          <p>Quantidade: {product?.quantity}</p>
          <p>Cor: {product?.color}</p>
          <p>Composição: {product?.composition}</p>
        </div>
        <div className="flex">
          {
            product?.coverUrl &&  <Image className="rounded-3xl" src={product.coverUrl} alt="Vestido" width={400} height={400}/>
          }
        </div>
      </div>
      {
      product && product.quantity > 0  &&
        <div className="flex items-center justify-center gap-4 text-center w-full sm:w-1/2">
          <button className="text-main font-bold border rounded-lg py-2 px-4 mt-4" disabled={product?.quantity == 0 ? true : false} >
            Comprar
          </button>
          <AddFavoriteProduct product={product} />
        </div>
      }
    </main>
    <Footer />
  </>
  )
}