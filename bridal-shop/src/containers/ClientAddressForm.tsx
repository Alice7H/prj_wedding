'use client'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Address } from "@/types/Address";
import { createAddress } from "@/lib/api";
import Cookies from "js-cookie";
import { getUser } from "@/lib/auth";

const addressSchema = z.object({
  street: z.string().nonempty('Informe o logradouro'),
  complement: z.string(),
  district: z.string().nonempty('Informe o bairro'),
  city: z.string().nonempty('Informe a cidade'),
  state: z.string().nonempty('Informe o estado'),
  phone: z.string().max(11, {message: 'Deve conter DDD + 9 números'})
  .min(10, 'Deve conter DDD + 8 números'),
  email: z.string().email({message: 'Email inválido'}),
  full_name: z.string().nonempty('Informe o nome completo')
})

export function ClientAddressForm({address}: {address: Address}) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting }} = useForm<Address>({
    resolver: zodResolver(addressSchema),
    values: address
  })
  const cep = address.zipCode;

  async function onSubmit(data: Address){
    try{
      const user = getUser();
      const token = Cookies.get('token');
      const items: Address = {
        ...data,
        userId: user.sub,
        ship_to: false,
        zipCode: cep,
      }
      if(token == undefined) throw new Error('O endereço não foi salvo');
      const res = await createAddress({data: items, token});
      reset();
    }catch(e){
      console.log('Não foi possível salvar o endereço');
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-end p-4" >
      <h2 className="font-bold text-main text-title self-center my-2">Novo endereço</h2>
      <div>
        <br />
        <label className="mr-2" htmlFor="full_name">Nome completo:</label>
        <input type="text" id="full_name" {...register("full_name")}
          className="border p-2 rounded-lg mb-2"
          placeholder="Madalena dos Santos"
        />
         {errors.full_name?.message && <p className="mb-2 text-sm font-bold text-danger">{errors.full_name.message}</p>}
      </div>
      <div>
        <label className="mr-2" htmlFor="street">Logradouro:</label>
        <input type="text" id="street" {...register("street")}
          className="border p-2 rounded-lg mb-2"
          placeholder="Rua dos Alfeneiros"
        />
         {errors.street?.message && <p className="text-sm mb-2 font-bold text-danger">{errors.street.message}</p>}
      </div>
      <div>
        <label className="mr-2" htmlFor="district">Bairro:</label>
        <input type="text" id="district" {...register("district")}
          className="border p-2 rounded-lg mb-2"
          placeholder="Limoeiros"
        />
        {errors.district?.message && <p className="text-sm mb-2 font-bold text-danger">{errors.district.message}</p>}
      </div>
      <div>
        <label className="mr-2" htmlFor="city">Cidade:</label>
        <input {...register("city")} type="text" id="city"
          className="border p-2 rounded-lg mb-2"
          placeholder="Sorocaba"
        />
        {errors.city?.message && <p className="text-sm mb-2 font-bold text-danger">{errors.city.message}</p>}
      </div>
      <div>
        <label className="mr-2" htmlFor="complement">Complemento:</label>
        <input  {...register("complement")} type="text" id="complement"
          className="border p-2 rounded-lg mb-2"
          placeholder="nº 214, 10º andar"
        />
        {errors.complement?.message && <p className="text-sm mb-2 font-bold text-danger">{errors.complement.message}</p>}
      </div>
      <div>
        <label className="mr-2" htmlFor="state">UF:</label>
        <input {...register("state")} type="text" id="state"
          className="border p-2 rounded-lg mb-2"
          placeholder="SP"
        />
        {errors.state?.message && <p className="text-sm mb-2 font-bold text-danger">{errors.state.message}</p>}
      </div>
      <div>
        <label className="mr-2" htmlFor="email">E-mail:</label>
        <input {...register("email")} id="email"
          className="border rounded-lg p-2 mb-2"
          placeholder="name@example.com"
        />
        {errors.email?.message && <p className="text-sm mb-2 font-bold text-danger">{errors.email.message}</p>}
      </div>
      <div>
        <label className="mr-2" htmlFor="phone">Telefone:</label>
        <input {...register("phone")} type="text" id="phone"
          className="border p-2 rounded-lg mb-2"
          minLength={10} maxLength={11}
          placeholder="11999999999"
        />
        {errors.phone?.message && <p className="text-sm font-bold text-danger">{errors.phone.message}</p>}
      </div>
      <button
        disabled={isSubmitting}
        className="self-center text-center border border-main rounded-lg p-2 font-bold text-main"
        type="submit"
      >Salvar endereço</button>
  </form>
  )
}