'use client';
import { useEffect, useState } from "react";
import { LinkButton } from "@/components/LinkButton";
import { getShippingAddress } from "@/lib/api";
import { getUser } from "@/lib/auth";
import { Address } from "@/types/Address";
import Cookies from "js-cookie";
import { useCart } from "@/hooks/cart";
import { Shipping } from "@/types/Order";

export default function Buying(){
  const [address, setAddress] = useState<Address|null>(null);
  const [shipping, setShipping] = useState<Shipping|null>(null);
  const {cartItems, getCartTotal} = useCart();

  useEffect(()=> {
    async function getAddress() {
      try{
        const user = getUser();
        const id = user.sub;
        const token = Cookies.get('token');
        if(token == undefined) throw new Error('Busca não encontrada')
        const response: Address = await getShippingAddress({ id, token});
        if(response.id !== undefined) setAddress(response);
      }catch(e){
        console.log(e);
      }
    }

    async function getShipping(){
      const response = JSON.parse(localStorage.getItem('shipping') as string);
      if(response) setShipping(response);
    }
    getShipping();
    getAddress();
  },[])

  const fullAddress = address
  ? `${address?.street} - ${address?.district}, ${address?.complement}, ${address?.city} - ${address?.state}`
  : 'Você não tem um endereço de envio registrado'

  return(
    <main className="flex flex-col px-8 w-full gap-2 text-center">
      <div className="flex flex-col md:flex-row gap-2 justify-around w-full text-main">
        <div className="flex-1 rounded-lg border border-main p-4">
          <h1 className="text-title font-bold">Forma de entrega:</h1>
          <p className="text-left p-2">{fullAddress}</p>
          <LinkButton path="/user/address" text={address ? "Escolher outro endereço" : "Registrar um endereço"} />
        </div>
        <div className="rounded-lg border border-main p-4">
          <h2 className="font-bold text-xl">Resumo da compra:</h2>
          {
            cartItems.length == 1
            ? <p> {cartItems[0].name} - R${cartItems[0].price} </p>
            : <p> Produtos(cartItems.length) - {getCartTotal()} </p>
          }
          <p> Frete - R${shipping?.shippingValue} </p>
          <p> Total: R$ { shipping ? (shipping?.shippingValue + getCartTotal()) : 'Erro' } </p>
        </div>
      </div>
      <div className="my-4">
        <LinkButton path="/payment" text="Continuar" />
      </div>
    </main>
  )
}