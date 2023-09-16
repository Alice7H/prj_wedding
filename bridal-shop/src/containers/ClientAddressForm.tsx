import { Address } from "@/types/Address";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import { getUser } from "@/lib/auth";

interface IForm{
  cep: string;
  address: Address;
  setAddress: Dispatch<SetStateAction<Address>>
}

export function ClientAddressForm({address, setAddress}: IForm) {

  function handleChangeEvent(event: ChangeEvent<HTMLInputElement>){
    setAddress((prev: Address)=>({...prev, [event.target.name]: event.target.value}));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>){
    event.preventDefault();
    try{
      const user = getUser();
      if(user){
        const data = {
          userId: user.sub,
          street: address.street,
          complement: address.complement,
          district: address.district,
          city: address.city,
          state: address.state,
        }
        setAddress(data);
      }
    }catch(e){
      console.log('Não foi possível salvar o endereço');
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col items-start">
      <h2 className="text-center font-bold my-2">Endereço de entrega:</h2>
      <div>
        <label className="mr-2" htmlFor="logradouro">Logradouro:</label>
        <input onChange={handleChangeEvent} value={address?.street}
        type="text" id="logradouro" name="logradouro"
        className="border p-2 rounded-lg mb-2"
        />
      </div>

      <div>
        <label className="mr-2" htmlFor="bairro">Bairro:</label>
        <input onChange={handleChangeEvent} value={address?.district}
        type="text" id="bairro" name="bairro"
        className="border p-2 rounded-lg mb-2"
        />

        <label className="mx-2" htmlFor="localidade">Cidade:</label>
        <input onChange={handleChangeEvent} value={address?.city}
        type="text" id="localidade" name="localidade"
        className="border p-2 rounded-lg mb-2"
        />
      </div>

      <div>
        <label className="mr-2" htmlFor="complemento">Complemento:</label>
        <input onChange={handleChangeEvent} value={address?.complement}
        type="text" id="complemento" name="complemento"
        className="border p-2 rounded-lg mb-2"
        />

        <label className="mx-2" htmlFor="uf">UF:</label>
        <input onChange={handleChangeEvent} value={address?.state}
        type="text" id="uf" name="uf"
        className="border p-2 rounded-lg mb-2"
        />
      </div>
      <button className="self-center text-center border border-main rounded-lg p-2 font-bold text-main"
        type="submit"
      >Salvar endereço</button>
  </form>
  )
}