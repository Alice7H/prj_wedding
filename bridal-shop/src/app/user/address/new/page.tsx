'use client'
import { AddressByCep } from "@/components/AddressByCep";
import { ClientAddressForm } from "@/containers/ClientAddressForm";
import { Address } from "@/types/Address";
import { useState } from "react";

const initialState = {
  id: '',
  street: '',
  complement: '',
  district: '',
  city: '',
  state: '',
  phone: '',
  email: '',
  full_name: '',
  zipCode: '',
  userId: '',
  ship_to: false,
}

export default function NewAddress(){
  const [address, setAddress] = useState<Address>(initialState);

  return (
    <main className="m-4 flex flex-col items-center text-main">
      <div className="my-4">
        <AddressByCep setAddress={setAddress} />
      </div>
      <ClientAddressForm address={address}/>
    </main>
  )
}