'use client'
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Product } from "@/types/Products";
import { api, getProductsById } from "@/lib/api";
import { ProductDetails } from "@/components/ProductDetails";
import { Footer } from "@/components/Footer";

export default function DressesDetails(){
  const params = useParams();
  const {id} = params;
  const [product, setProduct] = useState<Product| null>(null);
  const [loadingProduct, setLoadingProduct] = useState(true);

  useEffect(()=> {
    async function getProduct(){
      const data = await getProductsById(id as string);
      setLoadingProduct(false);
      setProduct(data);
    }
    getProduct()
  },[id])

  if(loadingProduct){
    return <p className="text-main text-center font-bold">Carregando...</p>
  }

  return (
    <>
      <main className="px-8">
        { product && <ProductDetails product={product}/> }
      </main>
      <Footer />
    </>
  )
}