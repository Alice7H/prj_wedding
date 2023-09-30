'use client'
import { ProductModal } from "@/components/ProductModal";
import { useCart } from "@/hooks/cart";
import { Product } from "@/types/Products";
import { FormEvent, useState } from "react";

interface IProps {
  product: Product;
}

export function BuyProduct({product}: IProps){
  const { addToCart } = useCart();
  const [isModalClosed, setIsModalClosed] = useState(true);
  const sizes = product.measurements.split(" ");

  function handleShowModal() {
    setIsModalClosed(!isModalClosed);
  }

  function handleSubmitSize(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget)
    const size = formData.get('size') as string;
    const data = formatProductData(size);
    if(data) addToCart(data);
    setIsModalClosed(true);
  }

  function formatProductData(size: string) {
    return {
      id: Math.floor((Math.random() * 5000) + 1) + 'bFTa' + Math.floor((Math.random() * 10) + 1),
      productId: product?.id,
      name: product?.name,
      quantity: 1,
      price: parseFloat(product?.price),
      coverUrl: product?.coverUrl,
      size: size,
      available: true,
    }
  }

  return (
    <>
      <button
        onClick={()=>setIsModalClosed(false)}
        className="text-main font-bold border rounded-lg py-2 px-4 mt-4"
        disabled={product?.quantity == 0 ? true : false}
      >
        Comprar
      </button>
      {
        !isModalClosed &&
        <ProductModal
          handleShowModal={handleShowModal}
          sizes={sizes}
          handleSubmitSize={handleSubmitSize}
        />
      }
    </>
  )
}