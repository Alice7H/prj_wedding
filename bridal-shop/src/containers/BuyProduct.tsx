'use client'
import { ProductModal } from "@/components/ProductModal";
import { getUser } from "@/lib/auth";
import { Product } from "@/types/Products";
import router from "next/navigation";
import { FormEvent, useState } from "react";

interface IProps {
  product: Product;
}
export function BuyProduct({product}: IProps){
  const [isModalClosed, setIsModalClosed] = useState(true);
  const sizes = product.measurements.split(" ");
  const [selectedSize, setSelectedSize] = useState<string|null>();

  function handleShowModal() {
    setIsModalClosed(!isModalClosed);
  }

  function handleSelectSize(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget)
    setSelectedSize(formData.get('size') as string);
  }

  function handleBuyProduct() {
    handleShowModal();
    try{
      if(selectedSize){
        const userId = getUser().sub;
        const productId = product?.id;
        // add item to cart
      }
    }catch(e){ console.log(e)}
  }

  return (
    <>
      <button
        onClick={handleBuyProduct}
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
          handleSelectSize={handleSelectSize}
        />
      }
    </>
  )
}