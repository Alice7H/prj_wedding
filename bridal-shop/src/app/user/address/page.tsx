'use client'
import { LinkButton } from "@/components/LinkButton";
import { deleteAddress, getAddresses, updateShippingAddress } from "@/lib/api";
import { getUser } from "@/lib/auth";
import { Address } from "@/types/Address";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function AddressList(){
  const [addresses, setAddresses] = useState<Address[]>([{
    id: '',
    full_name: '',
    email: '',
    city: '',
    district: '',
    state: '',
    zipCode: '',
    complement: '',
    phone: '',
    street: '',
    userId: '',
    ship_to: false,
  }]);

  useEffect(()=> {
    getAddressList();
  },[])

  useEffect(()=> {
    console.log('changed address list');
  },[addresses])

  async function getAddressList() {
    try{
      const user = getUser();
      const token = Cookies.get('token');
      if(token == undefined) throw new Error('Lista de endereços não encontrada');
      if(user.sub) {
        const res = await getAddresses({user, token});
        setAddresses(res);
      }
    } catch(e){
      console.log(e);
    }
  }

  async function handleRemoveAddress(id: string){
    try{
      const token = Cookies.get('token');
      if(token == undefined) throw new Error('Erro ao mudar o local de envio')
      const deleted = await deleteAddress({id, token})
      setAddresses(addresses.filter(element => element.id != deleted.id))
    }catch(e){
      console.log(e)
    }
  }

  async function handleShippingAddress(data: Address){
    try{
      const token = Cookies.get('token');
      if(token == undefined) throw new Error('Erro ao mudar o local de envio')
      const res = await updateShippingAddress({data, token})
      setAddresses( addresses.map(element => element.id == res.id ? {...res } : {...element, ship_to: false}))
    }catch(e){
      console.log(e);
    }
  }

  return(
    <main className="flex flex-col px-8 text-main">
      <h2 className="text-main text-title font-bold text-center">Endereços registrados: </h2>
      <div className="text-right mt-2">
        <LinkButton path="/user/address/new" text="Adicionar endereço" />
      </div>
      <table className="table-auto my-4 w-full text-main">
          <thead>
            <tr className="border border-main">
              <th>Nome Completo</th>
              <th>Endereço</th>
              <th>Telefone</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
          {
            addresses.map((address, index) =>
            <tr className={`text-center border border-main ${address.ship_to == true && 'bg-mint font-semibold'}`} key={index}>
              <td>{address.full_name}</td>
              <td className="max-w-[150px]">{`${address.street} ${address.complement}, ${address.city} - ${address.state}`}</td>
              <td>{address.phone}</td>
              <td className="flex flex-col">
                <button
                  onClick={()=>handleRemoveAddress(address.id)}
                  type="button"
                  className="bg-white w-[120px] m-2 mx-auto rounded-lg border border-main font-bold px-4 py-2"
                > Remover </button>
                {
                  !address.ship_to &&
                  <button
                    onClick={()=> handleShippingAddress(address)}
                    type="button"
                    className="w-[120px] m-2 mx-auto rounded-lg border border-main font-bold px-4 py-2"
                  > Usar para envio</button>
                }
              </td>
            </tr>
            )
          }
          </tbody>
        </table>
    </main>
  );
}