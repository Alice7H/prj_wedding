'use client'
import { ProductModal } from "@/components/ProductModal";
import { getUser } from "@/lib/auth";
import { Product } from "@/types/Products";
import { FormEvent, useState } from "react";

interface IProps {
  product: Product;
}

interface ProductData {
  userId: string,
  productId: string,
  name: string,
  price: string,
  coverUrl: string,
  size: string
}

export function BuyProduct({product}: IProps){
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
    if(data) addProductInLocalStorage(data);
    setIsModalClosed(true);
  }

  function addProductInLocalStorage(data: ProductData) {
    const cartData = getLocalStorageProducts();
    let allProducts = [];
    if(cartData != null) allProducts = [data, ...cartData];
    else allProducts = [data];
    localStorage.setItem('product', JSON.stringify(allProducts));
    alert('Produto adicionado no carrinho.');
  }

  function formatProductData(size: string) {
    try{
      const userId = getUser().sub;
      return {
        userId: userId,
        productId: product?.id,
        name: product?.name,
        price: product?.price,
        coverUrl: product?.coverUrl,
        size: size
      }
    }catch(e){
      alert('Erro: Você não está autorizado.');
    }
  }

  function getLocalStorageProducts() {
    const product = localStorage.getItem('product');
    if (!product) return null;
    return JSON.parse(product);
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