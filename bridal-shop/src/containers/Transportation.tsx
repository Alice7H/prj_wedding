import { searchAddress } from "@/lib/correiosBr";
import { FormEvent, useState } from "react";
import { AddressByCep } from "../components/AddressByCep";
import { Address } from "@/types/Address";
import { ShippingFee } from "./ShippingFee";

const initialStateAddress = {
  userId: '',
  street: '',
  complement: '',
  district: '',
  city: '',
  state: '',
}

export function Transportation({qtd}: {qtd: number}) {
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState<Address>(initialStateAddress);
  const [error, setError] = useState<string>('');
  const [loadingAddress, setLoadingAddress] = useState(false);

  async function searchAddressByCep(event: FormEvent<HTMLFormElement>){
    event.preventDefault();
    resetAddress();
    const response = await searchAddress(cep);
    setLoadingAddress(false);
    if(!response?.city) setError('Não foi possível encontrar o endereço');
    else setAddress({...response, userId: ''});
  }

  function resetAddress(){
    setAddress(initialStateAddress)
    setLoadingAddress(true)
    setError('')
  }

  return (
    <div className="border p-4 my-2 text-main rounded-sm">
      <h2 className="font-bold text-xl mb-2">Calcular frete:</h2>
      <AddressByCep cep={cep} setCep={setCep} searchAddressByCep={searchAddressByCep} loadingAddress={loadingAddress}/>
      { address && <>
        <p className="font-bold my-2">{address.street} {address.district}</p>
        <p className="font-bold my-2">{address.city} {address.state}</p>
      </>
      }
      { error && <p className="text-danger font-bold my-2"> {error}</p>}
      { cep.length == 8 && <ShippingFee cep={cep} qtd={qtd}/> }
    </div>
  )
}